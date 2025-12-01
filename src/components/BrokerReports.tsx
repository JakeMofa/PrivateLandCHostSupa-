import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Home, 
  Users, 
  FileText, 
  UserCircle, 
  HelpCircle, 
  LogOut, 
  Plus,
  Mail,
  BarChart3,
  FileBarChart,
  Download,
  DollarSign,
  Calendar,
  TrendingUp,
  Shield,
  CheckCircle,
  AlertCircle,
  Clock,
  FileCheck,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Input } from './ui/input';

interface BrokerReportsProps {
  onLogout: () => void;
}

export default function BrokerReports({ onLogout }: BrokerReportsProps) {
  const sidebarItems = [
    { label: 'Dashboard', path: '/broker/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'My Listings', path: '/broker/listings', icon: <Home className="w-5 h-5" /> },
    { label: 'Add Listing', path: '/broker/add-listing', icon: <Plus className="w-5 h-5" /> },
    { label: 'Leads', path: '/broker/leads', icon: <Users className="w-5 h-5" /> },
    { label: "My Buyer's List", path: '/broker/buyers', icon: <Users className="w-5 h-5" /> },
    { label: 'My Contracts', path: '/broker/contracts', icon: <FileText className="w-5 h-5" /> },
    { label: 'My NDAs', path: '/broker/ndas', icon: <FileText className="w-5 h-5" /> },
    { label: 'Invitations', path: '/broker/invitations', icon: <Mail className="w-5 h-5" /> },
    { label: 'Marketplace', path: '/broker/marketplace', icon: <Home className="w-5 h-5" /> },
    { label: 'Analytics', path: '/broker/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'Reports', path: '/broker/reports', icon: <FileBarChart className="w-5 h-5" />, active: true },
    { label: 'My Documents', path: '/broker/documents', icon: <FileText className="w-5 h-5" /> },
    { label: 'My Profile', path: '/broker/profile', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Account', path: '/broker/account', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Settings', path: '/broker/settings', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Request Help', path: '/broker/help', icon: <HelpCircle className="w-5 h-5" /> },
    { label: 'Logout', path: '/', icon: <LogOut className="w-5 h-5" /> },
  ];

  const transactionHistory = [
    { 
      date: '2024-08-15', 
      property: 'Highland Ranch Estate', 
      buyer: 'James Anderson', 
      commission: 42000, 
      status: 'Completed' 
    },
    { 
      date: '2024-07-28', 
      property: 'Coastal Villa', 
      buyer: 'Sarah Chen', 
      commission: 38000, 
      status: 'Completed' 
    },
    { 
      date: '2024-07-12', 
      property: 'Mountain Retreat', 
      buyer: 'Robert Williams', 
      commission: 35000, 
      status: 'Completed' 
    },
    { 
      date: '2024-06-05', 
      property: 'Desert Oasis', 
      buyer: 'Emily Davis', 
      commission: 28000, 
      status: 'Completed' 
    },
    { 
      date: '2024-05-20', 
      property: 'Lakefront Property', 
      buyer: 'Michael Brown', 
      commission: 45000, 
      status: 'Completed' 
    },
  ];

  const ndaTracking = [
    { buyer: 'James Anderson', property: 'Highland Ranch Estate', signed: '2024-08-10', expires: '2024-11-10', status: 'Active' },
    { buyer: 'Sarah Chen', property: 'Coastal Villa', signed: '2024-08-15', expires: '2024-11-15', status: 'Active' },
    { buyer: 'Robert Williams', property: 'Mountain View Estate', signed: '2024-07-01', expires: '2024-10-01', status: 'Expiring Soon' },
    { buyer: 'Emily Davis', property: 'Desert Oasis', signed: '2024-06-15', expires: '2024-09-15', status: 'Expired' },
    { buyer: 'Michael Brown', property: 'Lakefront Property', signed: '2024-08-20', expires: '2024-11-20', status: 'Active' },
  ];

  const contractStatus = [
    { property: 'Highland Ranch Estate', buyer: 'James Anderson', status: 'Completed', date: '2024-08-15', amount: 12500000 },
    { property: 'Coastal Villa', buyer: 'Sarah Chen', status: 'In Review', date: '2024-08-25', amount: 8750000 },
    { property: 'Mountain Retreat', buyer: 'David Lee', status: 'Pending', date: '2024-08-28', amount: 6200000 },
  ];

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole="broker" 
      userName="Michael Rivers"
      onLogout={onLogout}
    >
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-white mb-2">Reports</h1>
          <p className="text-gray-400">Financial summaries, exports, and compliance tracking</p>
        </div>

        {/* Generate Reports Section */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Generate Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="text-gray-400 text-sm mb-2 block">Report Type</label>
                <Select defaultValue="commission">
                  <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                    <SelectItem value="commission">Commission Summary</SelectItem>
                    <SelectItem value="quarterly">Quarterly Performance</SelectItem>
                    <SelectItem value="annual">Annual Tax Summary</SelectItem>
                    <SelectItem value="transactions">Transaction History</SelectItem>
                    <SelectItem value="listings">Listing Performance</SelectItem>
                    <SelectItem value="buyers">Buyer Activity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="text-gray-400 text-sm mb-2 block">Time Period</label>
                <Select defaultValue="ytd">
                  <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                    <SelectItem value="mtd">Month to Date</SelectItem>
                    <SelectItem value="qtd">Quarter to Date</SelectItem>
                    <SelectItem value="ytd">Year to Date</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button className="bg-[#d4af37] hover:bg-[#b8941f] text-black">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate PDF
                </Button>
                <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Reports */}
        <div>
          <h2 className="text-white mb-4">Financial Reports</h2>
          
          {/* Commission Summary */}
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#d4af37]" />
                  Monthly Commission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white text-3xl mb-2">$21,000</p>
                <p className="text-gray-400 mb-4">August 2024</p>
                <Button variant="outline" size="sm" className="w-full border-[#2a2a2a] hover:bg-[#2a2a2a]">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Quarterly Earnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white text-3xl mb-2">$62,000</p>
                <p className="text-gray-400 mb-4">Q3 2024</p>
                <Button variant="outline" size="sm" className="w-full border-[#2a2a2a] hover:bg-[#2a2a2a]">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-500" />
                  Annual Tax Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white text-3xl mb-2">$127,000</p>
                <p className="text-gray-400 mb-4">YTD 2024 (1099 Ready)</p>
                <Button variant="outline" size="sm" className="w-full border-[#2a2a2a] hover:bg-[#2a2a2a]">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Transaction History */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Transaction History</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                    <TableHead className="text-gray-400">Date</TableHead>
                    <TableHead className="text-gray-400">Property</TableHead>
                    <TableHead className="text-gray-400">Buyer</TableHead>
                    <TableHead className="text-gray-400">Commission</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionHistory.map((transaction, idx) => (
                    <TableRow key={idx} className="border-[#2a2a2a] hover:bg-[#2a2a2a]/30">
                      <TableCell className="text-gray-400">{transaction.date}</TableCell>
                      <TableCell className="text-white">{transaction.property}</TableCell>
                      <TableCell className="text-gray-400">{transaction.buyer}</TableCell>
                      <TableCell className="text-white">${transaction.commission.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {transaction.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Performance Reports */}
        <div>
          <h2 className="text-white mb-4">Performance Reports</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Monthly Summary */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Monthly Performance Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#2a2a2a]">
                  <p className="text-gray-400">Listings Added</p>
                  <p className="text-white">4</p>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-[#2a2a2a]">
                  <p className="text-gray-400">Deals Closed</p>
                  <p className="text-white">2</p>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-[#2a2a2a]">
                  <p className="text-gray-400">Commission Earned</p>
                  <p className="text-white">$42,000</p>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-[#2a2a2a]">
                  <p className="text-gray-400">Lead Conversion Rate</p>
                  <p className="text-white">38%</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-gray-400">Avg Response Time</p>
                  <p className="text-white">2.3 hours</p>
                </div>
                <Button className="w-full mt-4 bg-[#d4af37] hover:bg-[#b8941f] text-black">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>

            {/* Quarterly Review */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Quarterly Business Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white">Q1 2024</p>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <p className="text-gray-400 text-sm mb-2">Jan - Mar 2024</p>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Commission</p>
                    <p className="text-white">$35,500</p>
                  </div>
                </div>
                
                <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white">Q2 2024</p>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <p className="text-gray-400 text-sm mb-2">Apr - Jun 2024</p>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Commission</p>
                    <p className="text-white">$51,000</p>
                  </div>
                </div>
                
                <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white">Q3 2024</p>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      Current
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">Jul - Sep 2024</p>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Commission (to date)</p>
                    <p className="text-white">$62,000</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Client & Listing Reports */}
        <div>
          <h2 className="text-white mb-4">Client & Listing Reports</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Listing Performance */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Listing Performance Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400">Generate detailed reports for specific listings or date ranges</p>
                <div className="space-y-3">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Select Listing</label>
                    <Select defaultValue="all">
                      <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                        <SelectItem value="all">All Listings</SelectItem>
                        <SelectItem value="highland">Highland Ranch Estate</SelectItem>
                        <SelectItem value="coastal">Coastal Villa</SelectItem>
                        <SelectItem value="mountain">Mountain Retreat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Date Range</label>
                    <Select defaultValue="30">
                      <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                        <SelectItem value="30">Last 30 days</SelectItem>
                        <SelectItem value="90">Last 90 days</SelectItem>
                        <SelectItem value="365">Last year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Total Views</p>
                    <p className="text-white">1,247</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Total Saves</p>
                    <p className="text-white">284</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Inquiries</p>
                    <p className="text-white">67</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Avg Days on Market</p>
                    <p className="text-white">47 days</p>
                  </div>
                </div>
                <Button className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-black">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </CardContent>
            </Card>

            {/* Buyer Activity */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Buyer Activity Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400">Track buyer engagement and activity metrics</p>
                <div className="space-y-3">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Time Period</label>
                    <Select defaultValue="30">
                      <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                        <SelectItem value="30">Last 30 days</SelectItem>
                        <SelectItem value="90">Last 90 days</SelectItem>
                        <SelectItem value="365">Last year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Active Buyers</p>
                    <p className="text-white">25</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">NDAs Signed</p>
                    <p className="text-white">18</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Meetings Held</p>
                    <p className="text-white">12</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Avg Engagement Score</p>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      High
                    </Badge>
                  </div>
                </div>
                <Button className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-black">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Compliance & Documents */}
        <div>
          <h2 className="text-white mb-4">Compliance & Documents</h2>
          
          {/* NDA Tracking */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">NDA Tracking Report</CardTitle>
                <Button variant="outline" size="sm" className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
                  <Download className="w-4 h-4 mr-2" />
                  Download List
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                  <p className="text-gray-400 mb-2">Active NDAs</p>
                  <p className="text-white text-2xl">24</p>
                </div>
                <div className="p-4 bg-[#0f0f0f] rounded-lg border border-orange-500/30">
                  <p className="text-gray-400 mb-2">Expiring Soon</p>
                  <p className="text-orange-400 text-2xl">3</p>
                </div>
                <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                  <p className="text-gray-400 mb-2">Expired</p>
                  <p className="text-white text-2xl">2</p>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                    <TableHead className="text-gray-400">Buyer</TableHead>
                    <TableHead className="text-gray-400">Property</TableHead>
                    <TableHead className="text-gray-400">Signed Date</TableHead>
                    <TableHead className="text-gray-400">Expires</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ndaTracking.map((nda, idx) => (
                    <TableRow key={idx} className="border-[#2a2a2a] hover:bg-[#2a2a2a]/30">
                      <TableCell className="text-white">{nda.buyer}</TableCell>
                      <TableCell className="text-gray-400">{nda.property}</TableCell>
                      <TableCell className="text-gray-400">{nda.signed}</TableCell>
                      <TableCell className="text-gray-400">{nda.expires}</TableCell>
                      <TableCell>
                        <Badge className={
                          nda.status === 'Active' 
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : nda.status === 'Expiring Soon'
                            ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                            : 'bg-red-500/20 text-red-400 border-red-500/30'
                        }>
                          {nda.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Contract Status */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Contract Status Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] text-center">
                    <p className="text-gray-400 text-sm mb-1">Pending</p>
                    <p className="text-white text-xl">2</p>
                  </div>
                  <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] text-center">
                    <p className="text-gray-400 text-sm mb-1">In Review</p>
                    <p className="text-white text-xl">1</p>
                  </div>
                  <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] text-center">
                    <p className="text-gray-400 text-sm mb-1">Completed</p>
                    <p className="text-white text-xl">47</p>
                  </div>
                </div>
                
                <div className="space-y-3 pt-4">
                  {contractStatus.map((contract, idx) => (
                    <div key={idx} className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-white">{contract.property}</p>
                        <Badge className={
                          contract.status === 'Completed'
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : contract.status === 'In Review'
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                            : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                        }>
                          {contract.status}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm">{contract.buyer} • {contract.date}</p>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-black">
                  <Download className="w-4 h-4 mr-2" />
                  Export Detailed Report
                </Button>
              </CardContent>
            </Card>

            {/* License & Certification */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">License & Certification Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-[#0f0f0f] rounded-lg border border-green-500/30">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-white mb-1">Real Estate License</p>
                      <p className="text-gray-400 text-sm mb-2">License #RE-2024-47582</p>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-gray-400 text-sm">Status</p>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            Active
                          </Badge>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Expiration</p>
                          <p className="text-white">Dec 31, 2025</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#0f0f0f] rounded-lg border border-green-500/30">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-white mb-1">Broker Certification</p>
                      <p className="text-gray-400 text-sm mb-2">Cert #BC-2024-15892</p>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-gray-400 text-sm">Status</p>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            Active
                          </Badge>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Expiration</p>
                          <p className="text-white">Jun 15, 2026</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white mb-1">Required Renewals</p>
                      <p className="text-gray-400 text-sm">All certifications current</p>
                    </div>
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Custom Report Builder */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Custom Report Builder</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-6">Build your own custom reports with specific metrics and date ranges</p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Select Metrics</label>
                <div className="space-y-2">
                  {['Commission Income', 'Listing Performance', 'Lead Conversion', 'Buyer Activity', 'Days on Market', 'Regional Distribution'].map((metric, idx) => (
                    <label key={idx} className="flex items-center gap-2 p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] hover:border-[#d4af37]/30 cursor-pointer transition-all">
                      <input type="checkbox" className="rounded border-[#2a2a2a]" />
                      <span className="text-white text-sm">{metric}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Date Range</label>
                  <Select defaultValue="custom">
                    <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                      <SelectItem value="7">Last 7 days</SelectItem>
                      <SelectItem value="30">Last 30 days</SelectItem>
                      <SelectItem value="90">Last 90 days</SelectItem>
                      <SelectItem value="365">Last year</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Export Format</label>
                  <Select defaultValue="pdf">
                    <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                      <SelectItem value="pdf">PDF Report</SelectItem>
                      <SelectItem value="csv">CSV Data</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Report Name (Optional)</label>
                  <Input 
                    placeholder="My Custom Report" 
                    className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
                  />
                </div>
              </div>
            </div>
            <Button className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-black">
              <FileBarChart className="w-4 h-4 mr-2" />
              Generate Custom Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
