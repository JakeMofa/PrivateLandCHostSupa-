import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Bell, Check, Trash2, ExternalLink } from 'lucide-react';
import { supabase } from '../../utils/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { motion } from 'motion/react';
import { getAdminSidebarItems } from '../utils/adminSidebarConfig';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  link: string | null;
  read: boolean;
  created_at: string;
}

interface AdminNotificationsProps {
  onLogout: () => void;
}

export default function AdminNotifications({ onLogout }: AdminNotificationsProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [userName, setUserName] = useState('Admin');

  // Demo notifications to showcase the UI
  const getDemoNotifications = (): Notification[] => [
    {
      id: '1',
      type: 'access_request',
      title: 'New Broker Access Request',
      message: 'Michael Chen from Luxury Land Co. has submitted a broker application. License: MT-BRO-45678',
      link: '/admin/approvals',
      read: false,
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    },
    {
      id: '2',
      type: 'access_request',
      title: 'New Client Access Request',
      message: 'Patricia Williams requesting $8M budget approval for Ranch/Agricultural properties',
      link: '/admin/approvals',
      read: false,
      created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    },
    {
      id: '3',
      type: 'property_inquiry',
      title: 'High-Value Property Inquiry',
      message: 'James Anderson has requested detailed information on Montana Ranch Estate - 2,500 acres',
      link: '/admin/marketplace',
      read: true,
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
    {
      id: '4',
      type: 'document_upload',
      title: 'New Document Upload',
      message: 'Sarah Johnson uploaded insurance certificate and license copy for verification',
      link: '/admin/documents',
      read: true,
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    },
    {
      id: '5',
      type: 'listing_approval',
      title: 'Listing Pending Review',
      message: 'New luxury property listing submitted: Wyoming Mountain Estate - $12.5M',
      link: '/admin/listing-reviews',
      read: false,
      created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    },
    {
      id: '6',
      type: 'system_alert',
      title: 'System Security Alert',
      message: 'Multiple failed login attempts detected from IP: 192.168.1.100',
      link: '/admin/audit',
      read: true,
      created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    },
    {
      id: '7',
      type: 'payment_received',
      title: 'Payment Received',
      message: 'Subscription payment of $2,500 received from David Kim (Client ID: #1234)',
      link: '/admin/account',
      read: true,
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
    },
    {
      id: '8',
      type: 'support_ticket',
      title: 'New Support Ticket',
      message: 'Urgent: Broker Robert Martinez reports technical issue with listing upload feature',
      link: '/admin/support',
      read: false,
      created_at: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(), // 30 mins ago
    },
  ];

  useEffect(() => {
    // Always load demo notifications immediately
    setNotifications(getDemoNotifications());
    setLoading(false);
    
    // Then try to fetch from database
    fetchUserAndNotifications();
  }, []);

  const fetchUserAndNotifications = async () => {
    try {
      // Get current user from session
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      const userFirstName = session?.user?.user_metadata?.first_name;

      if (userFirstName) {
        setUserName(userFirstName);
      }

      if (!userId) {
        return;
      }

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // If no notifications from database, show demo notifications
      if (!data || data.length === 0) {
        setNotifications(getDemoNotifications());
      } else {
        setNotifications(data || []);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Show demo notifications on error too
      setNotifications(getDemoNotifications());
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id);

      if (error) throw error;

      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      // Get current user from session
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      if (!userId) return;

      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', userId)
        .eq('read', false);

      if (error) throw error;

      setNotifications(prev =>
        prev.map(n => ({ ...n, read: true }))
      );
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    return <Bell className="w-5 h-5" />;
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'access_request':
        return 'bg-blue-500/10 text-blue-500';
      case 'property_inquiry':
        return 'bg-green-500/10 text-green-500';
      case 'document_upload':
        return 'bg-purple-500/10 text-purple-500';
      default:
        return 'bg-[#d4af37]/10 text-[#d4af37]';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37]"></div>
      </div>
    );
  }

  return (
    <DashboardLayout 
      sidebarItems={getAdminSidebarItems(location.pathname)
        .filter(item => item.label !== 'divider' && item.icon && item.path)  // Only include items with icons and paths
        .map(item => ({
          label: item.label,
          path: item.path!,  // Type assertion since we filtered for path existence
          icon: item.icon ? <item.icon className="w-5 h-5" /> : null,
          active: item.active
        }))}
      userRole="admin"
      userName={userName}
      onLogout={onLogout}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white mb-2">Notifications</h1>
            <p className="text-gray-400">
              Stay updated with all platform activities
            </p>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <Badge className="bg-[#d4af37] text-black border-0">
                {unreadCount} Unread
              </Badge>
            )}
            {unreadCount > 0 && (
              <Button
                variant="outline"
                className="border-[#2a2a2a] text-gray-300 hover:bg-[#2a2a2a]"
                onClick={markAllAsRead}
              >
                <Check className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <Tabs value={filter} onValueChange={(v) => setFilter(v as 'all' | 'unread')} className="w-full">
          <TabsList className="bg-[#1a1a1a] border border-[#2a2a2a]">
            <TabsTrigger value="all" className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black">
              All ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread" className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black">
              Unread ({unreadCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="mt-6">
            {filteredNotifications.length === 0 ? (
              <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
                <CardContent className="py-16 text-center">
                  <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-white mb-2">No notifications</h3>
                  <p className="text-gray-400">
                    {filter === 'unread' 
                      ? "You're all caught up! No unread notifications."
                      : "You don't have any notifications yet."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card 
                      className={`bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] transition-all hover:border-[#d4af37]/50 ${
                        notification.read ? 'opacity-60' : ''
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className={`flex-shrink-0 w-12 h-12 rounded-full ${getNotificationColor(notification.type)} flex items-center justify-center`}>
                            {getNotificationIcon(notification.type)}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="text-white mb-1">{notification.title}</h3>
                                <p className="text-gray-400 mb-2">{notification.message}</p>
                                <p className="text-gray-500 text-sm">{formatDate(notification.created_at)}</p>
                              </div>

                              {/* Unread indicator */}
                              {!notification.read && (
                                <div className="w-3 h-3 rounded-full bg-[#d4af37] flex-shrink-0"></div>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 mt-4">
                              {notification.link && (
                                <Button
                                  size="sm"
                                  className="bg-[#d4af37] hover:bg-[#c19b2b] text-black"
                                  onClick={() => handleNotificationClick(notification)}
                                >
                                  View Details
                                  <ExternalLink className="w-4 h-4 ml-2" />
                                </Button>
                              )}
                              {!notification.read && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-[#2a2a2a] text-gray-300 hover:bg-[#2a2a2a]"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <Check className="w-4 h-4 mr-2" />
                                  Mark Read
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-400 hover:bg-red-500/10 hover:text-red-400"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}