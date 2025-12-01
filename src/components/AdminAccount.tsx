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
  CreditCard,
  Download,
  Calendar,
  TrendingUp
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";

interface AdminAccountProps {
  onLogout: () => void;
}

export default function AdminAccount({ onLogout }: AdminAccountProps) {
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

  const revenueTransactions = [
    {
      id: 'TXN-10456',
      date: '2024-11-21',
      user: 'James Anderson',
      userType: 'Client',
      type: 'Access Fee',
      amount: 250,
      status: 'Completed',
      method: 'Credit Card'
    },
    {
      id: 'TXN-10455',
      date: '2024-11-20',
      user: 'Patricia Williams',
      userType: 'Client',
      type: 'Budget Increase Fee',
      amount: 150,
      status: 'Completed',
      method: 'Bank Transfer'
    },
    {
      id: 'TXN-10454',
      date: '2024-11-20',
      user: 'Michael Chen',
      userType: 'Broker',
      type: 'Broker Onboarding',
      amount: 250,
      status: 'Completed',
      method: 'Credit Card'
    },
    {
      id: 'TXN-10453',
      date: '2024-11-19',
      user: 'David Kim',
      userType: 'Client',
      type: 'Access Fee',
      amount: 250,
      status: 'Pending',
      method: 'Credit Card'
    },
  ];

  const monthlyRevenue = [
    { month: 'May', revenue: 5250 },
    { month: 'Jun', revenue: 7800 },
    { month: 'Jul', revenue: 12450 },
    { month: 'Aug', revenue: 18600 },
    { month: 'Sep', revenue: 23150 },
    { month: 'Oct', revenue: 28900 },
    { month: 'Nov', revenue: 34250 },
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
            <h1 className="text-white mb-2">Platform Account & Billing</h1>
            <p className="text-gray-400">Manage revenue, transactions, and billing settings</p>
          </div>
          <Button className="bg-[#d4af37] hover:bg-[#b8941f] text-black">
            <Download className="w-4 h-4 mr-2" />
            Export Financial Report
          </Button>
        </div>

        {/* Revenue Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-[#d4af37]" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Total Revenue (MTD)</p>
              <p className="text-white text-3xl mb-1">$34,250</p>
              <p className="text-green-500 text-xs">+18.5% vs last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Completed Transactions</p>
              <p className="text-white text-3xl">137</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-orange-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Pending Payments</p>
              <p className="text-white text-3xl">4</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-purple-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Avg Transaction</p>
              <p className="text-white text-3xl">$250</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="bg-[#1a1a1a] border border-[#2a2a2a] p-1">
            <TabsTrigger 
              value="transactions" 
              className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Transactions
            </TabsTrigger>
            <TabsTrigger 
              value="fees"
              className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Fee Structure
            </TabsTrigger>
            <TabsTrigger 
              value="revenue"
              className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Revenue Trends
            </TabsTrigger>
          </TabsList>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="mt-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                      <TableHead className="text-gray-400">Transaction ID</TableHead>
                      <TableHead className="text-gray-400">Date</TableHead>
                      <TableHead className="text-gray-400">User</TableHead>
                      <TableHead className="text-gray-400">Type</TableHead>
                      <TableHead className="text-gray-400">Amount</TableHead>
                      <TableHead className="text-gray-400">Method</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenueTransactions.map((txn) => (
                      <TableRow key={txn.id} className="border-[#2a2a2a] hover:bg-[#2a2a2a]/30">
                        <TableCell className="text-[#d4af37]">{txn.id}</TableCell>
                        <TableCell className="text-gray-400">{txn.date}</TableCell>
                        <TableCell>
                          <div>
                            <p className="text-white">{txn.user}</p>
                            <p className="text-gray-400 text-sm">{txn.userType}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-white">{txn.type}</TableCell>
                        <TableCell className="text-[#d4af37] text-lg">${txn.amount}</TableCell>
                        <TableCell className="text-gray-400">{txn.method}</TableCell>
                        <TableCell>
                          <Badge className={
                            txn.status === 'Completed'
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                          }>
                            {txn.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fee Structure Tab */}
          <TabsContent value="fees" className="mt-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Platform Fee Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-5 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-white text-lg mb-1">Client Access Fee</h3>
                        <p className="text-gray-400 text-sm">One-time fee for marketplace access</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#d4af37] text-3xl">$250</p>
                        <Button size="sm" variant="outline" className="mt-2 border-[#2a2a2a] hover:bg-[#2a2a2a]">
                          Edit Fee
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-white text-lg mb-1">Broker Onboarding Fee</h3>
                        <p className="text-gray-400 text-sm">One-time fee for broker verification & access</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#d4af37] text-3xl">$250</p>
                        <Button size="sm" variant="outline" className="mt-2 border-[#2a2a2a] hover:bg-[#2a2a2a]">
                          Edit Fee
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-white text-lg mb-1">Budget Increase Fee</h3>
                        <p className="text-gray-400 text-sm">Fee for raising client budget cap</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#d4af37] text-3xl">$150</p>
                        <Button size="sm" variant="outline" className="mt-2 border-[#2a2a2a] hover:bg-[#2a2a2a]">
                          Edit Fee
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-white text-lg mb-1">Transaction Commission</h3>
                        <p className="text-gray-400 text-sm">Platform commission on closed deals (optional)</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#d4af37] text-3xl">0.5%</p>
                        <Button size="sm" variant="outline" className="mt-2 border-[#2a2a2a] hover:bg-[#2a2a2a]">
                          Edit Rate
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Trends Tab */}
          <TabsContent value="revenue" className="mt-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Monthly Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyRevenue.map((data, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-white">{data.month} 2024</p>
                        <p className="text-[#d4af37] text-lg">${data.revenue.toLocaleString()}</p>
                      </div>
                      <div className="w-full bg-[#2a2a2a] rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-[#d4af37] to-[#b8941f] h-2 rounded-full transition-all"
                          style={{ width: `${(data.revenue / 35000) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-5 bg-green-500/5 rounded-lg border border-green-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-400 text-lg mb-1">Year-to-Date Revenue</p>
                      <p className="text-gray-400 text-sm">January - November 2024</p>
                    </div>
                    <p className="text-green-400 text-4xl">$130,400</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Payment Methods */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                <div className="flex items-center gap-4">
                  <CreditCard className="w-8 h-8 text-[#d4af37]" />
                  <div className="flex-1">
                    <p className="text-white mb-1">Stripe Integration</p>
                    <p className="text-gray-400 text-sm">Connected • Live Mode</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Active
                  </Badge>
                </div>
              </div>

              <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                <div className="flex items-center gap-4">
                  <CreditCard className="w-8 h-8 text-blue-500" />
                  <div className="flex-1">
                    <p className="text-white mb-1">Bank Transfer (ACH)</p>
                    <p className="text-gray-400 text-sm">For larger transactions</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Active
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
