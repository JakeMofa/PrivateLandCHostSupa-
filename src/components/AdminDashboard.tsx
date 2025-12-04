import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Home, 
  UserCircle, 
  HelpCircle, 
  LogOut,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  FileText,
  BarChart3,
  Settings,
  DollarSign,
  TrendingUp,
  Building2,
  Shield,
  FileCheck,
  UserPlus,
  Bell
} from 'lucide-react';
import { supabase } from '../utils/supabase/client';
import { useAuth } from '../utils/supabase/AuthContext';
import { toast } from 'sonner';

interface AdminDashboardProps {
  onLogout: () => void;
}

interface DashboardStats {
  pendingApprovals: number;
  pendingListings: number;
  totalUsers: number;
  activeListings: number;
  totalGMV: number;
  over48Hours: number;
}

interface RecentApproval {
  id: string;
  role_requested: string;
  first_name: string;
  last_name: string;
  brokerage?: string;
  budget_range?: string;
  status: string;
  created_at: string;
}

interface PendingListing {
  id: string;
  title: string;
  price: number;
  acreage: number;
  status: string;
  broker_id: string;
  created_at: string;
}

interface ActivityLog {
  id: string;
  action: string;
  details: string;
  performed_by_name: string;
  category: string;
  risk_level: string;
  created_at: string;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    pendingApprovals: 0,
    pendingListings: 0,
    totalUsers: 0,
    activeListings: 0,
    totalGMV: 0,
    over48Hours: 0,
  });
  const [recentApprovals, setRecentApprovals] = useState<RecentApproval[]>([]);
  const [pendingListings, setPendingListings] = useState<PendingListing[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  const sidebarItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <Home className="w-5 h-5" />, active: true },
    { label: 'Notifications', path: '/admin/notifications', icon: <Bell className="w-5 h-5" /> },
    { label: 'Approvals', path: '/admin/approvals', icon: <CheckCircle className="w-5 h-5" /> },
    { label: 'Listing Reviews', path: '/admin/listing-reviews', icon: <FileText className="w-5 h-5" /> },
    { label: 'Users & Assignments', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { label: 'Documents', path: '/admin/documents', icon: <FileCheck className="w-5 h-5" /> },
    { label: 'Analytics', path: '/admin/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'Reports', path: '/admin/reports', icon: <FileText className="w-5 h-5" /> },
    { label: 'Marketplace', path: '/admin/marketplace', icon: <Building2 className="w-5 h-5" /> },
    { label: 'Support Tickets', path: '/admin/support', icon: <HelpCircle className="w-5 h-5" /> },
    { label: 'Audit Trail', path: '/admin/audit', icon: <Shield className="w-5 h-5" /> },
    { label: 'System Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
    { label: 'My Profile', path: '/admin/profile', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Account & Billing', path: '/admin/account', icon: <DollarSign className="w-5 h-5" /> },
    { 
      label: 'Logout', 
      path: '/', 
      icon: <LogOut className="w-5 h-5" />,
    },
  ];

  // Fetch all dashboard stats
  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      // 1. Pending Approvals (pending, pending_call, awaiting_docs, pending_verification)
      const { data: approvals, error: approvalsError } = await supabase
        .from('access_requests')
        .select('*', { count: 'exact', head: false })
        .in('status', ['pending', 'pending_call', 'awaiting_docs', 'pending_verification']);

      if (approvalsError) throw approvalsError;

      // Over 48 hours
      const now = Date.now();
      const over48 = (approvals || []).filter((req: any) => {
        const hoursSince = (now - new Date(req.created_at).getTime()) / (1000 * 60 * 60);
        return hoursSince > 48;
      }).length;

      // 2. Pending Listings (draft, pending_review)
      const { count: pendingListingsCount, error: pendingListingsError } = await supabase
        .from('listings')
        .select('*', { count: 'exact', head: true })
        .in('status', ['draft', 'pending_review']);

      if (pendingListingsError) throw pendingListingsError;

      // 3. Total Users
      const { count: totalUsersCount, error: usersError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      if (usersError) throw usersError;

      // 4. Active Listings (approved status)
      const { count: activeListingsCount, error: activeListingsError } = await supabase
        .from('listings')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'approved');

      if (activeListingsError) throw activeListingsError;

      // 5. Total GMV (sum of sold listings)
      const { data: soldListings, error: gmvError } = await supabase
        .from('listings')
        .select('price')
        .eq('status', 'sold');

      if (gmvError) throw gmvError;

      const totalGMV = (soldListings || []).reduce((sum: number, listing: any) => sum + Number(listing.price), 0);

      setStats({
        pendingApprovals: approvals?.length || 0,
        pendingListings: pendingListingsCount || 0,
        totalUsers: totalUsersCount || 0,
        activeListings: activeListingsCount || 0,
        totalGMV,
        over48Hours: over48,
      });

      // Recent Approvals (last 3)
      const { data: recentApprovalData, error: recentApprovalsError } = await supabase
        .from('access_requests')
        .select('*')
        .in('status', ['pending', 'pending_call', 'nda_sent', 'awaiting_docs', 'documents_received', 'pending_verification'])
        .order('created_at', { ascending: false })
        .limit(3);

      if (recentApprovalsError) throw recentApprovalsError;
      setRecentApprovals(recentApprovalData || []);

      // Pending Listings (last 3)
      const { data: pendingListingsData, error: pendingListingsDataError } = await supabase
        .from('listings')
        .select('*')
        .in('status', ['draft', 'pending_review'])
        .order('created_at', { ascending: false })
        .limit(3);

      if (pendingListingsDataError) throw pendingListingsDataError;
      setPendingListings(pendingListingsData || []);

      // Recent Activity from audit logs
      const { data: activityData, error: activityError } = await supabase
        .from('audit_logs')
        .select('id, action, details, performed_by_name, category, risk_level, created_at')
        .order('created_at', { ascending: false })
        .limit(10);

      if (activityError) throw activityError;
      setRecentActivity(activityData || []);

    } catch (error: any) {
      console.error('Error fetching dashboard stats:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();

    // Real-time subscriptions
    const channel = supabase
      .channel('dashboard_updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'access_requests' }, fetchDashboardStats)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'listings' }, fetchDashboardStats)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, fetchDashboardStats)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'audit_logs' }, fetchDashboardStats)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const formatTimeAgo = (dateString: string) => {
    const now = Date.now();
    const then = new Date(dateString).getTime();
    const diff = now - then;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Access Control':
      case 'User Management':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Listing Management':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'Financial':
        return <DollarSign className="w-5 h-5 text-purple-500" />;
      case 'Legal Compliance':
      case 'Document Management':
        return <FileCheck className="w-5 h-5 text-orange-500" />;
      case 'Support':
        return <HelpCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Shield className="w-5 h-5 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Access Control':
      case 'User Management':
        return 'bg-green-500/10';
      case 'Listing Management':
        return 'bg-blue-500/10';
      case 'Financial':
        return 'bg-purple-500/10';
      case 'Legal Compliance':
      case 'Document Management':
        return 'bg-orange-500/10';
      case 'Support':
        return 'bg-yellow-500/10';
      default:
        return 'bg-gray-500/10';
    }
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole="admin" 
      userName={user?.full_name || user?.email?.split('@')[0] || 'Admin'}
      onLogout={onLogout}
    >
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Platform overview and management</p>
        </div>

        {/* Top Stats - 6 Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Pending Approvals */}
          <Card 
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-orange-500/30 transition-all cursor-pointer"
            onClick={() => navigate('/admin/approvals')}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-500" />
                </div>
                {stats.pendingApprovals > 0 && (
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                    Urgent
                  </Badge>
                )}
              </div>
              <p className="text-gray-400 text-sm mb-1">Pending Approvals</p>
              <p className="text-white text-3xl">{loading ? '...' : stats.pendingApprovals}</p>
            </CardContent>
          </Card>

          {/* Pending Listings */}
          <Card 
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-blue-500/30 transition-all cursor-pointer"
            onClick={() => navigate('/admin/listing-reviews')}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Pending Listings</p>
              <p className="text-white text-3xl">{loading ? '...' : stats.pendingListings}</p>
            </CardContent>
          </Card>

          {/* Total Users */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#d4af37]" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Total Users</p>
              <p className="text-white text-3xl">{loading ? '...' : stats.totalUsers}</p>
            </CardContent>
          </Card>

          {/* Active Listings */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-green-500/30 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-green-500" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Active Listings</p>
              <p className="text-white text-3xl">{loading ? '...' : stats.activeListings}</p>
            </CardContent>
          </Card>

          {/* Total GMV */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-purple-500/30 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-purple-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Total GMV</p>
              <p className="text-white text-2xl">{loading ? '...' : formatCurrency(stats.totalGMV)}</p>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-green-500/30 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">System Status</p>
              <p className="text-green-400 text-xl">Operational</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                className="h-auto py-4 bg-[#d4af37] hover:bg-[#b8941f] text-black flex flex-col items-center gap-2"
                onClick={() => navigate('/admin/approvals')}
              >
                <UserPlus className="w-5 h-5" />
                Review Approvals
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-4 border-[#2a2a2a] hover:bg-[#2a2a2a] flex flex-col items-center gap-2"
                onClick={() => navigate('/admin/listing-reviews')}
              >
                <FileText className="w-5 h-5" />
                Review Listings
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-4 border-[#2a2a2a] hover:bg-[#2a2a2a] flex flex-col items-center gap-2"
                onClick={() => navigate('/admin/users')}
              >
                <Users className="w-5 h-5" />
                Manage Users
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-4 border-[#2a2a2a] hover:bg-[#2a2a2a] flex flex-col items-center gap-2"
                onClick={() => navigate('/admin/analytics')}
              >
                <BarChart3 className="w-5 h-5" />
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pending Approvals */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Pending Approvals</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-[#d4af37] hover:text-[#b8941f]"
                  onClick={() => navigate('/admin/approvals')}
                >
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-gray-400">Loading...</div>
              ) : recentApprovals.length === 0 ? (
                <div className="text-center py-8 text-gray-400">No pending approvals</div>
              ) : (
                <div className="space-y-3">
                  {recentApprovals.map((item) => (
                    <div 
                      key={item.id}
                      className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all cursor-pointer"
                      onClick={() => navigate('/admin/approvals')}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={
                              item.role_requested === 'broker' 
                                ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                : 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                            }>
                              {item.role_requested.charAt(0).toUpperCase() + item.role_requested.slice(1)}
                            </Badge>
                            <p className="text-white">{item.first_name} {item.last_name}</p>
                          </div>
                          <p className="text-gray-400 text-sm">
                            {item.role_requested === 'broker' ? item.brokerage || 'N/A' : `Budget: ${item.budget_range || 'Not set'}`}
                          </p>
                        </div>
                        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                          {item.status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </Badge>
                      </div>
                      <p className="text-gray-500 text-xs">{formatTimeAgo(item.created_at)}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pending Listings */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Pending Listing Reviews</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-[#d4af37] hover:text-[#b8941f]"
                  onClick={() => navigate('/admin/listing-reviews')}
                >
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-gray-400">Loading...</div>
              ) : pendingListings.length === 0 ? (
                <div className="text-center py-8 text-gray-400">No pending listings</div>
              ) : (
                <div className="space-y-3">
                  {pendingListings.map((listing) => (
                    <div 
                      key={listing.id}
                      className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all cursor-pointer"
                      onClick={() => navigate('/admin/listing-reviews')}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-white mb-1">{listing.title}</p>
                          <p className="text-gray-400 text-sm">Broker ID: {listing.broker_id.slice(0, 8)}...</p>
                        </div>
                        <Badge className={
                          listing.status === 'pending_review'
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                            : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                        }>
                          {listing.status === 'pending_review' ? 'Needs Review' : 'Draft'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <p className="text-[#d4af37]">{formatCurrency(listing.price)}</p>
                        <p className="text-gray-500">{listing.acreage} acres</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-gray-400">Loading...</div>
            ) : recentActivity.length === 0 ? (
              <div className="text-center py-8 text-gray-400">No recent activity</div>
            ) : (
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div 
                    key={activity.id}
                    className="flex items-start gap-3 p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getCategoryColor(activity.category)}`}>
                      {getCategoryIcon(activity.category)}
                    </div>
                    <div className="flex-1">
                      <p className="text-white mb-1">{activity.action}</p>
                      <p className="text-gray-400 text-sm">{activity.details}</p>
                      {activity.performed_by_name && (
                        <p className="text-gray-500 text-xs mt-1">by {activity.performed_by_name}</p>
                      )}
                      <p className="text-gray-500 text-xs mt-1">{formatTimeAgo(activity.created_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* System Alerts */}
        {stats.over48Hours > 0 && (
          <Card className="bg-gradient-to-br from-orange-500/5 to-[#0f0f0f] border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-[#0f0f0f] rounded-lg border border-orange-500/30">
                  <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white mb-1">{stats.over48Hours} access request{stats.over48Hours > 1 ? 's' : ''} pending over 48 hours</p>
                    <Button 
                      size="sm" 
                      className="mt-2 bg-orange-500 hover:bg-orange-600 text-white"
                      onClick={() => navigate('/admin/approvals')}
                    >
                      Review Now
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
