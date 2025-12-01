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
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building2,
  Shield,
  Download,
  Calendar,
  Clock,
  Target,
  Zap
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
} from 'recharts';

interface AdminAnalyticsProps {
  onLogout: () => void;
}

export default function AdminAnalytics({ onLogout }: AdminAnalyticsProps) {
  const sidebarItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'Approvals', path: '/admin/approvals', icon: <CheckCircle className="w-5 h-5" /> },
    { label: 'Listing Reviews', path: '/admin/listing-reviews', icon: <FileText className="w-5 h-5" /> },
    { label: 'Users & Assignments', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { label: 'Documents', path: '/admin/documents', icon: <FileCheck className="w-5 h-5" /> },
    { label: 'Analytics', path: '/admin/analytics', icon: <BarChart3 className="w-5 h-5" />, active: true },
    { label: 'Reports', path: '/admin/reports', icon: <FileText className="w-5 h-5" /> },
    { label: 'Marketplace', path: '/admin/marketplace', icon: <Building2 className="w-5 h-5" /> },
    { label: 'Support Tickets', path: '/admin/support', icon: <HelpCircle className="w-5 h-5" /> },
    { label: 'Audit Trail', path: '/admin/audit', icon: <Shield className="w-5 h-5" /> },
    { label: 'System Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
    { label: 'My Profile', path: '/admin/profile', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Account & Billing', path: '/admin/account', icon: <DollarSign className="w-5 h-5" /> },
    { 
      label: 'Logout', 
      path: '/', 
      icon: <LogOut className="w-5 h-5" />,
    },
  ];

  // User Growth Data
  const userGrowthData = [
    { month: 'May', clients: 45, brokers: 8 },
    { month: 'Jun', clients: 62, brokers: 12 },
    { month: 'Jul', clients: 89, brokers: 18 },
    { month: 'Aug', clients: 124, brokers: 24 },
    { month: 'Sep', clients: 167, brokers: 32 },
    { month: 'Oct', clients: 203, brokers: 41 },
    { month: 'Nov', clients: 247, brokers: 53 },
  ];

  // GMV Data
  const gmvData = [
    { month: 'May', value: 145 },
    { month: 'Jun', value: 289 },
    { month: 'Jul', value: 412 },
    { month: 'Aug', value: 567 },
    { month: 'Sep', value: 689 },
    { month: 'Oct', value: 745 },
    { month: 'Nov', value: 842 },
  ];

  // Listing Activity Data
  const listingActivityData = [
    { name: 'New Submissions', value: 45, color: '#3b82f6' },
    { name: 'Approved', value: 156, color: '#10b981' },
    { name: 'Under Review', value: 23, color: '#f59e0b' },
    { name: 'Sold/Leased', value: 89, color: '#8b5cf6' },
  ];

  // Regional Distribution
  const regionalData = [
    { region: 'Montana', listings: 62, value: 324 },
    { region: 'Wyoming', listings: 48, value: 267 },
    { region: 'Colorado', listings: 34, value: 189 },
    { region: 'California', listings: 28, value: 156 },
    { region: 'Texas', listings: 22, value: 98 },
  ];

  // Broker Performance
  const topBrokers = [
    { name: 'Sarah Mitchell', listings: 18, sales: 67.5, clients: 8 },
    { name: 'John Smith', listings: 15, sales: 52.3, clients: 6 },
    { name: 'Maria Garcia', listings: 12, sales: 43.8, clients: 5 },
    { name: 'Robert Lee', listings: 10, sales: 38.2, clients: 4 },
    { name: 'Michael Chen', listings: 8, sales: 29.1, clients: 3 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  // NEW DATA: Conversion Funnel
  const conversionFunnelData = [
    { stage: 'Applications', count: 1850, percentage: 100 },
    { stage: 'Approved', count: 1295, percentage: 70 },
    { stage: 'NDA Signed', count: 1036, percentage: 56 },
    { stage: 'Active Buyers', count: 740, percentage: 40 },
    { stage: 'Closed Deals', count: 185, percentage: 10 },
  ];

  // NEW DATA: Activity Heatmap (Hour of Day)
  const hourlyActivityData = [
    { hour: '12am', activity: 12 },
    { hour: '3am', activity: 8 },
    { hour: '6am', activity: 15 },
    { hour: '9am', activity: 145 },
    { hour: '12pm', activity: 230 },
    { hour: '3pm', activity: 285 },
    { hour: '6pm', activity: 195 },
    { hour: '9pm', activity: 85 },
  ];

  // NEW DATA: Document Processing Time
  const documentProcessingData = [
    { type: 'NDA', avgTime: 2.3, target: 4 },
    { type: 'Consent-to-List', avgTime: 5.8, target: 8 },
    { type: 'Purchase Agreement', avgTime: 12.4, target: 24 },
    { type: 'Title Documents', avgTime: 18.2, target: 48 },
  ];

  // NEW DATA: User Engagement Metrics
  const engagementData = [
    { metric: 'Daily Active Users', value: 85, max: 100 },
    { metric: 'Session Duration', value: 72, max: 100 },
    { metric: 'Feature Usage', value: 68, max: 100 },
    { metric: 'Mobile Usage', value: 45, max: 100 },
    { metric: 'Search Quality', value: 91, max: 100 },
    { metric: 'Support Satisfaction', value: 88, max: 100 },
  ];

  // NEW DATA: Property Type Distribution
  const propertyTypeData = [
    { type: 'Ranches', count: 78, avgPrice: 12.4 },
    { type: 'Vineyards', count: 34, avgPrice: 8.7 },
    { type: 'Coastal', count: 18, avgPrice: 15.2 },
    { type: 'Mountain', count: 26, avgPrice: 6.9 },
  ];

  // NEW DATA: Client Budget Distribution
  const budgetDistributionData = [
    { range: '$1-3M', count: 67, color: '#3b82f6' },
    { range: '$3-5M', count: 89, color: '#10b981' },
    { range: '$5-10M', count: 56, color: '#f59e0b' },
    { range: '$10-20M', count: 28, color: '#8b5cf6' },
    { range: '$20M+', count: 7, color: '#d4af37' },
  ];

  // NEW DATA: Retention Cohort
  const retentionData = [
    { month: 'Month 1', retention: 100 },
    { month: 'Month 2', retention: 92 },
    { month: 'Month 3', retention: 87 },
    { month: 'Month 4', retention: 82 },
    { month: 'Month 5', retention: 78 },
    { month: 'Month 6', retention: 74 },
  ];

  // NEW DATA: Platform Health Metrics
  const platformHealthData = [
    { metric: 'Uptime', value: 99.8, target: 99.9 },
    { metric: 'API Response', value: 98.2, target: 95 },
    { metric: 'Error Rate', value: 0.2, target: 1 },
    { metric: 'Page Load', value: 97.5, target: 95 },
  ];

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
            <h1 className="text-white mb-2">Platform Analytics</h1>
            <p className="text-gray-400">Comprehensive insights and performance metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="30days">
              <SelectTrigger className="w-[180px] bg-[#1a1a1a] border-[#2a2a2a] text-white">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="12months">Last 12 Months</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-[#d4af37] hover:bg-[#b8941f] text-black">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-[#d4af37]" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Total GMV</p>
              <p className="text-white text-3xl mb-1">$842M</p>
              <p className="text-green-500 text-xs">+13% vs last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-500" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Total Users</p>
              <p className="text-white text-3xl mb-1">300</p>
              <p className="text-green-500 text-xs">+22% vs last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-500" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Active Listings</p>
              <p className="text-white text-3xl mb-1">156</p>
              <p className="text-green-500 text-xs">+8% vs last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Conversions</p>
              <p className="text-white text-3xl mb-1">89</p>
              <p className="text-green-500 text-xs">+15% vs last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-orange-500" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Avg Deal Size</p>
              <p className="text-white text-3xl mb-1">$9.5M</p>
              <p className="text-green-500 text-xs">+7% vs last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-red-500" />
                </div>
                <TrendingDown className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Avg Time to Close</p>
              <p className="text-white text-3xl mb-1">42d</p>
              <p className="text-green-500 text-xs">-5 days vs last month</p>
            </CardContent>
          </Card>
        </div>

        {/* User Growth Chart */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #2a2a2a',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="clients" stroke="#8b5cf6" strokeWidth={2} name="Clients" />
                <Line type="monotone" dataKey="brokers" stroke="#d4af37" strokeWidth={2} name="Brokers" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* GMV & Listings Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* GMV Trend */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Gross Merchandise Value (GMV)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gmvData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #2a2a2a',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                    formatter={(value: number) => `$${value}M`}
                  />
                  <Bar dataKey="value" fill="#d4af37" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Listing Status Distribution */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Listing Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <ResponsiveContainer width="50%" height={250}>
                  <PieChart>
                    <Pie
                      data={listingActivityData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {listingActivityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a1a', 
                        border: '1px solid #2a2a2a',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {listingActivityData.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded" 
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <p className="text-white text-sm">{item.name}</p>
                        <p className="text-gray-400 text-xs">{item.value} listings</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regional Distribution */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Regional Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regionalData.map((region, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">{region.region}</p>
                      <p className="text-gray-400 text-sm">{region.listings} listings</p>
                    </div>
                    <p className="text-[#d4af37] text-lg">${region.value}M</p>
                  </div>
                  <div className="w-full bg-[#2a2a2a] rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#d4af37] to-[#b8941f] h-2 rounded-full transition-all"
                      style={{ width: `${(region.listings / 62) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Brokers */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Top Performing Brokers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topBrokers.map((broker, index) => (
                <div 
                  key={index}
                  className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#d4af37]/10 border border-[#d4af37]">
                        <span className="text-[#d4af37]">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-white mb-1">{broker.name}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <p className="text-gray-400">{broker.listings} listings</p>
                          <p className="text-gray-400">{broker.clients} clients</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#d4af37] text-2xl mb-1">${broker.sales}M</p>
                      <p className="text-gray-400 text-sm">Total Sales</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* NEW: Conversion Funnel */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={conversionFunnelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis type="number" stroke="#9ca3af" />
                <YAxis dataKey="stage" type="category" stroke="#9ca3af" width={120} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #2a2a2a',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                  formatter={(value: number, name: string) => [
                    name === 'count' ? `${value} users (${conversionFunnelData.find(d => d.count === value)?.percentage}%)` : value,
                    name === 'count' ? 'Count' : name
                  ]}
                />
                <Bar dataKey="count" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* NEW: Activity Heatmap & Property Type Distribution */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Hourly Activity */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Activity by Time of Day</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={hourlyActivityData}>
                  <defs>
                    <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="hour" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #2a2a2a',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="activity" 
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#colorActivity)" 
                    strokeWidth={2}
                    name="Active Users"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Property Type Distribution */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Property Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={propertyTypeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="type" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #2a2a2a',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  />
                  <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} name="Count" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* NEW: Client Budget Distribution & Retention */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Client Budget Distribution */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Client Budget Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={budgetDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(props: any) => `${props.range}: ${props.count}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {budgetDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #2a2a2a',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* User Retention Cohort */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">User Retention Curve</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={retentionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #2a2a2a',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="retention" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Retention %"
                    dot={{ fill: '#10b981', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* NEW: User Engagement Radar Chart */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">User Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={engagementData}>
                <PolarGrid stroke="#2a2a2a" />
                <PolarAngleAxis dataKey="metric" stroke="#9ca3af" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#9ca3af" />
                <Radar 
                  name="Engagement Score" 
                  dataKey="value" 
                  stroke="#8b5cf6" 
                  fill="#8b5cf6" 
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #2a2a2a',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* NEW: Document Processing Time */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Document Processing Time (Hours)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={documentProcessingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="type" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #2a2a2a',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                  formatter={(value: number) => `${value} hours`}
                />
                <Legend />
                <Bar dataKey="avgTime" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Actual Avg Time" />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#10b981" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  name="Target Time"
                  dot={{ fill: '#10b981', r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* NEW: Platform Health Metrics */}
        <Card className="bg-gradient-to-br from-green-500/5 to-[#0f0f0f] border-green-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-500" />
              Platform Health Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platformHealthData.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white">{metric.metric}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-sm">Target: {metric.target}%</span>
                      <span className={
                        metric.value >= metric.target 
                          ? "text-green-400 text-lg" 
                          : "text-orange-400 text-lg"
                      }>
                        {metric.value}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-[#2a2a2a] rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        metric.value >= metric.target 
                          ? 'bg-gradient-to-r from-green-500 to-green-400' 
                          : 'bg-gradient-to-r from-orange-500 to-orange-400'
                      }`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card className="bg-gradient-to-br from-green-500/5 to-[#0f0f0f] border-green-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Platform Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                <p className="text-gray-400 text-sm mb-2">Month-over-Month Growth</p>
                <p className="text-green-400 text-2xl">+18.5%</p>
              </div>
              <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                <p className="text-gray-400 text-sm mb-2">User Retention Rate</p>
                <p className="text-green-400 text-2xl">94.3%</p>
              </div>
              <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                <p className="text-gray-400 text-sm mb-2">Avg Response Time</p>
                <p className="text-green-400 text-2xl">2.3 hours</p>
              </div>
              <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                <p className="text-gray-400 text-sm mb-2">Client Satisfaction</p>
                <p className="text-green-400 text-2xl">4.8/5.0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}