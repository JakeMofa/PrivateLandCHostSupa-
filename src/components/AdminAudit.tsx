import { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
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

export default function AdminAudit({ onLogout }: AdminAuditProps) {
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

  const auditLogs = [
    {
      id: 'AUD-10456',
      timestamp: '2024-11-21 10:35:22',
      action: 'User Access Approved',
      entity: 'User',
      entityId: 'USR-1045',
      details: 'Approved client access for James Anderson with $7.5M budget cap',
      performedBy: 'Admin',
      ipAddress: '192.168.1.1',
      category: 'Access Control',
      risk: 'Low'
    },
    {
      id: 'AUD-10455',
      timestamp: '2024-11-21 10:30:15',
      action: 'Listing Approved',
      entity: 'Listing',
      entityId: 'LST-789',
      details: 'Approved Highland Ranch Estate listing for $12.5M',
      performedBy: 'Admin',
      ipAddress: '192.168.1.1',
      category: 'Listing Management',
      risk: 'Low'
    },
    {
      id: 'AUD-10454',
      timestamp: '2024-11-21 10:15:08',
      action: 'Budget Cap Increased',
      entity: 'User',
      entityId: 'USR-892',
      details: 'Client budget increased from $5M to $7.5M after POF verification',
      performedBy: 'Admin',
      ipAddress: '192.168.1.1',
      category: 'Financial',
      risk: 'Medium'
    },
    {
      id: 'AUD-10453',
      timestamp: '2024-11-21 09:45:33',
      action: 'NDA Signed',
      entity: 'Document',
      entityId: 'DOC-4562',
      details: 'Patricia Williams signed NDA for Coastal Vineyard Property',
      performedBy: 'System (DocuSign)',
      ipAddress: '23.45.67.89',
      category: 'Legal Compliance',
      risk: 'Low'
    },
    {
      id: 'AUD-10452',
      timestamp: '2024-11-21 09:30:21',
      action: 'Listing Rejected',
      entity: 'Listing',
      entityId: 'LST-778',
      details: 'Rejected listing submission - missing Consent-to-List document',
      performedBy: 'Admin',
      ipAddress: '192.168.1.1',
      category: 'Listing Management',
      risk: 'Low'
    },
    {
      id: 'AUD-10451',
      timestamp: '2024-11-21 09:15:44',
      action: 'User Account Suspended',
      entity: 'User',
      entityId: 'USR-765',
      details: 'Broker account suspended - failed license verification',
      performedBy: 'Admin',
      ipAddress: '192.168.1.1',
      category: 'Access Control',
      risk: 'High'
    },
    {
      id: 'AUD-10450',
      timestamp: '2024-11-21 08:55:12',
      action: 'Document Downloaded',
      entity: 'Document',
      entityId: 'DOC-4501',
      details: 'Client downloaded property disclosure documents for Mountain Retreat',
      performedBy: 'James Anderson (Client)',
      ipAddress: '98.76.54.32',
      category: 'Document Access',
      risk: 'Low'
    },
    {
      id: 'AUD-10449',
      timestamp: '2024-11-21 08:30:55',
      action: 'Broker Assigned to Client',
      entity: 'Assignment',
      entityId: 'ASN-223',
      details: 'Assigned Sarah Mitchell to client Patricia Williams',
      performedBy: 'Admin',
      ipAddress: '192.168.1.1',
      category: 'User Management',
      risk: 'Low'
    },
    {
      id: 'AUD-10448',
      timestamp: '2024-11-20 16:45:31',
      action: 'Property Price Updated',
      entity: 'Listing',
      entityId: 'LST-789',
      details: 'Listing price changed from $13M to $12.5M',
      performedBy: 'Sarah Mitchell (Broker)',
      ipAddress: '45.67.89.12',
      category: 'Listing Management',
      risk: 'Medium'
    },
    {
      id: 'AUD-10447',
      timestamp: '2024-11-20 15:20:18',
      action: 'Lead Created',
      entity: 'Lead',
      entityId: 'LED-556',
      details: 'New lead created: David Kim expressed interest in Mountain Retreat',
      performedBy: 'System',
      ipAddress: '12.34.56.78',
      category: 'Lead Management',
      risk: 'Low'
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
                    />
                  </div>
                  <Select defaultValue="all-category">
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
                  <Select defaultValue="all-risk">
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
                    {auditLogs.map((log) => (
                      <TableRow key={log.id} className="border-[#2a2a2a] hover:bg-[#2a2a2a]/30">
                        <TableCell className="text-gray-400 text-sm">
                          {log.timestamp}
                        </TableCell>
                        <TableCell className="text-white">{log.action}</TableCell>
                        <TableCell className="text-gray-300 max-w-md">
                          {log.details}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-white text-sm">{log.performedBy}</p>
                            <p className="text-gray-500 text-xs">{log.ipAddress}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                            {log.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            log.risk === 'High'
                              ? 'bg-red-500/20 text-red-400 border-red-500/30'
                              : log.risk === 'Medium'
                              ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                              : 'bg-green-500/20 text-green-400 border-green-500/30'
                          }>
                            {log.risk}
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
