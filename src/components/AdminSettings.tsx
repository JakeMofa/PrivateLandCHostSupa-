import { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
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
  Globe,
  Mail,
  Bell,
  Lock,
  DollarSign,
  Image,
  Save,
  AlertCircle
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";

interface AdminSettingsProps {
  onLogout: () => void;
}

export default function AdminSettings({ onLogout }: AdminSettingsProps) {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [twoFactorRequired, setTwoFactorRequired] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const sidebarItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'Approvals', path: '/admin/approvals', icon: <CheckCircle className="w-5 h-5" /> },
    { label: 'Listing Reviews', path: '/admin/listing-reviews', icon: <FileText className="w-5 h-5" /> },
    { label: 'Users & Assignments', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { label: 'Documents', path: '/admin/documents', icon: <FileCheck className="w-5 h-5" /> },
    { label: 'Analytics', path: '/admin/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'Support Tickets', path: '/admin/support', icon: <HelpCircle className="w-5 h-5" /> },
    { label: 'Audit Trail', path: '/admin/audit', icon: <Shield className="w-5 h-5" /> },
    { label: 'System Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" />, active: true },
    { 
      label: 'Logout', 
      path: '/', 
      icon: <LogOut className="w-5 h-5" />,
    },
  ];

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole="admin" 
      userName="Admin"
      onLogout={onLogout}
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white mb-2">System Settings</h1>
            <p className="text-gray-400">Configure platform-wide settings and preferences</p>
          </div>
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </div>

        {/* Maintenance Mode Alert */}
        {maintenanceMode && (
          <Card className="bg-gradient-to-br from-orange-500/5 to-[#0f0f0f] border-orange-500/30">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-orange-400 mb-1">Maintenance Mode Enabled</p>
                  <p className="text-gray-400 text-sm">
                    Platform is currently in maintenance mode. Only administrators can access the system.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="bg-[#1a1a1a] border border-[#2a2a2a] p-1">
            <TabsTrigger 
              value="general" 
              className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black"
            >
              <Globe className="w-4 h-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger 
              value="security"
              className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black"
            >
              <Lock className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger 
              value="notifications"
              className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black"
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="branding"
              className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black"
            >
              <Image className="w-4 h-4 mr-2" />
              Branding
            </TabsTrigger>
            <TabsTrigger 
              value="fees"
              className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Fees
            </TabsTrigger>
          </TabsList>

          {/* General Settings Tab */}
          <TabsContent value="general" className="mt-6">
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
                <CardHeader>
                  <CardTitle className="text-white">Platform Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="platform-name" className="text-gray-300">Platform Name</Label>
                      <Input 
                        id="platform-name"
                        defaultValue="PrivateLand.com"
                        className="bg-[#0f0f0f] border-[#2a2a2a] text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tagline" className="text-gray-300">Tagline</Label>
                      <Input 
                        id="tagline"
                        defaultValue="Exclusive Access to Private Real Estate Opportunities"
                        className="bg-[#0f0f0f] border-[#2a2a2a] text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email" className="text-gray-300">Contact Email</Label>
                      <Input 
                        id="contact-email"
                        type="email"
                        defaultValue="contact@privateland.com"
                        className="bg-[#0f0f0f] border-[#2a2a2a] text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="support-phone" className="text-gray-300">Support Phone</Label>
                      <Input 
                        id="support-phone"
                        defaultValue="(555) 123-4567"
                        className="bg-[#0f0f0f] border-[#2a2a2a] text-white"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
                <CardHeader>
                  <CardTitle className="text-white">System Controls</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <div>
                        <p className="text-white mb-1">Maintenance Mode</p>
                        <p className="text-gray-400 text-sm">Temporarily disable platform access for all users</p>
                      </div>
                      <Switch 
                        checked={maintenanceMode}
                        onCheckedChange={setMaintenanceMode}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <div>
                        <p className="text-white mb-1">New User Registrations</p>
                        <p className="text-gray-400 text-sm">Allow new users to request access</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <div>
                        <p className="text-white mb-1">Broker Submissions</p>
                        <p className="text-gray-400 text-sm">Allow brokers to submit new listings</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
                <CardHeader>
                  <CardTitle className="text-white">Time Limits & Thresholds</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout" className="text-gray-300">Session Timeout (minutes)</Label>
                      <Input 
                        id="session-timeout"
                        type="number"
                        defaultValue="30"
                        className="bg-[#0f0f0f] border-[#2a2a2a] text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="approval-sla" className="text-gray-300">Approval SLA (hours)</Label>
                      <Input 
                        id="approval-sla"
                        type="number"
                        defaultValue="48"
                        className="bg-[#0f0f0f] border-[#2a2a2a] text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nda-expiry" className="text-gray-300">NDA Expiry (months)</Label>
                      <Input 
                        id="nda-expiry"
                        type="number"
                        defaultValue="12"
                        className="bg-[#0f0f0f] border-[#2a2a2a] text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="consent-expiry" className="text-gray-300">Consent-to-List Expiry (months)</Label>
                      <Input 
                        id="consent-expiry"
                        type="number"
                        defaultValue="6"
                        className="bg-[#0f0f0f] border-[#2a2a2a] text-white"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Settings Tab */}
          <TabsContent value="security" className="mt-6">
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
                <CardHeader>
                  <CardTitle className="text-white">Authentication & Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <div>
                        <p className="text-white mb-1">Require Two-Factor Authentication</p>
                        <p className="text-gray-400 text-sm">Enforce 2FA for all user accounts</p>
                      </div>
                      <Switch 
                        checked={twoFactorRequired}
                        onCheckedChange={setTwoFactorRequired}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <div>
                        <p className="text-white mb-1">Email Verification Required</p>
                        <p className="text-gray-400 text-sm">Users must verify email before access</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <div>
                        <p className="text-white mb-1">IP Whitelisting</p>
                        <p className="text-gray-400 text-sm">Restrict access to specific IP ranges</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
                <CardHeader>
                  <CardTitle className="text-white">Password Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="min-length" className="text-gray-300">Minimum Length</Label>
                      <Input 
                        id="min-length"
                        type="number"
                        defaultValue="12"
                        className="bg-[#0f0f0f] border-[#2a2a2a] text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-expiry" className="text-gray-300">Password Expiry (days)</Label>
                      <Input 
                        id="password-expiry"
                        type="number"
                        defaultValue="90"
                        className="bg-[#0f0f0f] border-[#2a2a2a] text-white"
                      />
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <Label className="text-gray-300">Require uppercase letters</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <Label className="text-gray-300">Require numbers</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <Label className="text-gray-300">Require special characters</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
                <CardHeader>
                  <CardTitle className="text-white">Data Retention</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="audit-retention" className="text-gray-300">Audit Log Retention (days)</Label>
                    <Input 
                      id="audit-retention"
                      type="number"
                      defaultValue="730"
                      className="bg-[#0f0f0f] border-[#2a2a2a] text-white"
                    />
                    <p className="text-gray-500 text-sm">Logs are retained for 2 years (730 days) for compliance</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Email Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <div>
                      <p className="text-white mb-1">New User Applications</p>
                      <p className="text-gray-400 text-sm">Notify admin when user requests access</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <div>
                      <p className="text-white mb-1">Listing Submissions</p>
                      <p className="text-gray-400 text-sm">Notify admin when broker submits listing</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <div>
                      <p className="text-white mb-1">Support Tickets</p>
                      <p className="text-gray-400 text-sm">Notify admin of new help requests</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <div>
                      <p className="text-white mb-1">Document Expiration Alerts</p>
                      <p className="text-gray-400 text-sm">Alert 30 days before NDAs/consents expire</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <div>
                      <p className="text-white mb-1">Security Alerts</p>
                      <p className="text-gray-400 text-sm">Notify of suspicious activity</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Branding Tab */}
          <TabsContent value="branding" className="mt-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Brand Customization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hero-title" className="text-gray-300">Hero Title</Label>
                    <Input 
                      id="hero-title"
                      defaultValue="Exclusive Access to Private Real Estate Opportunities"
                      className="bg-[#0f0f0f] border-[#2a2a2a] text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero-subtitle" className="text-gray-300">Hero Subtitle</Label>
                    <Textarea 
                      id="hero-subtitle"
                      defaultValue="Discover premium land, ranches, and estates available only to verified investors."
                      className="bg-[#0f0f0f] border-[#2a2a2a] text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="primary-color" className="text-gray-300">Primary Color (Gold)</Label>
                    <div className="flex items-center gap-3">
                      <Input 
                        id="primary-color"
                        defaultValue="#d4af37"
                        className="bg-[#0f0f0f] border-[#2a2a2a] text-white w-32"
                      />
                      <div className="w-12 h-12 rounded" style={{ backgroundColor: '#d4af37' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Logo Upload</Label>
                    <div className="p-8 bg-[#0f0f0f] rounded-lg border border-dashed border-[#2a2a2a] text-center">
                      <Image className="w-12 h-12 mx-auto text-gray-500 mb-3" />
                      <p className="text-gray-400 mb-2">Drop your logo here or click to upload</p>
                      <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
                        Choose File
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fees Tab */}
          <TabsContent value="fees" className="mt-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Platform Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="client-fee" className="text-gray-300">Client Access Fee ($)</Label>
                      <Input 
                        id="client-fee"
                        type="number"
                        defaultValue="250"
                        className="bg-[#0f0f0f] border-[#2a2a2a] text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="broker-fee" className="text-gray-300">Broker Onboarding Fee ($)</Label>
                      <Input 
                        id="broker-fee"
                        type="number"
                        defaultValue="250"
                        className="bg-[#0f0f0f] border-[#2a2a2a] text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget-increase-fee" className="text-gray-300">Budget Increase Fee ($)</Label>
                      <Input 
                        id="budget-increase-fee"
                        type="number"
                        defaultValue="150"
                        className="bg-[#0f0f0f] border-[#2a2a2a] text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="commission-rate" className="text-gray-300">Transaction Commission (%)</Label>
                      <Input 
                        id="commission-rate"
                        type="number"
                        step="0.1"
                        defaultValue="0.5"
                        className="bg-[#0f0f0f] border-[#2a2a2a] text-white"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
