import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Home, Heart, UserCircle, FileText, HelpCircle, LogOut, Mail, Phone, MessageCircle, Calendar, MapPin, Star, Send } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { useState } from 'react';

interface MyAgentPageProps {
  onLogout: () => void;
}

export default function MyAgentPage({ onLogout }: MyAgentPageProps) {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const sidebarItems = [
    { label: 'Dashboard', path: '/client/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'My Profile', path: '/client/profile', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Marketplace', path: '/client/marketplace', icon: <Home className="w-5 h-5" /> },
    { label: 'Saved Properties', path: '/client/saved', icon: <Heart className="w-5 h-5" /> },
    { label: 'My Agent', path: '/client/agent', icon: <UserCircle className="w-5 h-5" />, active: true },
    { label: 'Invitations', path: '/client/invitations', icon: <Mail className="w-5 h-5" /> },
    { label: 'My Documents', path: '/client/documents', icon: <FileText className="w-5 h-5" /> },
    { label: 'Account', path: '/client/account', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Settings', path: '/client/settings', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Request Help', path: '/client/help', icon: <HelpCircle className="w-5 h-5" /> },
    { 
      label: 'Logout', 
      path: '/', 
      icon: <LogOut className="w-5 h-5" />,
    },
  ];

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole="client" 
      userName="James Anderson"
      onLogout={onLogout}
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-white mb-2">My Agent</h1>
          <p className="text-gray-400">Your dedicated real estate professional</p>
        </div>

        {/* Agent Profile Card */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Agent Photo/Avatar */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#d4af37] to-[#c19b2b] flex items-center justify-center">
                  <span className="text-black text-4xl">SM</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-[#d4af37] text-[#d4af37]" />
                  ))}
                </div>
              </div>

              {/* Agent Details */}
              <div className="flex-1">
                <div className="mb-4">
                  <h2 className="text-white text-2xl mb-1">Sarah Mitchell</h2>
                  <p className="text-[#d4af37] mb-2">Licensed Broker</p>
                  <p className="text-gray-400">Specializing in luxury estates and private properties</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white">sarahmitchell@privateland.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-white">+1 (555) 987-6543</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white">New York, NY</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Experience</p>
                      <p className="text-white">12+ Years</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="bg-[#d4af37] hover:bg-[#c19b2b] text-black">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agent Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Properties Sold</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-3xl">127</p>
              <p className="text-gray-500 text-sm mt-1">Lifetime</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Total Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-3xl">$450M+</p>
              <p className="text-gray-500 text-sm mt-1">In transactions</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-400">Client Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-3xl">5.0</p>
              <p className="text-gray-500 text-sm mt-1">Average rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Message */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Send a Quick Message</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Type your message here..."
                className="min-h-[120px] bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button className="bg-[#d4af37] hover:bg-[#c19b2b] text-black">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: 'Nov 20, 2024', action: 'Shared new property listing with you', type: 'listing' },
                { date: 'Nov 18, 2024', action: 'Sent market analysis report', type: 'document' },
                { date: 'Nov 15, 2024', action: 'Scheduled property viewing', type: 'calendar' },
                { date: 'Nov 12, 2024', action: 'Responded to your inquiry', type: 'message' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b border-[#2a2a2a] last:border-0">
                  <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white">{activity.action}</p>
                    <p className="text-gray-500 text-sm mt-1">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expertise Areas */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Areas of Expertise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {['Luxury Estates', 'Ranch Properties', 'Waterfront Homes', 'Investment Properties', 'Land Development', 'Private Islands'].map((expertise, index) => (
                <span key={index} className="px-4 py-2 rounded-full bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30">
                  {expertise}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
