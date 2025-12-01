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
  Download,
  Eye,
  Search,
  Filter,
  AlertCircle,
  Clock,
  Shield
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
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

interface AdminDocumentsProps {
  onLogout: () => void;
}

export default function AdminDocuments({ onLogout }: AdminDocumentsProps) {
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const sidebarItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'Approvals', path: '/admin/approvals', icon: <CheckCircle className="w-5 h-5" /> },
    { label: 'Listing Reviews', path: '/admin/listing-reviews', icon: <FileText className="w-5 h-5" /> },
    { label: 'Users & Assignments', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { label: 'Documents', path: '/admin/documents', icon: <FileCheck className="w-5 h-5" />, active: true },
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

  const ndaDocs = [
    {
      id: 'NDA-1045',
      signer: 'Patricia Williams',
      signerType: 'Client',
      property: 'Coastal Vineyard Property',
      signedDate: '2024-11-20',
      expiryDate: '2025-11-20',
      status: 'Active',
      docuSignId: 'DS-4562-ABC',
      downloads: 3
    },
    {
      id: 'NDA-1044',
      signer: 'James Anderson',
      signerType: 'Client',
      property: 'Highland Ranch Estate',
      signedDate: '2024-11-18',
      expiryDate: '2025-11-18',
      status: 'Active',
      docuSignId: 'DS-4561-DEF',
      downloads: 5
    },
    {
      id: 'NDA-1043',
      signer: 'David Kim',
      signerType: 'Client',
      property: 'Mountain Retreat',
      signedDate: '2024-10-15',
      expiryDate: '2025-10-15',
      status: 'Active',
      docuSignId: 'DS-4560-GHI',
      downloads: 2
    },
    {
      id: 'NDA-1042',
      signer: 'Elizabeth Turner',
      signerType: 'Client',
      property: 'Desert Oasis Ranch',
      signedDate: '2024-08-10',
      expiryDate: '2025-08-10',
      status: 'Expiring Soon',
      docuSignId: 'DS-4559-JKL',
      downloads: 8
    },
  ];

  const consentDocs = [
    {
      id: 'CNS-789',
      broker: 'Sarah Mitchell',
      brokerage: 'Montana Estates',
      property: 'Highland Ranch Estate',
      owner: 'Anderson Family Trust',
      signedDate: '2024-11-15',
      expiryDate: '2025-05-15',
      status: 'Active',
      listingStatus: 'Approved',
      docuSignId: 'DS-789-ABC'
    },
    {
      id: 'CNS-788',
      broker: 'John Smith',
      brokerage: 'Wyoming Land Group',
      property: 'Mountain Retreat',
      owner: 'Robert Johnson',
      signedDate: '2024-11-10',
      expiryDate: '2025-05-10',
      status: 'Active',
      listingStatus: 'Approved',
      docuSignId: 'DS-788-DEF'
    },
    {
      id: 'CNS-787',
      broker: 'Maria Garcia',
      brokerage: 'California Land Co.',
      property: 'Coastal Vineyard Property',
      owner: 'Garcia Vineyards LLC',
      signedDate: '2024-11-01',
      expiryDate: '2025-05-01',
      status: 'Active',
      listingStatus: 'Approved',
      docuSignId: 'DS-787-GHI'
    },
    {
      id: 'CNS-786',
      broker: 'Robert Lee',
      brokerage: 'Wyoming Land Group',
      property: 'Prairie Ranch Estate',
      owner: 'Lee Properties',
      signedDate: '2024-06-20',
      expiryDate: '2024-12-20',
      status: 'Expiring Soon',
      listingStatus: 'Needs Renewal',
      docuSignId: 'DS-786-JKL'
    },
  ];

  const propertyDocs = [
    {
      id: 'PDOC-456',
      property: 'Highland Ranch Estate',
      docType: 'Title Report',
      uploadedBy: 'Sarah Mitchell',
      uploadDate: '2024-11-15',
      fileSize: '2.4 MB',
      status: 'Verified',
      downloads: 12
    },
    {
      id: 'PDOC-455',
      property: 'Highland Ranch Estate',
      docType: 'Survey',
      uploadedBy: 'Sarah Mitchell',
      uploadDate: '2024-11-15',
      fileSize: '8.1 MB',
      status: 'Verified',
      downloads: 8
    },
    {
      id: 'PDOC-454',
      property: 'Coastal Vineyard Property',
      docType: 'Water Rights',
      uploadedBy: 'Maria Garcia',
      uploadDate: '2024-11-01',
      fileSize: '1.2 MB',
      status: 'Pending Review',
      downloads: 0
    },
    {
      id: 'PDOC-453',
      property: 'Mountain Retreat',
      docType: 'Environmental Assessment',
      uploadedBy: 'John Smith',
      uploadDate: '2024-10-28',
      fileSize: '5.6 MB',
      status: 'Verified',
      downloads: 15
    },
  ];

  const handleViewDoc = (doc: any, type: string) => {
    setSelectedDoc({ ...doc, type });
    setDialogOpen(true);
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
            <h1 className="text-white mb-2">Document Management</h1>
            <p className="text-gray-400">Manage NDAs, consent forms, and property documents</p>
          </div>
          <Button className="bg-[#d4af37] hover:bg-[#b8941f] text-black">
            <Download className="w-4 h-4 mr-2" />
            Export All Documents
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Total NDAs</p>
              <p className="text-white text-3xl">{ndaDocs.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mb-3">
                <FileCheck className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Consent Forms</p>
              <p className="text-white text-3xl">{consentDocs.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mb-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Property Docs</p>
              <p className="text-white text-3xl">{propertyDocs.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Expiring Soon</p>
              <p className="text-white text-3xl">2</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mb-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Needs Review</p>
              <p className="text-white text-3xl">1</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="ndas" className="w-full">
          <TabsList className="bg-[#1a1a1a] border border-[#2a2a2a] p-1">
            <TabsTrigger 
              value="ndas" 
              className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black"
            >
              <FileText className="w-4 h-4 mr-2" />
              NDAs ({ndaDocs.length})
            </TabsTrigger>
            <TabsTrigger 
              value="consent"
              className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black"
            >
              <FileCheck className="w-4 h-4 mr-2" />
              Consent-to-List ({consentDocs.length})
            </TabsTrigger>
            <TabsTrigger 
              value="property"
              className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black"
            >
              <Shield className="w-4 h-4 mr-2" />
              Property Docs ({propertyDocs.length})
            </TabsTrigger>
          </TabsList>

          {/* NDAs Tab */}
          <TabsContent value="ndas" className="mt-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Non-Disclosure Agreements</CardTitle>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input 
                        placeholder="Search NDAs..." 
                        className="pl-10 bg-[#0f0f0f] border-[#2a2a2a] text-white w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                      <TableHead className="text-gray-400">ID</TableHead>
                      <TableHead className="text-gray-400">Signer</TableHead>
                      <TableHead className="text-gray-400">Property</TableHead>
                      <TableHead className="text-gray-400">Signed Date</TableHead>
                      <TableHead className="text-gray-400">Expiry Date</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400 text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ndaDocs.map((doc) => (
                      <TableRow key={doc.id} className="border-[#2a2a2a] hover:bg-[#2a2a2a]/30">
                        <TableCell className="text-[#d4af37]">{doc.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="text-white">{doc.signer}</p>
                            <p className="text-gray-400 text-sm">{doc.signerType}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-white">{doc.property}</TableCell>
                        <TableCell className="text-gray-400">{doc.signedDate}</TableCell>
                        <TableCell className="text-gray-400">{doc.expiryDate}</TableCell>
                        <TableCell>
                          <Badge className={
                            doc.status === 'Active'
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                          }>
                            {doc.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-[#2a2a2a] hover:bg-[#2a2a2a]"
                              onClick={() => handleViewDoc(doc, 'nda')}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-[#d4af37] hover:bg-[#b8941f] text-black"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Consent-to-List Tab */}
          <TabsContent value="consent" className="mt-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Consent-to-List Documents</CardTitle>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input 
                        placeholder="Search consent forms..." 
                        className="pl-10 bg-[#0f0f0f] border-[#2a2a2a] text-white w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                      <TableHead className="text-gray-400">ID</TableHead>
                      <TableHead className="text-gray-400">Broker</TableHead>
                      <TableHead className="text-gray-400">Property</TableHead>
                      <TableHead className="text-gray-400">Owner</TableHead>
                      <TableHead className="text-gray-400">Signed Date</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Listing</TableHead>
                      <TableHead className="text-gray-400 text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {consentDocs.map((doc) => (
                      <TableRow key={doc.id} className="border-[#2a2a2a] hover:bg-[#2a2a2a]/30">
                        <TableCell className="text-[#d4af37]">{doc.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="text-white">{doc.broker}</p>
                            <p className="text-gray-400 text-sm">{doc.brokerage}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-white">{doc.property}</TableCell>
                        <TableCell className="text-gray-400">{doc.owner}</TableCell>
                        <TableCell className="text-gray-400">{doc.signedDate}</TableCell>
                        <TableCell>
                          <Badge className={
                            doc.status === 'Active'
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                          }>
                            {doc.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            doc.listingStatus === 'Approved'
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : 'bg-red-500/20 text-red-400 border-red-500/30'
                          }>
                            {doc.listingStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-[#2a2a2a] hover:bg-[#2a2a2a]"
                              onClick={() => handleViewDoc(doc, 'consent')}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-[#d4af37] hover:bg-[#b8941f] text-black"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Property Documents Tab */}
          <TabsContent value="property" className="mt-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Property Documents</CardTitle>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input 
                        placeholder="Search documents..." 
                        className="pl-10 bg-[#0f0f0f] border-[#2a2a2a] text-white w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                      <TableHead className="text-gray-400">ID</TableHead>
                      <TableHead className="text-gray-400">Property</TableHead>
                      <TableHead className="text-gray-400">Document Type</TableHead>
                      <TableHead className="text-gray-400">Uploaded By</TableHead>
                      <TableHead className="text-gray-400">Upload Date</TableHead>
                      <TableHead className="text-gray-400">File Size</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400 text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {propertyDocs.map((doc) => (
                      <TableRow key={doc.id} className="border-[#2a2a2a] hover:bg-[#2a2a2a]/30">
                        <TableCell className="text-[#d4af37]">{doc.id}</TableCell>
                        <TableCell className="text-white">{doc.property}</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            {doc.docType}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-white">{doc.uploadedBy}</TableCell>
                        <TableCell className="text-gray-400">{doc.uploadDate}</TableCell>
                        <TableCell className="text-gray-400">{doc.fileSize}</TableCell>
                        <TableCell>
                          <Badge className={
                            doc.status === 'Verified'
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                          }>
                            {doc.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-[#2a2a2a] hover:bg-[#2a2a2a]"
                              onClick={() => handleViewDoc(doc, 'property')}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-[#d4af37] hover:bg-[#b8941f] text-black"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Expiring Documents Alert */}
        <Card className="bg-gradient-to-br from-orange-500/5 to-[#0f0f0f] border-orange-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              Expiring Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">The following documents will expire within 30 days:</p>
            <div className="space-y-3">
              <div className="p-4 bg-[#0f0f0f] rounded-lg border border-orange-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white mb-1">Consent-to-List: Prairie Ranch Estate</p>
                    <p className="text-gray-400 text-sm">Expires: 2024-12-20 (29 days)</p>
                  </div>
                  <Button size="sm" variant="outline" className="border-orange-500/30 text-orange-400">
                    Send Renewal
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-[#0f0f0f] rounded-lg border border-orange-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white mb-1">NDA: Elizabeth Turner - Desert Oasis Ranch</p>
                    <p className="text-gray-400 text-sm">Expires: 2025-08-10 (262 days, early notice)</p>
                  </div>
                  <Button size="sm" variant="outline" className="border-orange-500/30 text-orange-400">
                    Send Renewal
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
