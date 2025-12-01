import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Home, Heart, UserCircle, FileText, HelpCircle, LogOut, User, Mail, Phone, DollarSign, Shield, MapPin, Calendar, BadgeCheck } from 'lucide-react';

interface ClientProfileProps {
  onLogout: () => void;
}

export default function ClientProfile({ onLogout }: ClientProfileProps) {
  const navigate = useNavigate();

  const sidebarItems = [
    { label: 'Dashboard', path: '/client/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'My Profile', path: '/client/profile', icon: <UserCircle className="w-5 h-5" />, active: true },
    { label: 'Marketplace', path: '/client/marketplace', icon: <Home className="w-5 h-5" /> },
    { label: 'Saved Properties', path: '/client/saved', icon: <Heart className="w-5 h-5" /> },
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

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole="client" 
      userName="James Anderson"
      onLogout={onLogout}
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-white mb-2">My Profile</h1>
          <p className="text-gray-400">Manage your account information and preferences</p>
        </div>

        {/* Profile Header */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#d4af37] to-[#c19b2b] flex items-center justify-center">
                <span className="text-black text-3xl">JA</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-white text-2xl">James Anderson</h2>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30">
                    <BadgeCheck className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 text-sm">Verified</span>
                  </div>
                </div>
                <p className="text-gray-400">Premium Client</p>
              </div>
              <Button
                variant="outline"
                className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
              >
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-[#d4af37] mt-1" />
                  <div>
                    <p className="text-gray-400 text-sm">Full Name</p>
                    <p className="text-white">James Anderson</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#d4af37] mt-1" />
                  <div>
                    <p className="text-gray-400 text-sm">Email Address</p>
                    <p className="text-white">james.anderson@email.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#d4af37] mt-1" />
                  <div>
                    <p className="text-gray-400 text-sm">Phone Number</p>
                    <p className="text-white">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#d4af37] mt-1" />
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white">New York, NY</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#d4af37] mt-1" />
                  <div>
                    <p className="text-gray-400 text-sm">Member Since</p>
                    <p className="text-white">January 15, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Status */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Account Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <UserCircle className="w-6 h-6 text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-white">Premium Client</p>
                  <p className="text-gray-500">Full access</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Verification Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-white">Verified</p>
                  <p className="text-gray-500">Identity confirmed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Approved Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-white">$5,000,000</p>
                  <p className="text-gray-500">Pre-approved</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Information */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Financial Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#2a2a2a]">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Pre-Approval Amount</p>
                  <p className="text-white text-xl">$5,000,000</p>
                </div>
                <button
                  className="text-[#d4af37] hover:text-[#c19b2b] text-sm underline decoration-dotted underline-offset-4 transition-colors"
                  onClick={() => {/* Handle increase limit request */}}
                >
                  Request to increase limit
                </button>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-[#2a2a2a]">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Pre-Approval Status</p>
                  <p className="text-white">Active</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm">Valid</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Pre-Approval Expires</p>
                  <p className="text-white">December 31, 2025</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assigned Agent */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Assigned Agent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center">
                  <span className="text-[#d4af37] text-xl">SM</span>
                </div>
                <div>
                  <p className="text-white text-lg">Sarah Mitchell</p>
                  <p className="text-gray-400">Licensed Broker</p>
                  <p className="text-gray-500 text-sm">sarahmitchell@privateland.com</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                onClick={() => navigate('/client/agent')}
              >
                Contact Agent
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Property Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-400 text-sm mb-2">Preferred Locations</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-sm border border-[#d4af37]/30">New York</span>
                  <span className="px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-sm border border-[#d4af37]/30">California</span>
                  <span className="px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-sm border border-[#d4af37]/30">Montana</span>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Property Types</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-sm border border-[#d4af37]/30">Estate</span>
                  <span className="px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-sm border border-[#d4af37]/30">Ranch</span>
                  <span className="px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-sm border border-[#d4af37]/30">Waterfront</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}