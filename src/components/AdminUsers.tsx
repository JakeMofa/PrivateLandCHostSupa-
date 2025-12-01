import { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
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
  Search,
  Filter,
  UserPlus,
  Edit,
  Eye,
  DollarSign,
  Building2,
  Shield
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";

interface AdminUsersProps {
  onLogout: () => void;
}

export default function AdminUsers({ onLogout }: AdminUsersProps) {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client',
    budgetCap: 0,
    brokerage: '',
    license: ''
  });

  const sidebarItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'Approvals', path: '/admin/approvals', icon: <CheckCircle className="w-5 h-5" /> },
    { label: 'Listing Reviews', path: '/admin/listing-reviews', icon: <FileText className="w-5 h-5" /> },
    { label: 'Users & Assignments', path: '/admin/users', icon: <Users className="w-5 h-5" />, active: true },
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

  const clients = [
    {
      id: 1,
      name: 'James Anderson',
      email: 'james.anderson@email.com',
      phone: '(415) 555-0202',
      budgetCap: 5000000,
      assignedBroker: 'Sarah Mitchell',
      status: 'Active',
      joined: '2024-08-15',
      savedProperties: 8,
      ndaCount: 2
    },
    {
      id: 2,
      name: 'Patricia Williams',
      email: 'patricia.w@familyoffice.com',
      phone: '(212) 555-0201',
      budgetCap: 8000000,
      assignedBroker: 'John Smith',
      status: 'Active',
      joined: '2024-08-20',
      savedProperties: 12,
      ndaCount: 3
    },
    {
      id: 3,
      name: 'David Kim',
      email: 'david.kim@techventures.com',
      phone: '(650) 555-0203',
      budgetCap: 12000000,
      assignedBroker: 'Unassigned',
      status: 'Pending Assignment',
      joined: '2024-11-21',
      savedProperties: 0,
      ndaCount: 0
    },
  ];

  const brokers = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      email: 'sarah.m@montanaestates.com',
      phone: '(406) 555-0124',
      brokerage: 'Montana Estates',
      license: 'MT-BRO-12345',
      state: 'Montana',
      status: 'Active',
      joined: '2024-06-10',
      activeListings: 12,
      totalClients: 5,
      totalSales: 42500000
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john.smith@wyomingland.com',
      phone: '(307) 555-0125',
      brokerage: 'Wyoming Land Group',
      license: 'WY-BRO-98765',
      state: 'Wyoming',
      status: 'Active',
      joined: '2024-05-15',
      activeListings: 8,
      totalClients: 3,
      totalSales: 31200000
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael.chen@luxuryland.com',
      phone: '(406) 555-0123',
      brokerage: 'Luxury Land Co.',
      license: 'MT-BRO-45678',
      state: 'Montana',
      status: 'Pending Verification',
      joined: '2024-11-20',
      activeListings: 0,
      totalClients: 0,
      totalSales: 0
    },
  ];

  const handleViewUser = (user: any, type: string) => {
    setSelectedUser({ ...user, type });
    setDialogOpen(true);
  };

  const handleAssignBroker = (clientId: number, brokerId: number) => {
    console.log(`Assigning broker ${brokerId} to client ${clientId}`);
  };

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
            <h1 className="text-white mb-2">Users & Assignments</h1>
            <p className="text-gray-400">Manage all users and broker-client assignments</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={() => setCreateUserDialogOpen(true)}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Create New User
            </Button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input 
                placeholder="Search users..." 
                className="pl-10 bg-[#1a1a1a] border-[#2a2a2a] text-white w-64"
              />
            </div>
            <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Total Clients</p>
              <p className="text-white text-3xl">{clients.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
                <Building2 className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Total Brokers</p>
              <p className="text-white text-3xl">{brokers.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mb-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Active Users</p>
              <p className="text-white text-3xl">242</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mb-3">
                <UserPlus className="w-5 h-5 text-orange-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Unassigned</p>
              <p className="text-white text-3xl">4</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-3">
                <DollarSign className="w-5 h-5 text-[#d4af37]" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Total Budget</p>
              <p className="text-white text-2xl">$125M</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="clients" className="w-full">
          <TabsList className="bg-[#1a1a1a] border border-[#2a2a2a] p-1">
            <TabsTrigger 
              value="clients" 
              className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black"
            >
              <Users className="w-4 h-4 mr-2" />
              Clients ({clients.length})
            </TabsTrigger>
            <TabsTrigger 
              value="brokers"
              className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black"
            >
              <Building2 className="w-4 h-4 mr-2" />
              Brokers ({brokers.length})
            </TabsTrigger>
          </TabsList>

          {/* Clients Tab */}
          <TabsContent value="clients" className="mt-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Client Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                      <TableHead className="text-gray-400">Client</TableHead>
                      <TableHead className="text-gray-400">Budget Cap</TableHead>
                      <TableHead className="text-gray-400">Assigned Broker</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Activity</TableHead>
                      <TableHead className="text-gray-400 text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id} className="border-[#2a2a2a] hover:bg-[#2a2a2a]/30">
                        <TableCell>
                          <div>
                            <p className="text-white">{client.name}</p>
                            <p className="text-gray-400 text-sm">{client.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-[#d4af37]">
                          ${(client.budgetCap / 1000000).toFixed(1)}M
                        </TableCell>
                        <TableCell>
                          {client.assignedBroker === 'Unassigned' ? (
                            <Select onValueChange={(value) => handleAssignBroker(client.id, parseInt(value))}>
                              <SelectTrigger className="w-[180px] bg-[#0f0f0f] border-orange-500/30 text-orange-400">
                                <SelectValue placeholder="Assign Broker" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                                {brokers.filter(b => b.status === 'Active').map(broker => (
                                  <SelectItem key={broker.id} value={broker.id.toString()}>
                                    {broker.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <p className="text-white">{client.assignedBroker}</p>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            client.status === 'Active'
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                          }>
                            {client.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p className="text-white">{client.savedProperties} saved</p>
                            <p className="text-gray-500">{client.ndaCount} NDAs</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-[#2a2a2a] hover:bg-[#2a2a2a]"
                              onClick={() => handleViewUser(client, 'client')}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-[#2a2a2a] hover:bg-[#2a2a2a]"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Brokers Tab */}
          <TabsContent value="brokers" className="mt-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Broker Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                      <TableHead className="text-gray-400">Broker</TableHead>
                      <TableHead className="text-gray-400">Brokerage</TableHead>
                      <TableHead className="text-gray-400">License</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Performance</TableHead>
                      <TableHead className="text-gray-400 text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {brokers.map((broker) => (
                      <TableRow key={broker.id} className="border-[#2a2a2a] hover:bg-[#2a2a2a]/30">
                        <TableCell>
                          <div>
                            <p className="text-white">{broker.name}</p>
                            <p className="text-gray-400 text-sm">{broker.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-white">{broker.brokerage}</TableCell>
                        <TableCell>
                          <div>
                            <p className="text-white">{broker.license}</p>
                            <p className="text-gray-400 text-sm">{broker.state}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            broker.status === 'Active'
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                          }>
                            {broker.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p className="text-white">{broker.activeListings} listings</p>
                            <p className="text-gray-500">{broker.totalClients} clients</p>
                            <p className="text-[#d4af37]">${(broker.totalSales / 1000000).toFixed(1)}M sales</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-[#2a2a2a] hover:bg-[#2a2a2a]"
                              onClick={() => handleViewUser(broker, 'broker')}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-[#2a2a2a] hover:bg-[#2a2a2a]"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Detail Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {selectedUser?.type === 'client' ? 'Client' : 'Broker'} Details
              </DialogTitle>
            </DialogHeader>
            
            {selectedUser && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <p className="text-gray-400 text-sm mb-1">Name</p>
                    <p className="text-white">{selectedUser.name}</p>
                  </div>
                  <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <p className="text-gray-400 text-sm mb-1">Email</p>
                    <p className="text-white text-sm">{selectedUser.email}</p>
                  </div>
                  <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <p className="text-gray-400 text-sm mb-1">Phone</p>
                    <p className="text-white">{selectedUser.phone}</p>
                  </div>
                  <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <p className="text-gray-400 text-sm mb-1">Status</p>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {selectedUser.status}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Create New User Dialog */}
        <Dialog open={createUserDialogOpen} onOpenChange={setCreateUserDialogOpen}>
          <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <UserPlus className="w-6 h-6 text-[#d4af37]" />
                Create New User
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Create a new user account and send login credentials via email
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-white text-lg">Basic Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="create-name" className="text-gray-300">Full Name *</Label>
                  <Input 
                    id="create-name"
                    placeholder="John Doe"
                    value={newUserData.name}
                    onChange={(e) => setNewUserData({...newUserData, name: e.target.value})}
                    className="bg-[#0f0f0f] border-[#2a2a2a] text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="create-email" className="text-gray-300">Email Address *</Label>
                    <Input 
                      id="create-email"
                      type="email"
                      placeholder="john@example.com"
                      value={newUserData.email}
                      onChange={(e) => setNewUserData({...newUserData, email: e.target.value})}
                      className="bg-[#0f0f0f] border-[#2a2a2a] text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="create-password" className="text-gray-300">Temporary Password *</Label>
                    <Input 
                      id="create-password"
                      type="password"
                      placeholder="Generate secure password"
                      value={newUserData.password}
                      onChange={(e) => setNewUserData({...newUserData, password: e.target.value})}
                      className="bg-[#0f0f0f] border-[#2a2a2a] text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-4">
                <h3 className="text-white text-lg">Account Type</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="create-role" className="text-gray-300">Select Role *</Label>
                  <Select 
                    value={newUserData.role} 
                    onValueChange={(value) => setNewUserData({...newUserData, role: value})}
                  >
                    <SelectTrigger className="bg-[#0f0f0f] border-[#2a2a2a] text-white">
                      <SelectValue placeholder="Select user role" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                      <SelectItem value="client">Client (Property Buyer)</SelectItem>
                      <SelectItem value="broker">Broker/Agent</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Conditional Fields - Client */}
              {newUserData.role === 'client' && (
                <div className="space-y-4 p-4 bg-purple-500/5 rounded-lg border border-purple-500/30">
                  <h3 className="text-white text-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-500" />
                    Client Settings
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="create-budget" className="text-gray-300">Initial Budget Cap *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input 
                        id="create-budget"
                        type="number"
                        placeholder="5000000"
                        value={newUserData.budgetCap || ''}
                        onChange={(e) => setNewUserData({...newUserData, budgetCap: parseInt(e.target.value) || 0})}
                        className="bg-[#0f0f0f] border-[#2a2a2a] text-white pl-8"
                      />
                    </div>
                    <p className="text-gray-500 text-sm">
                      Maximum property value this client can view
                    </p>
                  </div>
                </div>
              )}

              {/* Conditional Fields - Broker */}
              {newUserData.role === 'broker' && (
                <div className="space-y-4 p-4 bg-blue-500/5 rounded-lg border border-blue-500/30">
                  <h3 className="text-white text-lg flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-500" />
                    Broker Settings
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="create-brokerage" className="text-gray-300">Brokerage Name *</Label>
                      <Input 
                        id="create-brokerage"
                        placeholder="Montana Estates"
                        value={newUserData.brokerage}
                        onChange={(e) => setNewUserData({...newUserData, brokerage: e.target.value})}
                        className="bg-[#0f0f0f] border-[#2a2a2a] text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="create-license" className="text-gray-300">License Number *</Label>
                      <Input 
                        id="create-license"
                        placeholder="MT-BRO-12345"
                        value={newUserData.license}
                        onChange={(e) => setNewUserData({...newUserData, license: e.target.value})}
                        className="bg-[#0f0f0f] border-[#2a2a2a] text-white"
                      />
                    </div>
                  </div>
                  
                  <p className="text-gray-500 text-sm">
                    License will be verified before account activation
                  </p>
                </div>
              )}

              {/* Admin Role Notice */}
              {newUserData.role === 'admin' && (
                <div className="p-4 bg-orange-500/5 rounded-lg border border-orange-500/30">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-orange-400 mb-1">Administrator Access</p>
                      <p className="text-gray-400 text-sm">
                        This user will have full system access including user management, 
                        listing approvals, document management, and system settings.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-[#2a2a2a]">
                <Button 
                  variant="outline" 
                  className="border-[#2a2a2a] hover:bg-[#2a2a2a]"
                  onClick={() => {
                    setCreateUserDialogOpen(false);
                    setNewUserData({
                      name: '',
                      email: '',
                      password: '',
                      role: 'client',
                      budgetCap: 0,
                      brokerage: '',
                      license: ''
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => {
                    console.log('Creating new user:', newUserData);
                    // In real app: API call to create user, send email with credentials
                    alert(`User created successfully!\n\nLogin credentials sent to: ${newUserData.email}\n\nEmail will contain:\n- Platform URL\n- Username: ${newUserData.email}\n- Temporary Password: ${newUserData.password}\n- Instructions to change password on first login`);
                    setCreateUserDialogOpen(false);
                    setNewUserData({
                      name: '',
                      email: '',
                      password: '',
                      role: 'client',
                      budgetCap: 0,
                      brokerage: '',
                      license: ''
                    });
                  }}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create User & Send Credentials
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}