import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Home, 
  Users, 
  FileText, 
  UserCircle, 
  HelpCircle, 
  LogOut, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Calendar,
  BarChart3,
  FileBarChart,
  DollarSign,
  Eye,
  Bookmark,
  Mail,
  Phone,
  Clock,
  Target
} from 'lucide-react';

interface BrokerDashboardProps {
  onLogout: () => void;
}

export default function BrokerDashboard({ onLogout }: BrokerDashboardProps) {
  const sidebarItems = [
    { label: 'Dashboard', path: '/broker/dashboard', icon: <Home className="w-5 h-5" />, active: true },
    { label: 'My Listings', path: '/broker/listings', icon: <Home className="w-5 h-5" /> },
    { label: 'Add Listing', path: '/broker/add-listing', icon: <Plus className="w-5 h-5" /> },
    { label: 'Leads', path: '/broker/leads', icon: <Users className="w-5 h-5" /> },
    { label: "My Buyer's List", path: '/broker/buyers', icon: <Users className="w-5 h-5" /> },
    { label: 'My Contracts', path: '/broker/contracts', icon: <FileText className="w-5 h-5" /> },
    { label: 'My NDAs', path: '/broker/ndas', icon: <FileText className="w-5 h-5" /> },
    { label: 'Invitations', path: '/broker/invitations', icon: <Mail className="w-5 h-5" /> },
    { label: 'Marketplace', path: '/broker/marketplace', icon: <Home className="w-5 h-5" /> },
    { label: 'Analytics', path: '/broker/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'Reports', path: '/broker/reports', icon: <FileBarChart className="w-5 h-5" /> },
    { label: 'My Documents', path: '/broker/documents', icon: <FileText className="w-5 h-5" /> },
    { label: 'My Profile', path: '/broker/profile', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Account', path: '/broker/account', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Settings', path: '/broker/settings', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Request Help', path: '/broker/help', icon: <HelpCircle className="w-5 h-5" /> },
    { label: 'Logout', path: '/', icon: <LogOut className="w-5 h-5" /> },
  ];

  const recentActivity = [
    { id: 1, type: 'lead', message: 'New lead from James Anderson', time: '12 minutes ago', status: 'new' },
    { id: 2, type: 'listing', message: 'Highland Ranch listing approved', time: '2 hours ago', status: 'success' },
    { id: 3, type: 'meeting', message: 'Meeting with Sarah Chen tomorrow at 2:00 PM', time: '5 hours ago', status: 'upcoming' },
    { id: 4, type: 'inquiry', message: 'Buyer inquiry on Coastal Villa', time: '1 day ago', status: 'pending' },
    { id: 5, type: 'contract', message: 'Contract signed for Mountain Retreat', time: '2 days ago', status: 'success' },
  ];

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole="broker" 
      userName="Michael Rivers"
      onLogout={onLogout}
    >
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-white mb-2">Welcome back, Michael</h1>
          <p className="text-gray-400">Your business overview for today</p>
        </div>

        {/* Top Stats - 5 Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Active Listings */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <Home className="w-6 h-6 text-[#d4af37]" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-gray-400 mb-1">Active Listings</p>
              <p className="text-white text-3xl">12</p>
              <p className="text-green-500 text-sm mt-2">+2 this week</p>
            </CardContent>
          </Card>

          {/* New Leads */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-gray-400 mb-1">New Leads</p>
              <p className="text-white text-3xl">8</p>
              <p className="text-green-500 text-sm mt-2">This week</p>
            </CardContent>
          </Card>

          {/* Buyer Contacts */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-purple-500" />
                </div>
              </div>
              <p className="text-gray-400 mb-1">Buyer Contacts</p>
              <p className="text-white text-3xl">25</p>
              <p className="text-gray-500 text-sm mt-2">Total inquiries</p>
            </CardContent>
          </Card>

          {/* Contracts */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-orange-500" />
                </div>
              </div>
              <p className="text-gray-400 mb-1">Contracts</p>
              <p className="text-white text-3xl">2</p>
              <p className="text-gray-500 text-sm mt-2">In progress</p>
            </CardContent>
          </Card>

          {/* GCI */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[#d4af37]" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-gray-400 mb-1">GCI (YTD)</p>
              <p className="text-white text-3xl">$127K</p>
              <p className="text-green-500 text-sm mt-2">+18% vs last year</p>
            </CardContent>
          </Card>
        </div>

        {/* Additional KPIs Row - NEW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Pipeline Value */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-green-500" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-gray-400 mb-1">Pipeline Value</p>
              <p className="text-white text-2xl">$227M</p>
              <p className="text-gray-500 text-sm mt-2">43 opportunities</p>
            </CardContent>
          </Card>

          {/* Avg Deal Value */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[#d4af37]\" />
                </div>
              </div>
              <p className="text-gray-400 mb-1">Avg Deal Value</p>
              <p className="text-white text-2xl">$8.2M</p>
              <p className="text-gray-500 text-sm mt-2">Per closed transaction</p>
            </CardContent>
          </Card>

          {/* Listing-to-Sale Ratio */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-500" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-gray-400 mb-1">Conversion Rate</p>
              <p className="text-white text-2xl">32%</p>
              <p className="text-green-500 text-sm mt-2">8 of 25 listings sold</p>
            </CardContent>
          </Card>

          {/* Days on Market */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <p className="text-gray-400 mb-1">Avg Days on Market</p>
              <p className="text-white text-2xl">47</p>
              <p className="text-green-500 text-sm mt-2">10% faster than market</p>
            </CardContent>
          </Card>
        </div>

        {/* Pipeline Status */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Listings Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#0f0f0f] p-4 rounded-lg border border-[#2a2a2a]">
                <p className="text-gray-400 mb-2">Pending Review</p>
                <p className="text-white text-2xl">3</p>
                <Badge className="mt-2 bg-orange-500/20 text-orange-400 border-orange-500/30">
                  Awaiting approval
                </Badge>
              </div>
              <div className="bg-[#0f0f0f] p-4 rounded-lg border border-[#2a2a2a]">
                <p className="text-gray-400 mb-2">Active</p>
                <p className="text-white text-2xl">12</p>
                <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">
                  Live on market
                </Badge>
              </div>
              <div className="bg-[#0f0f0f] p-4 rounded-lg border border-[#2a2a2a]">
                <p className="text-gray-400 mb-2">Under Contract</p>
                <p className="text-white text-2xl">2</p>
                <Badge className="mt-2 bg-blue-500/20 text-blue-400 border-blue-500/30">
                  In negotiation
                </Badge>
              </div>
              <div className="bg-[#0f0f0f] p-4 rounded-lg border border-[#2a2a2a]">
                <p className="text-gray-400 mb-2">Sold (This Month)</p>
                <p className="text-white text-2xl">4</p>
                <Badge className="mt-2 bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30">
                  Closed deals
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lead to Close Funnel - Simple */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Lead to Close Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-400">Buyer Inquiries</p>
                    <p className="text-white">45</p>
                  </div>
                  <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 pl-8">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-400">NDAs Signed</p>
                    <p className="text-white">25</p>
                  </div>
                  <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: '56%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 pl-16">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-400">Meetings Scheduled</p>
                    <p className="text-white">12</p>
                  </div>
                  <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500" style={{ width: '27%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 pl-24">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-400">Offers Received</p>
                    <p className="text-white">5</p>
                  </div>
                  <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '11%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 pl-32">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-400">Contracts Closed</p>
                    <p className="text-white">2</p>
                  </div>
                  <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div className="h-full bg-[#d4af37]" style={{ width: '4%' }}></div>
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
              <Button className="h-auto py-6 bg-[#d4af37] hover:bg-[#b8941f] text-black flex flex-col items-center gap-2">
                <Plus className="w-6 h-6" />
                Add New Listing
              </Button>
              <Button variant="outline" className="h-auto py-6 border-[#2a2a2a] hover:bg-[#2a2a2a] flex flex-col items-center gap-2">
                <Users className="w-6 h-6" />
                View Leads
              </Button>
              <Button variant="outline" className="h-auto py-6 border-[#2a2a2a] hover:bg-[#2a2a2a] flex flex-col items-center gap-2">
                <Calendar className="w-6 h-6" />
                Schedule Meeting
              </Button>
              <Button variant="outline" className="h-auto py-6 border-[#2a2a2a] hover:bg-[#2a2a2a] flex flex-col items-center gap-2">
                <BarChart3 className="w-6 h-6" />
                View Analytics
              </Button>
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
                    {activity.type === 'lead' && <Users className={`w-5 h-5 ${
                      activity.status === 'new' ? 'text-blue-500' : 'text-gray-500'
                    }`} />}
                    {activity.type === 'listing' && <Home className="w-5 h-5 text-green-500" />}
                    {activity.type === 'meeting' && <Calendar className="w-5 h-5 text-orange-500" />}
                    {activity.type === 'inquiry' && <Eye className="w-5 h-5 text-gray-500" />}
                    {activity.type === 'contract' && <FileText className="w-5 h-5 text-green-500" />}
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