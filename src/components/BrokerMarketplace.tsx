import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Home, Users, FileText, UserCircle, HelpCircle, LogOut, MapPin, Bed, Bath, Maximize, Eye, Info, Search } from 'lucide-react';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BrokerMarketplaceProps {
  onLogout: () => void;
}

export default function BrokerMarketplace({ onLogout }: BrokerMarketplaceProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const sidebarItems = [
    { label: 'Dashboard', path: '/broker/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'My Listings', path: '/broker/listings', icon: <Home className="w-5 h-5" /> },
    { label: 'Add Listing', path: '/broker/add-listing', icon: <Home className="w-5 h-5" /> },
    { label: 'Leads', path: '/broker/leads', icon: <Users className="w-5 h-5" /> },
    { label: "My Buyer's List", path: '/broker/buyers', icon: <Users className="w-5 h-5" /> },
    { label: 'My Contracts', path: '/broker/contracts', icon: <FileText className="w-5 h-5" /> },
    { label: 'My NDAs', path: '/broker/ndas', icon: <FileText className="w-5 h-5" /> },
    { label: 'Invitations', path: '/broker/invitations', icon: <FileText className="w-5 h-5" /> },
    { label: 'Marketplace', path: '/broker/marketplace', icon: <Home className="w-5 h-5" />, active: true },
    { label: 'My Documents', path: '/broker/documents', icon: <FileText className="w-5 h-5" /> },
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
      location: 'Big Sky, Montana',
      price: 12500000,
      acres: 850,
      bedrooms: 7,
      bathrooms: 9,
      type: 'Ranch',
      broker: 'Sarah Mitchell',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1635111031688-9b13c0125d12?w=800&h=600&fit=crop'
    },
    {
      id: 2,
      title: 'Coastal Villa',
      location: 'Malibu, California',
      price: 8750000,
      acres: 5,
      bedrooms: 6,
      bathrooms: 7,
      type: 'Waterfront',
      broker: 'David Chen',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1509647924673-bbb53e22eeb8?w=800&h=600&fit=crop'
    },
    {
      id: 3,
      title: 'Mountain Retreat',
      location: 'Aspen, Colorado',
      price: 6200000,
      acres: 45,
      bedrooms: 5,
      bathrooms: 6,
      type: 'Estate',
      broker: 'Emily Johnson',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1625562118649-acb26386cef5?w=800&h=600&fit=crop'
    },
    {
      id: 4,
      title: 'Wine Country Estate',
      location: 'Napa Valley, CA',
      price: 15200000,
      acres: 200,
      bedrooms: 8,
      bathrooms: 10,
      type: 'Vineyard',
      broker: 'Robert Anderson',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1763619814132-1fd9aaab519f?w=800&h=600&fit=crop'
    },
    {
      id: 5,
      title: 'Lakefront Paradise',
      location: 'Lake Tahoe, Nevada',
      price: 7800000,
      acres: 120,
      bedrooms: 6,
      bathrooms: 7,
      type: 'Waterfront',
      broker: 'Jennifer Martinez',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1762568702039-9ef749e06152?w=800&h=600&fit=crop'
    },
    {
      id: 6,
      title: 'Desert Sanctuary',
      location: 'Scottsdale, Arizona',
      price: 9500000,
      acres: 300,
      bedrooms: 7,
      bathrooms: 8,
      type: 'Estate',
      broker: 'Michael Thompson',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1635111031688-9b13c0125d12?w=800&h=600&fit=crop'
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole="broker" 
      userName="Michael Rivers"
      onLogout={onLogout}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-white mb-2">Private Marketplace</h1>
          <p className="text-gray-400">Browse all approved listings for market comparison (Read-only)</p>
        </div>

        {/* Info Banner */}
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/30">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-blue-400 mb-1">Read-Only Access</p>
                <p className="text-gray-300 text-sm">
                  You're viewing the marketplace for market comparison purposes. You cannot edit other brokers' listings. 
                  To manage your own listings, visit <button onClick={() => navigate('/broker/listings')} className="text-[#d4af37] underline">My Listings</button>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] p-6 rounded-sm">
          <div className="grid md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search locations, property types..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-black/50 border-[#2a2a2a] text-white placeholder:text-gray-600"
                />
              </div>
            </div>
            <Select defaultValue="all-price">
              <SelectTrigger className="bg-black/50 border-[#2a2a2a] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                <SelectItem value="all-price" className="text-white focus:bg-[#2a2a2a] focus:text-white">All Prices</SelectItem>
                <SelectItem value="under-5m" className="text-white focus:bg-[#2a2a2a] focus:text-white">Under $5M</SelectItem>
                <SelectItem value="5m-10m" className="text-white focus:bg-[#2a2a2a] focus:text-white">$5M - $10M</SelectItem>
                <SelectItem value="over-10m" className="text-white focus:bg-[#2a2a2a] focus:text-white">Over $10M</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-acres">
              <SelectTrigger className="bg-black/50 border-[#2a2a2a] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                <SelectItem value="all-acres" className="text-white focus:bg-[#2a2a2a] focus:text-white">All Acres</SelectItem>
                <SelectItem value="under-50" className="text-white focus:bg-[#2a2a2a] focus:text-white">Under 50</SelectItem>
                <SelectItem value="50-200" className="text-white focus:bg-[#2a2a2a] focus:text-white">50 - 200</SelectItem>
                <SelectItem value="over-200" className="text-white focus:bg-[#2a2a2a] focus:text-white">Over 200</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-type">
              <SelectTrigger className="bg-black/50 border-[#2a2a2a] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                <SelectItem value="all-type" className="text-white focus:bg-[#2a2a2a] focus:text-white">All Types</SelectItem>
                <SelectItem value="ranch" className="text-white focus:bg-[#2a2a2a] focus:text-white">Ranch</SelectItem>
                <SelectItem value="estate" className="text-white focus:bg-[#2a2a2a] focus:text-white">Estate</SelectItem>
                <SelectItem value="waterfront" className="text-white focus:bg-[#2a2a2a] focus:text-white">Waterfront</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Map Placeholder */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] h-[600px]">
            <CardContent className="p-0 h-full flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-[#d4af37] mx-auto mb-4" />
                <h3 className="text-white text-xl mb-2">Interactive Map</h3>
                <p className="text-gray-400 text-sm">Explore properties by location</p>
                <div className="mt-6 text-gray-500 text-xs">
                  <p>Map integration coming soon</p>
                  <p className="mt-1">Powered by Mapbox</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Listings Grid */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {listings.map((listing) => (
              <Card key={listing.id} className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-[#d4af37]/50 transition-all cursor-pointer group">
                <CardContent className="p-0">
                  <div className="flex gap-4 p-4">
                    {/* Image */}
                    <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden rounded">
                      <ImageWithFallback
                        src={listing.image}
                        alt={listing.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="outline" className="bg-black/50 backdrop-blur-sm border-[#d4af37] text-[#d4af37] text-xs">
                          {listing.type}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white text-lg mb-1 group-hover:text-[#d4af37] transition-colors truncate">{listing.title}</h3>
                      <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="text-sm truncate">{listing.location}</span>
                      </div>
                      <p className="text-[#d4af37] text-xl mb-3">{formatPrice(listing.price)}</p>

                      {/* Property Details */}
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Bed className="w-4 h-4" />
                          <span>{listing.bedrooms}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="w-4 h-4" />
                          <span>{listing.bathrooms}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Maximize className="w-4 h-4" />
                          <span>{listing.acres} acres</span>
                        </div>
                      </div>

                      {/* Broker Info */}
                      <div className="text-xs text-gray-500 mb-2">
                        Listed by {listing.broker}
                      </div>

                      {/* Action */}
                      <Button
                        size="sm"
                        className="w-full border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                        variant="outline"
                        onClick={() => navigate(`/broker/listing-view/${listing.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
