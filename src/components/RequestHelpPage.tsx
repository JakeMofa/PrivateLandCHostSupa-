import { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Home, Heart, FileText, HelpCircle, CheckCircle } from 'lucide-react';

interface RequestHelpPageProps {
  userRole: string;
  onLogout: () => void;
}

export default function RequestHelpPage({ userRole, onLogout }: RequestHelpPageProps) {
  const [submitted, setSubmitted] = useState(false);

  const sidebarItems = [
    { label: 'Dashboard', path: `/${userRole}/dashboard`, icon: <Home className="w-5 h-5" /> },
    { label: userRole === 'client' ? 'Marketplace' : 'My Listings', path: `/${userRole}/${userRole === 'client' ? 'marketplace' : 'listings'}`, icon: <Home className="w-5 h-5" /> },
    { label: userRole === 'client' ? 'Saved Properties' : "My Buyer's List", path: `/${userRole}/${userRole === 'client' ? 'saved' : 'buyers'}`, icon: <Heart className="w-5 h-5" /> },
    { label: 'My Documents', path: `/${userRole}/documents`, icon: <FileText className="w-5 h-5" /> },
    { label: 'Request Help', path: `/${userRole}/help`, icon: <HelpCircle className="w-5 h-5" />, active: true },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <DashboardLayout 
        sidebarItems={sidebarItems} 
        userRole={userRole}
        userName={userRole === 'client' ? 'James Anderson' : 'Michael Rivers'}
        onLogout={onLogout}
      >
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#d4af37]/10 mb-6">
                <CheckCircle className="w-12 h-12 text-[#d4af37]" />
              </div>
              <h2 className="text-white mb-4">Request Submitted</h2>
              <p className="text-gray-400 mb-2">
                Your support request has been received.
              </p>
              <p className="text-gray-400 mb-8">
                Our team will review your request and respond within 24 hours.
              </p>
              <Button
                className="bg-[#d4af37] hover:bg-[#c19b2b] text-black"
                onClick={() => setSubmitted(false)}
              >
                Submit Another Request
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole={userRole}
      userName={userRole === 'client' ? 'James Anderson' : 'Michael Rivers'}
      onLogout={onLogout}
    >
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-white mb-2">Request Help</h1>
          <p className="text-gray-400">Submit a support request to our team</p>
        </div>

        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Support Request Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  defaultValue={userRole === 'client' ? 'James Anderson' : 'Michael Rivers'}
                  className="bg-black/50 border-[#2a2a2a] text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={userRole === 'client' ? 'james@email.com' : 'michael@email.com'}
                  className="bg-black/50 border-[#2a2a2a] text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                <Select required>
                  <SelectTrigger className="bg-black/50 border-[#2a2a2a] text-white">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                    <SelectItem value="technical" className="text-white focus:bg-[#2a2a2a] focus:text-white">
                      Technical Issue
                    </SelectItem>
                    <SelectItem value="account" className="text-white focus:bg-[#2a2a2a] focus:text-white">
                      Account Question
                    </SelectItem>
                    <SelectItem value="property" className="text-white focus:bg-[#2a2a2a] focus:text-white">
                      Property Inquiry
                    </SelectItem>
                    <SelectItem value="document" className="text-white focus:bg-[#2a2a2a] focus:text-white">
                      Document Issue
                    </SelectItem>
                    <SelectItem value="agent" className="text-white focus:bg-[#2a2a2a] focus:text-white">
                      Agent Communication
                    </SelectItem>
                    <SelectItem value="other" className="text-white focus:bg-[#2a2a2a] focus:text-white">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-300">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Please describe your issue or question in detail..."
                  className="bg-black/50 border-[#2a2a2a] text-white placeholder:text-gray-600"
                  rows={8}
                  required
                />
              </div>

              <div className="bg-black/30 border border-[#2a2a2a] p-6 rounded-sm">
                <h3 className="text-white mb-3">Response Time</h3>
                <p className="text-gray-400">
                  Our support team typically responds within 24 hours during business days. 
                  For urgent matters regarding active transactions, please contact your assigned agent directly.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#d4af37] hover:bg-[#c19b2b] text-black"
              >
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Other Ways to Get Help</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-black/30 border border-[#2a2a2a] rounded-sm">
              <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div>
                <h4 className="text-white mb-1">Contact Your Agent</h4>
                <p className="text-gray-400">
                  For property-specific questions, reach out to your assigned agent directly through the platform.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-black/30 border border-[#2a2a2a] rounded-sm">
              <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div>
                <h4 className="text-white mb-1">Help Center</h4>
                <p className="text-gray-400">
                  Browse our knowledge base for answers to common questions and platform guides.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
