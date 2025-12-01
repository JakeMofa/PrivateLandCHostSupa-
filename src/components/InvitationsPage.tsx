import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Home, Heart, UserCircle, FileText, HelpCircle, LogOut, Mail, Eye, Clock, MapPin, DollarSign, Home as HomeIcon } from 'lucide-react';
import { Badge } from './ui/badge';

interface InvitationsPageProps {
  onLogout: () => void;
}

export default function InvitationsPage({ onLogout }: InvitationsPageProps) {
  const navigate = useNavigate();

  const sidebarItems = [
    { label: 'Dashboard', path: '/client/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'My Profile', path: '/client/profile', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Marketplace', path: '/client/marketplace', icon: <Home className="w-5 h-5" /> },
    { label: 'Saved Properties', path: '/client/saved', icon: <Heart className="w-5 h-5" /> },
    { label: 'My Agent', path: '/client/agent', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Invitations', path: '/client/invitations', icon: <Mail className="w-5 h-5" />, active: true },
    { label: 'My Documents', path: '/client/documents', icon: <FileText className="w-5 h-5" /> },
    { label: 'Account', path: '/client/account', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Settings', path: '/client/settings', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Request Help', path: '/client/help', icon: <HelpCircle className="w-5 h-5" /> },
    { 
      label: 'Logout', 
      path: '/', 
      icon: <LogOut className="w-5 h-5" />,
    },
  ];

  const invitations = [
    {
      id: 1,
      property: 'Sunset Ridge Estate',
      location: 'Aspen, Colorado',
      price: '$8,500,000',
      acres: '45 acres',
      bedrooms: 6,
      bathrooms: 8,
      type: 'Broker Invitation',
      agentName: 'Sarah Mitchell',
      date: 'Nov 20, 2024',
      status: 'new',
      note: 'Exclusive off-market opportunity matching your preferences',
      aboveBudget: true
    },
    {
      id: 2,
      property: 'Coastal Paradise',
      location: 'Malibu, California',
      price: '$12,000,000',
      acres: '3 acres',
      bedrooms: 5,
      bathrooms: 6,
      type: 'Private Listing',
      agentName: 'Sarah Mitchell',
      date: 'Nov 18, 2024',
      status: 'viewed',
      note: 'Premium waterfront property with private beach access',
      aboveBudget: true
    },
    {
      id: 3,
      property: 'Mountain View Ranch',
      location: 'Jackson Hole, Wyoming',
      price: '$4,200,000',
      acres: '120 acres',
      bedrooms: 4,
      bathrooms: 5,
      type: 'Broker Invitation',
      agentName: 'Sarah Mitchell',
      date: 'Nov 15, 2024',
      status: 'viewed',
      note: 'Working ranch with mountain views and river access',
      aboveBudget: false
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
          <h1 className="text-white mb-2">Invitations</h1>
          <p className="text-gray-400">Private and broker-shared exclusive listings</p>
        </div>

        {/* Info Banner */}
        <Card className="bg-gradient-to-br from-[#d4af37]/10 to-[#c19b2b]/5 border-[#d4af37]/30">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-[#d4af37]" />
              </div>
              <div>
                <h3 className="text-white mb-2">About Invitations</h3>
                <p className="text-gray-300 mb-2">
                  Your agent can share exclusive, off-market, or invite-only listings with you. These properties may be above your pre-approved budget.
                </p>
                <p className="text-gray-300">
                  To proceed with properties above your budget, you can request a budget increase in your Account settings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Total Invitations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-3xl">{invitations.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">New Invitations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-3xl">{invitations.filter(i => i.status === 'new').length}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Above Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-3xl">{invitations.filter(i => i.aboveBudget).length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Invitations List */}
        <div className="space-y-6">
          {invitations.map((invitation) => (
            <Card key={invitation.id} className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-[#d4af37]/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Property Image Placeholder */}
                  <div className="w-full lg:w-64 h-48 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-lg flex items-center justify-center flex-shrink-0">
                    <HomeIcon className="w-16 h-16 text-gray-600" />
                  </div>

                  {/* Property Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-white text-xl">{invitation.property}</h3>
                          {invitation.status === 'new' && (
                            <Badge className="bg-[#d4af37] text-black">New</Badge>
                          )}
                          {invitation.aboveBudget && (
                            <Badge variant="outline" className="border-amber-500 text-amber-500">Above Budget</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{invitation.location}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className="border-[#d4af37] text-[#d4af37]">
                            {invitation.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[#d4af37] text-2xl mb-1">{invitation.price}</p>
                        <p className="text-gray-400 text-sm">{invitation.acres}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
                      <span>{invitation.bedrooms} beds</span>
                      <span>•</span>
                      <span>{invitation.bathrooms} baths</span>
                    </div>

                    <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-1">Note from {invitation.agentName}:</p>
                      <p className="text-white">{invitation.note}</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>Invited on {invitation.date}</span>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                          onClick={() => navigate(`/client/listing/${invitation.id}`)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        {invitation.aboveBudget && (
                          <Button
                            className="bg-[#d4af37] hover:bg-[#c19b2b] text-black"
                            onClick={() => navigate('/client/account')}
                          >
                            <DollarSign className="w-4 h-4 mr-2" />
                            Request Budget Increase
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {invitations.length === 0 && (
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="py-12 text-center">
              <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-white mb-2">No Invitations Yet</h3>
              <p className="text-gray-400">
                Your agent will share exclusive listings with you as they become available.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
