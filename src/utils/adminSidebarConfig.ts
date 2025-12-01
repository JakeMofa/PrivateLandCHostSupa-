import { 
  Home, 
  HelpCircle, 
  LogOut,
  CheckCircle,
  Users,
  FileText,
  BarChart3,
  Settings,
  FileCheck,
  Shield,
  Building2,
  User,
  CreditCard
} from 'lucide-react';

export const getAdminSidebarItems = (activePath?: string) => [
  { label: 'Dashboard', path: '/admin/dashboard', icon: Home, active: activePath === '/admin/dashboard' },
  { label: 'Approvals', path: '/admin/approvals', icon: CheckCircle, active: activePath === '/admin/approvals' },
  { label: 'Listing Reviews', path: '/admin/listing-reviews', icon: FileText, active: activePath === '/admin/listing-reviews' },
  { label: 'Users & Assignments', path: '/admin/users', icon: Users, active: activePath === '/admin/users' },
  { label: 'Documents', path: '/admin/documents', icon: FileCheck, active: activePath === '/admin/documents' },
  { label: 'Analytics', path: '/admin/analytics', icon: BarChart3, active: activePath === '/admin/analytics' },
  { label: 'Reports', path: '/admin/reports', icon: FileText, active: activePath === '/admin/reports' },
  { label: 'Marketplace', path: '/admin/marketplace', icon: Building2, active: activePath === '/admin/marketplace' },
  { label: 'Support Tickets', path: '/admin/support', icon: HelpCircle, active: activePath === '/admin/support' },
  { label: 'Audit Trail', path: '/admin/audit', icon: Shield, active: activePath === '/admin/audit' },
  { label: 'System Settings', path: '/admin/settings', icon: Settings, active: activePath === '/admin/settings' },
  { label: 'divider' },
  { label: 'My Profile', path: '/admin/profile', icon: User, active: activePath === '/admin/profile' },
  { label: 'Account & Billing', path: '/admin/account', icon: CreditCard, active: activePath === '/admin/account' },
  { label: 'Logout', path: '/', icon: LogOut },
];
