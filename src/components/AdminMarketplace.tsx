import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Home, 
  UserCircle, 
  HelpCircle, 
  LogOut,
  CheckCircle,
  Users,
  FileText,
  BarChart3,
  Settings,
  FileCheck,
  Shield,
  Search,
  MapPin,
  DollarSign,
  Eye,
  Maximize,
  Building2,
  AlertTriangle,
  XCircle,
  Edit,
  Heart
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface AdminMarketplaceProps {
  onLogout: () => void;
}

export default function AdminMarketplace({ onLogout }: AdminMarketplaceProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [adminControlsOpen, setAdminControlsOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<any>(null);

  const sidebarItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'Approvals', path: '/admin/approvals', icon: <CheckCircle className="w-5 h-5" /> },
    { label: 'Listing Reviews', path: '/admin/listing-reviews', icon: <FileText className="w-5 h-5" /> },
    { label: 'Users & Assignments', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { label: 'Documents', path: '/admin/documents', icon: <FileCheck className="w-5 h-5" /> },
    { label: 'Analytics', path: '/admin/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'Reports', path: '/admin/reports', icon: <FileText className="w-5 h-5" /> },
    { label: 'Marketplace Listings', path: '/admin/marketplace', icon: <Building2 className="w-5 h-5" />, active: true },
    { label: 'Support Tickets', path: '/admin/support', icon: <HelpCircle className="w-5 h-5" /> },
    { label: 'Audit Trail', path: '/admin/audit', icon: <Shield className="w-5 h-5" /> },
    { label: 'System Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
    { label: 'My Profile', path: '/admin/profile', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Account & Billing', path: '/admin/account', icon: <DollarSign className="w-5 h-5" /> },
    { 
      label: 'Logout', 
      path: '/', 
      icon: <LogOut className="w-5 h-5" />,
    },
  ];

  const listings = [
    {
      id: 'LST-789',
      title: 'Highland Ranch Estate',
      image: 'https://images.unsplash.com/photo-1635111031688-9b13c0125d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlc3RhdGUlMjBhZXJpYWx8ZW58MXx8fHwxNzYzNjYwNzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      price: 12500000,
      priceStr: '$12.5M',
      acres: '450',
      location: 'Big Sky, Montana',
      type: 'Ranch',
      broker: 'Sarah Mitchell',
      status: 'Active',
      views: 1245,
      saves: 87,
      contacts: 23,
      daysOnMarket: 45
    },
    {
      id: 'LST-788',
      title: 'Coastal Vineyard Property',
      image: 'https://images.unsplash.com/photo-1509647924673-bbb53e22eeb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBob21lfGVufDF8fHx8MTc2MzU4NDQzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      price: 8750000,
      priceStr: '$8.75M',
      acres: '120',
      location: 'Napa Valley, California',
      type: 'Vineyard',
      broker: 'Maria Garcia',
      status: 'Active',
      views: 892,
      saves: 64,
      contacts: 18,
      daysOnMarket: 32
    },
    {
      id: 'LST-787',
      title: 'Mountain Retreat',
      image: 'https://images.unsplash.com/photo-1625562118649-acb26386cef5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByYW5jaCUyMGxhbmR8ZW58MXx8fHwxNzYzNjYwNzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      price: 6200000,
      priceStr: '$6.2M',
      acres: '280',
      location: 'Aspen, Colorado',
      type: 'Mountain',
      broker: 'John Smith',
      status: 'Active',
      views: 678,
      saves: 45,
      contacts: 12,
      daysOnMarket: 28
    },
    {
      id: 'LST-786',
      title: 'Private Island Estate',
      image: 'https://images.unsplash.com/photo-1763619814132-1fd9aaab519f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YXRlJTIwZXN0YXRlJTIwcHJvcGVydHl8ZW58MXx8fHwxNzYzNjYwNzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      price: 15000000,
      priceStr: '$15M',
      acres: '320',
      location: 'Jackson Hole, Wyoming',
      type: 'Estate',
      broker: 'Robert Lee',
      status: 'Under Contract',
      views: 1567,
      saves: 102,
      contacts: 34,
      daysOnMarket: 67
    },
    {
      id: 'LST-785',
      title: 'Lakefront Sanctuary',
      image: 'https://images.unsplash.com/photo-1762568702039-9ef749e06152?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRlcmZyb250JTIwcHJvcGVydHl8ZW58MXx8fHwxNzYzNjYwNzUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      price: 9500000,
      priceStr: '$9.5M',
      acres: '12',
      location: 'Lake Tahoe, Nevada',
      type: 'Waterfront',
      broker: 'Michael Chen',
      status: 'Active',
      views: 543,
      saves: 38,
      contacts: 9,
      daysOnMarket: 15
    },
    {
      id: 'LST-784',
      title: 'Desert Oasis Ranch',
      image: 'https://images.unsplash.com/photo-1635111031688-9b13c0125d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlc3RhdGUlMjBhZXJpYWx8ZW58MXx8fHwxNzYzNjYwNzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      price: 4950000,
      priceStr: '$4.95M',
      acres: '380',
      location: 'Scottsdale, Arizona',
      type: 'Desert',
      broker: 'Jennifer Adams',
      status: 'Active',
      views: 421,
      saves: 29,
      contacts: 7,
      daysOnMarket: 22
    }
  ];

  const handleListingClick = (listing: any) => {
    setSelectedListing(listing);
    setAdminControlsOpen(true);
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole="admin" 
      userName="Admin"
      onLogout={onLogout}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white mb-2">Marketplace Listings</h1>
            <p className="text-gray-400">Admin view with interactive map and override controls</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
              <Eye className="w-4 h-4 mr-2" />
              156 Active Listings
            </Badge>
            <Badge className="bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30 px-4 py-2">
              <DollarSign className="w-4 h-4 mr-2" />
              $842M Total Value
            </Badge>
          </div>
        </div>

        {/* Admin Warning Banner */}
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-orange-400 mb-1">Admin Override Mode Enabled</p>
              <p className="text-gray-400 text-sm">
                You have full control over all marketplace listings including visibility overrides, emergency takedowns, and direct listing edits. All actions are logged in the audit trail.
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] p-6 rounded-sm">
          <div className="grid md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search listings by ID, location, broker..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-black/50 border-[#2a2a2a] text-white placeholder:text-gray-600"
                />
              </div>
            </div>
            <Select defaultValue="all-status">
              <SelectTrigger className="bg-black/50 border-[#2a2a2a] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                <SelectItem value="all-status" className="text-white focus:bg-[#2a2a2a] focus:text-white">All Statuses</SelectItem>
                <SelectItem value="active" className="text-white focus:bg-[#2a2a2a] focus:text-white">Active</SelectItem>
                <SelectItem value="under-contract" className="text-white focus:bg-[#2a2a2a] focus:text-white">Under Contract</SelectItem>
                <SelectItem value="sold" className="text-white focus:bg-[#2a2a2a] focus:text-white">Sold/Leased</SelectItem>
              </SelectContent>
            </Select>
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

        {/* Two Column Layout: Map + Listings */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Interactive Map */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] h-[700px]">
            <CardContent className="p-0 h-full flex items-center justify-center relative">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-[#d4af37] mx-auto mb-4" />
                <p className="text-white text-xl mb-2">Interactive Map View</p>
                <p className="text-gray-400 mb-1">Mapbox integration placeholder</p>
                <p className="text-gray-600 text-sm">156 properties across 12 states</p>
              </div>
              
              {/* Admin Map Controls */}
              <div className="absolute top-4 right-4 space-y-2">
                <Button 
                  size="sm" 
                  className="bg-[#d4af37] hover:bg-[#b8941f] text-black w-full"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Admin View
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-[#2a2a2a] hover:bg-[#2a2a2a] w-full"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Show All
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Listings Grid */}
          <div className="space-y-4 h-[700px] overflow-y-auto pr-2 custom-scrollbar">
            {listings.map((listing) => (
              <Card 
                key={listing.id}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all cursor-pointer group"
                onClick={() => handleListingClick(listing)}
              >
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-3 gap-0">
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={listing.image}
                        alt={listing.type}
                        className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Admin Badge Overlay */}
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-orange-500/90 text-white border-orange-500">
                          {listing.id}
                        </Badge>
                      </div>
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
                        <div>
                          <h3 className="text-white text-xl mb-1">{listing.priceStr}</h3>
                          <p className="text-gray-500 text-sm">{listing.title}</p>
                        </div>
                        <Badge className={
                          listing.status === 'Active'
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        }>
                          {listing.status}
                        </Badge>
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
                        <div className="flex items-center gap-2 text-gray-400">
                          <Building2 className="w-4 h-4" />
                          <span>{listing.type} Property</span>
                        </div>
                      </div>
                      
                      {/* Admin Performance Metrics */}
                      <div className="flex items-center gap-4 text-sm mb-4 p-3 bg-[#0f0f0f] rounded border border-[#2a2a2a]">
                        <div>
                          <p className="text-gray-500 text-xs">Views</p>
                          <p className="text-white">{listing.views}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Saves</p>
                          <p className="text-white">{listing.saves}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Contacts</p>
                          <p className="text-white">{listing.contacts}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Days</p>
                          <p className="text-white">{listing.daysOnMarket}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button 
                          className="flex-1 bg-[#d4af37] hover:bg-[#c19b2b] text-black"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleListingClick(listing);
                          }}
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Admin Controls
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Admin Controls Dialog */}
        <Dialog open={adminControlsOpen} onOpenChange={setAdminControlsOpen}>
          <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <Shield className="w-6 h-6 text-[#d4af37]" />
                Admin Override Controls
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                {selectedListing?.id} - {selectedListing?.title}
              </DialogDescription>
            </DialogHeader>
            
            {selectedListing && (
              <div className="space-y-6 py-4">
                {/* Listing Info */}
                <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Broker</p>
                      <p className="text-white">{selectedListing.broker}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Status</p>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {selectedListing.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Price</p>
                      <p className="text-[#d4af37] text-lg">{selectedListing.priceStr}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Location</p>
                      <p className="text-white">{selectedListing.location}</p>
                    </div>
                  </div>
                </div>

                {/* Admin Actions */}
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full border-[#2a2a2a] hover:bg-[#2a2a2a] justify-start h-auto py-4"
                  >
                    <Eye className="w-5 h-5 mr-3 text-blue-500" />
                    <div className="text-left">
                      <p className="text-white mb-1">Force Visibility Override</p>
                      <p className="text-gray-500 text-sm">Show this listing to specific users regardless of budget</p>
                    </div>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full border-[#2a2a2a] hover:bg-[#2a2a2a] justify-start h-auto py-4"
                  >
                    <Edit className="w-5 h-5 mr-3 text-purple-500" />
                    <div className="text-left">
                      <p className="text-white mb-1">Direct Listing Edit</p>
                      <p className="text-gray-500 text-sm">Modify listing details without broker approval</p>
                    </div>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full border-[#2a2a2a] hover:bg-[#2a2a2a] justify-start h-auto py-4"
                  >
                    <Users className="w-5 h-5 mr-3 text-green-500" />
                    <div className="text-left">
                      <p className="text-white mb-1">View Engagement Analytics</p>
                      <p className="text-gray-500 text-sm">{selectedListing.views} views, {selectedListing.contacts} contacts, {selectedListing.saves} saves</p>
                    </div>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full border-red-500/30 hover:bg-red-500/10 text-red-400 justify-start h-auto py-4"
                  >
                    <XCircle className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <p className="text-red-400 mb-1">Emergency Takedown</p>
                      <p className="text-gray-500 text-sm">Immediately remove listing from marketplace (logged in audit)</p>
                    </div>
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0f0f0f;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2a2a2a;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3a3a3a;
        }
      `}</style>
    </DashboardLayout>
  );
}
