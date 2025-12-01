import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
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
  Download,
  Calendar,
  Filter,
  DollarSign,
  TrendingUp,
  Eye
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface AdminReportsProps {
  onLogout: () => void;
}

export default function AdminReports({ onLogout }: AdminReportsProps) {
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

  const availableReports = [
    {
      id: 'user-growth',
      name: 'User Growth Report',
      category: 'Users',
      description: 'Client and broker registration trends over time',
      lastGenerated: '2024-11-21',
      frequency: 'Monthly',
      format: ['PDF', 'CSV', 'Excel']
    },
    {
      id: 'revenue',
      name: 'Revenue Report',
      category: 'Financial',
      description: 'Platform revenue breakdown by fee type',
      lastGenerated: '2024-11-21',
      frequency: 'Monthly',
      format: ['PDF', 'CSV', 'Excel']
    },
    {
      id: 'listing-performance',
      name: 'Listing Performance Report',
      category: 'Listings',
      description: 'Views, saves, contacts, and conversions by listing',
      lastGenerated: '2024-11-20',
      frequency: 'Weekly',
      format: ['PDF', 'CSV']
    },
    {
      id: 'broker-performance',
      name: 'Broker Performance Report',
      category: 'Brokers',
      description: 'Sales, commissions, and client relationships by broker',
      lastGenerated: '2024-11-20',
      frequency: 'Monthly',
      format: ['PDF', 'Excel']
    },
    {
      id: 'compliance-audit',
      name: 'Compliance Audit Report',
      category: 'Compliance',
      description: 'NDA status, consent verification, license validity',
      lastGenerated: '2024-11-21',
      frequency: 'Monthly',
      format: ['PDF']
    },
    {
      id: 'regional-analysis',
      name: 'Regional Distribution Report',
      category: 'Analytics',
      description: 'Listings and sales by state, county, and region',
      lastGenerated: '2024-11-19',
      frequency: 'Quarterly',
      format: ['PDF', 'CSV']
    },
    {
      id: 'document-audit',
      name: 'Document Audit Trail',
      category: 'Compliance',
      description: 'All document access, downloads, and signatures',
      lastGenerated: '2024-11-21',
      frequency: 'Monthly',
      format: ['PDF', 'CSV']
    },
    {
      id: 'support-metrics',
      name: 'Support Metrics Report',
      category: 'Support',
      description: 'Ticket volume, response times, and resolution rates',
      lastGenerated: '2024-11-20',
      frequency: 'Weekly',
      format: ['PDF', 'CSV']
    },
    {
      id: 'security-log',
      name: 'Security & Access Log',
      category: 'Security',
      description: 'Login attempts, IP activity, and security events',
      lastGenerated: '2024-11-21',
      frequency: 'Daily',
      format: ['PDF', 'CSV']
    },
    {
      id: 'gmv-analysis',
      name: 'GMV Analysis Report',
      category: 'Financial',
      description: 'Gross merchandise value trends and forecasts',
      lastGenerated: '2024-11-20',
      frequency: 'Monthly',
      format: ['PDF', 'Excel']
    },
  ];

  const scheduledReports = [
    { name: 'Monthly Revenue Report', nextRun: '2024-12-01', recipients: 'matthew@privateland.com' },
    { name: 'Weekly Listing Performance', nextRun: '2024-11-25', recipients: 'matthew@privateland.com' },
    { name: 'Compliance Audit (Monthly)', nextRun: '2024-12-01', recipients: 'compliance@privateland.com' },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Financial':
        return 'bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30';
      case 'Users':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Listings':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Brokers':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Compliance':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Analytics':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'Support':
        return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'Security':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
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
            <h1 className="text-white mb-2">Reports & Analytics</h1>
            <p className="text-gray-400">Generate and export comprehensive platform reports</p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] bg-[#1a1a1a] border-[#2a2a2a] text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="users">Users</SelectItem>
                <SelectItem value="listings">Listings</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
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
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Total Reports</p>
              <p className="text-white text-3xl">{availableReports.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mb-3">
                <Calendar className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Scheduled Reports</p>
              <p className="text-white text-3xl">{scheduledReports.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mb-3">
                <Download className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Reports Generated (MTD)</p>
              <p className="text-white text-3xl">47</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-3">
                <CheckCircle className="w-5 h-5 text-[#d4af37]" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Last Run</p>
              <p className="text-white text-lg">2 hours ago</p>
            </CardContent>
          </Card>
        </div>

        {/* Available Reports */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Available Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-2 gap-4">
              {availableReports.map((report) => (
                <div 
                  key={report.id}
                  className="p-5 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getCategoryColor(report.category)}>
                          {report.category}
                        </Badge>
                        <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 text-xs">
                          {report.frequency}
                        </Badge>
                      </div>
                      <h3 className="text-white mb-1">{report.name}</h3>
                      <p className="text-gray-400 text-sm mb-3">{report.description}</p>
                      <p className="text-gray-500 text-xs">Last generated: {report.lastGenerated}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {report.format.map((format) => (
                      <Button 
                        key={format}
                        size="sm" 
                        variant="outline"
                        className="border-[#2a2a2a] hover:bg-[#2a2a2a]"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        {format}
                      </Button>
                    ))}
                    <Button 
                      size="sm" 
                      className="bg-[#d4af37] hover:bg-[#b8941f] text-black ml-auto"
                    >
                      Generate Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scheduled Reports */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Scheduled Reports</CardTitle>
              <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
                <Calendar className="w-4 h-4 mr-2" />
                Add Schedule
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scheduledReports.map((report, index) => (
                <div 
                  key={index}
                  className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] flex items-center justify-between"
                >
                  <div>
                    <p className="text-white mb-1">{report.name}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <p className="text-gray-400">Next run: {report.nextRun}</p>
                      <p className="text-gray-500">→ {report.recipients}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                      Run Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Custom Report Builder */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Custom Report Builder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] text-center">
              <BarChart3 className="w-12 h-12 mx-auto text-gray-500 mb-3" />
              <p className="text-white mb-2">Build Custom Reports</p>
              <p className="text-gray-400 text-sm mb-4">
                Create custom reports with your own metrics, date ranges, and filters
              </p>
              <Button className="bg-[#d4af37] hover:bg-[#b8941f] text-black">
                Open Report Builder
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
