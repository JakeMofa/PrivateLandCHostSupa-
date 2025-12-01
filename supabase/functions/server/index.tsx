import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from 'npm:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@14.0.0';
import { runSetup } from './setup.tsx';

const app = new Hono();

// Create Supabase client with service role key (for admin operations)
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Initialize Stripe (users will add their key later)
const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY') || '';
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
}) : null;

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-ca7651f3/health", (c) => {
  return c.json({ status: "ok" });
});

// ============================================================================
// ONE-TIME SETUP ENDPOINT - Run this once to configure everything!
// ============================================================================
app.post("/make-server-ca7651f3/setup", async (c) => {
  try {
    console.log('🚀 Starting PrivateLand setup...');
    const results = await runSetup(supabaseAdmin);
    
    return c.json({
      success: true,
      message: 'Setup process completed',
      details: results,
      nextSteps: [
        '1. Apply full database schema via Supabase SQL Editor',
        '2. Copy /supabase/migrations/001_initial_schema.sql',
        '3. Create your admin account',
        '4. Start building!'
      ]
    });
  } catch (error: any) {
    console.error('Setup error:', error);
    return c.json({
      success: false,
      error: error.message,
      message: 'Please follow QUICKSTART.md for manual setup'
    }, 500);
  }
});

// ============================================================================
// STRIPE WEBHOOK HANDLER
// ============================================================================
app.post("/make-server-ca7651f3/stripe-webhook", async (c) => {
  try {
    if (!stripe) {
      return c.json({ error: 'Stripe not configured. Please add STRIPE_SECRET_KEY environment variable.' }, 400);
    }

    const signature = c.req.header('stripe-signature');
    if (!signature) {
      return c.json({ error: 'Missing stripe signature' }, 400);
    }

    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    if (!webhookSecret) {
      return c.json({ error: 'Webhook secret not configured' }, 400);
    }

    const rawBody = await c.req.text();
    
    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return c.json({ error: 'Invalid signature' }, 400);
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Update user payment verification
        const { error: updateError } = await supabaseAdmin
          .from('users')
          .update({ payment_verified: true })
          .eq('email', session.customer_email);

        if (updateError) {
          console.error('Error updating user payment:', updateError);
          return c.json({ error: 'Database update failed' }, 500);
        }

        // Create payment record
        const { data: user } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('email', session.customer_email)
          .single();

        if (user) {
          await supabaseAdmin.from('payments').insert([{
            user_id: user.id,
            amount: (session.amount_total || 0) / 100,
            stripe_payment_intent: session.payment_intent as string,
            stripe_customer_id: session.customer as string,
            status: 'completed',
            description: 'Platform Access Fee',
            receipt_url: session.receipt_url,
            completed_at: new Date().toISOString()
          }]);

          // Create notification
          await supabaseAdmin.from('notifications').insert([{
            user_id: user.id,
            title: 'Payment Received',
            message: 'Your payment has been processed successfully. Your account is now active.',
            type: 'success'
          }]);
        }

        console.log('Payment processed successfully for:', session.customer_email);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error('Payment failed:', paymentIntent.id);
        
        // Update payment record
        await supabaseAdmin
          .from('payments')
          .update({ status: 'failed' })
          .eq('stripe_payment_intent', paymentIntent.id);
        
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return c.json({ received: true });
  } catch (error: any) {
    console.error('Webhook handler error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// CREATE STRIPE CHECKOUT SESSION
// ============================================================================
app.post("/make-server-ca7651f3/create-checkout-session", async (c) => {
  try {
    if (!stripe) {
      return c.json({ error: 'Stripe not configured. Please add STRIPE_SECRET_KEY environment variable.' }, 400);
    }

    const { userId, email, amount } = await c.req.json();

    if (!userId || !email || !amount) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'PrivateLand Platform Access Fee',
              description: 'One-time access fee for verified members',
            },
            unit_amount: amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${c.req.header('origin')}/dashboard?payment=success`,
      cancel_url: `${c.req.header('origin')}/dashboard?payment=cancelled`,
      customer_email: email,
      metadata: {
        userId: userId,
      },
    });

    return c.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// EMAIL NOTIFICATION ENDPOINT (SendGrid/Resend)
// ============================================================================
app.post("/make-server-ca7651f3/send-email", async (c) => {
  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      return c.json({ 
        error: 'Email service not configured. Please add RESEND_API_KEY environment variable.',
        note: 'Get your API key from https://resend.com/api-keys' 
      }, 400);
    }

    const { to, subject, html } = await c.req.json();

    if (!to || !subject || !html) {
      return c.json({ error: 'Missing required fields: to, subject, html' }, 400);
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'PrivateLand <noreply@privateland.com>',
        to: [to],
        subject: subject,
        html: html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Email sending failed:', data);
      return c.json({ error: data }, 500);
    }

    console.log('Email sent successfully to:', to);
    return c.json({ success: true, messageId: data.id });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// DOCUMENT WATERMARKING (placeholder for future)
// ============================================================================
app.post("/make-server-ca7651f3/watermark-document", async (c) => {
  try {
    const { documentPath, watermarkText } = await c.req.json();

    // TODO: Implement actual watermarking logic
    // For now, just return success
    console.log('Watermark request for:', documentPath, 'with text:', watermarkText);

    return c.json({ 
      success: true, 
      message: 'Watermarking feature coming soon. Document served without watermark.' 
    });
  } catch (error: any) {
    console.error('Error watermarking document:', error);
    return c.json({ error: error.message }, 500);
  }
});

Deno.serve(app.fetch);