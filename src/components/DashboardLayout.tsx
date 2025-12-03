import { type ReactNode, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Bell, Menu, X, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';
import { supabase } from '../../utils/supabase/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { LogOut } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
  sidebarItems: Array<{
    label: string;
    path: string;
    icon: ReactNode;
    active?: boolean;
  }>;
  userRole: string;
  userName?: string;
  onLogout: () => void;
  showBackButton?: boolean;
}

export default function DashboardLayout({ 
  children, 
  sidebarItems, 
  userRole, 
  userName = 'User',
  onLogout,
  showBackButton = false
}: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    // Load collapse state from localStorage
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved === 'true';
  });
  
  const [notifications, setNotifications] = useState<Array<{ 
    id: string; 
    title: string; 
    message: string; 
    read: boolean; 
    link: string | null;
  }>>([]);

  const unreadCount = notifications.length;

  // Fetch real notifications from Supabase
  useEffect(() => {
    fetchNotifications();
    
    // Set up real-time subscription for notifications
    const channel = supabase
      .channel('notifications-changes')
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
      // Get current user from session
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      if (!userId) {
        // Show demo notifications if not logged in
        setNotifications([
          { 
            id: '1', 
            title: 'New Access Request', 
            message: 'Michael Chen has submitted a broker application', 
            read: false, 
            link: '/admin/approvals' 
          },
          { 
            id: '2', 
            title: 'Support Ticket', 
            message: 'Urgent technical issue reported', 
            read: false, 
            link: '/admin/support' 
          },
        ]);
        return;
      }

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .eq('read', false)  // Only fetch unread
        .order('created_at', { ascending: false })
        .limit(5);  // Only show 5 most recent in dropdown

      if (error) throw error;
      
      // If no notifications from database, show demo
      if (!data || data.length === 0) {
        setNotifications([
          { 
            id: '1', 
            title: 'New Access Request', 
            message: 'Michael Chen has submitted a broker application', 
            read: false, 
            link: '/admin/approvals' 
          },
          { 
            id: '2', 
            title: 'Support Ticket', 
            message: 'Urgent technical issue reported', 
            read: false, 
            link: '/admin/support' 
          },
        ]);
      } else {
        setNotifications(data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Show demo on error
      setNotifications([
        { 
          id: '1', 
          title: 'New Access Request', 
          message: 'Michael Chen has submitted a broker application', 
          read: false, 
          link: '/admin/approvals' 
        },
        { 
          id: '2', 
          title: 'Support Ticket', 
          message: 'Urgent technical issue reported', 
          read: false, 
          link: '/admin/support' 
        },
      ]);
    }
  };

  // Save collapse state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  // Determine if we should show the back button
  const shouldShowBack = showBackButton || !location.pathname.includes('/dashboard');

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-b border-[#2a2a2a] sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-[#2a2a2a]"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X /> : <Menu />}
            </Button>
            
            {shouldShowBack && (
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-[#2a2a2a] hover:text-[#d4af37]"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            
            <div 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => navigate('/')}
            >
              {/* Logo Icon */}
              <div className="relative w-10 h-10">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42 52">
                  <g className="transition-all group-hover:scale-105">
                    <path d="M40.75 0.75H0.75V50.75H40.75V0.75Z" stroke="#D4AF37" strokeWidth="1.5" />
                    <path d="M20.75 26.75C24.0637 26.75 26.75 24.0637 26.75 20.75C26.75 17.4363 24.0637 14.75 20.75 14.75C17.4363 14.75 14.75 17.4363 14.75 20.75C14.75 24.0637 17.4363 26.75 20.75 26.75Z" stroke="#D4AF37" strokeWidth="1.5" />
                    <path d="M23.75 26.75H17.75V40.75H23.75V26.75Z" fill="#D4AF37" />
                    <path d="M0.75 10.75H10.75" stroke="#D4AF37" strokeWidth="1.5" />
                    <path d="M30.75 10.75H40.75" stroke="#D4AF37" strokeWidth="1.5" />
                  </g>
                </svg>
              </div>
              
              {/* Brand Text */}
              <div className="flex flex-col">
                <h2 className="text-white group-hover:text-[#d4af37] transition-colors leading-none">PrivateLand</h2>
                <p className="text-[#d4af37] text-[8px] tracking-wider leading-none mt-0.5">EXCLUSIVE PROPERTIES</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-white hover:bg-[#2a2a2a]">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#d4af37] text-black border-0">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-[#1a1a1a] border-[#2a2a2a]">
                <div className="p-3 border-b border-[#2a2a2a]">
                  <p className="text-white">Notifications</p>
                </div>
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-400">
                    <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No new notifications</p>
                  </div>
                ) : (
                  <>
                    {notifications.map((notification) => (
                      <DropdownMenuItem 
                        key={notification.id} 
                        className="p-4 text-gray-300 focus:bg-[#2a2a2a] focus:text-white cursor-pointer"
                        onClick={() => {
                          if (notification.link) {
                            navigate(notification.link);
                          }
                        }}
                      >
                        <div className="flex items-start gap-3 w-full">
                          <div className="w-2 h-2 rounded-full bg-[#d4af37] mt-2 flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm mb-1">{notification.title}</p>
                            <p className="text-gray-400 text-xs truncate">{notification.message}</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                    <div className="border-t border-[#2a2a2a] p-2">
                      <Button
                        variant="ghost"
                        className="w-full text-[#d4af37] hover:bg-[#2a2a2a] hover:text-[#d4af37]"
                        onClick={() => navigate(`/${userRole}/notifications`)}
                      >
                        View All Notifications
                      </Button>
                    </div>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate(`/${userRole}/profile`)}>
              <div className="text-right hidden sm:block">
                <p className="text-white">{userName}</p>
                <p className="text-gray-400 capitalize">{userRole}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center">
                <span className="text-[#d4af37]">{userName.charAt(0)}</span>
              </div>
            </div>

            {/* Logout Button */}
            <Button
              variant="outline"
              className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
              onClick={() => {
                onLogout();
                navigate('/');
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <TooltipProvider delayDuration={0}>
          <motion.aside 
            initial={false}
            animate={{ 
              width: sidebarCollapsed ? 70 : 256 
            }}
            transition={{ 
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }}
            className={`
              hidden lg:block sticky top-[73px] h-[calc(100vh-73px)] 
              bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-r border-[#2a2a2a]
              overflow-hidden
            `}
          >
            <nav className="p-3 space-y-2 h-full flex flex-col">
              {/* Navigation Items */}
              <div className="flex-1 space-y-2">
                {sidebarItems.map((item, index) => {
                  const isActive = item.active || location.pathname === item.path;
                  
                  return (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          className={`w-full ${
                            sidebarCollapsed ? 'justify-center px-0' : 'justify-start gap-3'
                          } ${
                            isActive 
                              ? 'bg-[#d4af37]/10 text-[#d4af37] hover:bg-[#d4af37]/20' 
                              : 'text-gray-300 hover:bg-[#2a2a2a] hover:text-white'
                          }`}
                          onClick={() => {
                            navigate(item.path);
                            setSidebarOpen(false);
                          }}
                        >
                          <span className={sidebarCollapsed ? '' : 'flex-shrink-0'}>
                            {item.icon}
                          </span>
                          <AnimatePresence mode="wait">
                            {!sidebarCollapsed && (
                              <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
                                transition={{ duration: 0.2 }}
                                className="whitespace-nowrap overflow-hidden"
                              >
                                {item.label}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </Button>
                      </TooltipTrigger>
                      {sidebarCollapsed && (
                        <TooltipContent 
                          side="right" 
                          className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
                        >
                          {item.label}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  );
                })}
              </div>

              {/* Collapse Toggle Button */}
              <div className="pt-4 border-t border-[#2a2a2a]">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`w-full ${
                        sidebarCollapsed ? 'justify-center px-0' : 'justify-start gap-3'
                      } text-gray-400 hover:bg-[#2a2a2a] hover:text-[#d4af37]`}
                      onClick={toggleSidebar}
                    >
                      {sidebarCollapsed ? (
                        <ChevronRight className="w-5 h-5" />
                      ) : (
                        <>
                          <ChevronLeft className="w-5 h-5" />
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="whitespace-nowrap"
                          >
                            Collapse
                          </motion.span>
                        </>
                      )}
                    </Button>
                  </TooltipTrigger>
                  {sidebarCollapsed && (
                    <TooltipContent 
                      side="right" 
                      className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
                    >
                      Expand Sidebar
                    </TooltipContent>
                  )}
                </Tooltip>
              </div>
            </nav>
          </motion.aside>
        </TooltipProvider>

        {/* Mobile Sidebar */}
        <aside className={`
          fixed lg:hidden top-[73px] left-0 h-[calc(100vh-73px)] w-64 
          bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-r border-[#2a2a2a]
          transition-transform duration-300 z-30
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <nav className="p-6 space-y-2">
            {sidebarItems.map((item, index) => {
              const isActive = item.active || location.pathname === item.path;
              
              return (
                <Button
                  key={index}
                  variant="ghost"
                  className={`w-full justify-start gap-3 ${
                    isActive 
                      ? 'bg-[#d4af37]/10 text-[#d4af37] hover:bg-[#d4af37]/20' 
                      : 'text-gray-300 hover:bg-[#2a2a2a] hover:text-white'
                  }`}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}