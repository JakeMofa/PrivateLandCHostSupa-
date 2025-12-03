import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { getAdminSidebarItems } from '../utils/adminSidebarConfig';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { supabase } from '../../utils/supabase/client';
import { useAuth } from '../../utils/supabase/AuthContext';
import { toast } from 'sonner';
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
  Bell,
  ExternalLink
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    title: string;
    message: string;
    type: string;
    link: string | null;
    read: boolean;
    created_at: string;
  }>>([]);

  // Fetch notifications
  useEffect(() => {
    fetchNotifications();

    // Set up real-time subscription
    const channel = supabase
      .channel('dashboard-notifications')
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications'
        },
        () => {
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      if (!userId) {
        // Show demo notifications
        setNotifications([
          {
            id: '1',
            type: 'access_request',
            title: 'New Broker Access Request',
            message: 'Michael Chen has submitted a broker application',
            link: '/admin/approvals',
            read: false,
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: '2',
            type: 'support_ticket',
            title: 'New Support Ticket',
            message: 'Urgent: Technical issue reported',
            link: '/admin/support',
            read: false,
            created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          },
          {
            id: '3',
            type: 'listing_approval',
            title: 'Listing Pending Review',
            message: 'New luxury property submitted: $12.5M',
            link: '/admin/listing-reviews',
            read: false,
            created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          },
        ]);
        return;
      }

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .eq('read', false)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;

      if (!data || data.length === 0) {
        setNotifications([
          {
            id: '1',
            type: 'access_request',
            title: 'New Broker Access Request',
            message: 'Michael Chen has submitted a broker application',
            link: '/admin/approvals',
            read: false,
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: '2',
            type: 'support_ticket',
            title: 'New Support Ticket',
            message: 'Urgent: Technical issue reported',
            link: '/admin/support',
            read: false,
            created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          },
          {
            id: '3',
            type: 'listing_approval',
            title: 'Listing Pending Review',
            message: 'New luxury property submitted: $12.5M',
            link: '/admin/listing-reviews',
            read: false,
            created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          },
        ]);
      } else {
        setNotifications(data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotifications([]);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return `${Math.floor(diffInHours / 24)}d ago`;
    }
  };

  const sidebarItems = getAdminSidebarItems(location.pathname)
    .filter(item => item.label !== 'divider' && item.icon && item.path)
    .map(item => {
      const Icon = item.icon!;
      return {
        label: item.label,
        path: item.path!,
        icon: <Icon className="w-5 h-5" />,
        active: item.active
      };
    });

  const pendingApprovals = [
    { id: 1, type: 'Broker', name: 'Michael Chen', company: 'Luxury Land Co.', status: 'Pending Verification', time: '2 hours ago' },
    { id: 2, type: 'Client', name: 'Patricia Williams', budget: '$8M', status: 'NDA Sent', time: '5 hours ago' },
    { id: 3, type: 'Broker', name: 'Sarah Johnson', company: 'Montana Estates', status: 'Documents Received', time: '1 day ago' },
  ];

  const pendingListings = [
    { id: 1, title: 'Highland Ranch Estate', broker: 'John Smith', price: '$12.5M', acres: 450, status: 'New Submission' },
    { id: 2, title: 'Coastal Vineyard', broker: 'Maria Garcia', price: '$8.7M', acres: 120, status: 'Revision Requested' },
    { id: 3, title: 'Mountain Retreat', broker: 'Robert Lee', price: '$6.2M', acres: 280, status: 'New Submission' },
  ];

  const recentActivity = [
    { id: 1, action: 'Approved broker access', user: 'John Smith', time: '1 hour ago', type: 'approval' },
    { id: 2, action: 'Listing approved', detail: 'Desert Oasis - $4.9M', time: '3 hours ago', type: 'listing' },
    { id: 3, action: 'Client budget increased', user: 'James Anderson', detail: '$5M → $7.5M', time: '5 hours ago', type: 'budget' },
    { id: 4, action: 'NDA signed', user: 'Patricia Williams', time: '1 day ago', type: 'document' },
  ];

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole="admin" 
      userName="Admin"
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
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                  Urgent
                </Badge>
              </div>
              <p className="text-gray-400 text-sm mb-1">Pending Approvals</p>
              <p className="text-white text-3xl">12</p>
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
              <p className="text-white text-3xl">8</p>
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
              <p className="text-white text-3xl">247</p>
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
              <p className="text-white text-3xl">156</p>
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
              <p className="text-white text-2xl">$842M</p>
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
          {/* Recent Notifications */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#d4af37]" />
                  Recent Notifications
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-[#d4af37] hover:text-[#b8941f]"
                  onClick={() => navigate('/admin/notifications')}
                >
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">No new notifications</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all cursor-pointer group"
                      onClick={() => notification.link && navigate(notification.link)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-white mb-1 font-medium">{notification.title}</p>
                          <p className="text-gray-400 text-sm mb-2 line-clamp-2">{notification.message}</p>
                          <p className="text-gray-500 text-xs">{formatTimeAgo(notification.created_at)}</p>
                        </div>
                        {notification.link && (
                          <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#d4af37] flex-shrink-0 transition-colors" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

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
              <div className="space-y-3">
                {pendingApprovals.map((item) => (
                  <div 
                    key={item.id}
                    className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all cursor-pointer"
                    onClick={() => navigate('/admin/approvals')}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={
                            item.type === 'Broker' 
                              ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                              : 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                          }>
                            {item.type}
                          </Badge>
                          <p className="text-white">{item.name}</p>
                        </div>
                        <p className="text-gray-400 text-sm">
                          {item.type === 'Broker' ? item.company : `Budget: ${item.budget}`}
                        </p>
                      </div>
                      <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-gray-500 text-xs">{item.time}</p>
                  </div>
                ))}
              </div>
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
                        <p className="text-gray-400 text-sm">by {listing.broker}</p>
                      </div>
                      <Badge className={
                        listing.status === 'New Submission'
                          ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      }>
                        {listing.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <p className="text-[#d4af37]">{listing.price}</p>
                      <p className="text-gray-500">{listing.acres} acres</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id}
                  className="flex items-start gap-3 p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'approval' ? 'bg-green-500/10' :
                    activity.type === 'listing' ? 'bg-blue-500/10' :
                    activity.type === 'budget' ? 'bg-purple-500/10' :
                    'bg-orange-500/10'
                  }`}>
                    {activity.type === 'approval' && <CheckCircle className="w-5 h-5 text-green-500" />}
                    {activity.type === 'listing' && <FileText className="w-5 h-5 text-blue-500" />}
                    {activity.type === 'budget' && <DollarSign className="w-5 h-5 text-purple-500" />}
                    {activity.type === 'document' && <FileCheck className="w-5 h-5 text-orange-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-white mb-1">{activity.action}</p>
                    {activity.user && <p className="text-gray-400 text-sm">{activity.user}</p>}
                    {activity.detail && <p className="text-gray-400 text-sm">{activity.detail}</p>}
                    <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
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
                  <p className="text-white mb-1">12 access requests pending over 48 hours</p>
                  <Button size="sm" className="mt-2 bg-orange-500 hover:bg-orange-600 text-white">
                    Review Now
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}