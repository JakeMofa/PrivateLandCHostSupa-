import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Home, Heart, UserCircle, FileText, HelpCircle, LogOut, Mail, DollarSign, Upload, Shield, CreditCard, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import { Badge } from './ui/badge';

interface AccountPageProps {
  onLogout: () => void;
}

export default function AccountPage({ onLogout }: AccountPageProps) {
  const navigate = useNavigate();
  const [newBudget, setNewBudget] = useState('');
  const [reason, setReason] = useState('');

  const sidebarItems = [
    { label: 'Dashboard', path: '/client/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'My Profile', path: '/client/profile', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Marketplace', path: '/client/marketplace', icon: <Home className="w-5 h-5" /> },
    { label: 'Saved Properties', path: '/client/saved', icon: <Heart className="w-5 h-5" /> },
    { label: 'My Agent', path: '/client/agent', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Invitations', path: '/client/invitations', icon: <Mail className="w-5 h-5" /> },
    { label: 'My Documents', path: '/client/documents', icon: <FileText className="w-5 h-5" /> },
    { label: 'Account', path: '/client/account', icon: <UserCircle className="w-5 h-5" />, active: true },
    { label: 'Settings', path: '/client/settings', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Request Help', path: '/client/help', icon: <HelpCircle className="w-5 h-5" /> },
    { 
      label: 'Logout', 
      path: '/', 
      icon: <LogOut className="w-5 h-5" />,
    },
  ];

  const handleBudgetIncreaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle budget increase request
    alert('Budget increase request submitted successfully!');
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole="client" 
      userName="James Anderson"
      onLogout={onLogout}
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-white mb-2">Account</h1>
          <p className="text-gray-400">Manage your account settings and financial information</p>
        </div>

        {/* Current Budget Overview */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Current Budget Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Current Budget</p>
                  <p className="text-white text-2xl">$5,000,000</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <p className="text-white text-xl">Active</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Valid Until</p>
                  <p className="text-white text-xl">Dec 31, 2025</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Request Budget Increase */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-[#d4af37]" />
              <CardTitle className="text-white">Request Budget Increase</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 p-4 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-lg">
              <p className="text-gray-300 text-sm">
                To access higher-priced properties, you can request a budget increase. You'll need to provide updated proof of funds documentation.
              </p>
            </div>

            <form onSubmit={handleBudgetIncreaseSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="newBudget" className="text-white">New Target Budget</Label>
                <Input
                  id="newBudget"
                  type="text"
                  placeholder="e.g., $10,000,000"
                  className="bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason" className="text-white">Reason for Increase (Optional)</Label>
                <Textarea
                  id="reason"
                  placeholder="Explain why you need a higher budget..."
                  className="min-h-[100px] bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="proofOfFunds" className="text-white">Upload Updated Proof of Funds</Label>
                <div className="border-2 border-dashed border-[#2a2a2a] rounded-lg p-6 text-center hover:border-[#d4af37] transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm mb-1">Click to upload or drag and drop</p>
                  <p className="text-gray-600 text-xs">PDF, PNG, JPG up to 10MB</p>
                  <input
                    id="proofOfFunds"
                    type="file"
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#d4af37] hover:bg-[#c19b2b] text-black">
                <TrendingUp className="w-4 h-4 mr-2" />
                Submit Budget Increase Request
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Budget Request History */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Request History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#2a2a2a]">
                <div>
                  <p className="text-white mb-1">Initial Pre-Approval</p>
                  <p className="text-gray-400 text-sm">$5,000,000</p>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/30 mb-1">
                    Approved
                  </Badge>
                  <p className="text-gray-500 text-sm">Jan 15, 2024</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Security */}
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
                  onClick={() => navigate('/client/profile')}
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

        {/* Subscription Info */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Subscription & Billing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-white text-lg mb-1">Premium Client</p>
                <p className="text-gray-400 text-sm">Full access to all features</p>
              </div>
              <Badge className="bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/30 text-lg px-4 py-2">
                Active
              </Badge>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Membership Fee</span>
                <span className="text-white">$0/month</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Next Billing Date</span>
                <span className="text-white">N/A</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              Your account is currently active with no monthly fees. Premium features are included with your verified membership.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
