import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { 
  CheckCircle,
  Clock,
  Users,
  FileCheck,
  XCircle,
  Building2,
  AlertCircle,
  Save,
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
import { supabase, type AccessRequest, type AccessRequestStatus } from '../../utils/supabase/client';
import { useAuth } from '../../utils/supabase/AuthContext';
import { toast } from 'sonner';
import { getAdminSidebarItems } from '../utils/adminSidebarConfig';

interface AdminApprovalsProps {
  onLogout: () => void;
}

export default function AdminApprovals({ onLogout }: AdminApprovalsProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRequest, setSelectedRequest] = useState<AccessRequest | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const [editedStatus, setEditedStatus] = useState<AccessRequestStatus>('pending');
  const [editedNotes, setEditedNotes] = useState('');
  const [editedBudget, setEditedBudget] = useState('');
  const [saving, setSaving] = useState(false);

  const sidebarItems = getAdminSidebarItems(location.pathname)
    .filter(item => item.label !== 'divider' && item.icon && item.path)
    .map(item => {
      const Icon = item.icon!;
      return {
        label: item.label,
        path: item.path!,
        icon: <Icon className="w-5 h-5" />,
        active: item.active
      };
    });

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('access_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error: any) {
      console.error('Error fetching access requests:', error);
      toast.error('Failed to load access requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();

    const channel = supabase
      .channel('access_requests_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'access_requests',
        },
        () => {
          fetchRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const brokerRequests = requests.filter(r => r.role_requested === 'broker');
  const clientRequests = requests.filter(r => r.role_requested === 'client');

  const filterByStatus = (reqs: AccessRequest[]) => {
    if (filterStatus === 'all') return reqs;
    return reqs.filter(r => r.status === filterStatus);
  };

  const totalPending = requests.filter(r => 
    r.status === 'pending' || 
    r.status === 'pending_call' || 
    r.status === 'awaiting_docs' ||
    r.status === 'pending_verification'
  ).length;

  const over48Hours = requests.filter(r => {
    const hoursSince = (Date.now() - new Date(r.created_at).getTime()) / (1000 * 60 * 60);
    return hoursSince > 48 && r.status !== 'approved' && r.status !== 'denied';
  }).length;

  const handleViewDetails = (request: AccessRequest) => {
    setSelectedRequest(request);
    setEditedStatus(request.status);
    setEditedNotes(request.admin_notes || '');
    setEditedBudget(request.budget_range || '');
    setDialogOpen(true);
  };

  const handleUpdateRequest = async () => {
    if (!selectedRequest || !user) return;

    try {
      setSaving(true);

      const { error } = await supabase
        .from('access_requests')
        .update({
          status: editedStatus,
          admin_notes: editedNotes,
          budget_range: editedBudget,
          reviewed_at: new Date().toISOString(),
          reviewed_by: user.id,
        })
        .eq('id', selectedRequest.id);

      if (error) throw error;

      toast.success('Request updated successfully');
      setDialogOpen(false);
      fetchRequests();
    } catch (error: any) {
      console.error('Error updating request:', error);
      toast.error('Failed to update request');
    } finally {
      setSaving(false);
    }
  };

  const handleQuickApprove = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('access_requests')
        .update({
          status: 'approved',
          reviewed_at: new Date().toISOString(),
          reviewed_by: user.id,
        })
        .eq('id', id);

      if (error) throw error;

      toast.success('Request approved');
      fetchRequests();
    } catch (error: any) {
      console.error('Error approving request:', error);
      toast.error('Failed to approve request');
    }
  };

  const handleQuickReject = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('access_requests')
        .update({
          status: 'denied',
          reviewed_at: new Date().toISOString(),
          reviewed_by: user.id,
        })
        .eq('id', id);

      if (error) throw error;

      toast.success('Request denied');
      fetchRequests();
    } catch (error: any) {
      console.error('Error denying request:', error);
      toast.error('Failed to deny request');
    }
  };

  const getStatusBadgeColor = (status: AccessRequestStatus) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'denied':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'pending':
      case 'pending_call':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'verification_call_complete':
      case 'documents_received':
      case 'validated':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'nda_sent':
      case 'awaiting_docs':
      case 'pending_verification':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'submit_more_proof':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusLabel = (status: AccessRequestStatus) => {
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole="admin" 
      userName={user?.first_name || "Admin"}
      onLogout={onLogout}
    >
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white mb-2">Access Approvals</h1>
            <p className="text-gray-400">Review and approve broker & client access requests</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[200px] bg-[#1a1a1a] border-[#2a2a2a] text-white">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                <SelectItem value="all">All Requests</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="pending_call">Pending Call</SelectItem>
                <SelectItem value="verification_call_complete">Call Complete</SelectItem>
                <SelectItem value="nda_sent">NDA Sent</SelectItem>
                <SelectItem value="awaiting_docs">Awaiting Docs</SelectItem>
                <SelectItem value="documents_received">Docs Received</SelectItem>
                <SelectItem value="pending_verification">Pending Verification</SelectItem>
                <SelectItem value="validated">Validated</SelectItem>
                <SelectItem value="submit_more_proof">Need More Proof</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="denied">Denied</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Total Pending</p>
              <p className="text-white text-3xl">{totalPending}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Broker Requests</p>
              <p className="text-white text-3xl">{brokerRequests.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Client Requests</p>
              <p className="text-white text-3xl">{clientRequests.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Over 48 Hours</p>
              <p className="text-white text-3xl">{over48Hours}</p>
            </CardContent>
          </Card>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4af37]"></div>
          </div>
        )}

        {!loading && (
          <Tabs defaultValue="broker" className="w-full">
            <TabsList className="bg-[#1a1a1a] border border-[#2a2a2a] p-1">
              <TabsTrigger 
                value="broker" 
                className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black"
              >
                <Building2 className="w-4 h-4 mr-2" />
                Broker Requests ({filterByStatus(brokerRequests).length})
              </TabsTrigger>
              <TabsTrigger 
                value="client"
                className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black"
              >
                <Users className="w-4 h-4 mr-2" />
                Client Requests ({filterByStatus(clientRequests).length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="broker" className="mt-6">
              <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
                <CardHeader>
                  <CardTitle className="text-white">Broker Access Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  {filterByStatus(brokerRequests).length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      No broker requests found
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                          <TableHead className="text-gray-400">Broker</TableHead>
                          <TableHead className="text-gray-400">Brokerage</TableHead>
                          <TableHead className="text-gray-400">License</TableHead>
                          <TableHead className="text-gray-400">Status</TableHead>
                          <TableHead className="text-gray-400">Submitted</TableHead>
                          <TableHead className="text-gray-400 text-center">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filterByStatus(brokerRequests).map((request) => (
                          <TableRow key={request.id} className="border-[#2a2a2a] hover:bg-[#2a2a2a]/30">
                            <TableCell>
                              <div>
                                <p className="text-white">{request.first_name} {request.last_name}</p>
                                <p className="text-gray-400 text-sm">{request.email}</p>
                              </div>
                            </TableCell>
                            <TableCell className="text-white">{request.brokerage || 'N/A'}</TableCell>
                            <TableCell>
                              <div>
                                <p className="text-white">{request.license_no || 'N/A'}</p>
                                <p className="text-gray-400 text-sm">{request.state || 'N/A'}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusBadgeColor(request.status)}>
                                {getStatusLabel(request.status)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-gray-400 text-sm">{formatDate(request.created_at)}</TableCell>
                            <TableCell>
                              <div className="flex items-center justify-center gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="border-[#2a2a2a] hover:bg-[#2a2a2a]"
                                  onClick={() => handleViewDetails(request)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                {request.status !== 'approved' && (
                                  <Button 
                                    size="sm" 
                                    className="bg-green-500 hover:bg-green-600 text-white"
                                    onClick={() => handleQuickApprove(request.id)}
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </Button>
                                )}
                                {request.status !== 'denied' && (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                                    onClick={() => handleQuickReject(request.id)}
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="client" className="mt-6">
              <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
                <CardHeader>
                  <CardTitle className="text-white">Client Access Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  {filterByStatus(clientRequests).length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      No client requests found
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                          <TableHead className="text-gray-400">Client Name</TableHead>
                          <TableHead className="text-gray-400">Email</TableHead>
                          <TableHead className="text-gray-400">Phone</TableHead>
                          <TableHead className="text-gray-400">Status</TableHead>
                          <TableHead className="text-gray-400">Submitted</TableHead>
                          <TableHead className="text-gray-400 text-center">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filterByStatus(clientRequests).map((request) => (
                          <TableRow key={request.id} className="border-[#2a2a2a] hover:bg-[#2a2a2a]/30">
                            <TableCell>
                              <p className="text-white">{request.first_name} {request.last_name}</p>
                            </TableCell>
                            <TableCell className="text-gray-400 text-sm">{request.email}</TableCell>
                            <TableCell className="text-white">{request.phone || 'N/A'}</TableCell>
                            <TableCell>
                              <Badge className={getStatusBadgeColor(request.status)}>
                                {getStatusLabel(request.status)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-gray-400 text-sm">{formatDate(request.created_at)}</TableCell>
                            <TableCell>
                              <div className="flex items-center justify-center gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="border-[#2a2a2a] hover:bg-[#2a2a2a]"
                                  onClick={() => handleViewDetails(request)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                {request.status !== 'approved' && (
                                  <Button 
                                    size="sm" 
                                    className="bg-green-500 hover:bg-green-600 text-white"
                                    onClick={() => handleQuickApprove(request.id)}
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </Button>
                                )}
                                {request.status !== 'denied' && (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                                    onClick={() => handleQuickReject(request.id)}
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-start justify-between">
                <div>
                  <DialogTitle>
                    {selectedRequest?.role_requested === 'broker' ? 'Broker' : 'Client'} Request Details
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Review and manage this access request
                  </DialogDescription>
                </div>
                {selectedRequest && (
                  <div className="flex flex-col items-end gap-1">
                    <p className="text-gray-400 text-xs">Current Status</p>
                    <Badge className={getStatusBadgeColor(selectedRequest.status)}>
                      {getStatusLabel(selectedRequest.status)}
                    </Badge>
                  </div>
                )}
              </div>
            </DialogHeader>
            
            {selectedRequest && (
              <div className="space-y-6 py-4">
                <div>
                  <h3 className="text-white mb-3">Contact Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <p className="text-gray-400 text-sm mb-1">Name</p>
                      <p className="text-white">{selectedRequest.first_name} {selectedRequest.last_name}</p>
                    </div>
                    <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <p className="text-gray-400 text-sm mb-1">Email</p>
                      <p className="text-white text-sm">{selectedRequest.email}</p>
                    </div>
                    <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <p className="text-gray-400 text-sm mb-1">Phone</p>
                      <p className="text-white">{selectedRequest.phone || 'N/A'}</p>
                    </div>
                    {selectedRequest.role_requested === 'broker' ? (
                      <>
                        <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                          <p className="text-gray-400 text-sm mb-1">Brokerage</p>
                          <p className="text-white">{selectedRequest.brokerage || 'N/A'}</p>
                        </div>
                        <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                          <p className="text-gray-400 text-sm mb-1">License #</p>
                          <p className="text-white">{selectedRequest.license_no || 'N/A'}</p>
                        </div>
                        <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                          <p className="text-gray-400 text-sm mb-1">State</p>
                          <p className="text-white">{selectedRequest.state || 'N/A'}</p>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>

                <div>
                  <Label htmlFor="status" className="text-white mb-2 block">Request Status</Label>
                  <Select value={editedStatus} onValueChange={(val) => setEditedStatus(val as AccessRequestStatus)}>
                    <SelectTrigger className="bg-[#0f0f0f] border-[#2a2a2a] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="pending_call">Pending Call</SelectItem>
                      <SelectItem value="verification_call_complete">Verification Call Complete</SelectItem>
                      <SelectItem value="nda_sent">NDA Sent</SelectItem>
                      <SelectItem value="awaiting_docs">Awaiting Documents</SelectItem>
                      <SelectItem value="documents_received">Documents Received</SelectItem>
                      <SelectItem value="pending_verification">Pending Verification</SelectItem>
                      <SelectItem value="validated">Validated</SelectItem>
                      <SelectItem value="submit_more_proof">Submit More Proof</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="denied">Denied</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedRequest.role_requested === 'client' && (
                  <div>
                    <Label htmlFor="budget" className="text-white mb-2 block">
                      Budget Cap (Admin Set)
                    </Label>
                    <Input
                      id="budget"
                      value={editedBudget}
                      onChange={(e) => setEditedBudget(e.target.value)}
                      placeholder="e.g., $5M-$10M"
                      className="bg-[#0f0f0f] border-[#2a2a2a] text-white"
                    />
                    <p className="text-gray-400 text-sm mt-1">
                      Set the maximum budget range this client can see
                    </p>
                  </div>
                )}

                <div>
                  <Label htmlFor="notes" className="text-white mb-2 block">Admin Notes (Internal)</Label>
                  <Textarea 
                    id="notes"
                    placeholder="Add internal notes about this request..."
                    className="bg-[#0f0f0f] border-[#2a2a2a] text-white min-h-[100px]"
                    value={editedNotes}
                    onChange={(e) => setEditedNotes(e.target.value)}
                  />
                </div>

                <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                  <p className="text-gray-400 text-sm">Submitted: {formatDate(selectedRequest.created_at)}</p>
                  {selectedRequest.reviewed_at && (
                    <p className="text-gray-400 text-sm">Last Reviewed: {formatDate(selectedRequest.reviewed_at)}</p>
                  )}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[#2a2a2a]">
                  <Button 
                    className="flex-1 bg-[#d4af37] hover:bg-[#c49d2f] text-black"
                    onClick={handleUpdateRequest}
                    disabled={saving}
                  >
                    {saving ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button 
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => {
                      setEditedStatus('approved');
                      setTimeout(() => handleUpdateRequest(), 100);
                    }}
                    disabled={saving || editedStatus === 'approved'}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Access
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    onClick={() => {
                      setEditedStatus('denied');
                      setTimeout(() => handleUpdateRequest(), 100);
                    }}
                    disabled={saving || editedStatus === 'denied'}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Deny
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
