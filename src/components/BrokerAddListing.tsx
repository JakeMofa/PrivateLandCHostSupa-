import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Home, Users, FileText, UserCircle, HelpCircle, LogOut, Upload, MapPin, DollarSign, Maximize, Tag, Image, FileCheck, Save, Send } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useState } from 'react';

interface BrokerAddListingProps {
  onLogout: () => void;
}

export default function BrokerAddListing({ onLogout }: BrokerAddListingProps) {
  const navigate = useNavigate();
  const [listingStatus, setListingStatus] = useState('draft');

  const sidebarItems = [
    { label: 'Dashboard', path: '/broker/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'My Listings', path: '/broker/listings', icon: <Home className="w-5 h-5" /> },
    { label: 'Add Listing', path: '/broker/add-listing', icon: <Home className="w-5 h-5" />, active: true },
    { label: 'Leads', path: '/broker/leads', icon: <Users className="w-5 h-5" /> },
    { label: "My Buyer's List", path: '/broker/buyers', icon: <Users className="w-5 h-5" /> },
    { label: 'My Contracts', path: '/broker/contracts', icon: <FileText className="w-5 h-5" /> },
    { label: 'My NDAs', path: '/broker/ndas', icon: <FileText className="w-5 h-5" /> },
    { label: 'Invitations', path: '/broker/invitations', icon: <FileText className="w-5 h-5" /> },
    { label: 'Marketplace', path: '/broker/marketplace', icon: <Home className="w-5 h-5" /> },
    { label: 'My Documents', path: '/broker/documents', icon: <FileText className="w-5 h-5" /> },
    { label: 'My Profile', path: '/broker/profile', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Account', path: '/broker/account', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Settings', path: '/broker/settings', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Request Help', path: '/broker/help', icon: <HelpCircle className="w-5 h-5" /> },
    { label: 'Logout', path: '/', icon: <LogOut className="w-5 h-5" /> },
  ];

  const handleSaveDraft = () => {
    alert('Listing saved as draft');
    navigate('/broker/listings');
  };

  const handleSubmitForReview = () => {
    alert('Listing submitted for admin review');
    navigate('/broker/listings');
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
          <h1 className="text-white mb-2">Add New Listing</h1>
          <p className="text-gray-400">Create a new property listing for the marketplace</p>
        </div>

        {/* Basic Information */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Tag className="w-6 h-6 text-[#d4af37]" />
              <CardTitle className="text-white">Basic Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-gray-400 text-sm">Property Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Highland Ranch Estate"
                className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-gray-400 text-sm">Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide a detailed description of the property..."
                className="mt-2 min-h-[150px] bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="property-type" className="text-gray-400 text-sm">Property Type *</Label>
                <Select>
                  <SelectTrigger id="property-type" className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    <SelectItem value="ranch">Ranch</SelectItem>
                    <SelectItem value="estate">Estate</SelectItem>
                    <SelectItem value="waterfront">Waterfront</SelectItem>
                    <SelectItem value="vineyard">Vineyard</SelectItem>
                    <SelectItem value="farm">Farm</SelectItem>
                    <SelectItem value="mountain">Mountain</SelectItem>
                    <SelectItem value="island">Private Island</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="price" className="text-gray-400 text-sm">Price (USD) *</Label>
                <div className="relative mt-2">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="price"
                    type="number"
                    placeholder="5000000"
                    className="pl-9 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Details */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-[#d4af37]" />
              <CardTitle className="text-white">Location Details</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="state" className="text-gray-400 text-sm">State *</Label>
                <Select>
                  <SelectTrigger id="state" className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    <SelectItem value="ca">California</SelectItem>
                    <SelectItem value="tx">Texas</SelectItem>
                    <SelectItem value="mt">Montana</SelectItem>
                    <SelectItem value="co">Colorado</SelectItem>
                    <SelectItem value="az">Arizona</SelectItem>
                    <SelectItem value="nv">Nevada</SelectItem>
                    <SelectItem value="wy">Wyoming</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="county" className="text-gray-400 text-sm">County *</Label>
                <Input
                  id="county"
                  placeholder="e.g., Napa County"
                  className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address" className="text-gray-400 text-sm">Full Address (Optional)</Label>
              <Input
                id="address"
                placeholder="Street address (will be hidden until NDA signed)"
                className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
              />
              <p className="text-gray-500 text-xs mt-1">Exact address will only be visible to verified buyers with signed NDAs</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="latitude" className="text-gray-400 text-sm">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  placeholder="37.7749"
                  className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                />
              </div>

              <div>
                <Label htmlFor="longitude" className="text-gray-400 text-sm">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  placeholder="-122.4194"
                  className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Specifications */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Maximize className="w-6 h-6 text-[#d4af37]" />
              <CardTitle className="text-white">Property Specifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="acreage" className="text-gray-400 text-sm">Acreage *</Label>
                <Input
                  id="acreage"
                  type="number"
                  placeholder="850"
                  className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                />
              </div>

              <div>
                <Label htmlFor="bedrooms" className="text-gray-400 text-sm">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  placeholder="5"
                  className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                />
              </div>

              <div>
                <Label htmlFor="bathrooms" className="text-gray-400 text-sm">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  placeholder="6"
                  className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="sqft" className="text-gray-400 text-sm">Square Footage</Label>
                <Input
                  id="sqft"
                  type="number"
                  placeholder="8500"
                  className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                />
              </div>

              <div>
                <Label htmlFor="year-built" className="text-gray-400 text-sm">Year Built</Label>
                <Input
                  id="year-built"
                  type="number"
                  placeholder="2018"
                  className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Media Upload */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Image className="w-6 h-6 text-[#d4af37]" />
              <CardTitle className="text-white">Photos & Media</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-gray-400 text-sm">Property Photos *</Label>
              <div className="mt-2 border-2 border-dashed border-[#2a2a2a] rounded-lg p-8 text-center hover:border-[#d4af37]/50 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-white mb-2">Click to upload or drag and drop</p>
                <p className="text-gray-500 text-sm">PNG, JPG up to 10MB (Max 20 photos)</p>
              </div>
            </div>

            <div>
              <Label className="text-gray-400 text-sm">Virtual Tour / Video URL (Optional)</Label>
              <Input
                placeholder="https://..."
                className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileCheck className="w-6 h-6 text-[#d4af37]" />
              <CardTitle className="text-white">Property Documents</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-gray-400 text-sm">Upload Documents (Deeds, Surveys, etc.)</Label>
              <div className="mt-2 border-2 border-dashed border-[#2a2a2a] rounded-lg p-8 text-center hover:border-[#d4af37]/50 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-white mb-2">Upload property documents</p>
                <p className="text-gray-500 text-sm">PDF, DOC up to 25MB</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visibility Settings */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Visibility Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="approved-buyers">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 border border-[#2a2a2a] rounded-lg hover:border-[#d4af37]/50 transition-colors">
                  <RadioGroupItem value="approved-buyers" id="approved-buyers" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="approved-buyers" className="text-white cursor-pointer">
                      Approved Buyers
                    </Label>
                    <p className="text-gray-400 text-sm mt-1">
                      Visible to all verified investors within their budget cap
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border border-[#2a2a2a] rounded-lg hover:border-[#d4af37]/50 transition-colors">
                  <RadioGroupItem value="invite-only" id="invite-only" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="invite-only" className="text-white cursor-pointer">
                      Invite-Only
                    </Label>
                    <p className="text-gray-400 text-sm mt-1">
                      Only visible to specific buyers you invite
                    </p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-end pb-8">
          <Button
            variant="outline"
            className="border-gray-500 text-gray-400 hover:bg-gray-500 hover:text-white"
            onClick={() => navigate('/broker/listings')}
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
            onClick={handleSaveDraft}
          >
            <Save className="w-4 h-4 mr-2" />
            Save as Draft
          </Button>
          <Button
            className="bg-[#d4af37] hover:bg-[#c19b2b] text-black"
            onClick={handleSubmitForReview}
          >
            <Send className="w-4 h-4 mr-2" />
            Submit for Review
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
