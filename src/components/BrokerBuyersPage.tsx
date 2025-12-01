import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Home, Users, FileText, UserCircle, HelpCircle, LogOut, Mail, Phone, DollarSign, CheckCircle, Clock, MapPin, Eye, MessageCircle } from 'lucide-react';
import { Badge } from './ui/badge';

interface BrokerBuyersPageProps {
  onLogout: () => void;
}

export default function BrokerBuyersPage({ onLogout }: BrokerBuyersPageProps) {
  const navigate = useNavigate();

  const sidebarItems = [
    { label: 'Dashboard', path: '/broker/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'My Listings', path: '/broker/listings', icon: <Home className="w-5 h-5" /> },
    { label: 'Add Listing', path: '/broker/add-listing', icon: <Home className="w-5 h-5" /> },
    { label: 'Leads', path: '/broker/leads', icon: <Users className="w-5 h-5" /> },
    { label: "My Buyer's List", path: '/broker/buyers', icon: <Users className="w-5 h-5" />, active: true },
    { label: 'My Contracts', path: '/broker/contracts', icon: <FileText className="w-5 h-5" /> },
    { label: 'My NDAs', path: '/broker/ndas', icon: <FileText className="w-5 h-5" /> },
    { label: 'Invitations', path: '/broker/invitations', icon: <FileText className="w-5 h-5" /> },
    { label: 'Marketplace', path: '/broker/marketplace', icon: <Home className="w-5 h-5" /> },
    { label: 'My Profile', path: '/broker/profile', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Account', path: '/broker/account', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Settings', path: '/broker/settings', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Request Help', path: '/broker/help', icon: <HelpCircle className="w-5 h-5" /> },
    { label: 'Logout', path: '/', icon: <LogOut className="w-5 h-5" /> },
  ];

  const buyers = [
    {
      id: 1,
      name: 'James Anderson',
      email: 'james.anderson@email.com',
      phone: '+1 (555) 123-4567',
      budgetCap: 5000000,
      status: 'Active',
      verificationStatus: 'Verified',
      preferences: ['Ranch', 'Estate'],
      location: ['Montana', 'Wyoming', 'Colorado'],
      propertiesViewed: 12,
      savedProperties: 5,
      joinedDate: 'Jan 15, 2024',
      lastActivity: '2 hours ago',
      activeLeads: 2
    },
    {
      id: 2,
      name: 'Emily Chen',
      email: 'emily.chen@email.com',
      phone: '+1 (555) 234-5678',
      budgetCap: 8000000,
      status: 'Active',
      verificationStatus: 'Verified',
      preferences: ['Waterfront', 'Modern'],
      location: ['California', 'Washington'],
      propertiesViewed: 8,
      savedProperties: 3,
      joinedDate: 'Feb 20, 2024',
      lastActivity: '1 day ago',
      activeLeads: 1
    },
    {
      id: 3,
      name: 'Robert Thompson',
      email: 'robert.t@email.com',
      phone: '+1 (555) 345-6789',
      budgetCap: 15000000,
      status: 'Active',
      verificationStatus: 'Verified',
      preferences: ['Vineyard', 'Farm'],
      location: ['Napa Valley', 'Sonoma'],
      propertiesViewed: 25,
      savedProperties: 8,
      joinedDate: 'Dec 5, 2023',
      lastActivity: '3 hours ago',
      activeLeads: 3
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah.w@email.com',
      phone: '+1 (555) 456-7890',
      budgetCap: 6500000,
      status: 'Under Contract',
      verificationStatus: 'Verified',
      preferences: ['Mountain', 'Ski-in/Ski-out'],
      location: ['Aspen', 'Vail'],
      propertiesViewed: 18,
      savedProperties: 6,
      joinedDate: 'Mar 10, 2024',
      lastActivity: '5 hours ago',
      activeLeads: 1
    },
    {
      id: 5,
      name: 'Michael Davis',
      email: 'michael.d@email.com',
      phone: '+1 (555) 567-8901',
      budgetCap: 10000000,
      status: 'Active',
      verificationStatus: 'Pending',
      preferences: ['Estate', 'Golf Course'],
      location: ['Arizona', 'Nevada'],
      propertiesViewed: 4,
      savedProperties: 2,
      joinedDate: 'Nov 1, 2024',
      lastActivity: '2 days ago',
      activeLeads: 0
    },
    {
      id: 6,
      name: 'Jennifer Martinez',
      email: 'jennifer.m@email.com',
      phone: '+1 (555) 678-9012',
      budgetCap: 7200000,
      status: 'Active',
      verificationStatus: 'Verified',
      preferences: ['Waterfront', 'Private Island'],
      location: ['Florida', 'South Carolina'],
      propertiesViewed: 15,
      savedProperties: 7,
      joinedDate: 'Apr 22, 2024',
      lastActivity: '1 hour ago',
      activeLeads: 2
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Active': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Under Contract': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Inactive': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    };
    return colors[status] || colors['Active'];
  };

  const getVerificationColor = (status: string) => {
    const colors: Record<string, string> = {
      'Verified': 'bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30',
      'Pending': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Expired': 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return colors[status] || colors['Pending'];
  };

  const stats = {
    total: buyers.length,
    verified: buyers.filter(b => b.verificationStatus === 'Verified').length,
    active: buyers.filter(b => b.status === 'Active').length,
    underContract: buyers.filter(b => b.status === 'Under Contract').length,
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole="broker" 
      userName="Michael Rivers"
      onLogout={onLogout}
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-white mb-2">My Buyer's List</h1>
          <p className="text-gray-400">Buyers and investors you represent</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Total Buyers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-3xl">{stats.total}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Verified</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-3xl">{stats.verified}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-3xl">{stats.active}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Under Contract</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-3xl">{stats.underContract}</p>
            </CardContent>
          </Card>
        </div>

        {/* Buyers List */}
        <div className="space-y-6">
          {buyers.map((buyer) => (
            <Card key={buyer.id} className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-[#d4af37]/50 transition-colors">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[#2a2a2a]">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center">
                          <span className="text-[#d4af37] text-lg">{buyer.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="text-white text-xl mb-1">{buyer.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(buyer.status)}>
                              {buyer.status}
                            </Badge>
                            <Badge className={getVerificationColor(buyer.verificationStatus)}>
                              {buyer.verificationStatus === 'Verified' && <CheckCircle className="w-3 h-3 mr-1" />}
                              {buyer.verificationStatus === 'Pending' && <Clock className="w-3 h-3 mr-1" />}
                              {buyer.verificationStatus}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm">Member since: {buyer.joinedDate} • Last active: {buyer.lastActivity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm mb-1">Budget Cap</p>
                      <p className="text-[#d4af37] text-2xl">{formatPrice(buyer.budgetCap)}</p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid md:grid-cols-2 gap-4 pb-4 border-b border-[#2a2a2a]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-[#d4af37]" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Email</p>
                        <p className="text-white text-sm">{buyer.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-[#d4af37]" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Phone</p>
                        <p className="text-white text-sm">{buyer.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="space-y-3 pb-4 border-b border-[#2a2a2a]">
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Property Preferences</p>
                      <div className="flex flex-wrap gap-2">
                        {buyer.preferences.map((pref, idx) => (
                          <Badge key={idx} variant="outline" className="border-[#d4af37] text-[#d4af37]">
                            {pref}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Target Locations</p>
                      <div className="flex flex-wrap gap-2">
                        {buyer.location.map((loc, idx) => (
                          <Badge key={idx} variant="outline" className="border-gray-500 text-gray-400">
                            <MapPin className="w-3 h-3 mr-1" />
                            {loc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Activity Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4 border-b border-[#2a2a2a]">
                    <div>
                      <p className="text-gray-500 text-sm">Properties Viewed</p>
                      <p className="text-white text-xl">{buyer.propertiesViewed}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Saved Properties</p>
                      <p className="text-white text-xl">{buyer.savedProperties}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Active Leads</p>
                      <p className="text-white text-xl">{buyer.activeLeads}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Status</p>
                      <p className="text-green-400 text-xl">{buyer.status}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      className="bg-[#d4af37] hover:bg-[#c19b2b] text-black"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                      onClick={() => navigate(`/broker/buyer/${buyer.id}`)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Full Profile
                    </Button>
                    {buyer.activeLeads > 0 && (
                      <Button
                        variant="outline"
                        className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                        onClick={() => navigate('/broker/leads')}
                      >
                        View {buyer.activeLeads} Lead{buyer.activeLeads !== 1 ? 's' : ''}
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      Send Invitation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
