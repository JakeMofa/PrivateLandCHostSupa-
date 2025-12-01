import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Home, Heart, MessageCircle, Search, MapPin, Maximize } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MarketplacePageProps {
  userRole: string;
  onLogout: () => void;
}

export default function MarketplacePage({ userRole, onLogout }: MarketplacePageProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const sidebarItems = [
    { label: 'Dashboard', path: `/${userRole}/dashboard`, icon: <Home className="w-5 h-5" /> },
    { label: 'Marketplace', path: `/${userRole}/marketplace`, icon: <Home className="w-5 h-5" />, active: true },
    { label: 'Saved Properties', path: `/${userRole}/saved`, icon: <Heart className="w-5 h-5" /> },
    { label: 'My Agent', path: `/${userRole}/agent`, icon: <MessageCircle className="w-5 h-5" /> },
    { label: 'My Documents', path: `/${userRole}/documents`, icon: <MessageCircle className="w-5 h-5" /> },
    { label: 'Request Help', path: `/${userRole}/help`, icon: <MessageCircle className="w-5 h-5" /> },
  ];

  const listings = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1635111031688-9b13c0125d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlc3RhdGUlMjBhZXJpYWx8ZW58MXx8fHwxNzYzNjYwNzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: '$12,500,000',
      acres: '250',
      location: 'Big Sky, Montana',
      type: 'Ranch'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1509647924673-bbb53e22eeb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBob21lfGVufDF8fHx8MTc2MzU4NDQzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: '$8,750,000',
      acres: '5',
      location: 'Malibu, California',
      type: 'Estate'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1625562118649-acb26386cef5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByYW5jaCUyMGxhbmR8ZW58MXx8fHwxNzYzNjYwNzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: '$6,200,000',
      acres: '180',
      location: 'Aspen, Colorado',
      type: 'Mountain'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1763619814132-1fd9aaab519f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YXRlJTIwZXN0YXRlJTIwcHJvcGVydHl8ZW58MXx8fHwxNzYzNjYwNzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: '$15,000,000',
      acres: '320',
      location: 'Jackson Hole, Wyoming',
      type: 'Ranch'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1762568702039-9ef749e06152?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRlcmZyb250JTIwcHJvcGVydHl8ZW58MXx8fHwxNzYzNjYwNzUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: '$9,500,000',
      acres: '12',
      location: 'Lake Tahoe, Nevada',
      type: 'Waterfront'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1635111031688-9b13c0125d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlc3RhdGUlMjBhZXJpYWx8ZW58MXx8fHwxNzYzNjYwNzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: '$4,950,000',
      acres: '95',
      location: 'Scottsdale, Arizona',
      type: 'Desert'
    }
  ];

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole={userRole}
      userName="James Anderson"
      onLogout={onLogout}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-white mb-2">Private Marketplace</h1>
          <p className="text-gray-400">Exclusive off-market listings for verified clients</p>
        </div>

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
                <p className="text-gray-400">Interactive Map</p>
                <p className="text-gray-600">Mapbox integration placeholder</p>
              </div>
            </CardContent>
          </Card>

          {/* Listings Grid */}
          <div className="space-y-4 h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {listings.map((listing) => (
              <Card 
                key={listing.id}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all cursor-pointer group"
                onClick={() => navigate(`/${userRole}/listing/${listing.id}`)}
              >
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-3 gap-0">
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={listing.image}
                        alt={listing.type}
                        className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-3 right-3 bg-black/50 hover:bg-[#d4af37] hover:text-black text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="md:col-span-2 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-white">{listing.price}</h3>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Maximize className="w-4 h-4" />
                          <span>{listing.acres} acres</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span>{listing.location}</span>
                        </div>
                        <p className="text-gray-500">{listing.type} Property</p>
                      </div>
                      <Button 
                        className="w-full bg-[#d4af37] hover:bg-[#c19b2b] text-black"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Contact My Agent
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
