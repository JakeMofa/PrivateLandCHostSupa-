import { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Home, 
  Users, 
  FileText, 
  UserCircle, 
  HelpCircle, 
  LogOut,
  Plus,
  Upload,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Calendar,
  Mail,
  Phone,
  FileCheck,
  Building,
  BarChart3,
  FileBarChart,
  Loader2
} from 'lucide-react';
import { useAuth } from '../utils/supabase/AuthContext';
import { supabase } from '../utils/supabase/client';
import { toast } from 'sonner@2.0.3';

interface BrokerConsentsProps {
  onLogout: () => void;
}

interface ClientConsent {
  consent_id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  approved_at: string;
  expires_at: string;
  days_until_expiration: number;
  total_listings: number;
  is_expired: boolean;
}

export default function BrokerConsents({ onLogout }: BrokerConsentsProps) {
  const { user } = useAuth();
  const [consents, setConsents] = useState<ClientConsent[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form state
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const sidebarItems = [
    { label: 'Dashboard', path: '/broker/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'My Listings', path: '/broker/listings', icon: <Home className="w-5 h-5" /> },
    { label: 'Add Listing', path: '/broker/add-listing', icon: <Plus className="w-5 h-5" /> },
    { label: 'Client Consents', path: '/broker/consents', icon: <FileCheck className="w-5 h-5" />, active: true },
    { label: 'Leads', path: '/broker/leads', icon: <Users className="w-5 h-5" /> },
    { label: "My Buyer's List", path: '/broker/buyers', icon: <Users className="w-5 h-5" /> },
    { label: 'My Contracts', path: '/broker/contracts', icon: <FileText className="w-5 h-5" /> },
    { label: 'My NDAs', path: '/broker/ndas', icon: <FileText className="w-5 h-5" /> },
    { label: 'Invitations', path: '/broker/invitations', icon: <Mail className="w-5 h-5" /> },
    { label: 'Marketplace', path: '/broker/marketplace', icon: <Building className="w-5 h-5" /> },
    { label: 'Analytics', path: '/broker/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'Reports', path: '/broker/reports', icon: <FileBarChart className="w-5 h-5" /> },
    { label: 'My Documents', path: '/broker/documents', icon: <FileText className="w-5 h-5" /> },
    { label: 'My Profile', path: '/broker/profile', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Account', path: '/broker/account', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Settings', path: '/broker/settings', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Request Help', path: '/broker/help', icon: <HelpCircle className="w-5 h-5" /> },
    { label: 'Logout', path: '/', icon: <LogOut className="w-5 h-5" /> },
  ];

  // Load broker's approved clients
  useEffect(() => {
    loadConsents();
  }, [user]);

  const loadConsents = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .rpc('get_broker_approved_clients', { p_broker_id: user.id });

      if (error) throw error;

      setConsents(data || []);
    } catch (error: any) {
      console.error('Error loading consents:', error);
      toast.error('Failed to load consents');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!user || !selectedFile || !clientName.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setUploading(true);

      // Upload file to Supabase Storage
      const fileName = `${Date.now()}_${selectedFile.name}`;
      const filePath = `Legal-documents/consent-to-list/${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('make-ca7651f3-legal-documents')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Create consent record
      const { error: insertError } = await supabase
        .from('client_consents')
        .insert({
          broker_id: user.id,
          client_name: clientName.trim(),
          client_email: clientEmail.trim() || null,
          client_phone: clientPhone.trim() || null,
          document_url: filePath,
          status: 'pending'
        });

      if (insertError) throw insertError;

      toast.success('Consent uploaded successfully! Awaiting admin approval.');

      // Reset form
      setClientName('');
      setClientEmail('');
      setClientPhone('');
      setSelectedFile(null);
      setUploadDialogOpen(false);

      // Reload consents
      loadConsents();

    } catch (error: any) {
      console.error('Error uploading consent:', error);
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const getStatusBadge = (consent: ClientConsent) => {
    if (consent.is_expired) {
      return (
        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
          <XCircle className="w-3 h-3 mr-1" />
          Expired
        </Badge>
      );
    }

    if (consent.days_until_expiration <= 30) {
      return (
        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Expiring Soon
        </Badge>
      );
    }

    return (
      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
        <CheckCircle className="w-3 h-3 mr-1" />
        Active
      </Badge>
    );
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole="broker" 
      userName={user?.full_name || 'Broker'}
      onLogout={onLogout}
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white mb-2">Client Consent-to-List Agreements</h1>
            <p className="text-gray-400">
              Manage your client authorizations to list properties
            </p>
          </div>
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#d4af37] hover:bg-[#c49d2f] text-black">
                <Plus className="w-4 h-4 mr-2" />
                Upload New Consent
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-white">Upload Client Consent-to-List Agreement</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 mt-4">
                <Alert className="bg-blue-500/10 border-blue-500/30 text-blue-400">
                  <AlertDescription>
                    Upload a signed consent-to-list agreement from your client. Once approved by admin, you can use this consent for multiple listings for this client (valid for 12 months).
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="clientName" className="text-gray-300">
                      Client Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="clientName"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="John Smith"
                      className="bg-black border-[#2a2a2a] text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="clientEmail" className="text-gray-300">
                      Client Email (Optional)
                    </Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="john.smith@example.com"
                      className="bg-black border-[#2a2a2a] text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="clientPhone" className="text-gray-300">
                      Client Phone (Optional)
                    </Label>
                    <Input
                      id="clientPhone"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="bg-black border-[#2a2a2a] text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="consentFile" className="text-gray-300">
                      Consent Document <span className="text-red-500">*</span>
                    </Label>
                    <div className="mt-2">
                      <Input
                        id="consentFile"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="bg-black border-[#2a2a2a] text-white"
                      />
                      {selectedFile && (
                        <p className="text-sm text-gray-400 mt-2">
                          Selected: {selectedFile.name}
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Accepted formats: PDF, JPG, PNG (max 10MB)
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-[#2a2a2a]">
                  <Button
                    variant="outline"
                    onClick={() => setUploadDialogOpen(false)}
                    className="border-[#2a2a2a] text-gray-300 hover:bg-[#2a2a2a]"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpload}
                    disabled={uploading || !clientName.trim() || !selectedFile}
                    className="bg-[#d4af37] hover:bg-[#c49d2f] text-black"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Consent
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </div>
              <p className="text-gray-400 mb-1">Active Consents</p>
              <p className="text-white text-2xl">
                {consents.filter(c => !c.is_expired && c.days_until_expiration > 30).length}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                </div>
              </div>
              <p className="text-gray-400 mb-1">Expiring Soon</p>
              <p className="text-white text-2xl">
                {consents.filter(c => !c.is_expired && c.days_until_expiration <= 30).length}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-500" />
                </div>
              </div>
              <p className="text-gray-400 mb-1">Expired</p>
              <p className="text-white text-2xl">
                {consents.filter(c => c.is_expired).length}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#d4af37]" />
                </div>
              </div>
              <p className="text-gray-400 mb-1">Total Clients</p>
              <p className="text-white text-2xl">{consents.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Consents List */}
        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Your Client Consents</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-[#d4af37] animate-spin" />
              </div>
            ) : consents.length === 0 ? (
              <div className="text-center py-12">
                <FileCheck className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">No client consents yet</p>
                <p className="text-sm text-gray-500 mb-4">
                  Upload your first consent-to-list agreement to get started
                </p>
                <Button
                  onClick={() => setUploadDialogOpen(true)}
                  className="bg-[#d4af37] hover:bg-[#c49d2f] text-black"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Upload First Consent
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {consents.map((consent) => (
                  <div
                    key={consent.consent_id}
                    className="bg-black/40 border border-[#2a2a2a] rounded-lg p-6 hover:border-[#d4af37]/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-white text-lg mb-1">{consent.client_name}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          {consent.client_email && (
                            <div className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {consent.client_email}
                            </div>
                          )}
                          {consent.client_phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              {consent.client_phone}
                            </div>
                          )}
                        </div>
                      </div>
                      {getStatusBadge(consent)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 mb-1">Approved Date</p>
                        <div className="flex items-center gap-1 text-gray-300">
                          <Calendar className="w-4 h-4" />
                          {new Date(consent.approved_at).toLocaleDateString()}
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-500 mb-1">Expires</p>
                        <div className="flex items-center gap-1 text-gray-300">
                          <Clock className="w-4 h-4" />
                          {new Date(consent.expires_at).toLocaleDateString()}
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-500 mb-1">Days Remaining</p>
                        <p className={`${
                          consent.is_expired 
                            ? 'text-red-400' 
                            : consent.days_until_expiration <= 30 
                            ? 'text-yellow-400' 
                            : 'text-green-400'
                        }`}>
                          {consent.is_expired ? 'Expired' : `${consent.days_until_expiration} days`}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500 mb-1">Listings Using This</p>
                        <p className="text-gray-300">{consent.total_listings}</p>
                      </div>
                    </div>

                    {consent.is_expired && (
                      <Alert className="bg-red-500/10 border-red-500/30 text-red-400 mt-4">
                        <AlertTriangle className="w-4 h-4" />
                        <AlertDescription>
                          This consent has expired. Upload a new consent to continue listing properties for this client.
                        </AlertDescription>
                      </Alert>
                    )}

                    {!consent.is_expired && consent.days_until_expiration <= 30 && (
                      <Alert className="bg-yellow-500/10 border-yellow-500/30 text-yellow-400 mt-4">
                        <AlertTriangle className="w-4 h-4" />
                        <AlertDescription>
                          This consent will expire in {consent.days_until_expiration} days. Consider renewing it soon.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}