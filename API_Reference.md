# PrivateLand API Reference

## 🔐 Authentication

### Using the Auth Hook

```typescript
import { useAuth } from './utils/supabase/AuthContext';

function MyComponent() {
  const { user, session, loading, signIn, signOut } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in</div>;
  
  return <div>Welcome, {user.first_name}!</div>;
}
```

### Sign Up
```typescript
import { signUp } from './utils/supabase/helpers';

const { data, error } = await signUp(
  'email@example.com',
  'password123',
  {
    first_name: 'John',
    last_name: 'Doe',
    phone: '555-0100'
  }
);
```

### Sign In
```typescript
import { signIn } from './utils/supabase/helpers';

const { data, error } = await signIn(
  'email@example.com',
  'password123'
);
```

### Sign Out
```typescript
import { signOut } from './utils/supabase/helpers';

await signOut();
```

---

## 👥 Users

### Get Current User
```typescript
import { getCurrentUser } from './utils/supabase/helpers';

const user = await getCurrentUser();
console.log(user.role); // 'client', 'broker', or 'admin'
```

### Get User by ID
```typescript
import { getUserById } from './utils/supabase/helpers';

const { data: user, error } = await getUserById('user-uuid');
```

### Get All Users (Admin only)
```typescript
import { getAllUsers } from './utils/supabase/helpers';

// All users
const { data: allUsers, error } = await getAllUsers();

// Filter by role
const { data: clients, error } = await getAllUsers('client');
```

### Update User
```typescript
import { updateUser } from './utils/supabase/helpers';

const { data, error } = await updateUser('user-uuid', {
  first_name: 'Jane',
  budget_cap: 500000
});
```

### Get Broker's Clients
```typescript
import { getClientsByBroker } from './utils/supabase/helpers';

const { data: clients, error } = await getClientsByBroker('broker-uuid');
```

---

## 📋 Access Requests

### Create Access Request
```typescript
import { createAccessRequest } from './utils/supabase/helpers';

const { data, error } = await createAccessRequest({
  role_requested: 'client',
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  phone: '555-0100',
  budget_range: '$250k-$500k'
});
```

### Get Access Requests (Admin)
```typescript
import { getAccessRequests } from './utils/supabase/helpers';

// All requests
const { data: allRequests, error } = await getAccessRequests();

// Pending only
const { data: pending, error } = await getAccessRequests('pending');
```

### Approve Access Request (Admin)
```typescript
import { approveAccessRequest } from './utils/supabase/helpers';

const { data, error } = await approveAccessRequest(
  'request-uuid',
  'admin-user-uuid',
  {
    id: 'new-user-uuid', // From auth.users
    email: 'john@example.com',
    first_name: 'John',
    last_name: 'Doe',
    role: 'client',
    status: 'active',
    budget_cap: 500000,
    payment_verified: false
  }
);
```

### Deny Access Request (Admin)
```typescript
import { denyAccessRequest } from './utils/supabase/helpers';

const { data, error } = await denyAccessRequest(
  'request-uuid',
  'admin-user-uuid',
  'Insufficient documentation provided'
);
```

---

## 🏠 Listings

### Create Listing (Broker)
```typescript
import { createListing } from './utils/supabase/helpers';

const { data, error } = await createListing({
  broker_id: 'broker-uuid',
  title: 'Luxury Ranch Estate',
  description: '5000 acres of prime Texas land...',
  price: 2500000,
  acreage: 5000,
  county: 'Bexar',
  state: 'TX',
  property_type: 'Ranch',
  address: '123 Ranch Road',
  latitude: 29.4241,
  longitude: -98.4936,
  status: 'draft',
  visibility: 'approved_buyers',
  features: ['water rights', 'hunting', 'fenced'],
  images: ['url1', 'url2']
});
```

### Get Listings
```typescript
import { getListings } from './utils/supabase/helpers';

// All approved listings
const { data, error } = await getListings({ status: 'approved' });

// Filter by price range
const { data, error } = await getListings({
  minPrice: 100000,
  maxPrice: 500000,
  state: 'TX'
});

// Get broker's listings
const { data, error } = await getListings({ brokerId: 'broker-uuid' });
```

### Get Listing by ID
```typescript
import { getListingById } from './utils/supabase/helpers';

const { data: listing, error } = await getListingById('listing-uuid');
// Includes: listing data, broker info, and assets
```

### Update Listing (Broker)
```typescript
import { updateListing } from './utils/supabase/helpers';

const { data, error } = await updateListing('listing-uuid', {
  price: 2750000,
  status: 'pending_review'
});
```

### Delete Listing
```typescript
import { deleteListing } from './utils/supabase/helpers';

const { error } = await deleteListing('listing-uuid');
```

### Approve Listing (Admin)
```typescript
import { approveListing } from './utils/supabase/helpers';

const { data, error } = await approveListing('listing-uuid', 'admin-uuid');
```

---

## ⭐ Saved Properties

### Save a Property
```typescript
import { saveProperty } from './utils/supabase/helpers';

const { data, error } = await saveProperty('user-uuid', 'listing-uuid');
```

### Unsave a Property
```typescript
import { unsaveProperty } from './utils/supabase/helpers';

const { error } = await unsaveProperty('user-uuid', 'listing-uuid');
```

### Get Saved Properties
```typescript
import { getSavedProperties } from './utils/supabase/helpers';

const { data: saved, error } = await getSavedProperties('user-uuid');
// Returns saved properties with full listing details
```

### Check if Property is Saved
```typescript
import { isPropertySaved } from './utils/supabase/helpers';

const { isSaved, error } = await isPropertySaved('user-uuid', 'listing-uuid');
```

---

## 📞 Inquiry Logs (Contact My Agent)

### Create Inquiry
```typescript
import { createInquiry } from './utils/supabase/helpers';

const { data, error } = await createInquiry({
  listing_id: 'listing-uuid',
  client_id: 'client-uuid',
  broker_id: 'broker-uuid',
  message: 'I\'d like to schedule a viewing'
});
// This automatically creates a notification for the broker!
```

### Get Broker's Inquiries
```typescript
import { getInquiriesByBroker } from './utils/supabase/helpers';

const { data: inquiries, error } = await getInquiriesByBroker('broker-uuid');
// Includes: inquiry, listing details, and client info
```

### Get Client's Inquiries
```typescript
import { getInquiriesByClient } from './utils/supabase/helpers';

const { data: inquiries, error } = await getInquiriesByClient('client-uuid');
```

---

## 🎫 Support Tickets

### Create Ticket
```typescript
import { createSupportTicket } from './utils/supabase/helpers';

const { data, error } = await createSupportTicket({
  user_id: 'user-uuid',
  subject: 'Cannot upload documents',
  message: 'I get an error when trying to upload my NDA...',
  priority: 'high',
  category: 'technical'
});
```

### Get All Tickets (Admin)
```typescript
import { getSupportTickets } from './utils/supabase/helpers';

// All tickets
const { data: allTickets, error } = await getSupportTickets();

// Open tickets only
const { data: openTickets, error } = await getSupportTickets('open');
```

### Get User's Tickets
```typescript
import { getUserTickets } from './utils/supabase/helpers';

const { data: tickets, error } = await getUserTickets('user-uuid');
```

### Update Ticket
```typescript
import { updateSupportTicket } from './utils/supabase/helpers';

const { data, error } = await updateSupportTicket('ticket-uuid', {
  status: 'in_progress',
  admin_response: 'We are looking into this issue...'
});
```

### Resolve Ticket (Admin)
```typescript
import { resolveSupportTicket } from './utils/supabase/helpers';

const { data, error } = await resolveSupportTicket(
  'ticket-uuid',
  'admin-uuid',
  'This issue has been resolved. Please try uploading again.'
);
```

---

## 🔔 Notifications

### Create Notification
```typescript
import { createNotification } from './utils/supabase/helpers';

const { data, error } = await createNotification({
  user_id: 'user-uuid',
  title: 'New Listing Available',
  message: 'A property matching your criteria is now available',
  type: 'success',
  action_url: '/client/listing/123'
});
```

### Get User Notifications
```typescript
import { getUserNotifications } from './utils/supabase/helpers';

// All notifications
const { data: all, error } = await getUserNotifications('user-uuid');

// Unread only
const { data: unread, error } = await getUserNotifications('user-uuid', true);
```

### Mark as Read
```typescript
import { markNotificationAsRead } from './utils/supabase/helpers';

// Single notification
await markNotificationAsRead('notification-uuid');

// All notifications
await markAllNotificationsAsRead('user-uuid');
```

### Real-time Notifications
```typescript
import { subscribeToNotifications } from './utils/supabase/helpers';
import { toast } from 'sonner@2.0.3';

useEffect(() => {
  const unsubscribe = subscribeToNotifications(user.id, (notification) => {
    toast(notification.title, {
      description: notification.message,
    });
  });

  return () => unsubscribe();
}, [user.id]);
```

---

## 📄 Documents

### Upload Document
```typescript
import { uploadDocument } from './utils/supabase/helpers';

const file = event.target.files[0];
const { data, error } = await uploadDocument(
  'user-uuid',
  file,
  'nda' // category: 'nda', 'agreement', 'license', 'receipt', 'contract'
);
```

### Get User Documents
```typescript
import { getUserDocuments } from './utils/supabase/helpers';

// All documents
const { data: docs, error } = await getUserDocuments('user-uuid');

// Filter by category
const { data: ndas, error } = await getUserDocuments('user-uuid', 'nda');
```

### Get Signed URL (for download)
```typescript
import { getDocumentSignedUrl } from './utils/supabase/helpers';

const { url, error } = await getDocumentSignedUrl(
  'path/to/file.pdf',
  3600 // expires in 1 hour
);

if (url) {
  window.open(url, '_blank');
}
```

---

## 💳 Payments

### Create Stripe Checkout Session
```typescript
// Frontend call to Edge Function
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-ca7651f3/create-checkout-session`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`
    },
    body: JSON.stringify({
      userId: user.id,
      email: user.email,
      amount: 250 // $250
    })
  }
);

const { url } = await response.json();
window.location.href = url; // Redirect to Stripe Checkout
```

### Get User Payments
```typescript
import { getUserPayments } from './utils/supabase/helpers';

const { data: payments, error } = await getUserPayments('user-uuid');
```

### Get All Payments (Admin)
```typescript
import { getAllPayments } from './utils/supabase/helpers';

const { data: payments, error } = await getAllPayments();
// Includes user information
```

---

## 📊 Analytics

### Admin Stats
```typescript
import { getAdminStats } from './utils/supabase/helpers';

const stats = await getAdminStats();
console.log(stats.users); // Array of all users
console.log(stats.listings); // Array of all listings
console.log(stats.tickets); // Array of all tickets
console.log(stats.requests); // Array of access requests
console.log(stats.payments); // Array of payments
```

### Broker Stats
```typescript
import { getBrokerStats } from './utils/supabase/helpers';

const stats = await getBrokerStats('broker-uuid');
console.log(stats.listings); // Broker's listings
console.log(stats.clients); // Assigned clients
console.log(stats.inquiries); // All inquiries
```

### Client Stats
```typescript
import { getClientStats } from './utils/supabase/helpers';

const stats = await getClientStats('client-uuid');
console.log(stats.savedProperties); // Saved listings
console.log(stats.inquiries); // Contact history
```

---

## 📧 Email Notifications

### Send Email (via Edge Function)
```typescript
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-ca7651f3/send-email`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`
    },
    body: JSON.stringify({
      to: 'user@example.com',
      subject: 'Welcome to PrivateLand',
      html: '<h1>Welcome!</h1><p>Your account has been approved.</p>'
    })
  }
);

const { success, messageId } = await response.json();
```

---

## 🔍 Example: Complete Property Browsing Flow

```typescript
import { useEffect, useState } from 'react';
import { useAuth } from './utils/supabase/AuthContext';
import { 
  getListings, 
  saveProperty, 
  unsaveProperty,
  isPropertySaved,
  createInquiry 
} from './utils/supabase/helpers';
import { toast } from 'sonner@2.0.3';

function MarketplacePage() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadListings();
  }, []);

  async function loadListings() {
    const { data, error } = await getListings({
      status: 'approved',
      maxPrice: user.budget_cap
    });
    
    if (error) {
      toast.error('Failed to load listings');
    } else {
      setListings(data);
    }
    setLoading(false);
  }

  async function handleSave(listingId: string) {
    const { error } = await saveProperty(user.id, listingId);
    if (error) {
      toast.error('Failed to save property');
    } else {
      toast.success('Property saved!');
    }
  }

  async function handleContactAgent(listing: any) {
    const { error } = await createInquiry({
      listing_id: listing.id,
      client_id: user.id,
      broker_id: listing.broker_id,
      message: 'I am interested in this property'
    });
    
    if (error) {
      toast.error('Failed to contact agent');
    } else {
      toast.success('Agent has been notified!');
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {listings.map(listing => (
        <div key={listing.id}>
          <h3>{listing.title}</h3>
          <p>${listing.price.toLocaleString()}</p>
          <button onClick={() => handleSave(listing.id)}>Save</button>
          <button onClick={() => handleContactAgent(listing)}>
            Contact My Agent
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

## 🛠️ Utility Functions

### Direct Supabase Client Access
```typescript
import { supabase } from './utils/supabase/client';

// Custom query
const { data, error } = await supabase
  .from('listings')
  .select('*')
  .eq('county', 'Travis')
  .gte('acreage', 100)
  .order('price', { ascending: true });
```

### Storage Operations
```typescript
import { supabase } from './utils/supabase/client';

// Upload file
const { data, error } = await supabase.storage
  .from('property-images')
  .upload('path/to/file.jpg', file);

// Get signed URL
const { data } = await supabase.storage
  .from('property-images')
  .createSignedUrl('path/to/file.jpg', 3600);

// Delete file
await supabase.storage
  .from('property-images')
  .remove(['path/to/file.jpg']);
```

---

## 🔐 Environment Variables Needed

Add these to Supabase Dashboard > Project Settings > Edge Functions:

```bash
# Required (auto-filled by Supabase)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Optional (add when ready)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
```

---

## 📱 Real-time Subscriptions

### Listen to Table Changes
```typescript
import { supabase } from './utils/supabase/client';

useEffect(() => {
  const channel = supabase
    .channel('listings-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'listings',
        filter: `status=eq.approved`
      },
      (payload) => {
        console.log('New listing:', payload.new);
        toast.success('New property available!');
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
```

---

**For more details, see Supabase docs: https://supabase.com/docs**
