import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Home, Heart, UserCircle, FileText, HelpCircle, LogOut, Mail, Bell, Eye, Lock, Globe, Palette } from 'lucide-react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface SettingsPageProps {
  onLogout: () => void;
}

export default function SettingsPage({ onLogout }: SettingsPageProps) {

  const sidebarItems = [
    { label: 'Dashboard', path: '/client/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'My Profile', path: '/client/profile', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Marketplace', path: '/client/marketplace', icon: <Home className="w-5 h-5" /> },
    { label: 'Saved Properties', path: '/client/saved', icon: <Heart className="w-5 h-5" /> },
    { label: 'My Agent', path: '/client/agent', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Invitations', path: '/client/invitations', icon: <Mail className="w-5 h-5" /> },
    { label: 'My Documents', path: '/client/documents', icon: <FileText className="w-5 h-5" /> },
    { label: 'Account', path: '/client/account', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Settings', path: '/client/settings', icon: <UserCircle className="w-5 h-5" />, active: true },
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
          <h1 className="text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your preferences and notification settings</p>
        </div>

        {/* Notifications */}
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
                    Receive email updates about new properties and account activity
                  </p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between pb-6 border-b border-[#2a2a2a]">
                <div className="flex-1">
                  <Label htmlFor="new-listings" className="text-white cursor-pointer">
                    New Listing Alerts
                  </Label>
                  <p className="text-gray-400 text-sm mt-1">
                    Get notified when properties matching your preferences become available
                  </p>
                </div>
                <Switch id="new-listings" defaultChecked />
              </div>

              <div className="flex items-center justify-between pb-6 border-b border-[#2a2a2a]">
                <div className="flex-1">
                  <Label htmlFor="agent-messages" className="text-white cursor-pointer">
                    Agent Messages
                  </Label>
                  <p className="text-gray-400 text-sm mt-1">
                    Receive notifications when your agent sends you a message
                  </p>
                </div>
                <Switch id="agent-messages" defaultChecked />
              </div>

              <div className="flex items-center justify-between pb-6 border-b border-[#2a2a2a]">
                <div className="flex-1">
                  <Label htmlFor="price-drops" className="text-white cursor-pointer">
                    Price Drop Alerts
                  </Label>
                  <p className="text-gray-400 text-sm mt-1">
                    Get notified when saved properties have price reductions
                  </p>
                </div>
                <Switch id="price-drops" defaultChecked />
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
                    Allow brokers to see your profile information
                  </p>
                </div>
                <Switch id="profile-visibility" defaultChecked />
              </div>

              <div className="flex items-center justify-between pb-6 border-b border-[#2a2a2a]">
                <div className="flex-1">
                  <Label htmlFor="activity-tracking" className="text-white cursor-pointer">
                    Activity Tracking
                  </Label>
                  <p className="text-gray-400 text-sm mt-1">
                    Allow tracking of property views to improve recommendations
                  </p>
                </div>
                <Switch id="activity-tracking" defaultChecked />
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
                <Select defaultValue="est">
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
