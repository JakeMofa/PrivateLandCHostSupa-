import { supabase } from './client';
import type { 
  User, 
  AccessRequest, 
  Listing, 
  SupportTicket, 
  Notification,
  SavedProperty,
  InquiryLog,
  Payment,
  Document,
  AuditLog
} from './client';

// ============================================================================
// AUTHENTICATION
// ============================================================================

export async function signUp(email: string, password: string, metadata: any) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  
  // Get full user profile from users table
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();
  
  return profile;
}

export async function getCurrentSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// ============================================================================
// ACCESS REQUESTS
// ============================================================================

export async function createAccessRequest(request: Partial<AccessRequest>) {
  const { data, error } = await supabase
    .from('access_requests')
    .insert([request])
    .select()
    .single();
  return { data, error };
}

export async function getAccessRequests(status?: string) {
  let query = supabase
    .from('access_requests')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (status) {
    query = query.eq('status', status);
  }
  
  const { data, error } = await query;
  return { data, error };
}

export async function approveAccessRequest(requestId: string, userId: string, userData: Partial<User>) {
  // Update access request
  const { error: updateError } = await supabase
    .from('access_requests')
    .update({
      status: 'approved',
      reviewed_at: new Date().toISOString(),
      reviewed_by: userId
    })
    .eq('id', requestId);
  
  if (updateError) return { error: updateError };
  
  // Create user account
  const { data, error } = await supabase
    .from('users')
    .insert([userData])
    .select()
    .single();
  
  return { data, error };
}

export async function denyAccessRequest(requestId: string, userId: string, notes: string) {
  const { data, error } = await supabase
    .from('access_requests')
    .update({
      status: 'denied',
      reviewed_at: new Date().toISOString(),
      reviewed_by: userId,
      admin_notes: notes
    })
    .eq('id', requestId)
    .select()
    .single();
  
  return { data, error };
}

// ============================================================================
// USERS
// ============================================================================

export async function getUserById(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
}

export async function getAllUsers(role?: string) {
  let query = supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (role) {
    query = query.eq('role', role);
  }
  
  const { data, error } = await query;
  return { data, error };
}

export async function updateUser(userId: string, updates: Partial<User>) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  return { data, error };
}

export async function getClientsByBroker(brokerId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('assigned_broker_id', brokerId)
    .eq('role', 'client')
    .order('created_at', { ascending: false });
  return { data, error };
}

// ============================================================================
// LISTINGS
// ============================================================================

export async function createListing(listing: Partial<Listing>) {
  const { data, error } = await supabase
    .from('listings')
    .insert([listing])
    .select()
    .single();
  return { data, error };
}

export async function getListings(filters?: {
  status?: string;
  brokerId?: string;
  minPrice?: number;
  maxPrice?: number;
  county?: string;
  state?: string;
  propertyType?: string;
}) {
  let query = supabase
    .from('listings')
    .select(`
      *,
      broker:users!listings_broker_id_fkey(id, first_name, last_name, email, phone)
    `)
    .order('created_at', { ascending: false });
  
  if (filters?.status) query = query.eq('status', filters.status);
  if (filters?.brokerId) query = query.eq('broker_id', filters.brokerId);
  if (filters?.minPrice) query = query.gte('price', filters.minPrice);
  if (filters?.maxPrice) query = query.lte('price', filters.maxPrice);
  if (filters?.county) query = query.eq('county', filters.county);
  if (filters?.state) query = query.eq('state', filters.state);
  if (filters?.propertyType) query = query.eq('property_type', filters.propertyType);
  
  const { data, error } = await query;
  return { data, error };
}

export async function getListingById(listingId: string) {
  const { data, error } = await supabase
    .from('listings')
    .select(`
      *,
      broker:users!listings_broker_id_fkey(id, first_name, last_name, email, phone, profile_photo_url),
      assets:listing_assets(*)
    `)
    .eq('id', listingId)
    .single();
  return { data, error };
}

export async function updateListing(listingId: string, updates: Partial<Listing>) {
  const { data, error } = await supabase
    .from('listings')
    .update(updates)
    .eq('id', listingId)
    .select()
    .single();
  return { data, error };
}

export async function deleteListing(listingId: string) {
  const { error } = await supabase
    .from('listings')
    .delete()
    .eq('id', listingId);
  return { error };
}

export async function approveListing(listingId: string, adminId: string) {
  const { data, error } = await supabase
    .from('listings')
    .update({
      status: 'approved',
      approved_at: new Date().toISOString(),
      approved_by: adminId
    })
    .eq('id', listingId)
    .select()
    .single();
  return { data, error };
}

// ============================================================================
// SAVED PROPERTIES
// ============================================================================

export async function saveProperty(userId: string, listingId: string) {
  const { data, error } = await supabase
    .from('saved_properties')
    .insert([{ user_id: userId, listing_id: listingId }])
    .select()
    .single();
  return { data, error };
}

export async function unsaveProperty(userId: string, listingId: string) {
  const { error } = await supabase
    .from('saved_properties')
    .delete()
    .eq('user_id', userId)
    .eq('listing_id', listingId);
  return { error };
}

export async function getSavedProperties(userId: string) {
  const { data, error } = await supabase
    .from('saved_properties')
    .select(`
      *,
      listing:listings(
        *,
        broker:users!listings_broker_id_fkey(id, first_name, last_name, email, phone)
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { data, error };
}

export async function isPropertySaved(userId: string, listingId: string) {
  const { data, error } = await supabase
    .from('saved_properties')
    .select('id')
    .eq('user_id', userId)
    .eq('listing_id', listingId)
    .maybeSingle();
  return { isSaved: !!data, error };
}

// ============================================================================
// INQUIRY LOGS (Contact My Agent)
// ============================================================================

export async function createInquiry(inquiry: Partial<InquiryLog>) {
  const { data, error } = await supabase
    .from('inquiry_logs')
    .insert([inquiry])
    .select()
    .single();
  return { data, error };
}

export async function getInquiriesByBroker(brokerId: string) {
  const { data, error } = await supabase
    .from('inquiry_logs')
    .select(`
      *,
      listing:listings(*),
      client:users!inquiry_logs_client_id_fkey(id, first_name, last_name, email, phone)
    `)
    .eq('broker_id', brokerId)
    .order('created_at', { ascending: false });
  return { data, error };
}

export async function getInquiriesByClient(clientId: string) {
  const { data, error } = await supabase
    .from('inquiry_logs')
    .select(`
      *,
      listing:listings(*),
      broker:users!inquiry_logs_broker_id_fkey(id, first_name, last_name, email, phone)
    `)
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });
  return { data, error };
}

// ============================================================================
// SUPPORT TICKETS
// ============================================================================

export async function createSupportTicket(ticket: Partial<SupportTicket>) {
  const { data, error } = await supabase
    .from('support_tickets')
    .insert([ticket])
    .select()
    .single();
  return { data, error };
}

export async function getSupportTickets(status?: string) {
  let query = supabase
    .from('support_tickets')
    .select(`
      *,
      user:users(id, first_name, last_name, email, role)
    `)
    .order('created_at', { ascending: false });
  
  if (status) {
    query = query.eq('status', status);
  }
  
  const { data, error } = await query;
  return { data, error };
}

export async function getUserTickets(userId: string) {
  const { data, error } = await supabase
    .from('support_tickets')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { data, error };
}

export async function updateSupportTicket(ticketId: string, updates: Partial<SupportTicket>) {
  const { data, error } = await supabase
    .from('support_tickets')
    .update(updates)
    .eq('id', ticketId)
    .select()
    .single();
  return { data, error };
}

export async function resolveSupportTicket(ticketId: string, adminId: string, response: string) {
  const { data, error } = await supabase
    .from('support_tickets')
    .update({
      status: 'resolved',
      admin_response: response,
      resolved_at: new Date().toISOString(),
      resolved_by: adminId
    })
    .eq('id', ticketId)
    .select()
    .single();
  return { data, error };
}

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export async function createNotification(notification: Partial<Notification>) {
  const { data, error } = await supabase
    .from('notifications')
    .insert([notification])
    .select()
    .single();
  return { data, error };
}

export async function getUserNotifications(userId: string, unreadOnly = false) {
  let query = supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (unreadOnly) {
    query = query.eq('read', false);
  }
  
  const { data, error } = await query;
  return { data, error };
}

export async function markNotificationAsRead(notificationId: string) {
  const { data, error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId)
    .select()
    .single();
  return { data, error };
}

export async function markAllNotificationsAsRead(userId: string) {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('user_id', userId)
    .eq('read', false);
  return { error };
}

// Subscribe to real-time notifications
export function subscribeToNotifications(userId: string, callback: (notification: Notification) => void) {
  const channel = supabase
    .channel('notifications')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`
      },
      (payload) => {
        callback(payload.new as Notification);
      }
    )
    .subscribe();
  
  return () => {
    supabase.removeChannel(channel);
  };
}

// ============================================================================
// DOCUMENTS
// ============================================================================

export async function createDocumentRecord(doc: Partial<Document>) {
  const { data, error } = await supabase
    .from('documents')
    .insert([doc])
    .select()
    .single();
  return { data, error };
}

export async function getUserDocuments(userId: string, category?: string) {
  let query = supabase
    .from('documents')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (category) {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query;
  return { data, error };
}

export async function uploadDocument(userId: string, file: File, category: string) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${category}/${Date.now()}.${fileExt}`;
  
  // Upload to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('legal-documents')
    .upload(fileName, file);
  
  if (uploadError) return { error: uploadError };
  
  // Create document record
  const { data, error } = await createDocumentRecord({
    user_id: userId,
    file_name: file.name,
    file_path: uploadData.path,
    file_type: file.type,
    file_size: file.size,
    category: category as any
  });
  
  return { data, error };
}

export async function getDocumentSignedUrl(filePath: string, expiresIn = 3600) {
  const { data, error } = await supabase.storage
    .from('legal-documents')
    .createSignedUrl(filePath, expiresIn);
  return { url: data?.signedUrl, error };
}

// ============================================================================
// PAYMENTS
// ============================================================================

export async function createPayment(payment: Partial<Payment>) {
  const { data, error } = await supabase
    .from('payments')
    .insert([payment])
    .select()
    .single();
  return { data, error };
}

export async function getUserPayments(userId: string) {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { data, error };
}

export async function getAllPayments() {
  const { data, error } = await supabase
    .from('payments')
    .select(`
      *,
      user:users(id, first_name, last_name, email)
    `)
    .order('created_at', { ascending: false });
  return { data, error };
}

// ============================================================================
// ANALYTICS
// ============================================================================

export async function getAdminStats() {
  const [
    usersResult,
    listingsResult,
    ticketsResult,
    requestsResult,
    paymentsResult
  ] = await Promise.all([
    supabase.from('users').select('id, role, created_at'),
    supabase.from('listings').select('id, status, price, created_at'),
    supabase.from('support_tickets').select('id, status, created_at'),
    supabase.from('access_requests').select('id, status, created_at'),
    supabase.from('payments').select('id, amount, status, created_at')
  ]);
  
  return {
    users: usersResult.data || [],
    listings: listingsResult.data || [],
    tickets: ticketsResult.data || [],
    requests: requestsResult.data || [],
    payments: paymentsResult.data || []
  };
}

export async function getBrokerStats(brokerId: string) {
  const [
    listingsResult,
    clientsResult,
    inquiriesResult
  ] = await Promise.all([
    supabase.from('listings').select('*').eq('broker_id', brokerId),
    supabase.from('users').select('*').eq('assigned_broker_id', brokerId),
    supabase.from('inquiry_logs').select('*').eq('broker_id', brokerId)
  ]);
  
  return {
    listings: listingsResult.data || [],
    clients: clientsResult.data || [],
    inquiries: inquiriesResult.data || []
  };
}

export async function getClientStats(clientId: string) {
  const [
    savedResult,
    inquiriesResult
  ] = await Promise.all([
    supabase.from('saved_properties').select('*').eq('user_id', clientId),
    supabase.from('inquiry_logs').select('*').eq('client_id', clientId)
  ]);
  
  return {
    savedProperties: savedResult.data || [],
    inquiries: inquiriesResult.data || []
  };
}
