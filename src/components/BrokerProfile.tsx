import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Home, Users, FileText, UserCircle, HelpCircle, LogOut, User, Mail, Phone, Building2, Shield, MapPin, Calendar, BadgeCheck, Award, TrendingUp } from 'lucide-react';

interface BrokerProfileProps {
  onLogout: () => void;
}

export default function BrokerProfile({ onLogout }: BrokerProfileProps) {
  const navigate = useNavigate();

  const sidebarItems = [
    { label: 'Dashboard', path: '/broker/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'My Listings', path: '/broker/listings', icon: <Home className="w-5 h-5" /> },
    { label: 'Add Listing', path: '/broker/add-listing', icon: <Home className="w-5 h-5" /> },
    { label: 'Leads', path: '/broker/leads', icon: <Users className="w-5 h-5" /> },
    { label: "My Buyer's List", path: '/broker/buyers', icon: <Users className="w-5 h-5" /> },
    { label: 'My Contracts', path: '/broker/contracts', icon: <FileText className="w-5 h-5" /> },
    { label: 'My NDAs', path: '/broker/ndas', icon: <FileText className="w-5 h-5" /> },
    { label: 'Invitations', path: '/broker/invitations', icon: <FileText className="w-5 h-5" /> },
    { label: 'Marketplace', path: '/broker/marketplace', icon: <Home className="w-5 h-5" /> },
    { label: 'My Documents', path: '/broker/documents', icon: <FileText className="w-5 h-5" /> },
    { label: 'My Profile', path: '/broker/profile', icon: <UserCircle className="w-5 h-5" />, active: true },
    { label: 'Account', path: '/broker/account', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Settings', path: '/broker/settings', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Request Help', path: '/broker/help', icon: <HelpCircle className="w-5 h-5" /> },
    { label: 'Logout', path: '/', icon: <LogOut className="w-5 h-5" /> },
  ];

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole="broker" 
      userName="Michael Rivers"
      onLogout={onLogout}
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-white mb-2">My Profile</h1>
          <p className="text-gray-400">Manage your broker account information</p>
        </div>

        {/* Profile Header */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#d4af37] to-[#c19b2b] flex items-center justify-center">
                <span className="text-black text-3xl">MR</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-white text-2xl">Michael Rivers</h2>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30">
                    <BadgeCheck className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 text-sm">Licensed Broker</span>
                  </div>
                </div>
                <p className="text-gray-400">Premium Real Estate Broker</p>
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
                    <p className="text-white">Michael Rivers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#d4af37] mt-1" />
                  <div>
                    <p className="text-gray-400 text-sm">Email Address</p>
                    <p className="text-white">michael.rivers@privateland.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#d4af37] mt-1" />
                  <div>
                    <p className="text-gray-400 text-sm">Phone Number</p>
                    <p className="text-white">+1 (555) 987-6543</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#d4af37] mt-1" />
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white">Los Angeles, CA</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#d4af37] mt-1" />
                  <div>
                    <p className="text-gray-400 text-sm">Member Since</p>
                    <p className="text-white">March 10, 2023</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-[#d4af37] mt-1" />
                  <div>
                    <p className="text-gray-400 text-sm">Brokerage</p>
                    <p className="text-white">PrivateLand Exclusive Realty</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Broker Credentials */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Broker Credentials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#d4af37] mt-1" />
                  <div>
                    <p className="text-gray-400 text-sm">License Number</p>
                    <p className="text-white">CA-BRE-02045678</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#d4af37] mt-1" />
                  <div>
                    <p className="text-gray-400 text-sm">Licensed States</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="px-2 py-1 rounded bg-[#d4af37]/10 text-[#d4af37] text-xs border border-[#d4af37]/30">California</span>
                      <span className="px-2 py-1 rounded bg-[#d4af37]/10 text-[#d4af37] text-xs border border-[#d4af37]/30">Nevada</span>
                      <span className="px-2 py-1 rounded bg-[#d4af37]/10 text-[#d4af37] text-xs border border-[#d4af37]/30">Arizona</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#d4af37] mt-1" />
                  <div>
                    <p className="text-gray-400 text-sm">License Expiration</p>
                    <p className="text-white">December 31, 2025</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BadgeCheck className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <p className="text-gray-400 text-sm">Verification Status</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm">Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Account Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-white">Premium Broker</p>
                  <p className="text-gray-500">Full access</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Total Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Home className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-white">12</p>
                  <p className="text-gray-500">Active properties</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Total Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-white">8</p>
                  <p className="text-gray-500">Active buyers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Professional Information */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Professional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#2a2a2a]">
                <p className="text-gray-400 text-sm mb-1">Years of Experience</p>
                <p className="text-white">15+ years in luxury real estate</p>
              </div>
              <div className="pb-4 border-b border-[#2a2a2a]">
                <p className="text-gray-400 text-sm mb-2">Specializations</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-sm border border-[#d4af37]/30">Luxury Estates</span>
                  <span className="px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-sm border border-[#d4af37]/30">Ranch Properties</span>
                  <span className="px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-sm border border-[#d4af37]/30">Waterfront</span>
                  <span className="px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-sm border border-[#d4af37]/30">Investment Properties</span>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Service Areas</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-sm">California</span>
                  <span className="px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-sm">Nevada</span>
                  <span className="px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-sm">Arizona</span>
                  <span className="px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-sm">Texas</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendly Integration */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Meeting Scheduler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Calendly URL</p>
                <p className="text-white">calendly.com/michael-rivers</p>
                <p className="text-gray-500 text-sm mt-2">Investors can book meetings directly with you</p>
              </div>
              <Button
                variant="outline"
                className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                onClick={() => navigate('/broker/settings')}
              >
                Update Link
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <p className="text-gray-400 text-sm mb-1">Active Leads</p>
                <p className="text-white text-2xl">25</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Closed Deals</p>
                <p className="text-white text-2xl">47</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Success Rate</p>
                <p className="text-green-400 text-2xl">89%</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Avg. Response Time</p>
                <p className="text-white text-2xl">2.3h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
