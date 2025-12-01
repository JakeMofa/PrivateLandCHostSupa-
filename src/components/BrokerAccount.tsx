import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Home, Users, FileText, UserCircle, HelpCircle, LogOut, DollarSign, CheckCircle, Calendar, Award, Download, Shield, CreditCard } from 'lucide-react';
import { Badge } from './ui/badge';

interface BrokerAccountProps {
  onLogout: () => void;
}

export default function BrokerAccount({ onLogout }: BrokerAccountProps) {
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
    { label: 'My Profile', path: '/broker/profile', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Account', path: '/broker/account', icon: <UserCircle className="w-5 h-5" />, active: true },
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
          <h1 className="text-white mb-2">Account</h1>
          <p className="text-gray-400">Manage your broker account and subscription</p>
        </div>

        {/* Account Status */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Account Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Account Type</p>
                  <p className="text-white text-xl">Premium Broker</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Renewal Date</p>
                  <p className="text-white text-xl">Dec 31, 2025</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Security Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[#2a2a2a]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div>
                    <p className="text-white mb-1">Two-Factor Authentication (2FA)</p>
                    <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                  </div>
                </div>
                <Button variant="outline" className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black">
                  Enable 2FA
                </Button>
              </div>

              <div className="flex items-center justify-between pb-6 border-b border-[#2a2a2a]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                    <UserCircle className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div>
                    <p className="text-white mb-1">Profile Information</p>
                    <p className="text-gray-400 text-sm">Update your personal details and contact information</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                  onClick={() => navigate('/broker/profile')}
                >
                  Edit Profile
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div>
                    <p className="text-white mb-1">Billing Information</p>
                    <p className="text-gray-400 text-sm">Manage payment methods and billing details</p>
                  </div>
                </div>
                <Button variant="outline" className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black">
                  Manage Billing
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Details */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Subscription & Billing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#2a2a2a]">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Plan</p>
                  <p className="text-white text-xl">Premium Broker</p>
                  <p className="text-gray-500 text-sm mt-1">Unlimited listings • Priority support • Advanced analytics</p>
                </div>
                <Button
                  variant="outline"
                  className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                >
                  Upgrade Plan
                </Button>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-[#2a2a2a]">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Monthly Fee</p>
                  <p className="text-white text-2xl">$499/month</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm">Auto-Renewal Active</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Next Billing Date</p>
                  <p className="text-white">December 1, 2024</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <p className="text-gray-400 text-sm mb-1">Active Listings</p>
                <p className="text-white text-3xl">12</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Leads</p>
                <p className="text-white text-3xl">25</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Active Clients</p>
                <p className="text-white text-3xl">8</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Closed Deals</p>
                <p className="text-green-400 text-3xl">47</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Recent Billing History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: 'Nov 1, 2024', amount: 499, status: 'Paid' },
                { date: 'Oct 1, 2024', amount: 499, status: 'Paid' },
                { date: 'Sep 1, 2024', amount: 499, status: 'Paid' },
              ].map((invoice, idx) => (
                <div key={idx} className="flex items-center justify-between pb-4 border-b border-[#2a2a2a] last:border-0">
                  <div>
                    <p className="text-white mb-1">{invoice.date}</p>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {invoice.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-white text-xl">${invoice.amount}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#d4af37]/10 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-white">•••• •••• •••• 4242</p>
                  <p className="text-gray-400 text-sm">Expires 12/25</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
              >
                Update Payment
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Account Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Account Data
              </Button>
              <Button
                variant="outline"
                className="w-full border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black"
              >
                Pause Subscription
              </Button>
              <Button
                variant="outline"
                className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                Cancel Subscription
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
