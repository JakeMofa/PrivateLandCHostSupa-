import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
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
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  Bookmark,
  MapPin,
  Calendar,
  Mail,
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
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface ClientAnalyticsProps {
  onLogout: () => void;
}

export default function ClientAnalytics({ onLogout }: ClientAnalyticsProps) {
  const sidebarItems = [
    { label: 'Dashboard', path: '/client/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'My Profile', path: '/client/profile', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Marketplace', path: '/client/marketplace', icon: <Home className="w-5 h-5" /> },
    { label: 'Saved Properties', path: '/client/saved', icon: <Heart className="w-5 h-5" /> },
    { label: 'My Agent', path: '/client/agent', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Invitations', path: '/client/invitations', icon: <Heart className="w-5 h-5" /> },
    { label: 'Analytics', path: '/client/analytics', icon: <BarChart3 className="w-5 h-5" />, active: true },
    { label: 'Reports', path: '/client/reports', icon: <FileBarChart className="w-5 h-5" /> },
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

  // Market price trends over 12 months
  const priceTrendData = [
    { month: 'Jan', montana: 4100000, california: 5800000, colorado: 3200000 },
    { month: 'Feb', montana: 4150000, california: 5950000, colorado: 3300000 },
    { month: 'Mar', montana: 4200000, california: 6100000, colorado: 3400000 },
    { month: 'Apr', montana: 4250000, california: 6200000, colorado: 3450000 },
    { month: 'May', montana: 4300000, california: 6300000, colorado: 3500000 },
    { month: 'Jun', montana: 4350000, california: 6400000, colorado: 3550000 },
    { month: 'Jul', montana: 4400000, california: 6500000, colorado: 3600000 },
    { month: 'Aug', montana: 4450000, california: 6600000, colorado: 3650000 },
  ];

  // Price per acre comparison
  const pricePerAcreData = [
    { region: 'Montana', price: 12500, avgPrice: 10000 },
    { region: 'Wyoming', price: 15000, avgPrice: 12000 },
    { region: 'California', price: 25000, avgPrice: 22000 },
    { region: 'Colorado', price: 18000, avgPrice: 16000 },
    { region: 'Idaho', price: 11000, avgPrice: 9500 },
  ];

  // Days on market trends
  const domData = [
    { month: 'Jan', dom: 52 },
    { month: 'Feb', dom: 51 },
    { month: 'Mar', dom: 50 },
    { month: 'Apr', dom: 49 },
    { month: 'May', dom: 48 },
    { month: 'Jun', dom: 47 },
    { month: 'Jul', dom: 47 },
    { month: 'Aug', dom: 46 },
  ];

  // Your viewing history
  const viewingHistoryData = [
    { week: 'Week 1', views: 5 },
    { week: 'Week 2', views: 8 },
    { week: 'Week 3', views: 12 },
    { week: 'Week 4', views: 15 },
  ];

  // Property type preferences
  const propertyTypeData = [
    { name: 'Ranch', value: 40, color: '#d4af37' },
    { name: 'Estate', value: 25, color: '#3b82f6' },
    { name: 'Vineyard', value: 15, color: '#8b5cf6' },
    { name: 'Waterfront', value: 12, color: '#10b981' },
    { name: 'Mountain', value: 8, color: '#f59e0b' },
  ];

  // Saved properties analysis
  const savedPropertiesData = [
    { property: 'Highland Ranch Estate', price: 12500000, acres: 450, pricePerAcre: 27778, views: 15 },
    { property: 'Coastal Villa', price: 8750000, acres: 120, pricePerAcre: 72917, views: 12 },
    { property: 'Mountain Retreat', price: 6200000, acres: 280, pricePerAcre: 22143, views: 8 },
    { property: 'Desert Oasis', price: 4950000, acres: 350, pricePerAcre: 14143, views: 6 },
    { property: 'Lakefront Property', price: 7800000, acres: 200, pricePerAcre: 39000, views: 10 },
  ];

  // New listings trends
  const newListingsTrendData = [
    { week: 'Week 1', count: 2 },
    { week: 'Week 2', count: 4 },
    { week: 'Week 3', count: 3 },
    { week: 'Week 4', count: 5 },
  ];

  // Budget vs market
  const budgetVsMarket = [
    { range: 'Under $3M', available: 5, color: '#10b981' },
    { range: '$3M-$5M', available: 12, color: '#d4af37' },
    { range: '$5M-$10M', available: 8, color: '#3b82f6' },
    { range: 'Over $10M', available: 3, color: '#8b5cf6' },
  ];

  // NEW DATA: Document & Access Status
  const documentStatusData = [
    { document: 'Platform NDA', status: 'Signed', date: '2024-08-15', expires: '2025-08-15' },
    { document: 'Proof of Funds', status: 'Approved', date: '2024-08-20', expires: '2024-11-20' },
    { document: 'Access Agreement', status: 'Active', date: '2024-08-10', expires: 'Lifetime' },
    { document: 'Highland Ranch NDA', status: 'Pending', date: '2024-10-01', expires: '2025-10-01' },
  ];

  // NEW DATA: Agent Interaction Timeline
  const agentInteractionData = [
    { date: '2024-10-15', type: 'Contact Request', status: 'Responded', agent: 'Sarah Mitchell' },
    { date: '2024-10-12', type: 'Meeting', status: 'Completed', agent: 'Sarah Mitchell' },
    { date: '2024-10-08', type: 'Contact Request', status: 'Responded', agent: 'Sarah Mitchell' },
    { date: '2024-10-05', type: 'Assignment', status: 'Completed', agent: 'Sarah Mitchell' },
  ];

  // NEW DATA: Search Activity
  const searchActivityData = [
    { filter: 'Ranch Properties', count: 12, lastUsed: '2 hours ago' },
    { filter: 'Montana $4-6M', count: 8, lastUsed: '1 day ago' },
    { filter: '200+ acres', count: 15, lastUsed: '3 days ago' },
    { filter: 'Waterfront', count: 5, lastUsed: '1 week ago' },
  ];

  // NEW DATA: Property Suitability Indicators
  const suitabilityData = [
    { property: 'Highland Ranch Estate', taxRate: 'Low', floodZone: 'None', zoning: 'Agricultural', score: 95 },
    { property: 'Coastal Villa', taxRate: 'High', floodZone: 'C', zoning: 'Residential', score: 72 },
    { property: 'Mountain Retreat', taxRate: 'Low', floodZone: 'None', zoning: 'Mixed', score: 88 },
    { property: 'Desert Oasis', taxRate: 'Medium', floodZone: 'None', zoning: 'Agricultural', score: 82 },
  ];

  // NEW DATA: Listings Above/Within Budget
  const budgetAccessData = {
    approvedBudget: 5000000,
    withinBudget: 12,
    aboveBudget: 18,
    belowBudget: 8,
    accessLevel: 'Premium Access'
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole="client" 
      userName="James Anderson"
      onLogout={onLogout}
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white mb-2">Market Analytics</h1>
            <p className="text-gray-400">Deep insights for informed investment decisions</p>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="90">
              <SelectTrigger className="w-[180px] bg-[#1a1a1a] border-[#2a2a2a] text-white">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="180">Last 6 months</SelectItem>
                <SelectItem value="365">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Market Intelligence Section */}
        <div>
          <h2 className="text-white mb-4">Market Intelligence</h2>
          
          {/* Price Trends */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Regional Price Trends</span>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-gray-400 mb-1">Your Budget Range</p>
                  <p className="text-white text-3xl mb-1">$3M - $5M</p>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    12 properties available
                  </Badge>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={priceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
                      labelStyle={{ color: '#fff' }}
                      formatter={(value: any) => `$${(Number(value) / 1000000).toFixed(1)}M`}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="montana" 
                      stroke="#d4af37" 
                      strokeWidth={2}
                      name="Montana"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="california" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="California"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="colorado" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      name="Colorado"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Price per Acre Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={340}>
                  <BarChart data={pricePerAcreData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                    <XAxis type="category" dataKey="region" stroke="#6b7280" />
                    <YAxis type="number" stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
                      labelStyle={{ color: '#fff' }}
                      formatter={(value) => `$${value.toLocaleString()}/acre`}
                    />
                    <Legend />
                    <Bar dataKey="price" fill="#d4af37" name="Current" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="avgPrice" fill="#6b7280" name="Market Avg" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Days on Market & New Listings */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Days on Market Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6 text-center">
                  <p className="text-gray-400 mb-2">Current Average</p>
                  <p className="text-white text-5xl mb-2">47</p>
                  <p className="text-gray-400">days</p>
                  <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">
                    Down 12% from last year
                  </Badge>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={domData}>
                    <defs>
                      <linearGradient id="domGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
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
                      dataKey="dom" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      fill="url(#domGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">New Listings in Your Range</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6 text-center">
                  <p className="text-gray-400 mb-2">This Month</p>
                  <p className="text-white text-5xl mb-2">14</p>
                  <p className="text-gray-400">new properties</p>
                  <Badge className="mt-2 bg-blue-500/20 text-blue-400 border-blue-500/30">
                    3 match your preferences
                  </Badge>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={newListingsTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                    <XAxis dataKey="week" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="count" fill="#d4af37" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Your Activity Analytics */}
        <div>
          <h2 className="text-white mb-4">Your Activity Analytics</h2>
          
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Viewing History */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Viewing Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6 text-center">
                  <p className="text-gray-400 mb-2">Total Views</p>
                  <p className="text-white text-4xl">24</p>
                  <p className="text-green-500 text-sm mt-2">+8 this week</p>
                </div>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={viewingHistoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                    <XAxis dataKey="week" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="views" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Property Type Preferences */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Property Type Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={propertyTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
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
                <div className="space-y-2 mt-4">
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

            {/* Budget vs Market */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Budget vs Market</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-gray-400 mb-2">Your Budget</p>
                  <p className="text-white text-3xl mb-1">$5M</p>
                  <p className="text-gray-400 text-sm">Pre-approved</p>
                </div>
                <div className="space-y-4">
                  {budgetVsMarket.map((range, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-gray-400 text-sm">{range.range}</p>
                        <p className="text-white">{range.available} available</p>
                      </div>
                      <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${(range.available / 28) * 100}%`,
                            backgroundColor: range.color
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Saved Properties Analysis */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Saved Properties Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                    <TableHead className="text-gray-400">Property</TableHead>
                    <TableHead className="text-gray-400 text-right">Price</TableHead>
                    <TableHead className="text-gray-400 text-center">Acres</TableHead>
                    <TableHead className="text-gray-400 text-right">Price/Acre</TableHead>
                    <TableHead className="text-gray-400 text-center">Your Views</TableHead>
                    <TableHead className="text-gray-400 text-center">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {savedPropertiesData.map((property, idx) => (
                    <TableRow key={idx} className="border-[#2a2a2a] hover:bg-[#2a2a2a]/30">
                      <TableCell className="text-white">{property.property}</TableCell>
                      <TableCell className="text-white text-right">
                        ${(property.price / 1000000).toFixed(1)}M
                      </TableCell>
                      <TableCell className="text-gray-400 text-center">{property.acres}</TableCell>
                      <TableCell className="text-white text-right">
                        ${property.pricePerAcre.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Eye className="w-4 h-4 text-blue-500" />
                          <span className="text-white">{property.views}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={
                          property.pricePerAcre < 20000
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : property.pricePerAcre < 40000
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                            : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                        }>
                          {property.pricePerAcre < 20000 ? 'Excellent' : property.pricePerAcre < 40000 ? 'Good' : 'Premium'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Financial Analytics */}
        <div>
          <h2 className="text-white mb-4">Financial Analytics</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Affordability Index</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-gray-400 mb-2">Properties in Budget</p>
                  <p className="text-white text-5xl mb-2">12</p>
                  <p className="text-gray-400">Up from 9 last month</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Market Median</p>
                    <p className="text-white">$4.2M</p>
                  </div>
                  <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '84%' }}></div>
                  </div>
                  <p className="text-green-500 text-sm">Your budget is 16% above median</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Average Mortgage Rates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-gray-400 mb-2">Current Rate</p>
                  <p className="text-white text-5xl mb-2">6.5%</p>
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                    Up 0.2% this month
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <p className="text-gray-400">15-year fixed</p>
                    <p className="text-white">5.8%</p>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <p className="text-gray-400">30-year fixed</p>
                    <p className="text-white">6.5%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Estimated Monthly Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-gray-400 mb-2">At $5M (20% down)</p>
                  <p className="text-white text-5xl mb-2">$24K</p>
                  <p className="text-gray-400">per month</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-sm">Principal & Interest</p>
                    <p className="text-white">$19,200</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-sm">Property Tax</p>
                    <p className="text-white">$3,500</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-sm">Insurance</p>
                    <p className="text-white">$1,300</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Geographic Analysis */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Geographic Activity Heatmap</CardTitle>
            <p className="text-gray-400 text-sm mt-1">Where you're focusing your search</p>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-5 gap-4">
              {pricePerAcreData.map((region, idx) => (
                <div key={idx} className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="w-5 h-5 text-[#d4af37]" />
                    <p className="text-white">{region.region}</p>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">Avg Price/Acre</p>
                  <p className="text-white text-xl mb-2">${(region.price / 1000).toFixed(0)}K</p>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                    {Math.floor(Math.random() * 8) + 1} views
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}