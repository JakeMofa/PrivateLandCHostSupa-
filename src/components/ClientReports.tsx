import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Home, 
  Heart, 
  UserCircle, 
  FileText, 
  HelpCircle, 
  LogOut, 
  BarChart3,
  FileBarChart,
  Download,
  DollarSign,
  Calendar,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  Shield,
  FileCheck,
  Filter,
  Search
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

interface ClientReportsProps {
  onLogout: () => void;
}

export default function ClientReports({ onLogout }: ClientReportsProps) {
  const sidebarItems = [
    { label: 'Dashboard', path: '/client/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'My Profile', path: '/client/profile', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Marketplace', path: '/client/marketplace', icon: <Home className="w-5 h-5" /> },
    { label: 'Saved Properties', path: '/client/saved', icon: <Heart className="w-5 h-5" /> },
    { label: 'My Agent', path: '/client/agent', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Invitations', path: '/client/invitations', icon: <Heart className="w-5 h-5" /> },
    { label: 'Analytics', path: '/client/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'Reports', path: '/client/reports', icon: <FileBarChart className="w-5 h-5" />, active: true },
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

  const savedProperties = [
    { 
      id: 1, 
      name: 'Highland Ranch Estate', 
      location: 'Montana', 
      price: 12500000, 
      acres: 450, 
      savedDate: '2024-08-15',
      status: 'Active'
    },
    { 
      id: 2, 
      name: 'Coastal Villa', 
      location: 'California', 
      price: 8750000, 
      acres: 120, 
      savedDate: '2024-08-20',
      status: 'Active'
    },
    { 
      id: 3, 
      name: 'Mountain Retreat', 
      location: 'Colorado', 
      price: 6200000, 
      acres: 280, 
      savedDate: '2024-08-22',
      status: 'Active'
    },
    { 
      id: 4, 
      name: 'Desert Oasis', 
      location: 'Arizona', 
      price: 4950000, 
      acres: 350, 
      savedDate: '2024-08-18',
      status: 'Under Contract'
    },
  ];

  const viewingHistory = [
    { date: '2024-08-28', property: 'Highland Ranch Estate', duration: '15 min' },
    { date: '2024-08-27', property: 'Coastal Villa', duration: '12 min' },
    { date: '2024-08-27', property: 'Mountain Retreat', duration: '8 min' },
    { date: '2024-08-26', property: 'Lakefront Property', duration: '10 min' },
    { date: '2024-08-25', property: 'Desert Oasis', duration: '18 min' },
  ];

  const ndaStatus = [
    { property: 'Highland Ranch Estate', signed: '2024-08-15', expires: '2024-11-15', status: 'Active' },
    { property: 'Coastal Villa', signed: '2024-08-20', expires: '2024-11-20', status: 'Active' },
    { property: 'Mountain View Estate', signed: '2024-07-01', expires: '2024-10-01', status: 'Expiring Soon' },
  ];

  const agentCommunications = [
    { date: '2024-08-28', type: 'Email', subject: 'New listing matching your criteria', status: 'Read' },
    { date: '2024-08-27', type: 'Call', subject: 'Discussion about Highland Ranch', status: 'Completed' },
    { date: '2024-08-25', type: 'Meeting', subject: 'Property tour scheduled', status: 'Scheduled' },
    { date: '2024-08-23', type: 'Email', subject: 'Market update for Montana region', status: 'Read' },
  ];

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole="client" 
      userName="James Anderson"
      onLogout={onLogout}
    >
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-white mb-2">Reports & Documentation</h1>
          <p className="text-gray-400">Exportable reports for you and your advisors</p>
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
                <Select defaultValue="properties">
                  <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                    <SelectItem value="properties">Saved Properties Report</SelectItem>
                    <SelectItem value="comparison">Property Comparison</SelectItem>
                    <SelectItem value="market">Market Analysis</SelectItem>
                    <SelectItem value="financial">Financial Planning</SelectItem>
                    <SelectItem value="viewing">Viewing History</SelectItem>
                    <SelectItem value="communications">Agent Communications</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="text-gray-400 text-sm mb-2 block">Time Period</label>
                <Select defaultValue="all">
                  <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                    <SelectItem value="all">All Time</SelectItem>
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

        {/* Property Reports */}
        <div>
          <h2 className="text-white mb-4">Property Reports</h2>
          
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Saved Properties Summary */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#d4af37]" />
                  Saved Properties Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between pb-3 border-b border-[#2a2a2a]">
                    <p className="text-gray-400">Total Saved</p>
                    <p className="text-white text-xl">8</p>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#2a2a2a]">
                    <p className="text-gray-400">Total Value</p>
                    <p className="text-white text-xl">$42.5M</p>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#2a2a2a]">
                    <p className="text-gray-400">Avg Price</p>
                    <p className="text-white text-xl">$5.3M</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Total Acreage</p>
                    <p className="text-white text-xl">1,840 acres</p>
                  </div>
                </div>
                <Button className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-black">
                  <Download className="w-4 h-4 mr-2" />
                  Download Full Report
                </Button>
              </CardContent>
            </Card>

            {/* Property Comparison Tool */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Property Comparison Tool</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">Compare up to 5 properties side-by-side</p>
                <div className="space-y-3 mb-6">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Select Properties</label>
                    <Select defaultValue="all">
                      <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                        <SelectItem value="all">All Saved Properties</SelectItem>
                        <SelectItem value="highland">Highland Ranch Estate</SelectItem>
                        <SelectItem value="coastal">Coastal Villa</SelectItem>
                        <SelectItem value="mountain">Mountain Retreat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-400 text-sm">Compare by:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Price', 'Acreage', 'Price/Acre', 'Location', 'Amenities'].map((metric) => (
                      <label key={metric} className="flex items-center gap-2 p-2 bg-[#0f0f0f] rounded border border-[#2a2a2a] hover:border-[#d4af37]/30 cursor-pointer transition-all text-sm">
                        <input type="checkbox" className="rounded border-[#2a2a2a]" defaultChecked />
                        <span className="text-white">{metric}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <Button className="w-full mt-6 bg-[#d4af37] hover:bg-[#b8941f] text-black">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Comparison PDF
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Saved Properties Table */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Your Saved Properties</CardTitle>
                <Button variant="outline" size="sm" className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
                  <Download className="w-4 h-4 mr-2" />
                  Export List
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                    <TableHead className="text-gray-400">Property</TableHead>
                    <TableHead className="text-gray-400">Location</TableHead>
                    <TableHead className="text-gray-400">Price</TableHead>
                    <TableHead className="text-gray-400">Acres</TableHead>
                    <TableHead className="text-gray-400">Saved Date</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {savedProperties.map((property) => (
                    <TableRow key={property.id} className="border-[#2a2a2a] hover:bg-[#2a2a2a]/30">
                      <TableCell className="text-white">{property.name}</TableCell>
                      <TableCell className="text-gray-400">{property.location}</TableCell>
                      <TableCell className="text-white">${(property.price / 1000000).toFixed(1)}M</TableCell>
                      <TableCell className="text-gray-400">{property.acres}</TableCell>
                      <TableCell className="text-gray-400">{property.savedDate}</TableCell>
                      <TableCell>
                        <Badge className={
                          property.status === 'Active'
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                        }>
                          {property.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Financial Reports */}
        <div>
          <h2 className="text-white mb-4">Financial Reports</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Budget Planning Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                  <p className="text-gray-400 mb-2">Approved Budget</p>
                  <p className="text-white text-2xl">$5,000,000</p>
                </div>
                <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                  <p className="text-gray-400 mb-2">Properties in Range</p>
                  <p className="text-white text-2xl">12</p>
                </div>
                <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                  <p className="text-gray-400 mb-2">Avg Down Payment</p>
                  <p className="text-white text-2xl">$1,000,000</p>
                  <p className="text-gray-500 text-sm mt-1">20% of budget</p>
                </div>
                <Button className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-black">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Financing Readiness</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#0f0f0f] rounded-lg border border-green-500/30">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <p className="text-white">Pre-Approval</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Complete
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-[#0f0f0f] rounded-lg border border-green-500/30">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <p className="text-white">Credit Check</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Verified
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                      <p className="text-white">Documentation</p>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      In Progress
                    </Badge>
                  </div>
                </div>
                <Button className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-black">
                  <FileCheck className="w-4 h-4 mr-2" />
                  Download Checklist
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Investment Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400 text-sm">Generate comprehensive investment analysis for your financial advisor</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Projected Appreciation</p>
                    <p className="text-green-400">+3.5%/year</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Market Position</p>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      Strong
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Risk Assessment</p>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Low
                    </Badge>
                  </div>
                </div>
                <Button className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-black">
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Activity Reports */}
        <div>
          <h2 className="text-white mb-4">Activity Reports</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Viewing History */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Viewing History</CardTitle>
                  <Button variant="outline" size="sm" className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {viewingHistory.map((view, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <div>
                        <p className="text-white mb-1">{view.property}</p>
                        <p className="text-gray-500 text-sm">{view.date}</p>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        {view.duration}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Agent Communications */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Agent Communications Log</CardTitle>
                  <Button variant="outline" size="sm" className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {agentCommunications.map((comm, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        comm.type === 'Email' ? 'bg-blue-500/10' :
                        comm.type === 'Call' ? 'bg-green-500/10' :
                        'bg-orange-500/10'
                      }`}>
                        {comm.type === 'Email' && <Mail className="w-5 h-5 text-blue-500" />}
                        {comm.type === 'Call' && <Phone className="w-5 h-5 text-green-500" />}
                        {comm.type === 'Meeting' && <Calendar className="w-5 h-5 text-orange-500" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-white mb-1">{comm.subject}</p>
                        <p className="text-gray-500 text-sm">{comm.date} • {comm.type}</p>
                      </div>
                      <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
                        {comm.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Document Management */}
        <div>
          <h2 className="text-white mb-4">Document Management</h2>
          
          {/* NDA Tracking */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">NDA Status Report</CardTitle>
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
                  <p className="text-white text-2xl">2</p>
                </div>
                <div className="p-4 bg-[#0f0f0f] rounded-lg border border-orange-500/30">
                  <p className="text-gray-400 mb-2">Expiring Soon</p>
                  <p className="text-orange-400 text-2xl">1</p>
                </div>
                <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                  <p className="text-gray-400 mb-2">Total Signed</p>
                  <p className="text-white text-2xl">3</p>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                    <TableHead className="text-gray-400">Property</TableHead>
                    <TableHead className="text-gray-400">Signed Date</TableHead>
                    <TableHead className="text-gray-400">Expires</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ndaStatus.map((nda, idx) => (
                    <TableRow key={idx} className="border-[#2a2a2a] hover:bg-[#2a2a2a]/30">
                      <TableCell className="text-white">{nda.property}</TableCell>
                      <TableCell className="text-gray-400">{nda.signed}</TableCell>
                      <TableCell className="text-gray-400">{nda.expires}</TableCell>
                      <TableCell>
                        <Badge className={
                          nda.status === 'Active' 
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
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

          {/* Document Checklist */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Closing Document Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { doc: 'Pre-Approval Letter', status: 'Complete', icon: CheckCircle, color: 'green' },
                  { doc: 'Proof of Funds', status: 'Complete', icon: CheckCircle, color: 'green' },
                  { doc: 'Purchase Agreement', status: 'Pending', icon: AlertCircle, color: 'yellow' },
                  { doc: 'Title Insurance', status: 'Not Started', icon: AlertCircle, color: 'gray' },
                  { doc: 'Property Survey', status: 'Not Started', icon: AlertCircle, color: 'gray' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 text-${item.color}-500`} />
                      <p className="text-white">{item.doc}</p>
                    </div>
                    <Badge className={`bg-${item.color}-500/20 text-${item.color}-400 border-${item.color}-500/30`}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-6 bg-[#d4af37] hover:bg-[#b8941f] text-black">
                <Download className="w-4 h-4 mr-2" />
                Download Checklist PDF
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Custom Report Builder */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Custom Report Builder</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-6">Build custom reports for your financial advisors, attorneys, or family office</p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Select Data to Include</label>
                <div className="space-y-2">
                  {['Saved Properties', 'Viewing History', 'Market Analysis', 'Financial Planning', 'Agent Communications', 'NDA Status'].map((item, idx) => (
                    <label key={idx} className="flex items-center gap-2 p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] hover:border-[#d4af37]/30 cursor-pointer transition-all">
                      <input type="checkbox" className="rounded border-[#2a2a2a]" />
                      <span className="text-white text-sm">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Date Range</label>
                  <Select defaultValue="all">
                    <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                      <SelectItem value="7">Last 7 days</SelectItem>
                      <SelectItem value="30">Last 30 days</SelectItem>
                      <SelectItem value="90">Last 90 days</SelectItem>
                      <SelectItem value="all">All Time</SelectItem>
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
                  <label className="text-gray-400 text-sm mb-2 block">Report Name</label>
                  <Input 
                    placeholder="Investment Portfolio Report" 
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
