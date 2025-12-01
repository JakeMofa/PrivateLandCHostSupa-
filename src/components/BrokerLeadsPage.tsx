import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Home, Users, FileText, UserCircle, HelpCircle, LogOut, Mail, Phone, Calendar, DollarSign, Tag, MessageCircle, ExternalLink } from 'lucide-react';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import { useState } from 'react';

interface BrokerLeadsPageProps {
  onLogout: () => void;
}

export default function BrokerLeadsPage({ onLogout }: BrokerLeadsPageProps) {
  const navigate = useNavigate();
  const [selectedLead, setSelectedLead] = useState<number | null>(null);
  const [notes, setNotes] = useState('');

  const sidebarItems = [
    { label: 'Dashboard', path: '/broker/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'My Listings', path: '/broker/listings', icon: <Home className="w-5 h-5" /> },
    { label: 'Add Listing', path: '/broker/add-listing', icon: <Home className="w-5 h-5" /> },
    { label: 'Leads', path: '/broker/leads', icon: <Users className="w-5 h-5" />, active: true },
    { label: "My Buyer's List", path: '/broker/buyers', icon: <Users className="w-5 h-5" /> },
    { label: 'My Contracts', path: '/broker/contracts', icon: <FileText className="w-5 h-5" /> },
    { label: 'My NDAs', path: '/broker/ndas', icon: <FileText className="w-5 h-5" /> },
    { label: 'Invitations', path: '/broker/invitations', icon: <FileText className="w-5 h-5" /> },
    { label: 'Marketplace', path: '/broker/marketplace', icon: <Home className="w-5 h-5" /> },
    { label: 'My Profile', path: '/broker/profile', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Account', path: '/broker/account', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Settings', path: '/broker/settings', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Request Help', path: '/broker/help', icon: <HelpCircle className="w-5 h-5" /> },
    { label: 'Logout', path: '/', icon: <LogOut className="w-5 h-5" /> },
  ];

  const leads = [
    {
      id: 1,
      investorName: 'James Anderson',
      email: 'james.anderson@email.com',
      phone: '+1 (555) 123-4567',
      listingTitle: 'Highland Ranch Estate',
      budgetCap: 5000000,
      source: 'Marketplace',
      calendlyStatus: 'Booked',
      meetingDate: 'Nov 25, 2024 - 2:00 PM',
      leadStage: 'In Discussion',
      createdAt: 'Nov 20, 2024',
      status: 'hot'
    },
    {
      id: 2,
      investorName: 'Emily Chen',
      email: 'emily.chen@email.com',
      phone: '+1 (555) 234-5678',
      listingTitle: 'Mountain Retreat',
      budgetCap: 8000000,
      source: 'Invitation',
      calendlyStatus: 'Pending',
      meetingDate: null,
      leadStage: 'New',
      createdAt: 'Nov 21, 2024',
      status: 'new'
    },
    {
      id: 3,
      investorName: 'Robert Thompson',
      email: 'robert.t@email.com',
      phone: '+1 (555) 345-6789',
      listingTitle: 'Wine Country Estate',
      budgetCap: 15000000,
      source: 'Saved Search',
      calendlyStatus: 'Booked',
      meetingDate: 'Nov 22, 2024 - 10:00 AM',
      leadStage: 'Under Review',
      createdAt: 'Nov 18, 2024',
      status: 'warm'
    },
    {
      id: 4,
      investorName: 'Sarah Williams',
      email: 'sarah.w@email.com',
      phone: '+1 (555) 456-7890',
      listingTitle: 'Highland Ranch Estate',
      budgetCap: 6500000,
      source: 'Marketplace',
      calendlyStatus: 'Completed',
      meetingDate: 'Nov 19, 2024 - 3:00 PM',
      leadStage: 'Offer Out',
      createdAt: 'Nov 15, 2024',
      status: 'hot'
    },
    {
      id: 5,
      investorName: 'Michael Davis',
      email: 'michael.d@email.com',
      phone: '+1 (555) 567-8901',
      listingTitle: 'Coastal Villa',
      budgetCap: 10000000,
      source: 'Invitation',
      calendlyStatus: 'No Response',
      meetingDate: null,
      leadStage: 'Contacted',
      createdAt: 'Nov 16, 2024',
      status: 'cold'
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getLeadStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      hot: 'bg-red-500/20 text-red-400 border-red-500/30',
      warm: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      cold: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    };
    return colors[status] || colors.cold;
  };

  const getCalendlyStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Booked': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Completed': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Pending': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'No Response': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    };
    return colors[status] || colors['No Response'];
  };

  const leadStages = ['New', 'Contacted', 'In Discussion', 'Under Review', 'Offer Out', 'Under Contract', 'Closed', 'Lost'];

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.leadStage === 'New').length,
    inProgress: leads.filter(l => ['Contacted', 'In Discussion', 'Under Review'].includes(l.leadStage)).length,
    hot: leads.filter(l => l.status === 'hot').length,
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole="broker" 
      userName="Michael Rivers"
      onLogout={onLogout}
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-white mb-2">Leads</h1>
          <p className="text-gray-400">Manage investor inquiries and track progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Total Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-3xl">{stats.total}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">New Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-3xl">{stats.new}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-3xl">{stats.inProgress}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Hot Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-3xl">{stats.hot}</p>
            </CardContent>
          </Card>
        </div>

        {/* Leads List */}
        <div className="space-y-6">
          {leads.map((lead) => (
            <Card key={lead.id} className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-[#d4af37]/50 transition-colors">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white text-xl">{lead.investorName}</h3>
                        <Badge className={getLeadStatusColor(lead.status)}>
                          {lead.status.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="border-[#d4af37] text-[#d4af37]">
                          {lead.leadStage}
                        </Badge>
                      </div>
                      <p className="text-gray-400 mb-2">Interested in: <span className="text-white">{lead.listingTitle}</span></p>
                      <p className="text-gray-500 text-sm">Lead created: {lead.createdAt}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm mb-1">Budget Cap</p>
                      <p className="text-[#d4af37] text-xl">{formatPrice(lead.budgetCap)}</p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid md:grid-cols-3 gap-4 pb-4 border-b border-[#2a2a2a]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-[#d4af37]" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Email</p>
                        <p className="text-white text-sm">{lead.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-[#d4af37]" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Phone</p>
                        <p className="text-white text-sm">{lead.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                        <Tag className="w-5 h-5 text-[#d4af37]" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Source</p>
                        <p className="text-white text-sm">{lead.source}</p>
                      </div>
                    </div>
                  </div>

                  {/* Calendly Status */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#2a2a2a]">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-[#d4af37]" />
                      <div>
                        <p className="text-gray-400 text-sm">Calendly Status</p>
                        <Badge className={getCalendlyStatusColor(lead.calendlyStatus)}>
                          {lead.calendlyStatus}
                        </Badge>
                      </div>
                    </div>
                    {lead.meetingDate && (
                      <div className="text-right">
                        <p className="text-gray-400 text-sm">Meeting Scheduled</p>
                        <p className="text-white">{lead.meetingDate}</p>
                      </div>
                    )}
                  </div>

                  {/* Lead Stage Management */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <label className="text-gray-400 text-sm min-w-[120px]">Update Stage:</label>
                      <Select defaultValue={lead.leadStage}>
                        <SelectTrigger className="bg-[#0f0f0f] border-[#2a2a2a] text-white max-w-[200px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                          {leadStages.map((stage) => (
                            <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Notes Section */}
                    {selectedLead === lead.id && (
                      <div className="space-y-2">
                        <label className="text-gray-400 text-sm">Notes / Follow-up:</label>
                        <Textarea
                          placeholder="Add notes about this lead..."
                          className="min-h-[80px] bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                        />
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button
                      variant="outline"
                      className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                      onClick={() => setSelectedLead(selectedLead === lead.id ? null : lead.id)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {selectedLead === lead.id ? 'Hide Details' : 'Add Notes'}
                    </Button>
                    <Button
                      variant="outline"
                      className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button
                      variant="outline"
                      className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                    {lead.calendlyStatus === 'Pending' && (
                      <Button
                        className="bg-[#d4af37] hover:bg-[#c19b2b] text-black"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Send Calendly Link
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
