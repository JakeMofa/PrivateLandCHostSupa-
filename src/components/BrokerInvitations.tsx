import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Home, Users, FileText, UserCircle, HelpCircle, LogOut, Send, Mail, CheckCircle, Clock, XCircle, Eye, Trash2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface BrokerInvitationsProps {
  onLogout: () => void;
}

export default function BrokerInvitations({ onLogout }: BrokerInvitationsProps) {
  const navigate = useNavigate();
  const [showInviteForm, setShowInviteForm] = useState(false);

  const sidebarItems = [
    { label: 'Dashboard', path: '/broker/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'My Listings', path: '/broker/listings', icon: <Home className="w-5 h-5" /> },
    { label: 'Add Listing', path: '/broker/add-listing', icon: <Home className="w-5 h-5" /> },
    { label: 'Leads', path: '/broker/leads', icon: <Users className="w-5 h-5" /> },
    { label: "My Buyer's List", path: '/broker/buyers', icon: <Users className="w-5 h-5" /> },
    { label: 'My Contracts', path: '/broker/contracts', icon: <FileText className="w-5 h-5" /> },
    { label: 'My NDAs', path: '/broker/ndas', icon: <FileText className="w-5 h-5" /> },
    { label: 'Invitations', path: '/broker/invitations', icon: <FileText className="w-5 h-5" />, active: true },
    { label: 'Marketplace', path: '/broker/marketplace', icon: <Home className="w-5 h-5" /> },
    { label: 'My Documents', path: '/broker/documents', icon: <FileText className="w-5 h-5" /> },
    { label: 'My Profile', path: '/broker/profile', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Account', path: '/broker/account', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Settings', path: '/broker/settings', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Request Help', path: '/broker/help', icon: <HelpCircle className="w-5 h-5" /> },
    { label: 'Logout', path: '/', icon: <LogOut className="w-5 h-5" /> },
  ];

  const invitations = [
    {
      id: 1,
      recipientName: 'Sarah Johnson',
      recipientEmail: 'sarah.johnson@email.com',
      propertyName: 'Highland Ranch Estate',
      propertyLocation: 'Montana',
      sentDate: '2024-11-18',
      status: 'Pending',
      message: 'Exclusive opportunity that matches your investment criteria.'
    },
    {
      id: 2,
      recipientName: 'Michael Chen',
      recipientEmail: 'michael.chen@email.com',
      propertyName: 'Wine Country Estate',
      propertyLocation: 'Napa Valley, CA',
      sentDate: '2024-11-15',
      status: 'Viewed',
      message: 'Premium vineyard estate with exceptional returns.'
    },
    {
      id: 3,
      recipientName: 'Emily Rodriguez',
      recipientEmail: 'emily.rodriguez@email.com',
      propertyName: 'Coastal Villa',
      propertyLocation: 'California',
      sentDate: '2024-11-12',
      status: 'Accepted',
      message: 'Stunning waterfront property matching your preferences.'
    },
    {
      id: 4,
      recipientName: 'David Williams',
      recipientEmail: 'david.williams@email.com',
      propertyName: 'Mountain Retreat',
      propertyLocation: 'Colorado',
      sentDate: '2024-11-10',
      status: 'Accepted',
      message: 'Rare mountain estate opportunity.'
    },
    {
      id: 5,
      recipientName: 'Jennifer Martinez',
      recipientEmail: 'jennifer.martinez@email.com',
      propertyName: 'Lakefront Paradise',
      propertyLocation: 'Texas',
      sentDate: '2024-11-05',
      status: 'Declined',
      message: 'Exclusive lakefront opportunity.'
    },
    {
      id: 6,
      recipientName: 'Robert Thompson',
      recipientEmail: 'robert.thompson@email.com',
      propertyName: 'Desert Sanctuary',
      propertyLocation: 'Arizona',
      sentDate: '2024-10-28',
      status: 'Expired',
      message: 'Private desert estate with modern amenities.'
    },
  ];

  const stats = [
    { label: 'Total Sent', value: invitations.length, color: 'text-white' },
    { label: 'Pending', value: invitations.filter(i => i.status === 'Pending').length, color: 'text-yellow-400' },
    { label: 'Accepted', value: invitations.filter(i => i.status === 'Accepted').length, color: 'text-green-400' },
    { label: 'Declined', value: invitations.filter(i => i.status === 'Declined').length, color: 'text-red-400' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'Viewed':
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Eye className="w-3 h-3 mr-1" />
            Viewed
          </Badge>
        );
      case 'Accepted':
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            Accepted
          </Badge>
        );
      case 'Declined':
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <XCircle className="w-3 h-3 mr-1" />
            Declined
          </Badge>
        );
      case 'Expired':
        return (
          <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
            <XCircle className="w-3 h-3 mr-1" />
            Expired
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleSendInvitation = () => {
    alert('Invitation sent successfully!');
    setShowInviteForm(false);
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole="broker" 
      userName="Michael Rivers"
      onLogout={onLogout}
    >
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white mb-2">Invitations</h1>
            <p className="text-gray-400">Send exclusive property invitations to potential buyers</p>
          </div>
          <Button
            className="bg-[#d4af37] hover:bg-[#c19b2b] text-black"
            onClick={() => setShowInviteForm(!showInviteForm)}
          >
            <Send className="w-4 h-4 mr-2" />
            Send New Invitation
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <Card key={idx} className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardContent className="pt-6">
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className={`text-3xl ${stat.color}`}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* New Invitation Form */}
        {showInviteForm && (
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-[#d4af37]" />
                <CardTitle className="text-white">Send New Invitation</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="recipient-name" className="text-gray-400 text-sm">Recipient Name *</Label>
                  <Input
                    id="recipient-name"
                    placeholder="John Doe"
                    className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <Label htmlFor="recipient-email" className="text-gray-400 text-sm">Email Address *</Label>
                  <Input
                    id="recipient-email"
                    type="email"
                    placeholder="john.doe@email.com"
                    className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="property-select" className="text-gray-400 text-sm">Select Property *</Label>
                <Select>
                  <SelectTrigger id="property-select" className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white">
                    <SelectValue placeholder="Choose a property" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    <SelectItem value="1">Highland Ranch Estate - Montana</SelectItem>
                    <SelectItem value="2">Wine Country Estate - Napa Valley</SelectItem>
                    <SelectItem value="3">Coastal Villa - California</SelectItem>
                    <SelectItem value="4">Mountain Retreat - Colorado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="invitation-message" className="text-gray-400 text-sm">Personal Message</Label>
                <Textarea
                  id="invitation-message"
                  placeholder="Add a personal message to your invitation..."
                  className="mt-2 min-h-[100px] bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  className="border-gray-500 text-gray-400 hover:bg-gray-500 hover:text-white"
                  onClick={() => setShowInviteForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-[#d4af37] hover:bg-[#c19b2b] text-black"
                  onClick={handleSendInvitation}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Invitation
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Invitations List */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-[#d4af37]" />
              <CardTitle className="text-white">Sent Invitations</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invitations.map((invitation) => (
                <Card key={invitation.id} className="bg-black/50 border-[#2a2a2a] hover:border-[#d4af37]/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Invitation Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-white text-lg">{invitation.recipientName}</h3>
                          {getStatusBadge(invitation.status)}
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-3 text-sm mb-3">
                          <div>
                            <p className="text-gray-500 mb-1">Property</p>
                            <p className="text-gray-300">{invitation.propertyName}</p>
                            <p className="text-gray-500 text-xs">{invitation.propertyLocation}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Email</p>
                            <p className="text-gray-300">{invitation.recipientEmail}</p>
                          </div>
                        </div>

                        <div className="border-t border-[#2a2a2a] pt-3 mt-3">
                          <p className="text-gray-500 text-sm mb-1">Message</p>
                          <p className="text-gray-300 text-sm">{invitation.message}</p>
                        </div>

                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                          <span>Sent: {invitation.sentDate}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 md:w-48">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                          onClick={() => navigate(`/broker/listings`)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Property
                        </Button>
                        {invitation.status === 'Pending' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Resend
                          </Button>
                        )}
                        {(invitation.status === 'Expired' || invitation.status === 'Declined') && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/30">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-blue-400 mb-2">About Invitations</p>
                <p className="text-gray-300 text-sm mb-2">
                  Send exclusive property invitations to qualified buyers for invite-only listings.
                </p>
                <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
                  <li>Invitations are sent via email with a unique access link</li>
                  <li>Recipients must create an account to view the property</li>
                  <li>Track invitation status in real-time</li>
                  <li>Invitations expire after 30 days if not accepted</li>
                  <li>Personalize each invitation with a custom message</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
