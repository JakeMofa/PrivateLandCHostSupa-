import { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
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
  Clock,
  MessageSquare,
  AlertCircle,
  Send,
  Eye,
  UserPlus,
  Search,
  Filter
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

interface AdminSupportProps {
  onLogout: () => void;
}

export default function AdminSupport({ onLogout }: AdminSupportProps) {
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

  const sidebarItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'Approvals', path: '/admin/approvals', icon: <CheckCircle className="w-5 h-5" /> },
    { label: 'Listing Reviews', path: '/admin/listing-reviews', icon: <FileText className="w-5 h-5" /> },
    { label: 'Users & Assignments', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { label: 'Documents', path: '/admin/documents', icon: <FileCheck className="w-5 h-5" /> },
    { label: 'Analytics', path: '/admin/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'Support Tickets', path: '/admin/support', icon: <HelpCircle className="w-5 h-5" />, active: true },
    { label: 'Audit Trail', path: '/admin/audit', icon: <FileCheck className="w-5 h-5" /> },
    { label: 'System Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
    { 
      label: 'Logout', 
      path: '/', 
      icon: <LogOut className="w-5 h-5" />,
    },
  ];

  const tickets = [
    {
      id: 'TKT-1045',
      user: 'James Anderson',
      userType: 'Client',
      email: 'james.anderson@email.com',
      subject: 'Budget increase request not processing',
      category: 'Account',
      priority: 'High',
      status: 'New',
      created: '2024-11-21 10:30 AM',
      lastUpdate: '2024-11-21 10:30 AM',
      messages: [
        {
          from: 'James Anderson',
          fromType: 'Client',
          message: 'I submitted a budget increase request 3 days ago from $5M to $7.5M with updated proof of funds, but I haven\'t received any response. I\'m ready to make an offer on a property but can\'t access it due to my current cap.',
          timestamp: '2024-11-21 10:30 AM'
        }
      ]
    },
    {
      id: 'TKT-1044',
      user: 'Sarah Mitchell',
      userType: 'Broker',
      email: 'sarah.m@montanaestates.com',
      subject: 'Listing showing incorrect status',
      category: 'Listings',
      priority: 'Medium',
      status: 'In Progress',
      assignedTo: 'Admin Team',
      created: '2024-11-20 02:15 PM',
      lastUpdate: '2024-11-21 09:00 AM',
      messages: [
        {
          from: 'Sarah Mitchell',
          fromType: 'Broker',
          message: 'My Highland Ranch listing (ID: LST-456) is showing as "Pending Review" but I received an approval email yesterday. Clients cannot see it in the marketplace.',
          timestamp: '2024-11-20 02:15 PM'
        },
        {
          from: 'Admin',
          fromType: 'Admin',
          message: 'Thank you for reporting this. We\'re investigating a caching issue with listing statuses. I\'ve manually refreshed your listing and it should now show as "Approved" within the next hour.',
          timestamp: '2024-11-21 09:00 AM'
        },
        {
          from: 'Sarah Mitchell',
          fromType: 'Broker',
          message: 'Confirmed! It\'s now showing correctly. Thank you!',
          timestamp: '2024-11-21 09:15 AM'
        }
      ]
    },
    {
      id: 'TKT-1043',
      user: 'Patricia Williams',
      userType: 'Client',
      email: 'patricia.w@familyoffice.com',
      subject: 'Cannot download NDA documents',
      category: 'Documents',
      priority: 'High',
      status: 'New',
      created: '2024-11-21 08:45 AM',
      lastUpdate: '2024-11-21 08:45 AM',
      messages: [
        {
          from: 'Patricia Williams',
          fromType: 'Client',
          message: 'I\'m trying to download my signed NDA for the Coastal Vineyard property but getting a "File not found" error. My attorney needs this urgently for our due diligence review.',
          timestamp: '2024-11-21 08:45 AM'
        }
      ]
    },
    {
      id: 'TKT-1042',
      user: 'Michael Chen',
      userType: 'Broker',
      email: 'michael.chen@luxuryland.com',
      subject: 'Question about Consent-to-List requirements',
      category: 'Compliance',
      priority: 'Low',
      status: 'Resolved',
      assignedTo: 'Compliance Team',
      created: '2024-11-19 11:20 AM',
      lastUpdate: '2024-11-19 03:45 PM',
      messages: [
        {
          from: 'Michael Chen',
          fromType: 'Broker',
          message: 'Do I need a separate Consent-to-List for each property, or can one document cover multiple listings from the same landowner?',
          timestamp: '2024-11-19 11:20 AM'
        },
        {
          from: 'Admin',
          fromType: 'Admin',
          message: 'Great question! Each property requires its own Consent-to-List document with the specific property details (address, acreage, legal description). This is for legal clarity and audit compliance. However, if the landowner has multiple contiguous parcels being listed together as one offering, a single consent covering all parcels is acceptable.',
          timestamp: '2024-11-19 03:45 PM'
        }
      ]
    },
    {
      id: 'TKT-1041',
      user: 'Robert Lee',
      userType: 'Broker',
      email: 'robert.lee@wyomingland.com',
      subject: 'Lead not showing in my dashboard',
      category: 'Leads',
      priority: 'Medium',
      status: 'In Progress',
      assignedTo: 'Tech Support',
      created: '2024-11-20 04:30 PM',
      lastUpdate: '2024-11-21 10:00 AM',
      messages: [
        {
          from: 'Robert Lee',
          fromType: 'Broker',
          message: 'A client called me saying they submitted an interest form on my Mountain Retreat property 2 days ago, but I don\'t see any lead in my dashboard. Their name is David Kim.',
          timestamp: '2024-11-20 04:30 PM'
        },
        {
          from: 'Admin',
          fromType: 'Admin',
          message: 'I found the issue - the lead was created but didn\'t assign to your broker ID due to a data sync error. I\'ve manually assigned it and you should see it now. Apologies for the delay!',
          timestamp: '2024-11-21 10:00 AM'
        }
      ]
    },
  ];

  const handleViewTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setDialogOpen(true);
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    
    console.log('Sending reply:', replyText, 'to ticket:', selectedTicket?.id);
    // In real app: API call to add message and send email
    
    setReplyText('');
  };

  const handleUpdateStatus = (ticketId: string, newStatus: string) => {
    console.log('Updating ticket', ticketId, 'to status:', newStatus);
    // In real app: API call
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
            <h1 className="text-white mb-2">Support Tickets</h1>
            <p className="text-gray-400">Manage user help requests and support tickets</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input 
                placeholder="Search tickets..." 
                className="pl-10 bg-[#1a1a1a] border-[#2a2a2a] text-white w-64"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] bg-[#1a1a1a] border-[#2a2a2a] text-white">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                <SelectItem value="all">All Tickets</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mb-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">New Tickets</p>
              <p className="text-white text-3xl">8</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">In Progress</p>
              <p className="text-white text-3xl">12</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mb-3">
                <AlertCircle className="w-5 h-5 text-orange-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">High Priority</p>
              <p className="text-white text-3xl">5</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mb-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Resolved Today</p>
              <p className="text-white text-3xl">23</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mb-3">
                <MessageSquare className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Avg Response</p>
              <p className="text-white text-2xl">2.5h</p>
            </CardContent>
          </Card>
        </div>

        {/* Tickets Table */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">All Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                  <TableHead className="text-gray-400">Ticket ID</TableHead>
                  <TableHead className="text-gray-400">User</TableHead>
                  <TableHead className="text-gray-400">Subject</TableHead>
                  <TableHead className="text-gray-400">Category</TableHead>
                  <TableHead className="text-gray-400">Priority</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Created</TableHead>
                  <TableHead className="text-gray-400 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id} className="border-[#2a2a2a] hover:bg-[#2a2a2a]/30">
                    <TableCell className="text-[#d4af37]">{ticket.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-white">{ticket.user}</p>
                        <p className="text-gray-400 text-sm">{ticket.userType}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-white max-w-xs truncate">{ticket.subject}</TableCell>
                    <TableCell>
                      <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
                        {ticket.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={
                        ticket.priority === 'High'
                          ? 'bg-red-500/20 text-red-400 border-red-500/30'
                          : ticket.priority === 'Medium'
                          ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                          : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                      }>
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={
                        ticket.status === 'New'
                          ? 'bg-red-500/20 text-red-400 border-red-500/30'
                          : ticket.status === 'In Progress'
                          ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          : 'bg-green-500/20 text-green-400 border-green-500/30'
                      }>
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-400 text-sm">{ticket.created}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-[#2a2a2a] hover:bg-[#2a2a2a]"
                          onClick={() => handleViewTicket(ticket)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Ticket Detail Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center justify-between">
                <span>Ticket {selectedTicket?.id}</span>
                <Badge className={
                  selectedTicket?.status === 'New'
                    ? 'bg-red-500/20 text-red-400 border-red-500/30'
                    : selectedTicket?.status === 'In Progress'
                    ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    : 'bg-green-500/20 text-green-400 border-green-500/30'
                }>
                  {selectedTicket?.status}
                </Badge>
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                {selectedTicket?.subject}
              </DialogDescription>
            </DialogHeader>
            
            {selectedTicket && (
              <div className="space-y-6 py-4">
                {/* User Info */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <p className="text-gray-400 text-sm mb-1">User</p>
                    <p className="text-white">{selectedTicket.user}</p>
                    <p className="text-gray-500 text-sm">{selectedTicket.userType}</p>
                  </div>
                  <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <p className="text-gray-400 text-sm mb-1">Category</p>
                    <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
                      {selectedTicket.category}
                    </Badge>
                  </div>
                  <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <p className="text-gray-400 text-sm mb-1">Priority</p>
                    <Badge className={
                      selectedTicket.priority === 'High'
                        ? 'bg-red-500/20 text-red-400 border-red-500/30'
                        : selectedTicket.priority === 'Medium'
                        ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                        : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    }>
                      {selectedTicket.priority}
                    </Badge>
                  </div>
                </div>

                {/* Message Thread */}
                <div>
                  <h3 className="text-white mb-3 text-lg">Message Thread</h3>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {selectedTicket.messages.map((msg: any, idx: number) => (
                      <div 
                        key={idx}
                        className={`p-4 rounded-lg border ${
                          msg.fromType === 'Admin'
                            ? 'bg-[#d4af37]/5 border-[#d4af37]/30 ml-8'
                            : 'bg-[#0f0f0f] border-[#2a2a2a] mr-8'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full ${
                              msg.fromType === 'Admin' 
                                ? 'bg-[#d4af37]/20 border border-[#d4af37]' 
                                : 'bg-purple-500/20 border border-purple-500'
                            } flex items-center justify-center`}>
                              <span className={msg.fromType === 'Admin' ? 'text-[#d4af37]' : 'text-purple-400'}>
                                {msg.from.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="text-white text-sm">{msg.from}</p>
                              <p className="text-gray-500 text-xs">{msg.fromType}</p>
                            </div>
                          </div>
                          <p className="text-gray-500 text-xs">{msg.timestamp}</p>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reply Box */}
                <div>
                  <h3 className="text-white mb-3 text-lg">Send Reply</h3>
                  <Textarea 
                    placeholder="Type your response to the user..."
                    className="bg-[#0f0f0f] border-[#2a2a2a] text-white min-h-[100px] mb-3"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <div className="flex items-center gap-3">
                    <Button 
                      className="bg-[#d4af37] hover:bg-[#b8941f] text-black"
                      onClick={handleSendReply}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Reply (User will receive email)
                    </Button>
                    <Select 
                      value={selectedTicket.status}
                      onValueChange={(value) => handleUpdateStatus(selectedTicket.id, value)}
                    >
                      <SelectTrigger className="w-[200px] bg-[#0f0f0f] border-[#2a2a2a] text-white">
                        <SelectValue placeholder="Update status" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
