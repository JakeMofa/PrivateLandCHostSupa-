import { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { supabase } from '../utils/supabase/client';
import { toast } from 'sonner';
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
  Search,
  Filter,
  Calendar,
  User,
  Clock,
  AlertCircle,
  Eye
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";

interface AdminAuditProps {
  onLogout: () => void;
}

interface AuditLog {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  details: string;
  performed_by_name: string;
  category: string;
  risk_level: string;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

export default function AdminAudit({ onLogout }: AdminAuditProps) {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all-category');
  const [riskFilter, setRiskFilter] = useState('all-risk');

  // Fetch audit logs
  useEffect(() => {
    fetchAuditLogs();

    // Real-time subscription
    const channel = supabase
      .channel('audit_logs_updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'audit_logs' }, fetchAuditLogs)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setAuditLogs(data || []);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      toast.error('Failed to load audit logs');
      setAuditLogs([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter logs based on search and filters
  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = searchTerm === '' || 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.performed_by_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all-category' || log.category === categoryFilter;
    const matchesRisk = riskFilter === 'all-risk' || log.risk_level === riskFilter;

    return matchesSearch && matchesCategory && matchesRisk;
  });

  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const sidebarItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'Approvals', path: '/admin/approvals', icon: <CheckCircle className="w-5 h-5" /> },
    { label: 'Listing Reviews', path: '/admin/listing-reviews', icon: <FileText className="w-5 h-5" /> },
    { label: 'Users & Assignments', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { label: 'Documents', path: '/admin/documents', icon: <FileCheck className="w-5 h-5" /> },
    { label: 'Analytics', path: '/admin/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'Support Tickets', path: '/admin/support', icon: <HelpCircle className="w-5 h-5" /> },
    { label: 'Audit Trail', path: '/admin/audit', icon: <Shield className="w-5 h-5" />, active: true },
    { label: 'System Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
    { 
      label: 'Logout', 
      path: '/', 
      icon: <LogOut className="w-5 h-5" />,
    },
  ];

  const complianceReports = [
    {
      id: 'REP-001',
      name: 'NDA Compliance Report',
      description: 'All NDA signatures and verification status',
      lastGenerated: '2024-11-21',
      coverage: '100%'
    },
    {
      id: 'REP-002',
      name: 'Consent-to-List Audit',
      description: 'Broker consent verification for all active listings',
      lastGenerated: '2024-11-21',
      coverage: '98%'
    },
    {
      id: 'REP-003',
      name: 'User Access Log',
      description: 'All user logins and permission changes',
      lastGenerated: '2024-11-21',
      coverage: '100%'
    },
    {
      id: 'REP-004',
      name: 'Financial Transaction Audit',
      description: 'All budget changes, fees, and financial activities',
      lastGenerated: '2024-11-21',
      coverage: '100%'
    },
    {
      id: 'REP-005',
      name: 'Document Access Trail',
      description: 'Who accessed which documents and when',
      lastGenerated: '2024-11-21',
      coverage: '100%'
    },
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
            <h1 className="text-white mb-2">Audit Trail & Compliance</h1>
            <p className="text-gray-400">Complete system audit log for regulatory compliance</p>
          </div>
          <Button className="bg-[#d4af37] hover:bg-[#b8941f] text-black">
            <Download className="w-4 h-4 mr-2" />
            Export Full Audit Log
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Total Events</p>
              <p className="text-white text-3xl">10,456</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mb-3">
                <Shield className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Compliance Rate</p>
              <p className="text-white text-3xl">99.2%</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mb-3">
                <AlertCircle className="w-5 h-5 text-orange-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">High-Risk Events</p>
              <p className="text-white text-3xl">3</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Active Users (24h)</p>
              <p className="text-white text-3xl">156</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-3">
                <FileCheck className="w-5 h-5 text-[#d4af37]" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Last Backup</p>
              <p className="text-white text-lg">2 hours ago</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="logs" className="w-full">
          <TabsList className="bg-[#1a1a1a] border border-[#2a2a2a] p-1">
            <TabsTrigger 
              value="logs" 
              className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black"
            >
              <FileText className="w-4 h-4 mr-2" />
              Audit Logs
            </TabsTrigger>
            <TabsTrigger 
              value="compliance"
              className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black"
            >
              <Shield className="w-4 h-4 mr-2" />
              Compliance Reports
            </TabsTrigger>
          </TabsList>

          {/* Audit Logs Tab */}
          <TabsContent value="logs" className="mt-6">
            {/* Filters */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] mb-6">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input 
                      placeholder="Search audit logs..." 
                      className="pl-10 bg-[#0f0f0f] border-[#2a2a2a] text-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select defaultValue="all-category" value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[200px] bg-[#0f0f0f] border-[#2a2a2a] text-white">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                      <SelectItem value="all-category">All Categories</SelectItem>
                      <SelectItem value="access">Access Control</SelectItem>
                      <SelectItem value="listing">Listing Management</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="legal">Legal Compliance</SelectItem>
                      <SelectItem value="document">Document Access</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all-risk" value={riskFilter} onValueChange={setRiskFilter}>
                    <SelectTrigger className="w-[180px] bg-[#0f0f0f] border-[#2a2a2a] text-white">
                      <SelectValue placeholder="Risk Level" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                      <SelectItem value="all-risk">All Risk Levels</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#2a2a2a]">
                    <Calendar className="w-4 h-4 mr-2" />
                    Date Range
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Audit Logs Table */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">System Audit Log</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                      <TableHead className="text-gray-400">Timestamp</TableHead>
                      <TableHead className="text-gray-400">Action</TableHead>
                      <TableHead className="text-gray-400">Details</TableHead>
                      <TableHead className="text-gray-400">Performed By</TableHead>
                      <TableHead className="text-gray-400">Category</TableHead>
                      <TableHead className="text-gray-400">Risk</TableHead>
                      <TableHead className="text-gray-400">ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.map((log) => (
                      <TableRow key={log.id} className="border-[#2a2a2a] hover:bg-[#2a2a2a]/30">
                        <TableCell className="text-gray-400 text-sm">
                          {formatTimestamp(log.created_at)}
                        </TableCell>
                        <TableCell className="text-white">{log.action}</TableCell>
                        <TableCell className="text-gray-300 max-w-md">
                          {log.details}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-white text-sm">{log.performed_by_name}</p>
                            <p className="text-gray-500 text-xs">{log.ip_address}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                            {log.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            log.risk_level === 'High'
                              ? 'bg-red-500/20 text-red-400 border-red-500/30'
                              : log.risk_level === 'Medium'
                              ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                              : 'bg-green-500/20 text-green-400 border-green-500/30'
                          }>
                            {log.risk_level}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-500 text-xs">{log.id}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Reports Tab */}
          <TabsContent value="compliance" className="mt-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Compliance & Audit Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceReports.map((report) => (
                    <div 
                      key={report.id}
                      className="p-5 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] hover:border-[#d4af37]/30 transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Shield className="w-5 h-5 text-[#d4af37]" />
                            <h3 className="text-white text-lg">{report.name}</h3>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              {report.coverage} Coverage
                            </Badge>
                          </div>
                          <p className="text-gray-400 mb-3">{report.description}</p>
                          <p className="text-gray-500 text-sm">
                            Last generated: {report.lastGenerated}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-[#2a2a2a] hover:bg-[#2a2a2a]"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-[#d4af37] hover:bg-[#b8941f] text-black"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Compliance Summary */}
            <Card className="bg-gradient-to-br from-green-500/5 to-[#0f0f0f] border-green-500/30 mt-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  Audit Readiness Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <p className="text-gray-400 text-sm mb-2">All NDAs Signed & Verified</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <p className="text-white">100% Compliant</p>
                    </div>
                  </div>
                  <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <p className="text-gray-400 text-sm mb-2">Consent-to-List Documentation</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <p className="text-white">98% Compliant</p>
                    </div>
                  </div>
                  <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <p className="text-gray-400 text-sm mb-2">User Access Controls</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <p className="text-white">100% Compliant</p>
                    </div>
                  </div>
                  <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <p className="text-gray-400 text-sm mb-2">Financial Transaction Logs</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <p className="text-white">100% Compliant</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-green-500/5 rounded-lg border border-green-500/30">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-green-400 mb-1">Platform is Audit-Ready</p>
                      <p className="text-gray-400 text-sm">
                        All compliance documentation is complete and audit trail is comprehensive. 
                        System is ready for regulatory inspection at any time.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
