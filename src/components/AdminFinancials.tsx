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
  DollarSign,
  TrendingUp,
  TrendingDown,
  Building2,
  Download,
  Calendar
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
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface AdminFinancialsProps {
  onLogout: () => void;
}

export default function AdminFinancials({ onLogout }: AdminFinancialsProps) {
  const sidebarItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'Approvals', path: '/admin/approvals', icon: <CheckCircle className="w-5 h-5" /> },
    { label: 'Listing Reviews', path: '/admin/listing-reviews', icon: <FileText className="w-5 h-5" /> },
    { label: 'Users & Assignments', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { label: 'Documents', path: '/admin/documents', icon: <FileCheck className="w-5 h-5" /> },
    { label: 'Analytics', path: '/admin/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'Reports', path: '/admin/reports', icon: <FileText className="w-5 h-5" /> },
    { label: 'Marketplace', path: '/admin/marketplace', icon: <Building2 className="w-5 h-5" /> },
    { label: 'Support Tickets', path: '/admin/support', icon: <HelpCircle className="w-5 h-5" /> },
    { label: 'Audit Trail', path: '/admin/audit', icon: <Shield className="w-5 h-5" /> },
    { label: 'System Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
    { label: 'My Profile', path: '/admin/profile', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Account & Billing', path: '/admin/account', icon: <DollarSign className="w-5 h-5" />, active: true },
    { 
      label: 'Logout', 
      path: '/', 
      icon: <LogOut className="w-5 h-5" />,
    },
  ];

  // Revenue data (monthly)
  const revenueData = [
    { month: 'Jan', revenue: 18400, profit: 12250, expenses: 6150 },
    { month: 'Feb', revenue: 21300, profit: 14220, expenses: 7080 },
    { month: 'Mar', revenue: 24850, profit: 16900, expenses: 7950 },
    { month: 'Apr', revenue: 28200, profit: 19500, expenses: 8700 },
    { month: 'May', revenue: 31650, profit: 22100, expenses: 9550 },
    { month: 'Jun', revenue: 35400, profit: 24800, expenses: 10600 },
    { month: 'Jul', revenue: 38900, profit: 27200, expenses: 11700 },
    { month: 'Aug', revenue: 42600, profit: 29850, expenses: 12750 },
    { month: 'Sep', revenue: 46200, profit: 32340, expenses: 13860 },
    { month: 'Oct', revenue: 49800, profit: 34860, expenses: 14940 },
    { month: 'Nov', revenue: 53100, profit: 37170, expenses: 15930 },
  ];

  // Revenue breakdown by source
  const revenueSourceData = [
    { name: 'Client Access Fees', value: 127500, color: '#d4af37' },
    { name: 'Broker Onboarding', value: 63750, color: '#3b82f6' },
    { name: 'Budget Increase Fees', value: 42500, color: '#8b5cf6' },
    { name: 'Transaction Commissions', value: 318750, color: '#10b981' },
    { name: 'Premium Features', value: 21250, color: '#f59e0b' },
  ];

  // Expense breakdown
  const expenseData = [
    { category: 'Infrastructure', amount: 45600, percentage: 28.6 },
    { category: 'Personnel', amount: 62400, percentage: 39.2 },
    { category: 'Marketing', amount: 24800, percentage: 15.6 },
    { category: 'Legal & Compliance', amount: 18200, percentage: 11.4 },
    { category: 'Operations', amount: 8200, percentage: 5.2 },
  ];

  // Transaction volume
  const transactionVolumeData = [
    { month: 'Jan', count: 74, value: 18400 },
    { month: 'Feb', count: 85, value: 21300 },
    { month: 'Mar', count: 99, value: 24850 },
    { month: 'Apr', count: 113, value: 28200 },
    { month: 'May', count: 127, value: 31650 },
    { month: 'Jun', count: 142, value: 35400 },
    { month: 'Jul', count: 156, value: 38900 },
    { month: 'Aug', count: 170, value: 42600 },
    { month: 'Sep', count: 185, value: 46200 },
    { month: 'Oct', count: 199, value: 49800 },
    { month: 'Nov', count: 212, value: 53100 },
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
            <h1 className="text-white mb-2">Financial KPIs & Performance</h1>
            <p className="text-gray-400">Comprehensive financial metrics and revenue analytics</p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="ytd">
              <SelectTrigger className="w-[180px] bg-[#1a1a1a] border-[#2a2a2a] text-white">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                <SelectItem value="mtd">Month to Date</SelectItem>
                <SelectItem value="qtd">Quarter to Date</SelectItem>
                <SelectItem value="ytd">Year to Date</SelectItem>
                <SelectItem value="12months">Last 12 Months</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-[#d4af37] hover:bg-[#b8941f] text-black">
              <Download className="w-4 h-4 mr-2" />
              Export Financial Report
            </Button>
          </div>
        </div>

        {/* Top Financial KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-[#d4af37]" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Total Revenue (YTD)</p>
              <p className="text-white text-3xl mb-1">$573.7K</p>
              <p className="text-green-500 text-xs">+22.5% vs last year</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Net Profit (YTD)</p>
              <p className="text-white text-3xl mb-1">$401.2K</p>
              <p className="text-green-500 text-xs">+19.8% vs last year</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Profit Margin</p>
              <p className="text-white text-3xl mb-1">69.9%</p>
              <p className="text-green-500 text-xs">+2.1% vs last quarter</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-blue-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">ARPU (Avg Revenue Per User)</p>
              <p className="text-white text-3xl mb-1">$2,323</p>
              <p className="text-green-500 text-xs">+8.4% vs last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-orange-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Runway (Months)</p>
              <p className="text-white text-3xl mb-1">34</p>
              <p className="text-green-500 text-xs">Healthy cash position</p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue & Profit Trend */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Revenue & Profit Trend (YTD)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                  formatter={(value: number) => `$${(value / 1000).toFixed(1)}K`}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#d4af37" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  strokeWidth={2}
                  name="Revenue"
                />
                <Area 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorProfit)" 
                  strokeWidth={2}
                  name="Net Profit"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Sources & Transaction Volume */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Revenue by Source */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Revenue by Source</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={revenueSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(props: any) => `${props.name}: ${((props.percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {revenueSourceData.map((entry, index) => (
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
                    formatter={(value: number) => `$${(value / 1000).toFixed(1)}K`}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {revenueSourceData.map((source, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: source.color }} />
                      <span className="text-gray-300">{source.name}</span>
                    </div>
                    <span className="text-white">${(source.value / 1000).toFixed(1)}K</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Transaction Volume */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Transaction Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={transactionVolumeData}>
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
                  <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} name="Transaction Count" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Expense Breakdown */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Operating Expenses Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenseData.map((expense, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white">{expense.category}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">${(expense.amount / 1000).toFixed(1)}K</span>
                      <span className="text-[#d4af37]">{expense.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#2a2a2a] rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#d4af37] to-[#b8941f] h-2 rounded-full transition-all"
                      style={{ width: `${expense.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Financial Health Summary */}
        <Card className="bg-gradient-to-br from-green-500/5 to-[#0f0f0f] border-green-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Financial Health Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                <p className="text-gray-400 text-sm mb-2">Revenue Growth Rate</p>
                <p className="text-green-400 text-2xl">+22.5%</p>
              </div>
              <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                <p className="text-gray-400 text-sm mb-2">Customer LTV</p>
                <p className="text-green-400 text-2xl">$18,420</p>
              </div>
              <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                <p className="text-gray-400 text-sm mb-2">CAC Payback Period</p>
                <p className="text-green-400 text-2xl">3.2 months</p>
              </div>
              <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                <p className="text-gray-400 text-sm mb-2">Cash Reserves</p>
                <p className="text-green-400 text-2xl">$1.4M</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
