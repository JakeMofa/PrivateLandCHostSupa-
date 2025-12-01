import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Home, 
  Heart, 
  UserCircle, 
  FileText, 
  HelpCircle, 
  LogOut, 
  DollarSign, 
  Shield, 
  Bell, 
  Calendar, 
  Eye, 
  TrendingUp,
  Search,
  Phone,
  Mail,
  BarChart3,
  FileBarChart,
  Clock
} from 'lucide-react';

interface ClientDashboardProps {
  onLogout: () => void;
}

export default function ClientDashboard({ onLogout }: ClientDashboardProps) {
  const navigate = useNavigate();

  const sidebarItems = [
    { label: 'Dashboard', path: '/client/dashboard', icon: <Home className="w-5 h-5" />, active: true },
    { label: 'My Profile', path: '/client/profile', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Marketplace', path: '/client/marketplace', icon: <Home className="w-5 h-5" /> },
    { label: 'Saved Properties', path: '/client/saved', icon: <Heart className="w-5 h-5" /> },
    { label: 'My Agent', path: '/client/agent', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Invitations', path: '/client/invitations', icon: <Heart className="w-5 h-5" /> },
    { label: 'Analytics', path: '/client/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'Reports', path: '/client/reports', icon: <FileBarChart className="w-5 h-5" /> },
    { label: 'My Documents', path: '/client/documents', icon: <FileText className="w-5 h-5" /> },
    { label: 'Account', path: '/client/account', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Settings', path: '/client/settings', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Request Help', path: '/client/help', icon: <HelpCircle className="w-5 h-5" /> },
    { 
      label: 'Logout', 
      path: '/', 
      icon: <LogOut className="w-5 h-5" />,
    },
  ];

  const recentActivity = [
    { id: 1, type: 'listing', message: 'New listing matches your criteria: Highland Ranch Estate', time: '2 hours ago', status: 'new' },
    { id: 2, type: 'agent', message: 'Sarah Mitchell responded to your inquiry', time: '5 hours ago', status: 'info' },
    { id: 3, type: 'meeting', message: 'Upcoming tour scheduled for tomorrow at 10:00 AM', time: '1 day ago', status: 'upcoming' },
    { id: 4, type: 'saved', message: 'You saved Coastal Villa to your favorites', time: '2 days ago', status: 'success' },
    { id: 5, type: 'nda', message: 'NDA signed for Mountain Retreat property', time: '3 days ago', status: 'success' },
  ];

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole="client" 
      userName="James Anderson"
      onLogout={onLogout}
    >
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-white mb-2">Welcome back, James</h1>
          <p className="text-gray-400">Your exclusive real estate overview</p>
        </div>

        {/* Top Stats Row - 5 Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Budget */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[#d4af37]" />
                </div>
              </div>
              <p className="text-gray-400 mb-1">Approved Budget</p>
              <p className="text-white text-3xl">$5M</p>
              <p className="text-gray-500 text-sm mt-2">Pre-approved</p>
            </CardContent>
          </Card>

          {/* Saved Properties */}
          <Card 
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all cursor-pointer"
            onClick={() => navigate('/client/saved')}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[#d4af37]" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-gray-400 mb-1">Saved Properties</p>
              <p className="text-white text-3xl">8</p>
              <p className="text-green-500 text-sm mt-2">+2 this week</p>
            </CardContent>
          </Card>

          {/* New Listings */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Bell className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <p className="text-gray-400 mb-1">New Listings</p>
              <p className="text-white text-3xl">3</p>
              <p className="text-gray-500 text-sm mt-2">In your range</p>
            </CardContent>
          </Card>

          {/* Active NDAs */}
          <Card 
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all cursor-pointer"
            onClick={() => navigate('/client/documents')}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-500" />
                </div>
              </div>
              <p className="text-gray-400 mb-1">Active NDAs</p>
              <p className="text-white text-3xl">2</p>
              <p className="text-yellow-400 text-sm mt-2">1 pending</p>
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-500" />
                </div>
              </div>
              <p className="text-gray-400 mb-1">Account</p>
              <p className="text-white text-2xl">Verified</p>
              <p className="text-green-500 text-sm mt-2">Full access</p>
            </CardContent>
          </Card>
        </div>

        {/* Market Intelligence Summary */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Market Intelligence</CardTitle>
            <p className="text-gray-400 text-sm mt-1">Current market snapshot in your target regions</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-[#0f0f0f] p-4 rounded-lg border border-[#2a2a2a]">
                <p className="text-gray-400 mb-2">Median Price</p>
                <p className="text-white text-2xl">$4.2M</p>
                <Badge className="mt-2 bg-blue-500/20 text-blue-400 border-blue-500/30">
                  In your range
                </Badge>
              </div>
              <div className="bg-[#0f0f0f] p-4 rounded-lg border border-[#2a2a2a]">
                <p className="text-gray-400 mb-2">Price Trend</p>
                <p className="text-green-400 text-2xl">↑ 5.2%</p>
                <p className="text-gray-500 text-sm mt-2">Past 90 days</p>
              </div>
              <div className="bg-[#0f0f0f] p-4 rounded-lg border border-[#2a2a2a]">
                <p className="text-gray-400 mb-2">Avg Days on Market</p>
                <p className="text-white text-2xl">47</p>
                <p className="text-gray-500 text-sm mt-2">Montana region</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buying Journey - Simple Funnel */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Your Buying Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-400">Browsing</p>
                    <p className="text-white">24 properties viewed</p>
                  </div>
                  <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 pl-8">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-400">Saved</p>
                    <p className="text-white">8 properties saved</p>
                  </div>
                  <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: '33%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 pl-16">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-400">NDAs Signed</p>
                    <p className="text-white">2 properties</p>
                  </div>
                  <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div className="h-full bg-[#d4af37]" style={{ width: '8%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 pl-24">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-400">Scheduled Tours</p>
                    <p className="text-white">1 upcoming</p>
                  </div>
                  <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '4%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                className="h-auto py-6 bg-[#d4af37] hover:bg-[#b8941f] text-black flex flex-col items-center gap-2"
                onClick={() => navigate('/client/marketplace')}
              >
                <Search className="w-6 h-6" />
                View Marketplace
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-6 border-[#2a2a2a] hover:bg-[#2a2a2a] flex flex-col items-center gap-2"
                onClick={() => navigate('/client/agent')}
              >
                <Phone className="w-6 h-6" />
                Contact Agent
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-6 border-[#2a2a2a] hover:bg-[#2a2a2a] flex flex-col items-center gap-2"
                onClick={() => navigate('/client/analytics')}
              >
                <BarChart3 className="w-6 h-6" />
                View Analytics
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-6 border-[#2a2a2a] hover:bg-[#2a2a2a] flex flex-col items-center gap-2"
              >
                <Calendar className="w-6 h-6" />
                Schedule Tour
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Your Agent */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Your Assigned Agent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4 p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border-2 border-[#d4af37] flex items-center justify-center flex-shrink-0">
                <span className="text-[#d4af37] text-xl">SM</span>
              </div>
              <div className="flex-1">
                <p className="text-white text-lg mb-1">Sarah Mitchell</p>
                <p className="text-gray-400 mb-3">Licensed Broker • 12 years experience</p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    size="sm" 
                    className="bg-[#d4af37] hover:bg-[#b8941f] text-black"
                    onClick={() => navigate('/client/agent')}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-[#2a2a2a] hover:bg-[#2a2a2a]"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Agent
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-[#2a2a2a] hover:bg-[#2a2a2a]"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity & Upcoming */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity & Upcoming</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-start gap-4 p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.status === 'new' ? 'bg-blue-500/10' :
                    activity.status === 'success' ? 'bg-green-500/10' :
                    activity.status === 'upcoming' ? 'bg-orange-500/10' :
                    'bg-gray-500/10'
                  }`}>
                    {activity.type === 'listing' && <Bell className={`w-5 h-5 ${
                      activity.status === 'new' ? 'text-blue-500' : 'text-gray-500'
                    }`} />}
                    {activity.type === 'agent' && <UserCircle className="w-5 h-5 text-gray-500" />}
                    {activity.type === 'meeting' && <Calendar className="w-5 h-5 text-orange-500" />}
                    {activity.type === 'saved' && <Heart className="w-5 h-5 text-green-500" />}
                    {activity.type === 'nda' && <FileText className="w-5 h-5 text-green-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-white mb-1">{activity.message}</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <p className="text-gray-500 text-sm">{activity.time}</p>
                    </div>
                  </div>
                  {activity.status === 'new' && (
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      New
                    </Badge>
                  )}
                  {activity.status === 'upcoming' && (
                    <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                      Upcoming
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
