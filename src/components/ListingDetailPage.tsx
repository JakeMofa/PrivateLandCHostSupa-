import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Home, Heart, MessageCircle, MapPin, Maximize, FileText, Download } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface ListingDetailPageProps {
  userRole: string;
  onLogout: () => void;
}

export default function ListingDetailPage({ userRole, onLogout }: ListingDetailPageProps) {
  const { id } = useParams();
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const sidebarItems = [
    { label: 'Dashboard', path: `/${userRole}/dashboard`, icon: <Home className="w-5 h-5" /> },
    { label: 'Marketplace', path: `/${userRole}/marketplace`, icon: <Home className="w-5 h-5" /> },
    { label: 'Saved Properties', path: `/${userRole}/saved`, icon: <Heart className="w-5 h-5" /> },
  ];

  const listing = {
    id,
    image: 'https://images.unsplash.com/photo-1635111031688-9b13c0125d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlc3RhdGUlMjBhZXJpYWx8ZW58MXx8fHwxNzYzNjYwNzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: '$12,500,000',
    acres: '250',
    location: 'Big Sky, Montana',
    type: 'Ranch Estate',
    description: 'An extraordinary private ranch estate offering unparalleled luxury and seclusion. This property features pristine mountain views, abundant wildlife, and direct access to national forest land. The main residence spans 12,000 square feet with custom finishes throughout.'
  };

  const documents = [
    { name: 'Property Disclosure', type: 'PDF', size: '2.3 MB' },
    { name: 'Survey Report', type: 'PDF', size: '5.1 MB' },
    { name: 'Title Report', type: 'PDF', size: '1.8 MB' },
  ];

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole={userRole}
      userName="James Anderson"
      onLogout={onLogout}
      showBackButton={true}
    >
      <div className="space-y-6">
        {/* Hero Image */}
        <div className="relative h-[500px] rounded-sm overflow-hidden">
          <ImageWithFallback
            src={listing.image}
            alt={listing.type}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-8 left-8">
            <h1 className="text-white mb-2">{listing.price}</h1>
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-2">
                <Maximize className="w-5 h-5" />
                <span>{listing.acres} acres</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{listing.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button 
            variant={saved ? "default" : "outline"}
            className={saved 
              ? "bg-[#d4af37] hover:bg-[#c19b2b] text-black" 
              : "border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
            }
            onClick={() => setSaved(!saved)}
          >
            <Heart className={`w-4 h-4 mr-2 ${saved ? 'fill-current' : ''}`} />
            {saved ? 'Saved' : 'Save Property'}
          </Button>

          <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#d4af37] hover:bg-[#c19b2b] text-black">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact My Agent
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
              <DialogHeader>
                <DialogTitle className="text-white">Contact Your Agent</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                setContactDialogOpen(false);
              }}>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">Your Name</Label>
                  <Input
                    id="name"
                    defaultValue="James Anderson"
                    className="bg-black/50 border-[#2a2a2a] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Your Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="james@email.com"
                    className="bg-black/50 border-[#2a2a2a] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-300">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="I'm interested in scheduling a viewing..."
                    className="bg-black/50 border-[#2a2a2a] text-white placeholder:text-gray-600"
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full bg-[#d4af37] hover:bg-[#c19b2b] text-black">
                  Send Message
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-[#1a1a1a] border border-[#2a2a2a]">
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black text-gray-400"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="documents"
              className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black text-gray-400"
            >
              Documents
            </TabsTrigger>
            <TabsTrigger 
              value="map"
              className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black text-gray-400"
            >
              Map
            </TabsTrigger>
            <TabsTrigger 
              value="contact"
              className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black text-gray-400"
            >
              Contact Agent
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardContent className="p-8">
                <h2 className="text-white mb-4">Property Overview</h2>
                <p className="text-gray-400 mb-6">{listing.description}</p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-white mb-4">Property Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-[#2a2a2a]">
                        <span className="text-gray-400">Property Type</span>
                        <span className="text-white">{listing.type}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-[#2a2a2a]">
                        <span className="text-gray-400">Total Acres</span>
                        <span className="text-white">{listing.acres}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-[#2a2a2a]">
                        <span className="text-gray-400">Location</span>
                        <span className="text-white">{listing.location}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-[#2a2a2a]">
                        <span className="text-gray-400">Price</span>
                        <span className="text-white">{listing.price}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white mb-4">Features</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></div>
                        Main Residence: 12,000 sq ft
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></div>
                        Guest House: 3,500 sq ft
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></div>
                        Equestrian Facilities
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></div>
                        Private Lake Access
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></div>
                        Helicopter Pad
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardContent className="p-8">
                <h2 className="text-white mb-6">Property Documents</h2>
                <div className="space-y-3">
                  {documents.map((doc, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 bg-black/30 border border-[#2a2a2a] rounded-sm hover:border-[#d4af37]/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[#d4af37]" />
                        <div>
                          <p className="text-white">{doc.name}</p>
                          <p className="text-gray-500">{doc.type} • {doc.size}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map" className="mt-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardContent className="p-0 h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-[#d4af37] mx-auto mb-4" />
                  <p className="text-gray-400">Interactive Property Map</p>
                  <p className="text-gray-600">Mapbox integration placeholder</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardContent className="p-8">
                <h2 className="text-white mb-6">Your Assigned Agent</h2>
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-20 h-20 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center">
                    <span className="text-[#d4af37] text-xl">SM</span>
                  </div>
                  <div>
                    <h3 className="text-white mb-1">Sarah Mitchell</h3>
                    <p className="text-gray-400 mb-2">Licensed Broker</p>
                    <p className="text-gray-500">15+ years of experience in luxury real estate</p>
                  </div>
                </div>

                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name" className="text-gray-300">Your Name</Label>
                    <Input
                      id="contact-name"
                      defaultValue="James Anderson"
                      className="bg-black/50 border-[#2a2a2a] text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email" className="text-gray-300">Your Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      defaultValue="james@email.com"
                      className="bg-black/50 border-[#2a2a2a] text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message" className="text-gray-300">Message</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="I'm interested in scheduling a viewing..."
                      className="bg-black/50 border-[#2a2a2a] text-white placeholder:text-gray-600"
                      rows={6}
                    />
                  </div>
                  <Button className="w-full bg-[#d4af37] hover:bg-[#c19b2b] text-black">
                    Send Message to Agent
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}