import { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
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
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Camera,
  Save
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface AdminProfileProps {
  onLogout: () => void;
}

export default function AdminProfile({ onLogout }: AdminProfileProps) {
  const [isEditing, setIsEditing] = useState(false);

  const sidebarItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'Approvals', path: '/admin/approvals', icon: <CheckCircle className="w-5 h-5" /> },
    { label: 'Listing Reviews', path: '/admin/listing-reviews', icon: <FileText className="w-5 h-5" /> },
    { label: 'Users & Assignments', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { label: 'Documents', path: '/admin/documents', icon: <FileCheck className="w-5 h-5" /> },
    { label: 'Analytics', path: '/admin/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'Support Tickets', path: '/admin/support', icon: <HelpCircle className="w-5 h-5" /> },
    { label: 'Audit Trail', path: '/admin/audit', icon: <Shield className="w-5 h-5" /> },
    { label: 'System Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
    { 
      label: 'Logout', 
      path: '/', 
      icon: <LogOut className="w-5 h-5" />,
    },
  ];

  const adminData = {
    name: 'Matthew (Admin)',
    email: 'matthew@privateland.com',
    phone: '(555) 123-4567',
    role: 'System Administrator',
    location: 'United States',
    joinedDate: '2024-01-15',
    lastLogin: '2024-11-21 10:35 AM',
    permissions: [
      'User Management',
      'Listing Approval',
      'Document Access',
      'System Settings',
      'Financial Reports',
      'Support Management',
      'Audit Logs',
      'Impersonation Mode'
    ]
  };

  const activityLog = [
    { action: 'Approved client access', detail: 'James Anderson - $7.5M budget', time: '1 hour ago' },
    { action: 'Reviewed listing', detail: 'Highland Ranch Estate - Approved', time: '2 hours ago' },
    { action: 'Responded to ticket', detail: 'TKT-1045 - Budget increase issue', time: '3 hours ago' },
    { action: 'Assigned broker to client', detail: 'Sarah Mitchell → Patricia Williams', time: '5 hours ago' },
    { action: 'Generated compliance report', detail: 'NDA Audit Report Q4 2024', time: '1 day ago' },
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
            <h1 className="text-white mb-2">Admin Profile</h1>
            <p className="text-gray-400">Manage your administrator profile and permissions</p>
          </div>
          <Button 
            className={isEditing ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-[#d4af37] hover:bg-[#b8941f] text-black'}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        {/* Profile Overview */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardContent className="pt-6">
            <div className="flex items-start gap-6">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center">
                  <span className="text-black text-4xl">M</span>
                </div>
                {isEditing && (
                  <Button 
                    size="sm" 
                    className="absolute bottom-0 right-0 rounded-full bg-[#d4af37] hover:bg-[#b8941f] text-black"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-white text-2xl">{adminData.name}</h2>
                  <Badge className="bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30">
                    <Shield className="w-3 h-3 mr-1" />
                    {adminData.role}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{adminData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{adminData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{adminData.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>Joined {adminData.joinedDate}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                  <p className="text-gray-400 text-sm mb-1">Last Login</p>
                  <p className="text-white">{adminData.lastLogin}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="bg-[#1a1a1a] border border-[#2a2a2a] p-1">
            <TabsTrigger 
              value="details" 
              className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black"
            >
              Profile Details
            </TabsTrigger>
            <TabsTrigger 
              value="permissions"
              className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black"
            >
              Permissions
            </TabsTrigger>
            <TabsTrigger 
              value="activity"
              className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black"
            >
              Recent Activity
            </TabsTrigger>
          </TabsList>

          {/* Profile Details Tab */}
          <TabsContent value="details" className="mt-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                    <Input 
                      id="name"
                      defaultValue={adminData.name}
                      disabled={!isEditing}
                      className="bg-[#0f0f0f] border-[#2a2a2a] text-white disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input 
                      id="email"
                      type="email"
                      defaultValue={adminData.email}
                      disabled={!isEditing}
                      className="bg-[#0f0f0f] border-[#2a2a2a] text-white disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-300">Phone</Label>
                    <Input 
                      id="phone"
                      defaultValue={adminData.phone}
                      disabled={!isEditing}
                      className="bg-[#0f0f0f] border-[#2a2a2a] text-white disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-gray-300">Location</Label>
                    <Input 
                      id="location"
                      defaultValue={adminData.location}
                      disabled={!isEditing}
                      className="bg-[#0f0f0f] border-[#2a2a2a] text-white disabled:opacity-50"
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="bio" className="text-gray-300">Bio</Label>
                    <Textarea 
                      id="bio"
                      placeholder="Add a bio..."
                      disabled={!isEditing}
                      className="bg-[#0f0f0f] border-[#2a2a2a] text-white disabled:opacity-50 min-h-[100px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] mt-6">
              <CardHeader>
                <CardTitle className="text-white">Security Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white mb-1">Password</p>
                        <p className="text-gray-400 text-sm">Last changed 45 days ago</p>
                      </div>
                      <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
                        Change Password
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white mb-1">Two-Factor Authentication</p>
                        <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Enabled
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white mb-1">Session Timeout</p>
                        <p className="text-gray-400 text-sm">Auto-logout after inactivity</p>
                      </div>
                      <span className="text-white">30 minutes</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Permissions Tab */}
          <TabsContent value="permissions" className="mt-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Administrator Permissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {adminData.permissions.map((permission, index) => (
                    <div 
                      key={index}
                      className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <p className="text-white">{permission}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-orange-500/5 rounded-lg border border-orange-500/30">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-orange-400 mb-1">Full System Access</p>
                      <p className="text-gray-400 text-sm">
                        As a system administrator, you have unrestricted access to all platform features, 
                        user data, and system settings. All actions are logged in the audit trail.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="mt-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activityLog.map((activity, index) => (
                    <div 
                      key={index}
                      className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white mb-1">{activity.action}</p>
                          <p className="text-gray-400 text-sm">{activity.detail}</p>
                        </div>
                        <p className="text-gray-500 text-sm">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
