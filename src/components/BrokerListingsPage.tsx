import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Home, Users, FileText, UserCircle, HelpCircle, LogOut, Edit, Eye, Trash2, Plus, MapPin, Bed, Bath, Maximize } from 'lucide-react';
import { Badge } from './ui/badge';

interface BrokerListingsPageProps {
  onLogout: () => void;
}

export default function BrokerListingsPage({ onLogout }: BrokerListingsPageProps) {
  const navigate = useNavigate();

  const sidebarItems = [
    { label: 'Dashboard', path: '/broker/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'My Listings', path: '/broker/listings', icon: <Home className="w-5 h-5" />, active: true },
    { label: 'Add Listing', path: '/broker/add-listing', icon: <Home className="w-5 h-5" /> },
    { label: 'Leads', path: '/broker/leads', icon: <Users className="w-5 h-5" /> },
    { label: "My Buyer's List", path: '/broker/buyers', icon: <Users className="w-5 h-5" /> },
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

  const listings = [
    {
      id: 1,
      title: 'Highland Ranch Estate',
      location: 'Montana',
      price: 12500000,
      acres: 850,
      bedrooms: 7,
      bathrooms: 9,
      type: 'Ranch',
      status: 'Approved',
      statusColor: 'green',
      visibility: 'Approved Buyers',
      leads: 5,
      views: 47
    },
    {
      id: 2,
      title: 'Coastal Villa',
      location: 'California',
      price: 8750000,
      acres: 5,
      bedrooms: 6,
      bathrooms: 7,
      type: 'Waterfront',
      status: 'Pending Review',
      statusColor: 'orange',
      visibility: 'Pending',
      leads: 0,
      views: 0
    },
    {
      id: 3,
      title: 'Mountain Retreat',
      location: 'Colorado',
      price: 6200000,
      acres: 45,
      bedrooms: 5,
      bathrooms: 6,
      type: 'Estate',
      status: 'Approved',
      statusColor: 'green',
      visibility: 'Approved Buyers',
      leads: 12,
      views: 89
    },
    {
      id: 4,
      title: 'Desert Oasis',
      location: 'Arizona',
      price: 4950000,
      acres: 25,
      bedrooms: 4,
      bathrooms: 5,
      type: 'Estate',
      status: 'Sold',
      statusColor: 'gray',
      visibility: 'Archived',
      leads: 8,
      views: 56
    },
    {
      id: 5,
      title: 'Lakefront Paradise',
      location: 'Texas',
      price: 7800000,
      acres: 120,
      bedrooms: 6,
      bathrooms: 7,
      type: 'Waterfront',
      status: 'Draft',
      statusColor: 'blue',
      visibility: 'Draft',
      leads: 0,
      views: 0
    },
    {
      id: 6,
      title: 'Wine Country Estate',
      location: 'Napa Valley, CA',
      price: 15200000,
      acres: 200,
      bedrooms: 8,
      bathrooms: 10,
      type: 'Vineyard',
      status: 'Processing',
      statusColor: 'purple',
      visibility: 'Invite-Only',
      leads: 3,
      views: 15
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (color: string) => {
    const colors: Record<string, string> = {
      green: 'bg-green-500/20 text-green-400 border-green-500/30',
      orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      gray: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    };
    return colors[color] || colors.gray;
  };

  const stats = {
    total: listings.length,
    approved: listings.filter(l => l.status === 'Approved').length,
    pending: listings.filter(l => l.status === 'Pending Review').length,
    sold: listings.filter(l => l.status === 'Sold').length,
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole="broker" 
      userName="Michael Rivers"
      onLogout={onLogout}
    >
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white mb-2">My Listings</h1>
            <p className="text-gray-400">Manage your property listings</p>
          </div>
          <Button 
            className="bg-[#d4af37] hover:bg-[#c19b2b] text-black"
            onClick={() => navigate('/broker/add-listing')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Listing
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Total Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-3xl">{stats.total}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-3xl">{stats.approved}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-3xl">{stats.pending}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Sold</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-3xl">{stats.sold}</p>
            </CardContent>
          </Card>
        </div>

        {/* Listings Grid */}
        <div className="space-y-6">
          {listings.map((listing) => (
            <Card key={listing.id} className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-[#d4af37]/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Property Image Placeholder */}
                  <div className="w-full lg:w-64 h-48 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Home className="w-16 h-16 text-gray-600" />
                  </div>

                  {/* Property Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-white text-xl">{listing.title}</h3>
                          <Badge className={getStatusColor(listing.statusColor)}>
                            {listing.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{listing.location}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <Badge variant="outline" className="border-[#d4af37] text-[#d4af37]">
                            {listing.type}
                          </Badge>
                          <Badge variant="outline" className="border-gray-500 text-gray-400">
                            {listing.visibility}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[#d4af37] text-2xl mb-1">{formatPrice(listing.price)}</p>
                        <p className="text-gray-400 text-sm">{listing.acres} acres</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-gray-400 text-sm pb-4 border-b border-[#2a2a2a]">
                      <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        <span>{listing.bedrooms} beds</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        <span>{listing.bathrooms} baths</span>
                      </div>
                      <span>•</span>
                      <span>{listing.views} views</span>
                      <span>•</span>
                      <span className="text-[#d4af37]">{listing.leads} leads</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                        onClick={() => navigate(`/broker/listing/${listing.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      {listing.status !== 'Sold' && (
                        <Button
                          variant="outline"
                          className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                          onClick={() => navigate(`/broker/edit-listing/${listing.id}`)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      )}
                      {listing.status === 'Draft' && (
                        <Button
                          className="bg-[#d4af37] hover:bg-[#c19b2b] text-black"
                        >
                          Submit for Review
                        </Button>
                      )}
                      {listing.leads > 0 && (
                        <Button
                          className="bg-green-500 hover:bg-green-600 text-white"
                          onClick={() => navigate('/broker/leads')}
                        >
                          View {listing.leads} Lead{listing.leads !== 1 ? 's' : ''}
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
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
