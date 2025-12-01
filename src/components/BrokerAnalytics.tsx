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
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Eye,
  Bookmark,
  Phone,
  MapPin,
  Target,
  Activity
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
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface BrokerAnalyticsProps {
  onLogout: () => void;
}

export default function BrokerAnalytics({ onLogout }: BrokerAnalyticsProps) {
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
    { label: 'Analytics', path: '/broker/analytics', icon: <BarChart3 className="w-5 h-5" />, active: true },
    { label: 'Reports', path: '/broker/reports', icon: <FileBarChart className="w-5 h-5" /> },
    { label: 'My Documents', path: '/broker/documents', icon: <FileText className="w-5 h-5" /> },
    { label: 'My Profile', path: '/broker/profile', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Account', path: '/broker/account', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Settings', path: '/broker/settings', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Request Help', path: '/broker/help', icon: <HelpCircle className="w-5 h-5" /> },
    { label: 'Logout', path: '/', icon: <LogOut className="w-5 h-5" /> },
  ];

  // Commission data
  const gciData = [
    { month: 'Jan', gci: 8500, goal: 10000 },
    { month: 'Feb', gci: 12000, goal: 10000 },
    { month: 'Mar', gci: 15000, goal: 10000 },
    { month: 'Apr', gci: 11000, goal: 10000 },
    { month: 'May', gci: 18000, goal: 10000 },
    { month: 'Jun', gci: 22000, goal: 10000 },
    { month: 'Jul', gci: 19000, goal: 10000 },
    { month: 'Aug', gci: 21000, goal: 10000 },
  ];

  // Revenue per listing by property type
  const revenueByType = [
    { type: 'Ranch', revenue: 45000 },
    { type: 'Estate', revenue: 38000 },
    { type: 'Vineyard', revenue: 42000 },
    { type: 'Waterfront', revenue: 52000 },
    { type: 'Mountain', revenue: 35000 },
  ];

  // Listing engagement trends
  const engagementData = [
    { date: 'Week 1', views: 120, saves: 25, contacts: 8 },
    { date: 'Week 2', views: 145, saves: 32, contacts: 12 },
    { date: 'Week 3', views: 168, saves: 38, contacts: 15 },
    { date: 'Week 4', views: 195, saves: 45, contacts: 18 },
  ];

  // Top performing listings
  const topListings = [
    { property: 'Highland Ranch Estate', views: 248, saves: 67, inquiries: 23 },
    { property: 'Coastal Villa', views: 212, saves: 54, inquiries: 19 },
    { property: 'Mountain Retreat', views: 189, saves: 48, inquiries: 16 },
    { property: 'Desert Oasis', views: 156, saves: 38, inquiries: 12 },
    { property: 'Lakefront Property', views: 142, saves: 32, inquiries: 9 },
  ];

  // Lead source data
  const leadSourceData = [
    { name: 'Marketplace', value: 45, color: '#d4af37' },
    { name: 'Referral', value: 30, color: '#3b82f6' },
    { name: 'Direct', value: 15, color: '#8b5cf6' },
    { name: 'Other', value: 10, color: '#6b7280' },
  ];

  // Regional distribution
  const regionalData = [
    { region: 'Montana', listings: 5, value: 62000000 },
    { region: 'California', listings: 4, value: 35000000 },
    { region: 'Colorado', listings: 3, value: 28000000 },
    { region: 'Wyoming', listings: 2, value: 18000000 },
  ];

  // Property type preferences
  const propertyTypeData = [
    { name: 'Ranch', value: 35, color: '#d4af37' },
    { name: 'Estate', value: 25, color: '#3b82f6' },
    { name: 'Vineyard', value: 20, color: '#8b5cf6' },
    { name: 'Waterfront', value: 15, color: '#10b981' },
    { name: 'Other', value: 5, color: '#6b7280' },
  ];

  // NEW DATA: Pipeline Value
  const pipelineData = [
    { stage: 'Prospects', count: 18, value: 89500000 },
    { stage: 'Active Leads', count: 12, value: 62000000 },
    { stage: 'Under NDA', count: 8, value: 45000000 },
    { stage: 'In Negotiation', count: 3, value: 18500000 },
    { stage: 'Under Contract', count: 2, value: 12000000 },
  ];

  // NEW DATA: Listing Status Breakdown
  const listingStatusData = [
    { status: 'Approved & Active', count: 12, color: '#10b981' },
    { status: 'Pending Approval', count: 2, color: '#f59e0b' },
    { status: 'Under Contract', count: 2, color: '#3b82f6' },
    { status: 'Sold/Closed', count: 8, color: '#8b5cf6' },
    { status: 'Rejected/Withdrawn', count: 1, color: '#ef4444' },
  ];

  // NEW DATA: Price per Acre Analysis
  const pricePerAcreData = [
    { region: 'Montana', yourAvg: 28500, marketAvg: 25000 },
    { region: 'California', yourAvg: 95000, marketAvg: 110000 },
    { region: 'Colorado', yourAvg: 42000, marketAvg: 38000 },
    { region: 'Wyoming', yourAvg: 22000, marketAvg: 20000 },
  ];

  // NEW DATA: Appointments & Showings
  const appointmentsData = [
    { month: 'Jan', appointments: 5, showings: 3, closed: 1 },
    { month: 'Feb', appointments: 7, showings: 4, closed: 1 },
    { month: 'Mar', appointments: 9, showings: 6, closed: 2 },
    { month: 'Apr', appointments: 6, showings: 4, closed: 1 },
    { month: 'May', appointments: 11, showings: 7, closed: 2 },
    { month: 'Jun', appointments: 13, showings: 9, closed: 3 },
    { month: 'Jul', appointments: 10, showings: 6, closed: 2 },
    { month: 'Aug', appointments: 12, showings: 8, closed: 2 },
  ];

  // NEW DATA: Contract Status Tracking
  const contractStatusData = [
    { name: 'Submitted & Pending', value: 3, color: '#f59e0b' },
    { name: 'Approved & Active', value: 2, color: '#10b981' },
    { name: 'Completed', value: 8, color: '#8b5cf6' },
    { name: 'Cancelled', value: 1, color: '#6b7280' },
  ];

  // NEW DATA: Time Metrics
  const timeMetricsData = [
    { metric: 'Listing to First Showing', avgDays: 12, targetDays: 14 },
    { metric: 'First Showing to Offer', avgDays: 18, targetDays: 21 },
    { metric: 'Offer to Contract', avgDays: 8, targetDays: 10 },
    { metric: 'Contract to Close', avgDays: 35, targetDays: 45 },
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white mb-2">Analytics</h1>
            <p className="text-gray-400">Deep dive into your performance metrics</p>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="30">
              <SelectTrigger className="w-[180px] bg-[#1a1a1a] border-[#2a2a2a] text-white">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Commission & Revenue Section */}
        <div>
          <h2 className="text-white mb-4">Commission & Revenue</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* GCI Trend */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Gross Commission Income (GCI)</span>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-gray-400 mb-1">Year to Date</p>
                  <p className="text-white text-3xl mb-1">$127,000</p>
                  <div className="flex items-center gap-4 text-sm">
                    <p className="text-gray-400">Annual Goal: $500,000</p>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      26% Complete
                    </Badge>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={gciData}>
                    <defs>
                      <linearGradient id="gciGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="gci" 
                      stroke="#d4af37" 
                      strokeWidth={2}
                      fill="url(#gciGradient)" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="goal" 
                      stroke="#6b7280" 
                      strokeDasharray="5 5" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue per Listing */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Revenue per Listing by Type</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={revenueByType} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                    <XAxis type="number" stroke="#6b7280" />
                    <YAxis dataKey="type" type="category" stroke="#6b7280" width={100} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
                      labelStyle={{ color: '#fff' }}
                      formatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Bar dataKey="revenue" fill="#d4af37" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Listing Performance Section */}
        <div>
          <h2 className="text-white mb-4">Listing Performance</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Days on Market */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Days on Market (DOM)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-gray-400 mb-2">Your Average</p>
                  <p className="text-white text-5xl mb-2">47</p>
                  <p className="text-gray-400">days</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Market Average</p>
                    <p className="text-white">52 days</p>
                  </div>
                  <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '90%' }}></div>
                  </div>
                  <p className="text-green-500 text-sm">You're 10% faster than market</p>
                </div>
              </CardContent>
            </Card>

            {/* Engagement Metrics */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white">Listing Engagement Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                    <XAxis dataKey="date" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="views" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Views"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="saves" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      name="Saves"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="contacts" 
                      stroke="#d4af37" 
                      strokeWidth={2}
                      name="Contacts"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Top Performing Listings */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Top Performing Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                  <TableHead className="text-gray-400">Property</TableHead>
                  <TableHead className="text-gray-400 text-center">Views</TableHead>
                  <TableHead className="text-gray-400 text-center">Saves</TableHead>
                  <TableHead className="text-gray-400 text-center">Inquiries</TableHead>
                  <TableHead className="text-gray-400 text-center">Engagement Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topListings.map((listing, idx) => (
                  <TableRow key={idx} className="border-[#2a2a2a] hover:bg-[#2a2a2a]/30">
                    <TableCell className="text-white">{listing.property}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4 text-blue-500" />
                        <span className="text-white">{listing.views}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Bookmark className="w-4 h-4 text-purple-500" />
                        <span className="text-white">{listing.saves}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4 text-[#d4af37]" />
                        <span className="text-white">{listing.inquiries}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {((listing.inquiries / listing.views) * 100).toFixed(1)}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Lead Analytics Section */}
        <div>
          <h2 className="text-white mb-4">Lead Analytics</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Lead Source Breakdown */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Lead Source Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={leadSourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {leadSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {leadSourceData.map((source, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }}></div>
                        <p className="text-gray-400">{source.name}</p>
                      </div>
                      <p className="text-white">{source.value}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Conversion Funnel */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Lead to Close Conversion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-gray-400">Leads</p>
                      <p className="text-white">45 (100%)</p>
                    </div>
                    <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-gray-400">NDAs Signed</p>
                      <p className="text-white">25 (56%)</p>
                    </div>
                    <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: '56%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-gray-400">Meetings</p>
                      <p className="text-white">12 (48%)</p>
                    </div>
                    <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500" style={{ width: '27%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-gray-400">Offers</p>
                      <p className="text-white">5 (42%)</p>
                    </div>
                    <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: '11%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-gray-400">Closed</p>
                      <p className="text-white">2 (40%)</p>
                    </div>
                    <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                      <div className="h-full bg-[#d4af37]" style={{ width: '4%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Lead Response Time</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-gray-400 mb-2">Average Response</p>
                  <p className="text-white text-5xl mb-2">2.3</p>
                  <p className="text-gray-400">hours</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Goal</p>
                    <p className="text-white">&lt; 2 hours</p>
                  </div>
                  <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500" style={{ width: '87%' }}></div>
                  </div>
                  <p className="text-orange-400 text-sm">13% over goal - room for improvement</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Regional Insights */}
        <div>
          <h2 className="text-white mb-4">Regional Insights</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Regional Distribution */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Regional Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={regionalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                    <XAxis dataKey="region" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
                      labelStyle={{ color: '#fff' }}
                      formatter={(value: any) => `$${(Number(value) / 1000000).toFixed(0)}M`}
                    />
                    <Bar dataKey="value" fill="#d4af37" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="space-y-3 mt-6">
                  {regionalData.map((region, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-[#d4af37]" />
                        <div>
                          <p className="text-white">{region.region}</p>
                          <p className="text-gray-400 text-sm">{region.listings} listings</p>
                        </div>
                      </div>
                      <p className="text-white">${(region.value / 1000000).toFixed(0)}M</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Property Type Preferences */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Buyer Property Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={propertyTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ name, value }) => `${name} ${value}%`}
                    >
                      {propertyTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-6">
                  {propertyTypeData.map((type, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }}></div>
                        <p className="text-gray-400">{type.name}</p>
                      </div>
                      <p className="text-white">{type.value}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pipeline Value */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Pipeline Value</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="stage" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
                  labelStyle={{ color: '#fff' }}
                  formatter={(value: any) => `$${(Number(value) / 1000000).toFixed(0)}M`}
                />
                <Bar dataKey="value" fill="#d4af37" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="space-y-3 mt-6">
              {pipelineData.map((stage, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#d4af37]" />
                    <div>
                      <p className="text-white">{stage.stage}</p>
                      <p className="text-gray-400 text-sm">{stage.count} listings</p>
                    </div>
                  </div>
                  <p className="text-white">${(stage.value / 1000000).toFixed(0)}M</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Listing Status Breakdown */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Listing Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={listingStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {listingStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-6">
              {listingStatusData.map((type, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }}></div>
                    <p className="text-gray-400">{type.status}</p>
                  </div>
                  <p className="text-white">{type.count}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Price per Acre Analysis */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Price per Acre Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pricePerAcreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="region" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="yourAvg" fill="#d4af37" radius={[8, 8, 0, 0]} />
                <Bar dataKey="marketAvg" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="space-y-3 mt-6">
              {pricePerAcreData.map((region, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#d4af37]" />
                    <div>
                      <p className="text-white">{region.region}</p>
                      <p className="text-gray-400 text-sm">Your Avg: ${region.yourAvg.toLocaleString()}</p>
                      <p className="text-gray-400 text-sm">Market Avg: ${region.marketAvg.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Appointments & Showings */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Appointments & Showings</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={appointmentsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="appointments" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Appointments"
                />
                <Line 
                  type="monotone" 
                  dataKey="showings" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  name="Showings"
                />
                <Line 
                  type="monotone" 
                  dataKey="closed" 
                  stroke="#d4af37" 
                  strokeWidth={2}
                  name="Closed"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Contract Status Tracking */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Contract Status Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={contractStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {contractStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-6">
              {contractStatusData.map((type, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }}></div>
                    <p className="text-gray-400">{type.name}</p>
                  </div>
                  <p className="text-white">{type.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Time Metrics */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Time Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeMetricsData.map((metric, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <p className="text-gray-400">{metric.metric}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-white">Avg: {metric.avgDays} days</p>
                    <p className="text-gray-400">Target: {metric.targetDays} days</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}