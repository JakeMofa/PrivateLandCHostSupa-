import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Home, Users, FileText, UserCircle, HelpCircle, LogOut, Bell, Shield, Globe, Calendar, Lock, Palette } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface BrokerSettingsProps {
  onLogout: () => void;
}

export default function BrokerSettings({ onLogout }: BrokerSettingsProps) {
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
    { label: 'Account', path: '/broker/account', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Settings', path: '/broker/settings', icon: <UserCircle className="w-5 h-5" />, active: true },
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
          <h1 className="text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your preferences and notification settings</p>
        </div>

        {/* Notification Preferences */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-[#d4af37]" />
              <CardTitle className="text-white">Notification Preferences</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[#2a2a2a]">
                <div className="flex-1">
                  <Label htmlFor="email-notifications" className="text-white cursor-pointer">
                    Email Notifications
                  </Label>
                  <p className="text-gray-400 text-sm mt-1">
                    Receive email updates about leads and account activity
                  </p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between pb-6 border-b border-[#2a2a2a]">
                <div className="flex-1">
                  <Label htmlFor="new-leads" className="text-white cursor-pointer">
                    New Lead Notifications
                  </Label>
                  <p className="text-gray-400 text-sm mt-1">
                    Get notified when investors express interest in your listings
                  </p>
                </div>
                <Switch id="new-leads" defaultChecked />
              </div>

              <div className="flex items-center justify-between pb-6 border-b border-[#2a2a2a]">
                <div className="flex-1">
                  <Label htmlFor="calendly-bookings" className="text-white cursor-pointer">
                    Calendly Booking Alerts
                  </Label>
                  <p className="text-gray-400 text-sm mt-1">
                    Alert when meetings are scheduled through Calendly
                  </p>
                </div>
                <Switch id="calendly-bookings" defaultChecked />
              </div>

              <div className="flex items-center justify-between pb-6 border-b border-[#2a2a2a]">
                <div className="flex-1">
                  <Label htmlFor="listing-updates" className="text-white cursor-pointer">
                    Listing Status Updates
                  </Label>
                  <p className="text-gray-400 text-sm mt-1">
                    Updates on listing approval status and visibility changes
                  </p>
                </div>
                <Switch id="listing-updates" defaultChecked />
              </div>

              <div className="flex items-center justify-between pb-6 border-b border-[#2a2a2a]">
                <div className="flex-1">
                  <Label htmlFor="document-updates" className="text-white cursor-pointer">
                    Document Updates
                  </Label>
                  <p className="text-gray-400 text-sm mt-1">
                    Notifications about document approvals and requests
                  </p>
                </div>
                <Switch id="document-updates" defaultChecked />
              </div>

              <div className="flex items-center justify-between pb-6 border-b border-[#2a2a2a]">
                <div className="flex-1">
                  <Label htmlFor="buyer-activity" className="text-white cursor-pointer">
                    Buyer Activity Alerts
                  </Label>
                  <p className="text-gray-400 text-sm mt-1">
                    Get notified when buyers view or save your listings
                  </p>
                </div>
                <Switch id="buyer-activity" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="marketing" className="text-white cursor-pointer">
                    Marketing Communications
                  </Label>
                  <p className="text-gray-400 text-sm mt-1">
                    Receive newsletters and promotional content
                  </p>
                </div>
                <Switch id="marketing" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendly Integration */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-[#d4af37]" />
              <CardTitle className="text-white">Calendly Integration</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="calendly-url" className="text-gray-400 text-sm">Calendly URL</Label>
                <div className="flex gap-3 mt-2">
                  <Input
                    id="calendly-url"
                    type="url"
                    defaultValue="https://calendly.com/michael-rivers"
                    className="flex-1 bg-[#0f0f0f] border-[#2a2a2a] text-white"
                  />
                  <Button
                    className="bg-[#d4af37] hover:bg-[#c19b2b] text-black"
                  >
                    Update
                  </Button>
                </div>
                <p className="text-gray-500 text-sm mt-2">Investors will be redirected to this link to schedule meetings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-[#d4af37]" />
              <CardTitle className="text-white">Privacy Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[#2a2a2a]">
                <div className="flex-1">
                  <Label htmlFor="profile-visibility" className="text-white cursor-pointer">
                    Profile Visibility
                  </Label>
                  <p className="text-gray-400 text-sm mt-1">
                    Allow clients to see your profile information
                  </p>
                </div>
                <Switch id="profile-visibility" defaultChecked />
              </div>

              <div className="flex items-center justify-between pb-6 border-b border-[#2a2a2a]">
                <div className="flex-1">
                  <Label htmlFor="listing-analytics" className="text-white cursor-pointer">
                    Listing Analytics
                  </Label>
                  <p className="text-gray-400 text-sm mt-1">
                    Track property views and buyer engagement
                  </p>
                </div>
                <Switch id="listing-analytics" defaultChecked />
              </div>

              <div className="flex items-center justify-between pb-6 border-b border-[#2a2a2a]">
                <div className="flex-1">
                  <Label htmlFor="two-factor" className="text-white cursor-pointer">
                    Two-Factor Authentication
                  </Label>
                  <p className="text-gray-400 text-sm mt-1">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                >
                  Enable
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="data-sharing" className="text-white cursor-pointer">
                    Data Sharing with Partners
                  </Label>
                  <p className="text-gray-400 text-sm mt-1">
                    Share anonymized data with trusted partners for better service
                  </p>
                </div>
                <Switch id="data-sharing" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Display Preferences */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Palette className="w-6 h-6 text-[#d4af37]" />
              <CardTitle className="text-white">Display Preferences</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currency" className="text-white">
                  Currency
                </Label>
                <Select defaultValue="usd">
                  <SelectTrigger id="currency" className="bg-[#0f0f0f] border-[#2a2a2a] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="measurement" className="text-white">
                  Measurement Units
                </Label>
                <Select defaultValue="imperial">
                  <SelectTrigger id="measurement" className="bg-[#0f0f0f] border-[#2a2a2a] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    <SelectItem value="imperial">Imperial (ft, acres)</SelectItem>
                    <SelectItem value="metric">Metric (m, hectares)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="listings-per-page" className="text-white">
                  Listings Per Page
                </Label>
                <Select defaultValue="12">
                  <SelectTrigger id="listings-per-page" className="bg-[#0f0f0f] border-[#2a2a2a] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    <SelectItem value="6">6 listings</SelectItem>
                    <SelectItem value="12">12 listings</SelectItem>
                    <SelectItem value="24">24 listings</SelectItem>
                    <SelectItem value="48">48 listings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Language & Region */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-[#d4af37]" />
              <CardTitle className="text-white">Language & Region</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="language" className="text-white">
                  Language
                </Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language" className="bg-[#0f0f0f] border-[#2a2a2a] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-white">
                  Timezone
                </Label>
                <Select defaultValue="pst">
                  <SelectTrigger id="timezone" className="bg-[#0f0f0f] border-[#2a2a2a] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    <SelectItem value="est">Eastern Time (ET)</SelectItem>
                    <SelectItem value="cst">Central Time (CT)</SelectItem>
                    <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                    <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Changes */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" className="border-[#2a2a2a] text-white hover:bg-[#2a2a2a]">
            Cancel
          </Button>
          <Button className="bg-[#d4af37] hover:bg-[#c19b2b] text-black">
            Save Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
