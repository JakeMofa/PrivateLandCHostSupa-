import { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  Home, 
  UserCircle, 
  HelpCircle, 
  LogOut,
  CheckCircle,
  Clock,
  Users,
  FileText,
  BarChart3,
  Settings,
  FileCheck,
  XCircle,
  Phone,
  Mail,
  Building2,
  DollarSign,
  Shield,
  Search,
  Filter,
  Eye,
  Send,
  Download
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
  DialogTrigger,
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

interface AdminApprovalsProps {
  onLogout: () => void;
}

export default function AdminApprovals({ onLogout }: AdminApprovalsProps) {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const sidebarItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'Approvals', path: '/admin/approvals', icon: <CheckCircle className="w-5 h-5" />, active: true },
    { label: 'Listing Reviews', path: '/admin/listing-reviews', icon: <FileText className="w-5 h-5" /> },
    { label: 'Users & Assignments', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { label: 'Documents', path: '/admin/documents', icon: <FileCheck className="w-5 h-5" /> },
    { label: 'Analytics', path: '/admin/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'System Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
    { label: 'Help & Support', path: '/admin/help', icon: <HelpCircle className="w-5 h-5" /> },
    { 
      label: 'Logout', 
      path: '/', 
      icon: <LogOut className="w-5 h-5" />,
    },
  ];

  const brokerRequests = [
    { 
      id: 1, 
      name: 'Michael Chen', 
      email: 'michael.chen@luxuryland.com',
      phone: '(406) 555-0123',
      brokerage: 'Luxury Land Co.',
      license: 'MT-BRO-45678',
      state: 'Montana',
      status: 'Pending Verification',
      submitted: '2024-11-20 10:30 AM',
      documents: ['License Copy', 'Insurance Certificate'],
      notes: 'Specializes in ranch properties over $5M'
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      email: 'sarah.j@montanaestates.com',
      phone: '(406) 555-0124',
      brokerage: 'Montana Estates',
      license: 'MT-BRO-12345',
      state: 'Montana',
      status: 'Documents Received',
      submitted: '2024-11-19 02:15 PM',
      documents: ['License Copy', 'Insurance Certificate', 'NDA Signed', 'Consent-to-List Signed'],
      notes: 'Verified via phone call on 11/20'
    },
    { 
      id: 3, 
      name: 'Robert Martinez', 
      email: 'rmartinez@wyomingland.com',
      phone: '(307) 555-0125',
      brokerage: 'Wyoming Land Group',
      license: 'WY-BRO-98765',
      state: 'Wyoming',
      status: 'NDA Sent',
      submitted: '2024-11-18 11:45 AM',
      documents: ['License Copy', 'Insurance Certificate'],
      notes: ''
    },
  ];

  const clientRequests = [
    { 
      id: 1, 
      name: 'Patricia Williams', 
      email: 'patricia.w@familyoffice.com',
      phone: '(212) 555-0201',
      requestedBudget: 8000000,
      investmentType: 'Ranch/Agricultural',
      status: 'NDA Sent',
      submitted: '2024-11-21 09:00 AM',
      documents: ['Proof of Funds'],
      notes: 'Family office representing high-net-worth client'
    },
    { 
      id: 2, 
      name: 'James Anderson', 
      email: 'james.anderson@email.com',
      phone: '(415) 555-0202',
      requestedBudget: 5000000,
      investmentType: 'Residential Estate',
      status: 'Verification Call Complete',
      submitted: '2024-11-20 03:30 PM',
      documents: ['Proof of Funds', 'ID Verification'],
      notes: 'Looking for Montana/Wyoming properties. Verified via call.'
    },
    { 
      id: 3, 
      name: 'David Kim', 
      email: 'david.kim@techventures.com',
      phone: '(650) 555-0203',
      requestedBudget: 12000000,
      investmentType: 'Land Investment',
      status: 'Pending Call',
      submitted: '2024-11-19 01:20 PM',
      documents: [],
      notes: 'Tech entrepreneur, portfolio diversification'
    },
  ];

  const handleViewDetails = (request: any, type: string) => {
    setSelectedRequest({ ...request, type });
    setDialogOpen(true);
  };

  const handleApprove = (id: number, type: string) => {
    console.log(`Approving ${type} request #${id}`);
    // In real app: API call to approve
    setDialogOpen(false);
  };

  const handleReject = (id: number, type: string) => {
    console.log(`Rejecting ${type} request #${id}`);
    // In real app: API call to reject
    setDialogOpen(false);
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
            <h1 className="text-white mb-2">Access Approvals</h1>
            <p className="text-gray-400">Review and approve broker & client access requests</p>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] bg-[#1a1a1a] border-[#2a2a2a] text-white">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                <SelectItem value="all">All Requests</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="nda-sent">NDA Sent</SelectItem>
                <SelectItem value="docs-received">Docs Received</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Total Pending</p>
              <p className="text-white text-3xl">12</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Broker Requests</p>
              <p className="text-white text-3xl">5</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Client Requests</p>
              <p className="text-white text-3xl">7</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-red-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Over 48 Hours</p>
              <p className="text-white text-3xl">3</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Broker/Client Requests */}
        <Tabs defaultValue="broker" className="w-full">
          <TabsList className="bg-[#1a1a1a] border border-[#2a2a2a] p-1">
            <TabsTrigger 
              value="broker" 
              className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black"
            >
              <Building2 className="w-4 h-4 mr-2" />
              Broker Requests ({brokerRequests.length})
            </TabsTrigger>
            <TabsTrigger 
              value="client"
              className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black"
            >
              <Users className="w-4 h-4 mr-2" />
              Client Requests ({clientRequests.length})
            </TabsTrigger>
          </TabsList>

          {/* Broker Requests Tab */}
          <TabsContent value="broker" className="mt-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Broker Access Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                      <TableHead className="text-gray-400">Broker</TableHead>
                      <TableHead className="text-gray-400">Brokerage</TableHead>
                      <TableHead className="text-gray-400">License</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Submitted</TableHead>
                      <TableHead className="text-gray-400 text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {brokerRequests.map((request) => (
                      <TableRow key={request.id} className="border-[#2a2a2a] hover:bg-[#2a2a2a]/30">
                        <TableCell>
                          <div>
                            <p className="text-white">{request.name}</p>
                            <p className="text-gray-400 text-sm">{request.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-white">{request.brokerage}</TableCell>
                        <TableCell>
                          <div>
                            <p className="text-white">{request.license}</p>
                            <p className="text-gray-400 text-sm">{request.state}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            request.status === 'Documents Received'
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : request.status === 'NDA Sent'
                              ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                              : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                          }>
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-400 text-sm">{request.submitted}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-[#2a2a2a] hover:bg-[#2a2a2a]"
                              onClick={() => handleViewDetails(request, 'broker')}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-green-500 hover:bg-green-600 text-white"
                              onClick={() => handleApprove(request.id, 'broker')}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                              onClick={() => handleReject(request.id, 'broker')}
                            >
                              <XCircle className="w-4 h-4" />
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

          {/* Client Requests Tab */}
          <TabsContent value="client" className="mt-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Client Access Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                      <TableHead className="text-gray-400">Client</TableHead>
                      <TableHead className="text-gray-400">Requested Budget</TableHead>
                      <TableHead className="text-gray-400">Investment Type</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Submitted</TableHead>
                      <TableHead className="text-gray-400 text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientRequests.map((request) => (
                      <TableRow key={request.id} className="border-[#2a2a2a] hover:bg-[#2a2a2a]/30">
                        <TableCell>
                          <div>
                            <p className="text-white">{request.name}</p>
                            <p className="text-gray-400 text-sm">{request.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-[#d4af37]">
                          ${(request.requestedBudget / 1000000).toFixed(1)}M
                        </TableCell>
                        <TableCell className="text-white">{request.investmentType}</TableCell>
                        <TableCell>
                          <Badge className={
                            request.status === 'Verification Call Complete'
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : request.status === 'NDA Sent'
                              ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                              : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                          }>
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-400 text-sm">{request.submitted}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-[#2a2a2a] hover:bg-[#2a2a2a]"
                              onClick={() => handleViewDetails(request, 'client')}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-green-500 hover:bg-green-600 text-white"
                              onClick={() => handleApprove(request.id, 'client')}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                              onClick={() => handleReject(request.id, 'client')}
                            >
                              <XCircle className="w-4 h-4" />
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
                {selectedRequest?.type === 'broker' ? 'Broker' : 'Client'} Request Details
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Review and take action on this access request
              </DialogDescription>
            </DialogHeader>
            
            {selectedRequest && (
              <div className="space-y-6 py-4">
                {/* Contact Information */}
                <div>
                  <h3 className="text-white mb-3">Contact Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <p className="text-gray-400 text-sm mb-1">Name</p>
                      <p className="text-white">{selectedRequest.name}</p>
                    </div>
                    <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <p className="text-gray-400 text-sm mb-1">Email</p>
                      <p className="text-white text-sm">{selectedRequest.email}</p>
                    </div>
                    <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <p className="text-gray-400 text-sm mb-1">Phone</p>
                      <p className="text-white">{selectedRequest.phone}</p>
                    </div>
                    {selectedRequest.type === 'broker' ? (
                      <>
                        <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                          <p className="text-gray-400 text-sm mb-1">Brokerage</p>
                          <p className="text-white">{selectedRequest.brokerage}</p>
                        </div>
                        <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                          <p className="text-gray-400 text-sm mb-1">License #</p>
                          <p className="text-white">{selectedRequest.license}</p>
                        </div>
                        <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                          <p className="text-gray-400 text-sm mb-1">State</p>
                          <p className="text-white">{selectedRequest.state}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                          <p className="text-gray-400 text-sm mb-1">Requested Budget</p>
                          <p className="text-[#d4af37]">
                            ${(selectedRequest.requestedBudget / 1000000).toFixed(1)}M
                          </p>
                        </div>
                        <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                          <p className="text-gray-400 text-sm mb-1">Investment Type</p>
                          <p className="text-white">{selectedRequest.investmentType}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <h3 className="text-white mb-3">Documents</h3>
                  <div className="space-y-2">
                    {selectedRequest.documents.map((doc: string, idx: number) => (
                      <div 
                        key={idx}
                        className="flex items-center justify-between p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]"
                      >
                        <div className="flex items-center gap-2">
                          <FileCheck className="w-4 h-4 text-green-500" />
                          <p className="text-white">{doc}</p>
                        </div>
                        <Button size="sm" variant="outline" className="border-[#2a2a2a]">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Admin Notes */}
                <div>
                  <h3 className="text-white mb-3">Admin Notes</h3>
                  <Textarea 
                    placeholder="Add internal notes about this request..."
                    className="bg-[#0f0f0f] border-[#2a2a2a] text-white"
                    defaultValue={selectedRequest.notes}
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#2a2a2a]">
                  <Button 
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => handleApprove(selectedRequest.id, selectedRequest.type)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Access
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-[#2a2a2a] hover:bg-[#2a2a2a]"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send NDA
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    onClick={() => handleReject(selectedRequest.id, selectedRequest.type)}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
