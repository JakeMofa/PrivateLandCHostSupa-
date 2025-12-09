import { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
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
  XCircle,
  MapPin,
  DollarSign,
  Eye,
  MessageSquare,
  Image,
  Download,
  Clock,
  AlertCircle,
  AlertTriangle,
  ExternalLink,
  Send
} from 'lucide-react';
import { useAuth } from '../../utils/supabase/AuthContext';
import { supabase } from '../../utils/supabase/client';
import { toast } from 'sonner';
import { Alert, AlertDescription } from './ui/alert';
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

interface AdminListingReviewsProps {
  onLogout: () => void;
}

export default function AdminListingReviews({ onLogout }: AdminListingReviewsProps) {
  const { user } = useAuth();
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [consentDialogOpen, setConsentDialogOpen] = useState(false);
  const [selectedConsent, setSelectedConsent] = useState<any>(null);
  const [adminFeedback, setAdminFeedback] = useState('');
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const sidebarItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'Approvals', path: '/admin/approvals', icon: <CheckCircle className="w-5 h-5" /> },
    { label: 'Listing Reviews', path: '/admin/listing-reviews', icon: <FileText className="w-5 h-5" />, active: true },
    { label: 'Users & Assignments', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { label: 'Documents', path: '/admin/documents', icon: <FileCheck className="w-5 h-5" /> },
    { label: 'Analytics', path: '/admin/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'System Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
    { label: 'Help & Support', path: '/admin/help', icon: <HelpCircle className="w-5 h-5" /> },
    { 
      label: 'Logout', 
      path: '/', 
      icon: <LogOut className="w-5 h-5" />,
    },
  ];

  const pendingListings = [
    {
      id: 1,
      title: 'Highland Ranch Estate',
      broker: 'John Smith',
      brokerage: 'Montana Estates',
      price: 12500000,
      acres: 450,
      location: 'Montana',
      propertyType: 'Ranch',
      status: 'New Submission',
      submitted: '2024-11-21 10:00 AM',
      consentVerified: true,
      photos: 24,
      documents: 8,
      description: 'Stunning 450-acre ranch with mountain views, working cattle operation, luxury main residence, guest house, and stables.',
      issues: []
    },
    {
      id: 2,
      title: 'Coastal Vineyard Property',
      broker: 'Maria Garcia',
      brokerage: 'California Land Co.',
      price: 8750000,
      acres: 120,
      location: 'California',
      propertyType: 'Vineyard',
      status: 'Revision Requested',
      submitted: '2024-11-20 02:30 PM',
      consentVerified: true,
      photos: 18,
      documents: 5,
      description: 'Established vineyard with premium coastal location, modern winery facilities, and luxury residence.',
      issues: ['Missing water rights documentation', 'Photos need higher resolution']
    },
    {
      id: 3,
      title: 'Mountain Retreat',
      broker: 'Robert Lee',
      brokerage: 'Wyoming Land Group',
      price: 6200000,
      acres: 280,
      location: 'Wyoming',
      propertyType: 'Residential Estate',
      status: 'New Submission',
      submitted: '2024-11-19 11:45 AM',
      consentVerified: false,
      photos: 16,
      documents: 6,
      description: 'Private mountain estate with panoramic views, custom log home, guest cabins, and year-round access.',
      issues: ['Consent-to-List document pending']
    },
  ];

  // Load listings on mount
  useEffect(() => {
    loadListings();
  }, [statusFilter]);

  const loadListings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          broker:profiles!broker_id(full_name, email),
          client_consent:client_consents(
            id,
            client_name,
            status,
            document_url,
            expires_at,
            client_email,
            client_phone
          )
        `)
        .in('status', ['pending', 'revision_requested', 'verified'])
        .order('created_at', { ascending: false });

      if (error) throw error;

      let filtered = data || [];
      
      // Apply status filter
      if (statusFilter !== 'all') {
        filtered = filtered.filter(l => l.status === statusFilter);
      }

      setListings(filtered);
    } catch (error: any) {
      console.error('Error loading listings:', error);
      toast.error('Failed to load listings');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (listing: any) => {
    setSelectedListing(listing);
    setDialogOpen(true);
  };

  const handleViewConsent = (listing: any) => {
    setSelectedConsent(listing.client_consent);
    setConsentDialogOpen(true);
  };

  const handleUpdateConsentStatus = async (consentId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('client_consents')
        .update({ 
          status: newStatus,
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', consentId);

      if (error) throw error;

      toast.success(`Consent ${newStatus === 'verified' ? 'verified' : 'rejected'}`);
      setConsentDialogOpen(false);
      loadListings(); // Reload to show updated status
    } catch (error: any) {
      console.error('Error updating consent:', error);
      toast.error('Failed to update consent status');
    }
  };

  const handleApprove = async (listingId: string) => {
    try {
      const { error } = await supabase
        .from('listings')
        .update({ 
          status: 'active',
          approved_by: user?.id,
          approved_at: new Date().toISOString()
        })
        .eq('id', listingId);

      if (error) throw error;

      toast.success('Listing approved and published!');
      setDialogOpen(false);
      loadListings();
    } catch (error: any) {
      console.error('Error approving listing:', error);
      toast.error('Failed to approve listing');
    }
  };

  const handleRequestRevision = async (listingId: string) => {
    if (!adminFeedback.trim()) {
      toast.error('Please provide feedback for the broker');
      return;
    }

    try {
      const { error } = await supabase
        .from('listings')
        .update({ 
          status: 'revision_requested',
          admin_feedback: adminFeedback,
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', listingId);

      if (error) throw error;

      toast.success('Revision requested - Broker has been notified');
      setDialogOpen(false);
      setAdminFeedback('');
      loadListings();
    } catch (error: any) {
      console.error('Error requesting revision:', error);
      toast.error('Failed to request revision');
    }
  };

  const handleReject = async (listingId: string) => {
    if (!adminFeedback.trim()) {
      toast.error('Please provide a reason for rejection');
      return;
    }

    try {
      const { error } = await supabase
        .from('listings')
        .update({ 
          status: 'draft',
          admin_feedback: adminFeedback,
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', listingId);

      if (error) throw error;

      toast.success('Listing rejected - Sent back to broker drafts');
      setDialogOpen(false);
      setAdminFeedback('');
      loadListings();
    } catch (error: any) {
      console.error('Error rejecting listing:', error);
      toast.error('Failed to reject listing');
    }
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
        <div>
          <h1 className="text-white mb-2">Listing Reviews</h1>
          <p className="text-gray-400">Review and approve submitted property listings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">New Submissions</p>
              <p className="text-white text-3xl">
                {listings.filter(l => l.status === 'pending').length}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-yellow-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Revisions Needed</p>
              <p className="text-white text-3xl">
                {listings.filter(l => l.status === 'revision_requested').length}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Verified</p>
              <p className="text-white text-3xl">
                {listings.filter(l => l.status === 'verified').length}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-purple-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Total Value</p>
              <p className="text-white text-2xl">
                ${listings.filter(l => l.price).reduce((sum, l) => sum + (l.price || 0), 0) > 0 
                  ? `${(listings.filter(l => l.price).reduce((sum, l) => sum + (l.price || 0), 0) / 1000000).toFixed(0)}M`
                  : '0'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Listing Reviews with Tabs */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Listing Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={statusFilter} onValueChange={setStatusFilter} className="mb-6">
              <TabsList className="bg-[#0f0f0f] border-[#2a2a2a]">
                <TabsTrigger value="all" className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black">
                  All Listings
                </TabsTrigger>
                <TabsTrigger value="pending" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  New Submission
                </TabsTrigger>
                <TabsTrigger value="revision_requested" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                  Revision Requested
                </TabsTrigger>
                <TabsTrigger value="verified" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                  Verified
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-400">Loading listings...</p>
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">No listings found</p>
              </div>
            ) : (
              <Table>
              <TableHeader>
                <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                  <TableHead className="text-gray-400">Property</TableHead>
                  <TableHead className="text-gray-400">Broker</TableHead>
                  <TableHead className="text-gray-400">Price</TableHead>
                  <TableHead className="text-gray-400">Location</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Consent</TableHead>
                  <TableHead className="text-gray-400 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listings.map((listing) => {
                  const consentVerified = listing.client_consent?.status === 'verified';
                  const statusBadge = 
                    listing.status === 'pending' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                    listing.status === 'revision_requested' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                    'bg-green-500/20 text-green-400 border-green-500/30';
                  
                  const statusLabel = 
                    listing.status === 'pending' ? 'New Submission' :
                    listing.status === 'revision_requested' ? 'Revision Requested' :
                    'Verified';

                  return (
                    <TableRow key={listing.id} className="border-[#2a2a2a] hover:bg-[#2a2a2a]/30">
                      <TableCell>
                        <div>
                          <p className="text-white mb-1">{listing.title}</p>
                          <div className="flex items-center gap-2 text-sm">
                            <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 text-xs">
                              {listing.property_type}
                            </Badge>
                            {listing.acreage && (
                              <p className="text-gray-500">{listing.acreage} acres</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-white">{listing.broker?.full_name || 'Unknown'}</p>
                          <p className="text-gray-400 text-sm">{listing.broker?.email || ''}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-[#d4af37]">
                        {listing.price ? `$${(listing.price / 1000000).toFixed(1)}M` : 'Call for Pricing'}
                      </TableCell>
                      <TableCell className="text-white">{listing.city}, {listing.state}</TableCell>
                      <TableCell>
                        <Badge className={statusBadge}>
                          {statusLabel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {consentVerified ? (
                          <div className="flex items-center gap-1 text-green-500">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm">Verified</span>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                            onClick={() => handleViewConsent(listing)}
                          >
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-xs">Not Verified</span>
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-[#2a2a2a] hover:bg-[#2a2a2a]"
                            onClick={() => handleViewDetails(listing)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {consentVerified && (
                            <Button 
                              size="sm" 
                              className="bg-green-500 hover:bg-green-600 text-white"
                              onClick={() => handleApprove(listing.id)}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            )}
          </CardContent>
        </Card>

        {/* Detail Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Listing Review</DialogTitle>
              <DialogDescription className="text-gray-400">
                Review property details and documentation
              </DialogDescription>
            </DialogHeader>
            
            {selectedListing && (
              <div className="space-y-6 py-4">
                {/* Property Overview */}
                <div>
                  <h3 className="text-white mb-3 text-lg">Property Overview</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <p className="text-gray-400 text-sm mb-1">Title</p>
                      <p className="text-white text-lg">{selectedListing.title}</p>
                    </div>
                    <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <p className="text-gray-400 text-sm mb-1">Property Type</p>
                      <p className="text-white">{selectedListing.propertyType}</p>
                    </div>
                    <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <p className="text-gray-400 text-sm mb-1">Price</p>
                      <p className="text-[#d4af37] text-xl">
                        ${(selectedListing.price / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <p className="text-gray-400 text-sm mb-1">Acreage</p>
                      <p className="text-white">{selectedListing.acres} acres</p>
                    </div>
                    <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <p className="text-gray-400 text-sm mb-1">Location</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#d4af37]" />
                        <p className="text-white">{selectedListing.location}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <p className="text-gray-400 text-sm mb-1">Submitted</p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <p className="text-white text-sm">{selectedListing.submitted}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Broker Information */}
                <div>
                  <h3 className="text-white mb-3 text-lg">Broker Information</h3>
                  <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-white">{selectedListing.broker}</p>
                        <p className="text-gray-400 text-sm">{selectedListing.brokerage}</p>
                      </div>
                      <Badge className={
                        selectedListing.consentVerified
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : 'bg-red-500/20 text-red-400 border-red-500/30'
                      }>
                        {selectedListing.consentVerified ? 'Consent Verified' : 'Consent Pending'}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-white mb-3 text-lg">Property Description</h3>
                  <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <p className="text-gray-300 leading-relaxed">{selectedListing.description}</p>
                  </div>
                </div>

                {/* Media & Documents */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <div className="flex items-center gap-3 mb-2">
                      <Image className="w-5 h-5 text-blue-500" />
                      <p className="text-white">Photos</p>
                    </div>
                    <p className="text-2xl text-white">{selectedListing.photos}</p>
                    <Button size="sm" variant="ghost" className="mt-2 text-[#d4af37] hover:text-[#b8941f]">
                      View Gallery →
                    </Button>
                  </div>
                  <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="w-5 h-5 text-purple-500" />
                      <p className="text-white">Documents</p>
                    </div>
                    <p className="text-2xl text-white">{selectedListing.documents}</p>
                    <Button size="sm" variant="ghost" className="mt-2 text-[#d4af37] hover:text-[#b8941f]">
                      View Docs →
                    </Button>
                  </div>
                </div>

                {/* Issues (if any) */}
                {selectedListing.issues.length > 0 && (
                  <div>
                    <h3 className="text-white mb-3 text-lg flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                      Issues Found
                    </h3>
                    <div className="space-y-2">
                      {selectedListing.issues.map((issue: string, idx: number) => (
                        <div 
                          key={idx}
                          className="flex items-start gap-3 p-3 bg-yellow-500/5 rounded-lg border border-yellow-500/30"
                        >
                          <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <p className="text-yellow-300">{issue}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Consent Status */}
                <div>
                  <h3 className="text-white mb-3 text-lg">Client Consent Status</h3>
                  <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    {selectedListing.client_consent?.status === 'verified' ? (
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="text-green-400">Consent Verified</p>
                          <p className="text-sm text-gray-400">Client: {selectedListing.client_consent?.client_name}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                          <div>
                            <p className="text-red-400">Consent Not Verified</p>
                            <p className="text-sm text-gray-400">Client: {selectedListing.client_consent?.client_name || 'N/A'}</p>
                          </div>
                        </div>
                        {selectedListing.client_consent && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewConsent(selectedListing)}
                            className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                          >
                            <FileCheck className="w-4 h-4 mr-2" />
                            Review Consent
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Admin Feedback */}
                <div>
                  <h3 className="text-white mb-3 text-lg">Admin Feedback</h3>
                  <Textarea 
                    value={adminFeedback}
                    onChange={(e) => setAdminFeedback(e.target.value)}
                    placeholder="Add feedback or revision requests for the broker..."
                    className="bg-[#0f0f0f] border-[#2a2a2a] text-white min-h-[100px]"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#2a2a2a]">
                  {selectedListing.client_consent?.status === 'verified' ? (
                    <>
                      <Button 
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => handleApprove(selectedListing.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve &amp; Publish Listing
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                        onClick={() => handleRequestRevision(selectedListing.id)}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Request Revision
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        onClick={() => handleReject(selectedListing.id)}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 p-4 bg-red-500/5 rounded-lg border border-red-500/30">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-red-400 mb-2">Consent Not Verified</p>
                            <p className="text-gray-400 text-sm">
                              Review and verify the consent-to-list document before approving this listing.
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline"
                        className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                        onClick={() => handleRequestRevision(selectedListing.id)}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Request Revision
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        onClick={() => handleReject(selectedListing.id)}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Consent Review Modal */}
        <Dialog open={consentDialogOpen} onOpenChange={setConsentDialogOpen}>
          <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">Review Consent-to-List Agreement</DialogTitle>
              <DialogDescription className="text-gray-400">
                Review and verify the client's consent to list this property
              </DialogDescription>
            </DialogHeader>
            
            {selectedConsent && (
              <div className="space-y-6 py-4">
                {/* Consent Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <p className="text-gray-400 text-sm mb-1">Client Name</p>
                    <p className="text-white">{selectedConsent.client_name}</p>
                  </div>
                  <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <p className="text-gray-400 text-sm mb-1">Current Status</p>
                    <Badge className={
                      selectedConsent.status === 'verified' 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : 'bg-red-500/20 text-red-400 border-red-500/30'
                    }>
                      {selectedConsent.status === 'verified' ? 'Verified' : 'Not Verified'}
                    </Badge>
                  </div>
                  {selectedConsent.client_email && (
                    <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <p className="text-gray-400 text-sm mb-1">Email</p>
                      <p className="text-white text-sm">{selectedConsent.client_email}</p>
                    </div>
                  )}
                  {selectedConsent.client_phone && (
                    <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <p className="text-gray-400 text-sm mb-1">Phone</p>
                      <p className="text-white text-sm">{selectedConsent.client_phone}</p>
                    </div>
                  )}
                </div>

                {/* Document Viewer */}
                <div>
                  <Label className="text-white mb-2 block">Consent Document</Label>
                  <div className="p-6 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] text-center">
                    {selectedConsent.document_url ? (
                      <>
                        <FileCheck className="w-12 h-12 text-[#d4af37] mx-auto mb-3" />
                        <p className="text-white mb-2">Consent Document Available</p>
                        <p className="text-gray-400 text-sm mb-4">Click below to download and review the document</p>
                        <Button
                          variant="outline"
                          className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                          onClick={() => window.open(selectedConsent.document_url, '_blank')}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Document
                        </Button>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                        <p className="text-red-400">No document uploaded</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Expiration Info */}
                {selectedConsent.expires_at && (
                  <Alert className="bg-blue-500/10 border-blue-500/30">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <AlertDescription className="text-blue-400">
                      This consent will expire on {new Date(selectedConsent.expires_at).toLocaleDateString()}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#2a2a2a]">
                  {selectedConsent.status !== 'verified' ? (
                    <>
                      <Button 
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => handleUpdateConsentStatus(selectedConsent.id, 'verified')}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Verify Consent
                      </Button>
                      <Button 
                        variant="outline"
                        className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
                        onClick={() => handleUpdateConsentStatus(selectedConsent.id, 'not_verified')}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject - Request More Docs
                      </Button>
                    </>
                  ) : (
                    <Alert className="flex-1 bg-green-500/10 border-green-500/30">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <AlertDescription className="text-green-400">
                        This consent has been verified. The listing can now be approved.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
