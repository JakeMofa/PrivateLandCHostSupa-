import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from 'npm:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@14.0.0';
import { runSetup } from './setup.ts';
import nodemailer from 'npm:nodemailer@6.9.7';

console.log('🚀 Starting PrivateLand Server Edge Function...');

// Gmail SMTP helper using nodemailer
async function sendEmailViaGmail(to: string, subject: string, html: string) {
  const gmailUser = Deno.env.get('GMAIL_USER');
  const gmailPassword = Deno.env.get('GMAIL_APP_PASSWORD');
  
  if (!gmailUser || !gmailPassword) {
    throw new Error('Gmail SMTP not configured');
  }

  // Remove spaces from app password
  const cleanPassword = gmailPassword.replace(/\s/g, '');
  
  console.log(`📧 Sending email to: ${to}`);
  console.log(`📧 Using Gmail account: ${gmailUser}`);
  
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use TLS
    auth: {
      user: gmailUser,
      pass: cleanPassword,
    },
  });
  
  // Send email
  const info = await transporter.sendMail({
    from: `PrivateLand <${gmailUser}>`,
    to: to,
    subject: subject,
    html: html,
  });
  
  console.log(`✅ Email sent: ${info.messageId}`);
  return info;
}

// Create Hono app with base path matching function name
const app = new Hono().basePath('/server');

console.log('✅ Hono app created');

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

// Root endpoint
app.get("/", (c) => {
  return c.json({ 
    message: "PrivateLand Server API",
    version: "1.0.0",
    endpoints: [
      "GET /health",
      "POST /access-requests/:id/approve",
      "POST /access-requests/:id/deny",
      "GET /access-requests/active",
      "GET /access-requests/archived"
    ]
  });
});

// Health check endpoint
app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

// ============================================================================
// ONE-TIME SETUP ENDPOINT - Run this once to configure everything!
// ============================================================================
app.post("/setup", async (c) => {
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
app.post("/stripe-webhook", async (c) => {
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
app.post("/create-checkout-session", async (c) => {
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
// EMAIL NOTIFICATION ENDPOINT (Gmail SMTP)
// ============================================================================
app.post("/send-email", async (c) => {
  try {
    const { to, subject, html } = await c.req.json();

    if (!to || !subject || !html) {
      return c.json({ error: 'Missing required fields: to, subject, html' }, 400);
    }

    await sendEmailViaGmail(to, subject, html);

    console.log('Email sent successfully to:', to);
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// DOCUMENT WATERMARKING (placeholder for future)
// ============================================================================
app.post("/watermark-document", async (c) => {
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

// ============================================================================
// ACCESS REQUEST APPROVAL - Creates user account + sends email
// ============================================================================
app.post("/access-requests/:id/approve", async (c) => {
  const requestId = c.req.param('id');
  const accessToken = c.req.header('Authorization')?.split(' ')[1];

  // Verify admin authentication
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
  if (authError || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  // Verify admin role
  const { data: adminUser } = await supabaseAdmin
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (adminUser?.role !== 'admin') {
    return c.json({ error: 'Admin access required' }, 403);
  }

  try {
    console.log(`🎯 Approving access request: ${requestId}`);

    // Step 1: Get user data and generate temp password from SQL
    const { data: userData, error: prepError } = await supabaseAdmin
      .rpc('create_user_from_access_request', {
        p_access_request_id: requestId,
        p_approved_by: user.id
      });

    if (prepError || !userData?.success) {
      console.error('Failed to prepare user creation:', prepError || userData?.error);
      throw new Error(userData?.error || prepError?.message || 'Failed to prepare user creation');
    }

    console.log(`✅ User data prepared for: ${userData.email}`);

    // Step 2: Create auth user with temporary password
    const { data: authUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: userData.email,
      password: userData.temp_password,
      email_confirm: true, // Auto-confirm since admin approved
      user_metadata: {
        first_name: userData.first_name,
        last_name: userData.last_name,
        role: userData.role
      }
    });

    if (createError || !authUser?.user) {
      console.error('Failed to create auth user:', createError);
      throw new Error(createError?.message || 'Failed to create auth user');
    }

    console.log(`✅ Auth user created: ${authUser.user.id}`);

    // Step 3: Complete user creation in database (creates public.users + archives request)
    const { error: completeError } = await supabaseAdmin
      .rpc('complete_user_creation', {
        p_access_request_id: requestId,
        p_auth_user_id: authUser.user.id,
        p_approved_by: user.id
      });

    if (completeError) {
      console.error('Failed to complete user creation:', completeError);
      throw new Error(completeError.message);
    }

    console.log(`✅ User account completed and request archived`);

    // Step 4: Send welcome email with temp password via Gmail SMTP
    try {
      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #0a0a0a; color: #ffffff; padding: 40px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #1a1a1a; border: 1px solid #d4af37; border-radius: 8px; padding: 40px; }
            .logo { color: #d4af37; font-size: 28px; font-weight: bold; margin-bottom: 30px; }
            .credentials { background-color: #2a2a2a; border-left: 4px solid #d4af37; padding: 20px; margin: 30px 0; }
            .credential-row { margin: 10px 0; }
            .label { color: #888; font-size: 14px; }
            .value { color: #d4af37; font-size: 18px; font-weight: bold; }
            .button { display: inline-block; background-color: #d4af37; color: #0a0a0a; padding: 15px 40px; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 20px 0; }
            .warning { background-color: #3a2a1a; border-left: 4px solid #ff9900; padding: 15px; margin: 20px 0; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">PrivateLand.com</div>
            
            <h1>Welcome, ${userData.first_name}!</h1>
            
            <p>Congratulations! Your account has been approved and is now active.</p>
            
            <p>You've been registered as a <strong>${userData.role === 'client' ? 'Client' : 'Broker'}</strong> on PrivateLand.com.</p>
            
            <div class="credentials">
              <h3>Your Login Credentials</h3>
              
              <div class="credential-row">
                <div class="label">Email:</div>
                <div class="value">${userData.email}</div>
              </div>
              
              <div class="credential-row">
                <div class="label">Temporary Password:</div>
                <div class="value">${userData.temp_password}</div>
              </div>
            </div>
            
            <div class="warning">
              ⚠️ <strong>Security Notice:</strong> This is a temporary password. You will be required to change it upon your first login.
            </div>
            
            <a href="https://privateland.com/login" class="button">Login Now</a>
            
            <h3>What's Next?</h3>
            <ul>
              ${userData.role === 'client' ? `
                <li>Complete your profile and set your property preferences</li>
                <li>Browse exclusive luxury listings</li>
                <li>Connect with your assigned broker</li>
                <li>Save your favorite properties</li>
              ` : `
                <li>Complete your broker profile</li>
                <li>Upload your brokerage verification documents</li>
                <li>Create your first property listing</li>
                <li>Connect with high-net-worth clients</li>
              `}
            </ul>
            
            <p>If you have any questions, please don't hesitate to contact our support team.</p>
            
            <p style="margin-top: 40px;">
              Best regards,<br>
              <strong>The PrivateLand.com Team</strong>
            </p>
          </div>
        </body>
        </html>
      `;

      await sendEmailViaGmail(
        userData.email,
        '🎉 Welcome to PrivateLand.com - Your Account is Approved!',
        emailHtml
      );
      console.log(`✅ Welcome email sent to: ${userData.email}`);
    } catch (emailError: any) {
      console.error('Failed to send email:', emailError.message);
      // Don't fail the whole approval if email fails
    }

    return c.json({
      success: true,
      message: 'User approved and account created',
      email: userData.email,
      user_id: authUser.user.id
    });

  } catch (error: any) {
    console.error('❌ Approval error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// ACCESS REQUEST DENIAL - Archives with reason
// ============================================================================
app.post("/access-requests/:id/deny", async (c) => {
  const requestId = c.req.param('id');
  const accessToken = c.req.header('Authorization')?.split(' ')[1];

  // Verify admin authentication
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
  if (authError || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  // Verify admin role
  const { data: adminUser } = await supabaseAdmin
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (adminUser?.role !== 'admin') {
    return c.json({ error: 'Admin access required' }, 403);
  }

  try {
    const { denial_reason } = await c.req.json();

    if (!denial_reason || denial_reason.trim() === '') {
      return c.json({ error: 'Denial reason is required' }, 400);
    }

    console.log(`🚫 Denying access request: ${requestId}`);

    // Call the new deny_access_request SQL function
    const { data: denyResult, error: denyError } = await supabaseAdmin
      .rpc('deny_access_request', {
        p_access_request_id: requestId,
        p_denied_by: user.id,
        p_denial_reason: denial_reason
      });

    if (denyError || !denyResult?.success) {
      console.error('Failed to deny request:', denyError || denyResult?.error);
      throw new Error(denyResult?.error || denyError?.message || 'Failed to deny request');
    }

    console.log(`✅ Request denied: ${denyResult.email}`);

    // Now archive it
    const { error: archiveError } = await supabaseAdmin
      .rpc('archive_access_request', {
        p_access_request_id: requestId,
        p_archived_by: user.id,
        p_denial_reason: denial_reason
      });

    if (archiveError) {
      console.error('Failed to archive denied request:', archiveError);
      // Don't throw - denial already succeeded
    }

    console.log(`✅ Request archived`);

    const request = denyResult;

    // Step 3: Send denial email via Gmail SMTP
    if (request) {
      try {
        const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #0a0a0a; color: #ffffff; padding: 40px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #1a1a1a; border: 1px solid #d4af37; border-radius: 8px; padding: 40px; }
            .logo { color: #d4af37; font-size: 28px; font-weight: bold; margin-bottom: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">PrivateLand.com</div>
            
            <h1>Access Request Update</h1>
            
            <p>Dear ${request.first_name},</p>
            
            <p>Thank you for your interest in PrivateLand.com.</p>
            
            <p>After careful review, we are unable to approve your access request at this time.</p>
            
            ${denial_reason ? `<p><strong>Reason:</strong> ${denial_reason}</p>` : ''}
            
            <p>If you believe this decision was made in error or if you have additional information to provide, please contact our support team at <a href="mailto:support@privateland.com" style="color: #d4af37;">support@privateland.com</a>.</p>
            
            <p>We appreciate your understanding.</p>
            
            <p style="margin-top: 40px;">
              Best regards,<br>
              <strong>The PrivateLand.com Team</strong>
            </p>
          </div>
        </body>
        </html>
      `;

        await sendEmailViaGmail(
          request.email,
          'PrivateLand.com - Access Request Update',
          emailHtml
        );
        console.log(`✅ Denial email sent to: ${request.email}`);
      } catch (emailError: any) {
        console.error('Failed to send denial email:', emailError.message);
        // Don't fail the whole denial if email fails
      }
    }

    return c.json({
      success: true,
      message: 'Access request denied and archived'
    });

  } catch (error: any) {
    console.error('❌ Denial error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// GET ACTIVE ACCESS REQUESTS (Excludes archived)
// ============================================================================
app.get("/access-requests/active", async (c) => {
  const accessToken = c.req.header('Authorization')?.split(' ')[1];

  // Verify admin authentication
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
  if (authError || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  // Verify admin role
  const { data: adminUser } = await supabaseAdmin
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (adminUser?.role !== 'admin') {
    return c.json({ error: 'Admin access required' }, 403);
  }

  try {
    // Use the view that filters out archived requests
    const { data: requests, error } = await supabaseAdmin
      .from('access_requests_active')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    // Get stats
    const { data: stats } = await supabaseAdmin.rpc('get_access_request_stats');

    return c.json({
      requests: requests || [],
      stats: stats?.[0] || {}
    });

  } catch (error: any) {
    console.error('Error fetching active requests:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// GET ARCHIVED ACCESS REQUESTS (History)
// ============================================================================
app.get("/access-requests/archived", async (c) => {
  const accessToken = c.req.header('Authorization')?.split(' ')[1];

  // Verify admin authentication
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
  if (authError || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  // Verify admin role
  const { data: adminUser } = await supabaseAdmin
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (adminUser?.role !== 'admin') {
    return c.json({ error: 'Admin access required' }, 403);
  }

  try {
    // Get archived requests with full details
    const { data: requests, error } = await supabaseAdmin
      .from('access_requests_archived')
      .select('*')
      .order('archived_at', { ascending: false })
      .limit(100);

    if (error) {
      throw new Error(error.message);
    }

    return c.json(requests || []);

  } catch (error: any) {
    console.error('Error fetching archived requests:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// CONSENT: Submit new client consent from Add Listing page
// ============================================================================
app.post("/consents/submit-with-listing", async (c) => {
  const accessToken = c.req.header('Authorization')?.split(' ')[1];
  
  try {
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: userData } = await supabaseAdmin
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (userData?.role !== 'broker') {
      return c.json({ error: 'Only brokers can submit consents' }, 403);
    }

    const formData = await c.req.formData();
    const clientName = formData.get('client_name') as string;
    const clientEmail = formData.get('client_email') as string;
    const clientPhone = formData.get('client_phone') as string;
    const consentFile = formData.get('consent_file') as File;

    if (!clientName?.trim()) {
      return c.json({ error: 'Client name is required' }, 400);
    }

    if (!consentFile) {
      return c.json({ error: 'Consent document file is required' }, 400);
    }

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(consentFile.type)) {
      return c.json({ error: 'Invalid file type. Only PDF and image files allowed.' }, 400);
    }

    if (consentFile.size > 10 * 1024 * 1024) {
      return c.json({ error: 'File too large. Maximum 10MB.' }, 400);
    }

    console.log(`📄 Consent submission: ${clientName} by ${user.id}`);

    const timestamp = Date.now();
    const fileExtension = consentFile.name.split('.').pop();
    const sanitizedName = clientName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    const fileName = `${timestamp}_${sanitizedName}.${fileExtension}`;
    const filePath = `consent-to-list/${user.id}/${fileName}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from('Legal-documents')
      .upload(filePath, consentFile, { contentType: consentFile.type, upsert: false });

    if (uploadError) {
      console.error('Storage error:', uploadError);
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    const { data: consent, error: insertError } = await supabaseAdmin
      .from('client_consents')
      .insert({
        broker_id: user.id,
        client_name: clientName.trim(),
        client_email: clientEmail?.trim() || null,
        client_phone: clientPhone?.trim() || null,
        consent_document_url: filePath,
        consent_document_name: consentFile.name,
        status: 'pending'
      })
      .select()
      .single();

    if (insertError) {
      await supabaseAdmin.storage.from('Legal-documents').remove([filePath]);
      console.error('DB error:', insertError);
      throw new Error(`DB insert failed: ${insertError.message}`);
    }

    console.log(`✅ Consent created: ${consent.id}`);

    return c.json({
      success: true,
      consent_id: consent.id,
      client_name: consent.client_name,
      message: 'Consent submitted for admin review.',
      status: 'pending'
    });

  } catch (error: any) {
    console.error('❌ Consent error:', error);
    return c.json({ error: error.message || 'Failed to submit consent' }, 500);
  }
});

// ============================================================================
// MEDIA: Upload Photos
// ============================================================================
app.post("/listings/:listing_id/upload-photos", async (c) => {
  const listingId = c.req.param('listing_id');
  const accessToken = c.req.header('Authorization')?.split(' ')[1];

  try {
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
    if (authError || !user) return c.json({ error: 'Unauthorized' }, 401);

    const { data: listing } = await supabaseAdmin
      .from('listings')
      .select('broker_id')
      .eq('id', listingId)
      .single();

    if (!listing || listing.broker_id !== user.id) {
      return c.json({ error: 'Unauthorized' }, 403);
    }

    const formData = await c.req.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return c.json({ error: 'No files provided' }, 400);
    }

    const uploaded = [];
    const errors = [];

    for (const file of files) {
      try {
        if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
          errors.push({ filename: file.name, error: 'Invalid type' });
          continue;
        }

        if (file.size > 10 * 1024 * 1024) {
          errors.push({ filename: file.name, error: 'File too large (max 10MB)' });
          continue;
        }

        const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 8)}.${file.name.split('.').pop()}`;
        const filePath = `listings/${listingId}/photos/${fileName}`;

        const { error: uploadError } = await supabaseAdmin.storage
          .from('property-image')
          .upload(filePath, file, { contentType: file.type });

        if (uploadError) {
          errors.push({ filename: file.name, error: uploadError.message });
          continue;
        }

        const { data: asset } = await supabaseAdmin
          .from('listing_assets')
          .insert({
            listing_id: listingId,
            file_path: filePath,
            file_name: file.name,
            file_type: 'photo',
            asset_category: 'photo',
            file_size: file.size,
            uploaded_by: user.id
          })
          .select()
          .single();

        uploaded.push(asset);
      } catch (e: any) {
        errors.push({ filename: file.name, error: e.message });
      }
    }

    return c.json({ success: true, uploaded_count: uploaded.length, uploaded, errors });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// MEDIA: Upload Videos
// ============================================================================
app.post("/listings/:listing_id/upload-videos", async (c) => {
  const listingId = c.req.param('listing_id');
  const accessToken = c.req.header('Authorization')?.split(' ')[1];

  try {
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
    if (authError || !user) return c.json({ error: 'Unauthorized' }, 401);

    const { data: listing } = await supabaseAdmin
      .from('listings')
      .select('broker_id')
      .eq('id', listingId)
      .single();

    if (!listing || listing.broker_id !== user.id) {
      return c.json({ error: 'Unauthorized' }, 403);
    }

    const formData = await c.req.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return c.json({ error: 'No files provided' }, 400);
    }

    const uploaded = [];
    const errors = [];

    for (const file of files) {
      try {
        if (!['video/mp4', 'video/quicktime', 'video/x-msvideo'].includes(file.type)) {
          errors.push({ filename: file.name, error: 'Invalid type' });
          continue;
        }

        if (file.size > 2 * 1024 * 1024 * 1024) {
          errors.push({ filename: file.name, error: 'File too large (max 2GB)' });
          continue;
        }

        const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 8)}.${file.name.split('.').pop()}`;
        const filePath = `listings/${listingId}/videos/${fileName}`;

        const { error: uploadError } = await supabaseAdmin.storage
          .from('property-image')
          .upload(filePath, file, { contentType: file.type });

        if (uploadError) {
          errors.push({ filename: file.name, error: uploadError.message });
          continue;
        }

        const { data: asset } = await supabaseAdmin
          .from('listing_assets')
          .insert({
            listing_id: listingId,
            file_path: filePath,
            file_name: file.name,
            file_type: 'video',
            asset_category: 'video',
            file_size: file.size,
            uploaded_by: user.id
          })
          .select()
          .single();

        uploaded.push(asset);
      } catch (e: any) {
        errors.push({ filename: file.name, error: e.message });
      }
    }

    return c.json({ success: true, uploaded_count: uploaded.length, uploaded, errors });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// MEDIA: Upload 360° Virtual Tours
// ============================================================================
app.post("/listings/:listing_id/upload-360-tours", async (c) => {
  const listingId = c.req.param('listing_id');
  const accessToken = c.req.header('Authorization')?.split(' ')[1];

  try {
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
    if (authError || !user) return c.json({ error: 'Unauthorized' }, 401);

    const { data: listing } = await supabaseAdmin
      .from('listings')
      .select('broker_id')
      .eq('id', listingId)
      .single();

    if (!listing || listing.broker_id !== user.id) {
      return c.json({ error: 'Unauthorized' }, 403);
    }

    const formData = await c.req.formData();
    const files = formData.getAll('files') as File[];
    const tourType = formData.get('tour_type') as string || '360_photo';
    
    if (!files || files.length === 0) {
      return c.json({ error: 'No files provided' }, 400);
    }

    const uploaded = [];
    const errors = [];

    for (const file of files) {
      try {
        const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 8)}.${file.name.split('.').pop()}`;
        const filePath = `listings/${listingId}/360-tours/${fileName}`;

        const { error: uploadError } = await supabaseAdmin.storage
          .from('property-image')
          .upload(filePath, file, { contentType: file.type });

        if (uploadError) {
          errors.push({ filename: file.name, error: uploadError.message });
          continue;
        }

        const { data: asset } = await supabaseAdmin
          .from('listing_assets')
          .insert({
            listing_id: listingId,
            file_path: filePath,
            file_name: file.name,
            file_type: tourType === '360_photo' ? 'photo' : 'video',
            asset_category: tourType,
            file_size: file.size,
            uploaded_by: user.id,
            is_360: true
          })
          .select()
          .single();

        uploaded.push(asset);
      } catch (e: any) {
        errors.push({ filename: file.name, error: e.message });
      }
    }

    return c.json({ success: true, uploaded_count: uploaded.length, uploaded, errors });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// MEDIA: Upload Documents (Floor Plans, Site Plans, Brochures)
// ============================================================================
app.post("/listings/:listing_id/upload-documents", async (c) => {
  const listingId = c.req.param('listing_id');
  const accessToken = c.req.header('Authorization')?.split(' ')[1];

  try {
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
    if (authError || !user) return c.json({ error: 'Unauthorized' }, 401);

    const { data: listing } = await supabaseAdmin
      .from('listings')
      .select('broker_id')
      .eq('id', listingId)
      .single();

    if (!listing || listing.broker_id !== user.id) {
      return c.json({ error: 'Unauthorized' }, 403);
    }

    const formData = await c.req.formData();
    const files = formData.getAll('files') as File[];
    const documentType = formData.get('document_type') as string || 'document';
    
    if (!files || files.length === 0) {
      return c.json({ error: 'No files provided' }, 400);
    }

    const uploaded = [];
    const errors = [];

    for (const file of files) {
      try {
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
          errors.push({ filename: file.name, error: 'Invalid type (PDF/images only)' });
          continue;
        }

        const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 8)}.${file.name.split('.').pop()}`;
        const filePath = `listings/${listingId}/documents/${fileName}`;

        const { error: uploadError } = await supabaseAdmin.storage
          .from('property-image')
          .upload(filePath, file, { contentType: file.type });

        if (uploadError) {
          errors.push({ filename: file.name, error: uploadError.message });
          continue;
        }

        const { data: asset } = await supabaseAdmin
          .from('listing_assets')
          .insert({
            listing_id: listingId,
            file_path: filePath,
            file_name: file.name,
            file_type: file.type === 'application/pdf' ? 'pdf' : 'image',
            asset_category: documentType,
            file_size: file.size,
            uploaded_by: user.id
          })
          .select()
          .single();

        uploaded.push(asset);
      } catch (e: any) {
        errors.push({ filename: file.name, error: e.message });
      }
    }

    return c.json({ success: true, uploaded_count: uploaded.length, uploaded, errors });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

console.log('✅ All routes registered');

Deno.serve(app.fetch);
