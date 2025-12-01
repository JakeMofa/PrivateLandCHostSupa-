import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Home, Heart, FileText, HelpCircle, Download, Upload } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface DocumentsPageProps {
  userRole: string;
  onLogout: () => void;
}

export default function DocumentsPage({ userRole, onLogout }: DocumentsPageProps) {
  const sidebarItems = [
    { label: 'Dashboard', path: `/${userRole}/dashboard`, icon: <Home className="w-5 h-5" /> },
    { label: userRole === 'client' ? 'Marketplace' : 'My Listings', path: `/${userRole}/${userRole === 'client' ? 'marketplace' : 'listings'}`, icon: <Home className="w-5 h-5" /> },
    { label: userRole === 'client' ? 'Saved Properties' : "My Buyer's List", path: `/${userRole}/${userRole === 'client' ? 'saved' : 'buyers'}`, icon: <Heart className="w-5 h-5" /> },
    { label: 'My Documents', path: `/${userRole}/documents`, icon: <FileText className="w-5 h-5" />, active: true },
    { label: 'Request Help', path: `/${userRole}/help`, icon: <HelpCircle className="w-5 h-5" /> },
  ];

  const clientDocuments = [
    { id: 1, name: 'Platform NDA', type: 'NDA', status: 'approved', date: 'Nov 15, 2025' },
    { id: 2, name: 'Access Agreement', type: 'Agreement', status: 'approved', date: 'Nov 15, 2025' },
    { id: 3, name: 'Financial Verification', type: 'Verification', status: 'approved', date: 'Nov 16, 2025' },
    { id: 4, name: 'Property Interest Form - Montana Ranch', type: 'Form', status: 'pending', date: 'Nov 19, 2025' },
  ];

  const brokerDocuments = [
    { id: 1, name: 'Broker License', type: 'License', status: 'approved', date: 'Oct 1, 2025' },
    { id: 2, name: 'Platform Agreement', type: 'Agreement', status: 'approved', date: 'Oct 1, 2025' },
    { id: 3, name: 'Listing Agreement - Highland Ranch', type: 'Listing', status: 'approved', date: 'Nov 10, 2025' },
    { id: 4, name: 'Client Representation - James Anderson', type: 'Representation', status: 'approved', date: 'Nov 12, 2025' },
    { id: 5, name: 'New Listing Submission - Sunset Valley', type: 'Listing', status: 'pending', date: 'Nov 18, 2025' },
  ];

  const documents = userRole === 'client' ? clientDocuments : brokerDocuments;

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole={userRole}
      userName={userRole === 'client' ? 'James Anderson' : 'Michael Rivers'}
      onLogout={onLogout}
    >
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-white mb-2">My Documents</h1>
            <p className="text-gray-400">Manage your agreements and documentation</p>
          </div>
          <Button className="bg-[#d4af37] hover:bg-[#c19b2b] text-black">
            <Upload className="w-4 h-4 mr-2" />
            Upload New Document
          </Button>
        </div>

        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">All Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                  <TableHead className="text-gray-400">Document Name</TableHead>
                  <TableHead className="text-gray-400">Type</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Date</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id} className="border-[#2a2a2a] hover:bg-[#2a2a2a]/30">
                    <TableCell className="text-white">{doc.name}</TableCell>
                    <TableCell className="text-gray-400">{doc.type}</TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          doc.status === 'approved' 
                            ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                            : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                        }
                      >
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-400">{doc.date}</TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Document Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gray-400">
              <p>
                All documents uploaded to the platform are encrypted and stored securely. 
                Only you and authorized platform administrators can access your documents.
              </p>
              <p>
                Documents marked as "Pending" are currently under review. You will be notified 
                once the review is complete.
              </p>
              <p>
                For questions about your documents or to request assistance, please contact 
                your assigned agent or use the Request Help feature.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
