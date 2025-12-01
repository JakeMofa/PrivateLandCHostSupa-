import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Home, Users, FileText, UserCircle, HelpCircle, LogOut, Download, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Badge } from './ui/badge';

interface BrokerContractsPageProps {
  onLogout: () => void;
}

export default function BrokerContractsPage({ onLogout }: BrokerContractsPageProps) {
  const navigate = useNavigate();

  const sidebarItems = [
    { label: 'Dashboard', path: '/broker/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'My Listings', path: '/broker/listings', icon: <Home className="w-5 h-5" /> },
    { label: 'Add Listing', path: '/broker/add-listing', icon: <Home className="w-5 h-5" /> },
    { label: 'Leads', path: '/broker/leads', icon: <Users className="w-5 h-5" /> },
    { label: "My Buyer's List", path: '/broker/buyers', icon: <Users className="w-5 h-5" /> },
    { label: 'My Contracts', path: '/broker/contracts', icon: <FileText className="w-5 h-5" />, active: true },
    { label: 'My NDAs', path: '/broker/ndas', icon: <FileText className="w-5 h-5" /> },
    { label: 'Invitations', path: '/broker/invitations', icon: <FileText className="w-5 h-5" /> },
    { label: 'Marketplace', path: '/broker/marketplace', icon: <Home className="w-5 h-5" /> },
    { label: 'My Profile', path: '/broker/profile', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Account', path: '/broker/account', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Settings', path: '/broker/settings', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Request Help', path: '/broker/help', icon: <HelpCircle className="w-5 h-5" /> },
    { label: 'Logout', path: '/', icon: <LogOut className="w-5 h-5" /> },
  ];

  const contracts = [
    {
      id: 1,
      property: 'Highland Ranch Estate',
      buyer: 'Sarah Williams',
      price: 12500000,
      status: 'Under Contract',
      statusIcon: <Clock className="w-4 h-4" />,
      statusColor: 'orange',
      contractDate: 'Nov 10, 2024',
      closingDate: 'Dec 15, 2024',
      contingencies: ['Inspection', 'Financing'],
      documents: 4
    },
    {
      id: 2,
      property: 'Mountain Retreat',
      buyer: 'Robert Thompson',
      price: 6200000,
      status: 'Pending Signatures',
      statusIcon: <AlertCircle className="w-4 h-4" />,
      statusColor: 'blue',
      contractDate: 'Nov 18, 2024',
      closingDate: 'Jan 5, 2025',
      contingencies: ['Inspection'],
      documents: 3
    },
    {
      id: 3,
      property: 'Desert Oasis',
      buyer: 'Michael Davis',
      price: 4950000,
      status: 'Closed',
      statusIcon: <CheckCircle className="w-4 h-4" />,
      statusColor: 'green',
      contractDate: 'Sep 15, 2024',
      closingDate: 'Oct 20, 2024',
      contingencies: [],
      documents: 8
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (color: string) => {
    const colors: Record<string, string> = {
      green: 'bg-green-500/20 text-green-400 border-green-500/30',
      orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    };
    return colors[color];
  };

  const stats = {
    total: contracts.length,
    active: contracts.filter(c => c.status === 'Under Contract').length,
    closed: contracts.filter(c => c.status === 'Closed').length,
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
          <h1 className="text-white mb-2">My Contracts</h1>
          <p className="text-gray-400">Manage active and completed contracts</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Total Contracts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-3xl">{stats.total}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-3xl">{stats.active}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Closed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-3xl">{stats.closed}</p>
            </CardContent>
          </Card>
        </div>

        {/* Contracts List */}
        <div className="space-y-6">
          {contracts.map((contract) => (
            <Card key={contract.id} className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] hover:border-[#d4af37]/50 transition-colors">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[#2a2a2a]">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white text-xl">{contract.property}</h3>
                        <Badge className={getStatusColor(contract.statusColor)}>
                          <span className="flex items-center gap-1">
                            {contract.statusIcon}
                            {contract.status}
                          </span>
                        </Badge>
                      </div>
                      <p className="text-gray-400">Buyer: <span className="text-white">{contract.buyer}</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#d4af37] text-2xl">{formatPrice(contract.price)}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 pb-4 border-b border-[#2a2a2a]">
                    <div>
                      <p className="text-gray-500 text-sm">Contract Date</p>
                      <p className="text-white">{contract.contractDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Closing Date</p>
                      <p className="text-white">{contract.closingDate}</p>
                    </div>
                  </div>

                  {contract.contingencies.length > 0 && (
                    <div className="pb-4 border-b border-[#2a2a2a]">
                      <p className="text-gray-400 text-sm mb-2">Active Contingencies</p>
                      <div className="flex flex-wrap gap-2">
                        {contract.contingencies.map((cont, idx) => (
                          <Badge key={idx} variant="outline" className="border-orange-500 text-orange-500">
                            {cont}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-sm">{contract.documents} documents</p>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download All
                      </Button>
                    </div>
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
