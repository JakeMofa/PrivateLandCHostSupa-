import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Home, Users, FileText, UserCircle, HelpCircle, LogOut, Download, Eye, Shield, CheckCircle, Clock } from 'lucide-react';
import { Badge } from './ui/badge';

interface BrokerNDAsProps {
  onLogout: () => void;
}

export default function BrokerNDAs({ onLogout }: BrokerNDAsProps) {
  const navigate = useNavigate();

  const sidebarItems = [
    { label: 'Dashboard', path: '/broker/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'My Listings', path: '/broker/listings', icon: <Home className="w-5 h-5" /> },
    { label: 'Add Listing', path: '/broker/add-listing', icon: <Home className="w-5 h-5" /> },
    { label: 'Leads', path: '/broker/leads', icon: <Users className="w-5 h-5" /> },
    { label: "My Buyer's List", path: '/broker/buyers', icon: <Users className="w-5 h-5" /> },
    { label: 'My Contracts', path: '/broker/contracts', icon: <FileText className="w-5 h-5" /> },
    { label: 'My NDAs', path: '/broker/ndas', icon: <FileText className="w-5 h-5" />, active: true },
    { label: 'Invitations', path: '/broker/invitations', icon: <FileText className="w-5 h-5" /> },
    { label: 'Marketplace', path: '/broker/marketplace', icon: <Home className="w-5 h-5" /> },
    { label: 'My Documents', path: '/broker/documents', icon: <FileText className="w-5 h-5" /> },
    { label: 'My Profile', path: '/broker/profile', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Account', path: '/broker/account', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Settings', path: '/broker/settings', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Request Help', path: '/broker/help', icon: <HelpCircle className="w-5 h-5" /> },
    { label: 'Logout', path: '/', icon: <LogOut className="w-5 h-5" /> },
  ];

  const ndas = [
    {
      id: 1,
      buyerName: 'James Anderson',
      buyerEmail: 'james.anderson@email.com',
      propertyName: 'Highland Ranch Estate',
      propertyLocation: 'Montana',
      signedDate: '2024-11-15',
      expirationDate: '2025-11-15',
      status: 'Active',
      documentId: 'NDA-2024-001'
    },
    {
      id: 2,
      buyerName: 'Patricia Chen',
      buyerEmail: 'patricia.chen@email.com',
      propertyName: 'Wine Country Estate',
      propertyLocation: 'Napa Valley, CA',
      signedDate: '2024-11-10',
      expirationDate: '2025-11-10',
      status: 'Active',
      documentId: 'NDA-2024-002'
    },
    {
      id: 3,
      buyerName: 'Robert Williams',
      buyerEmail: 'robert.williams@email.com',
      propertyName: 'Coastal Villa',
      propertyLocation: 'California',
      signedDate: '2024-11-05',
      expirationDate: '2025-11-05',
      status: 'Active',
      documentId: 'NDA-2024-003'
    },
    {
      id: 4,
      buyerName: 'Maria Rodriguez',
      buyerEmail: 'maria.rodriguez@email.com',
      propertyName: 'Mountain Retreat',
      propertyLocation: 'Colorado',
      signedDate: '2024-10-20',
      expirationDate: '2025-10-20',
      status: 'Active',
      documentId: 'NDA-2024-004'
    },
    {
      id: 5,
      buyerName: 'David Thompson',
      buyerEmail: 'david.thompson@email.com',
      propertyName: 'Lakefront Paradise',
      propertyLocation: 'Texas',
      signedDate: '2024-09-15',
      expirationDate: '2024-11-18',
      status: 'Expiring Soon',
      documentId: 'NDA-2024-005'
    },
    {
      id: 6,
      buyerName: 'Jennifer Martinez',
      buyerEmail: 'jennifer.martinez@email.com',
      propertyName: 'Desert Sanctuary',
      propertyLocation: 'Arizona',
      signedDate: '2024-08-01',
      expirationDate: '2024-11-10',
      status: 'Expired',
      documentId: 'NDA-2024-006'
    },
  ];

  const stats = [
    { label: 'Total NDAs', value: ndas.length, color: 'text-white' },
    { label: 'Active', value: ndas.filter(n => n.status === 'Active').length, color: 'text-green-400' },
    { label: 'Expiring Soon', value: ndas.filter(n => n.status === 'Expiring Soon').length, color: 'text-yellow-400' },
    { label: 'Expired', value: ndas.filter(n => n.status === 'Expired').length, color: 'text-red-400' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>;
      case 'Expiring Soon':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Expiring Soon</Badge>;
      case 'Expired':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Expired</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
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
          <h1 className="text-white mb-2">My NDAs</h1>
          <p className="text-gray-400">Track and manage all non-disclosure agreements</p>
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

        {/* NDAs List */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-[#d4af37]" />
                <CardTitle className="text-white">All NDAs</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ndas.map((nda) => (
                <Card key={nda.id} className="bg-black/50 border-[#2a2a2a] hover:border-[#d4af37]/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* NDA Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-white text-lg">{nda.buyerName}</h3>
                          {getStatusBadge(nda.status)}
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-gray-500 mb-1">Property</p>
                            <p className="text-gray-300">{nda.propertyName}</p>
                            <p className="text-gray-500 text-xs">{nda.propertyLocation}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Buyer Contact</p>
                            <p className="text-gray-300">{nda.buyerEmail}</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-3 text-sm mt-3 pt-3 border-t border-[#2a2a2a]">
                          <div>
                            <p className="text-gray-500 mb-1">Document ID</p>
                            <p className="text-gray-300">{nda.documentId}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Signed Date</p>
                            <p className="text-gray-300">{nda.signedDate}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Expiration Date</p>
                            <p className={nda.status === 'Expired' ? 'text-red-400' : nda.status === 'Expiring Soon' ? 'text-yellow-400' : 'text-gray-300'}>
                              {nda.expirationDate}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 md:w-48">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View NDA
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-gray-500 text-gray-400 hover:bg-gray-500 hover:text-white"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        {nda.status === 'Expiring Soon' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black"
                          >
                            <Clock className="w-4 h-4 mr-2" />
                            Request Renewal
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
              <Shield className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-blue-400 mb-2">About NDAs</p>
                <p className="text-gray-300 text-sm mb-2">
                  Non-Disclosure Agreements protect your clients' confidentiality when viewing sensitive property information.
                </p>
                <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
                  <li>NDAs are automatically sent when buyers express interest</li>
                  <li>Buyers must sign before accessing full property details</li>
                  <li>Standard NDAs are valid for 12 months</li>
                  <li>You'll be notified when NDAs are expiring or expired</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
