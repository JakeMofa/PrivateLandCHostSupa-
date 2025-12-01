import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Home, Heart, UserCircle, FileText, HelpCircle, LogOut, Mail, MapPin, Bed, Bath, Maximize, Eye, Trash2, TrendingDown } from 'lucide-react';
import { Badge } from './ui/badge';
import { useState } from 'react';

interface SavedPropertiesPageProps {
  onLogout: () => void;
}

export default function SavedPropertiesPage({ onLogout }: SavedPropertiesPageProps) {
  const navigate = useNavigate();
  const [savedProperties, setSavedProperties] = useState([
    {
      id: 1,
      title: 'Sunset Ridge Estate',
      location: 'Aspen, Colorado',
      price: 4500000,
      originalPrice: 4800000,
      acres: 45,
      bedrooms: 6,
      bathrooms: 8,
      type: 'Estate',
      status: 'Active',
      savedDate: 'Nov 15, 2024',
      priceDropped: true,
      image: 'estate'
    },
    {
      id: 2,
      title: 'Mountain View Ranch',
      location: 'Jackson Hole, Wyoming',
      price: 3200000,
      acres: 120,
      bedrooms: 4,
      bathrooms: 5,
      type: 'Ranch',
      status: 'Active',
      savedDate: 'Nov 10, 2024',
      priceDropped: false,
      image: 'ranch'
    },
    {
      id: 3,
      title: 'Coastal Paradise',
      location: 'Malibu, California',
      price: 8500000,
      acres: 3,
      bedrooms: 5,
      bathrooms: 6,
      type: 'Waterfront',
      status: 'Active',
      savedDate: 'Nov 8, 2024',
      priceDropped: false,
      image: 'coastal'
    },
    {
      id: 4,
      title: 'Desert Oasis',
      location: 'Scottsdale, Arizona',
      price: 2800000,
      originalPrice: 3100000,
      acres: 25,
      bedrooms: 5,
      bathrooms: 6,
      type: 'Estate',
      status: 'Active',
      savedDate: 'Nov 5, 2024',
      priceDropped: true,
      image: 'desert'
    },
    {
      id: 5,
      title: 'Lakeside Retreat',
      location: 'Lake Tahoe, Nevada',
      price: 4200000,
      acres: 15,
      bedrooms: 4,
      bathrooms: 5,
      type: 'Waterfront',
      status: 'Active',
      savedDate: 'Nov 1, 2024',
      priceDropped: false,
      image: 'lake'
    },
  ]);

  const sidebarItems = [
    { label: 'Dashboard', path: '/client/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'My Profile', path: '/client/profile', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Marketplace', path: '/client/marketplace', icon: <Home className="w-5 h-5" /> },
    { label: 'Saved Properties', path: '/client/saved', icon: <Heart className="w-5 h-5" />, active: true },
    { label: 'My Agent', path: '/client/agent', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Invitations', path: '/client/invitations', icon: <Mail className="w-5 h-5" /> },
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

  const handleRemoveProperty = (id: number) => {
    setSavedProperties(savedProperties.filter(prop => prop.id !== id));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const priceDroppedCount = savedProperties.filter(p => p.priceDropped).length;

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole="client" 
      userName="James Anderson"
      onLogout={onLogout}
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-white mb-2">Saved Properties</h1>
          <p className="text-gray-400">Properties you've saved for later review</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Total Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[#d4af37]" />
                </div>
                <p className="text-white text-3xl">{savedProperties.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Price Drops</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-white text-3xl">{priceDroppedCount}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-2xl">
                {formatPrice(savedProperties.reduce((sum, prop) => sum + prop.price, 0))}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Price Drop Alert Banner */}
        {priceDroppedCount > 0 && (
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/30">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-white mb-2">Price Drop Alert!</h3>
                  <p className="text-gray-300">
                    {priceDroppedCount} of your saved {priceDroppedCount === 1 ? 'property has' : 'properties have'} reduced prices. Now might be a great time to take action!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Saved Properties Grid */}
        {savedProperties.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {savedProperties.map((property) => (
              <Card 
                key={property.id} 
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-[#d4af37]/50 transition-colors overflow-hidden group"
              >
                <div className="relative">
                  {/* Property Image Placeholder */}
                  <div className="h-64 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center">
                    <Home className="w-20 h-20 text-gray-600" />
                  </div>
                  
                  {/* Badges Overlay */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-[#d4af37] text-black">
                      {property.type}
                    </Badge>
                    {property.priceDropped && (
                      <Badge className="bg-green-500 text-white">
                        Price Drop
                      </Badge>
                    )}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveProperty(property.id)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-red-500 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Heart className="w-5 h-5 text-white fill-white" />
                  </button>
                </div>

                <CardContent className="pt-6 space-y-4">
                  <div>
                    <h3 className="text-white text-xl mb-2">{property.title}</h3>
                    <div className="flex items-center gap-2 text-gray-400 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{property.location}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[#d4af37] text-2xl">{formatPrice(property.price)}</p>
                      {property.priceDropped && property.originalPrice && (
                        <p className="text-gray-500 line-through text-lg">
                          {formatPrice(property.originalPrice)}
                        </p>
                      )}
                    </div>
                    {property.priceDropped && property.originalPrice && (
                      <p className="text-green-500 text-sm mt-1">
                        Reduced by {formatPrice(property.originalPrice - property.price)}
                      </p>
                    )}
                  </div>

                  {/* Property Details */}
                  <div className="flex items-center gap-4 text-gray-400 text-sm pb-4 border-b border-[#2a2a2a]">
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize className="w-4 h-4" />
                      <span>{property.acres} acres</span>
                    </div>
                  </div>

                  {/* Saved Date */}
                  <p className="text-gray-500 text-sm">Saved on {property.savedDate}</p>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      className="flex-1 bg-[#d4af37] hover:bg-[#c19b2b] text-black"
                      onClick={() => navigate(`/client/listing/${property.id}`)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      onClick={() => handleRemoveProperty(property.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="py-16 text-center">
              <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-white text-xl mb-2">No Saved Properties</h3>
              <p className="text-gray-400 mb-6">
                Start exploring the marketplace and save properties you're interested in.
              </p>
              <Button
                className="bg-[#d4af37] hover:bg-[#c19b2b] text-black"
                onClick={() => navigate('/client/marketplace')}
              >
                Browse Marketplace
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
