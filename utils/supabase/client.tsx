import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

const supabaseUrl = `https://${projectId}.supabase.co`;

// Debug: Verify credentials are loaded
if (!projectId || !publicAnonKey) {
  console.error('❌ Supabase credentials missing!');
  console.error('projectId:', projectId);
  console.error('publicAnonKey:', publicAnonKey ? 'exists' : 'missing');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, publicAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Database types for TypeScript
export type UserRole = 'client' | 'broker' | 'admin';
export type AccessRequestStatus = 'pending' | 'approved' | 'denied';
export type ListingStatus = 'draft' | 'pending_review' | 'approved' | 'processing' | 'pending' | 'sold' | 'leased' | 'archived';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  role: UserRole;
  status: 'active' | 'inactive' | 'suspended';
  budget_cap?: number;
  assigned_broker_id?: string;
  brokerage_id?: string;
  payment_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface AccessRequest {
  id: string;
  role_requested: UserRole;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  budget_range?: string;
  brokerage?: string;
  license_no?: string;
  state?: string;
  status: AccessRequestStatus;
  admin_notes?: string;
  created_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
}

export interface Listing {
  id: string;
  broker_id: string;
  title: string;
  description?: string;
  price: number;
  acreage: number;
  county: string;
  state: string;
  property_type: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  status: ListingStatus;
  visibility: 'all' | 'approved_buyers' | 'invite_only';
  features?: string[];
  created_at: string;
  updated_at: string;
  approved_at?: string;
  approved_by?: string;
}

export interface SupportTicket {
  id: string;
  user_id: string;
  subject: string;
  message: string;
  status: TicketStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
  resolved_by?: string;
  admin_response?: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  action_url?: string;
  created_at: string;
}

export interface SavedProperty {
  id: string;
  user_id: string;
  listing_id: string;
  created_at: string;
}

export interface InquiryLog {
  id: string;
  listing_id: string;
  client_id: string;
  broker_id: string;
  message?: string;
  created_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  stripe_payment_intent?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  description: string;
  created_at: string;
  completed_at?: string;
}

export interface Document {
  id: string;
  user_id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  category: 'nda' | 'agreement' | 'license' | 'receipt' | 'contract' | 'other';
  verified: boolean;
  verified_by?: string;
  verified_at?: string;
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_id?: string;
  action: string;
  entity_type: string;
  entity_id?: string;
  details?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}
