import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { CheckCircle, ArrowLeft, AlertCircle } from 'lucide-react';
import { supabase } from '../../utils/supabase/client';
import { Alert, AlertDescription } from './ui/alert';

export default function ApplicationPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'client',
    agreed: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Split full name into first and last name
      const nameParts = formData.fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Insert into access_requests table
      const { error: dbError } = await supabase
        .from('access_requests')
        .insert({
          role_requested: formData.role,
          first_name: firstName,
          last_name: lastName,
          email: formData.email,
          phone: formData.phone,
          status: 'pending'
        });

      if (dbError) {
        console.error('Database error:', dbError);
        setError('Failed to submit application. Please try again.');
        setLoading(false);
        return;
      }

      // Success!
      setSubmitted(true);
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] max-w-lg w-full">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#d4af37]/10 mb-6">
              <CheckCircle className="w-12 h-12 text-[#d4af37]" />
            </div>
            <h2 className="text-white mb-4">Application Submitted</h2>
            <p className="text-gray-400 mb-2">
              Thank you for your interest in joining our exclusive platform.
            </p>
            <p className="text-gray-400 mb-8">
              Your application is currently under review. You will receive a response within 24-48 hours.
            </p>
            <Button
              className="bg-[#d4af37] hover:bg-[#c19b2b] text-black"
              onClick={() => window.location.href = '/'}
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 text-gray-400 hover:text-[#d4af37] hover:bg-transparent"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-white mb-2">Request Access to the Platform</h1>
          <p className="text-gray-400">Join our exclusive network of verified investors and brokers</p>
        </div>

        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Access Application</CardTitle>
            <CardDescription className="text-gray-400">
              All applications are carefully reviewed to maintain platform exclusivity
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Smith"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="bg-black/50 border-[#2a2a2a] text-white placeholder:text-gray-600"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-black/50 border-[#2a2a2a] text-white placeholder:text-gray-600"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-black/50 border-[#2a2a2a] text-white placeholder:text-gray-600"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-300">Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger className="bg-black/50 border-[#2a2a2a] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                    <SelectItem value="client" className="text-white focus:bg-[#2a2a2a] focus:text-white">Client / Investor</SelectItem>
                    <SelectItem value="broker" className="text-white focus:bg-[#2a2a2a] focus:text-white">Licensed Broker</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-black/30 border border-[#2a2a2a] p-6 rounded-sm">
                <p className="text-gray-400 mb-4">
                  By submitting this application, you acknowledge that:
                </p>
                <ul className="text-gray-400 space-y-2 mb-6 list-disc list-inside">
                  <li>All information provided is accurate and verifiable</li>
                  <li>You agree to maintain confidentiality of all platform listings</li>
                  <li>You consent to background and credential verification</li>
                  <li>You have read and agree to the platform's NDA and Terms of Service</li>
                </ul>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="agree"
                    checked={formData.agreed}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreed: checked as boolean })}
                    className="border-[#d4af37] data-[state=checked]:bg-[#d4af37] data-[state=checked]:border-[#d4af37] mt-1"
                  />
                  <Label htmlFor="agree" className="text-gray-300 cursor-pointer">
                    I acknowledge and agree to the above terms
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!formData.agreed || loading}
                className="w-full bg-[#d4af37] hover:bg-[#c19b2b] text-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}