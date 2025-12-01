import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Eye, 
  TrendingUp, 
  Users, 
  Building2, 
  DollarSign, 
  MapPin, 
  Maximize2,
  Lock,
  Shield,
  Star,
  ChevronRight,
  Activity,
  BarChart3,
  FileText,
  Bell,
  Search,
  Filter,
  Grid3x3,
  Sparkles,
  Briefcase
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Logo from './Logo';
import { SecurityStatusBar, SecurityFooterBadge } from './SecurityBadge';

export default function DemoPage() {
  const navigate = useNavigate();
  const [view360Active, setView360Active] = useState(false);
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  const stats = [
    { label: 'Active Listings', value: '247', icon: Building2, trend: '+12%', color: '#d4af37' },
    { label: 'Total Value', value: '$2.4B', icon: DollarSign, trend: '+8%', color: '#d4af37' },
    { label: 'Verified Buyers', value: '1,823', icon: Users, trend: '+15%', color: '#d4af37' },
    { label: 'Transactions', value: '156', icon: TrendingUp, trend: '+22%', color: '#d4af37' },
  ];

  const featuredListing = {
    title: 'Luxury Mountain Ranch Estate',
    location: 'Aspen, Colorado',
    price: '$18,500,000',
    beds: 6,
    baths: 8,
    sqft: '12,450',
    acres: '250',
    type: 'Private Listing',
    status: 'Active',
    views: 342,
    inquiries: 28
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 right-10 w-[600px] h-[600px] bg-[#d4af37]/10 rounded-full blur-[150px]"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-20 left-10 w-[600px] h-[600px] bg-[#d4af37]/8 rounded-full blur-[150px]"
          animate={{
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
      </div>

      {/* Hero Section */}
      <motion.div 
        className="relative h-[50vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1601054110056-ed47ff702d40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByYW5jaCUyMGVzdGF0ZSUyMGFlcmlhbHxlbnwxfHx8fDE3NjM2ODk2MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Platform Demo"
              className="w-full h-full object-cover opacity-25 scale-105"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-[#0a0a0a]"></div>
        </motion.div>

        <motion.div 
          className="relative z-10 text-center px-6 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Button
            variant="ghost"
            className="mb-8 text-gray-400 hover:text-[#d4af37] hover:bg-transparent transition-all duration-300"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <motion.div 
            className="inline-flex items-center gap-2 mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
            <span className="text-[#d4af37] tracking-widest uppercase text-sm">Platform Preview</span>
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
          </motion.div>
          
          <motion.h1 
            className="text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Experience the Future of Private Real Estate
          </motion.h1>
          
          <motion.p 
            className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            An exclusive preview of our luxury platform featuring advanced analytics, 360° property views, and broker-level insights
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Analytics Dashboard Section */}
      <motion.div 
        className="relative py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] tracking-widest uppercase text-sm">Real-Time Analytics</span>
              <BarChart3 className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-white mb-4">Platform Dashboard</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Monitor your portfolio with live analytics and insights
            </p>
          </motion.div>

          {/* Security Status Bar */}
          <SecurityStatusBar className="mb-12" />

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => setSelectedStat(stat.label)}
              >
                <Card 
                  className={`bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 transition-all duration-500 cursor-pointer ${
                    selectedStat === stat.label ? 'border-[#d4af37] shadow-2xl shadow-[#d4af37]/30' : 'border-[#2a2a2a] hover:border-[#d4af37]/50'
                  }`}
                >
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div 
                        className="w-14 h-14 rounded-lg bg-[#d4af37]/10 flex items-center justify-center"
                        animate={{ 
                          rotate: selectedStat === stat.label ? [0, 10, -10, 0] : 0,
                          scale: selectedStat === stat.label ? [1, 1.1, 1] : 1
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <stat.icon className="w-7 h-7 text-[#d4af37]" />
                      </motion.div>
                      <Badge 
                        className="bg-green-500/10 text-green-400 border-green-500/20"
                      >
                        {stat.trend}
                      </Badge>
                    </div>
                    <motion.div 
                      className="text-3xl text-white mb-2"
                      animate={{ 
                        scale: selectedStat === stat.label ? [1, 1.05, 1] : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Activity Chart Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardContent className="p-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-white text-xl mb-2">Market Activity</h3>
                    <p className="text-gray-400 text-sm">Last 30 days performance</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="border-[#2a2a2a] text-gray-400 hover:text-[#d4af37] hover:border-[#d4af37]/50">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" className="border-[#2a2a2a] text-gray-400 hover:text-[#d4af37] hover:border-[#d4af37]/50">
                      <Activity className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                {/* Simulated Chart */}
                <div className="relative h-64 flex items-end gap-4">
                  {[65, 45, 75, 55, 85, 70, 90, 60, 80, 95, 70, 88].map((height, index) => (
                    <motion.div
                      key={index}
                      className="flex-1 bg-gradient-to-t from-[#d4af37] to-[#d4af37]/40 rounded-t-sm relative group cursor-pointer"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, opacity: 1 }}
                    >
                      <motion.div 
                        className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#d4af37] text-black px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ y: 10 }}
                        whileHover={{ y: 0 }}
                      >
                        ${(height * 2.5)}M
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-[#2a2a2a]">
                  <div className="text-gray-500 text-xs">Jan - Dec 2025</div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#d4af37] rounded-full"></div>
                      <span className="text-gray-400 text-sm">Transaction Volume</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Featured Listing with 360° View */}
      <motion.div 
        className="relative py-20 px-6 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] tracking-widest uppercase text-sm">Featured Listing</span>
              <Eye className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-white mb-4">Immersive Property Experience</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore properties with our 360° virtual tour technology
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* 360° Property View */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#2a2a2a] overflow-hidden group">
                <CardContent className="p-0 relative">
                  <div className="relative h-[500px] overflow-hidden">
                    <motion.div
                      animate={{ 
                        scale: view360Active ? [1, 1.1, 1] : 1,
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: view360Active ? Infinity : 0,
                        ease: "easeInOut" 
                      }}
                    >
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1757524492552-d47a66a2b63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByYW5jaCUyMGhvdXNlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2MzY4OTYxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Luxury Ranch Estate"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    
                    {/* 360° Badge */}
                    <motion.div 
                      className="absolute top-6 right-6"
                      animate={{ 
                        rotate: view360Active ? 360 : 0,
                        scale: view360Active ? [1, 1.1, 1] : 1
                      }}
                      transition={{ 
                        rotate: { duration: 2, repeat: view360Active ? Infinity : 0, ease: "linear" },
                        scale: { duration: 1, repeat: view360Active ? Infinity : 0 }
                      }}
                    >
                      <Badge className="bg-[#d4af37] text-black border-0 px-4 py-2">
                        <Maximize2 className="w-4 h-4 mr-2" />
                        360° View
                      </Badge>
                    </motion.div>

                    {/* Controls Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          size="lg"
                          className="bg-[#d4af37] hover:bg-[#c19b2b] text-black rounded-full w-20 h-20"
                          onClick={() => setView360Active(!view360Active)}
                        >
                          {view360Active ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                              <Activity className="w-8 h-8" />
                            </motion.div>
                          ) : (
                            <Eye className="w-8 h-8" />
                          )}
                        </Button>
                      </motion.div>
                    </div>

                    {/* Property Type Badge */}
                    <div className="absolute bottom-6 left-6">
                      <Badge className="bg-black/80 text-[#d4af37] border border-[#d4af37]/30 px-4 py-2 backdrop-blur-sm">
                        <Lock className="w-4 h-4 mr-2" />
                        {featuredListing.type}
                      </Badge>
                    </div>
                  </div>

                  {/* Property Gallery Thumbnails */}
                  <div className="p-6 grid grid-cols-4 gap-3">
                    {[1, 2, 3, 4].map((img, index) => (
                      <motion.div
                        key={img}
                        className="aspect-video bg-[#2a2a2a] rounded-sm overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#d4af37] transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <ImageWithFallback
                          src={`https://images.unsplash.com/photo-${index % 2 === 0 ? '1600596542815' : '1600607687939'}-18f1dadd6dda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByYW5jaCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MzY2MDc0OHww&ixlib=rb-4.1.0&q=80&w=400&utm_source=figma&utm_medium=referral`}
                          alt={`View ${img}`}
                          className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                        />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Property Details */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20 mb-3">
                      {featuredListing.status}
                    </Badge>
                    <h3 className="text-white text-3xl mb-2">{featuredListing.title}</h3>
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{featuredListing.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#d4af37] text-4xl mb-1">{featuredListing.price}</div>
                  </div>
                </div>

                {/* Property Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <motion.div 
                    className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] p-6 rounded-sm"
                    whileHover={{ scale: 1.02, borderColor: '#d4af37' }}
                  >
                    <div className="text-gray-400 text-sm mb-1">Bedrooms</div>
                    <div className="text-white text-2xl">{featuredListing.beds}</div>
                  </motion.div>
                  <motion.div 
                    className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] p-6 rounded-sm"
                    whileHover={{ scale: 1.02, borderColor: '#d4af37' }}
                  >
                    <div className="text-gray-400 text-sm mb-1">Bathrooms</div>
                    <div className="text-white text-2xl">{featuredListing.baths}</div>
                  </motion.div>
                  <motion.div 
                    className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] p-6 rounded-sm"
                    whileHover={{ scale: 1.02, borderColor: '#d4af37' }}
                  >
                    <div className="text-gray-400 text-sm mb-1">Square Feet</div>
                    <div className="text-white text-2xl">{featuredListing.sqft}</div>
                  </motion.div>
                  <motion.div 
                    className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] p-6 rounded-sm"
                    whileHover={{ scale: 1.02, borderColor: '#d4af37' }}
                  >
                    <div className="text-gray-400 text-sm mb-1">Land Acres</div>
                    <div className="text-white text-2xl">{featuredListing.acres}</div>
                  </motion.div>
                </div>

                {/* Engagement Stats */}
                <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] mb-6">
                  <CardContent className="p-6">
                    <h4 className="text-white mb-4">Listing Performance</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#d4af37]/10 rounded-lg flex items-center justify-center">
                            <Eye className="w-5 h-5 text-[#d4af37]" />
                          </div>
                          <div>
                            <div className="text-white">Total Views</div>
                            <div className="text-gray-500 text-sm">Last 7 days</div>
                          </div>
                        </div>
                        <div className="text-white text-xl">{featuredListing.views}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#d4af37]/10 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-[#d4af37]" />
                          </div>
                          <div>
                            <div className="text-white">Inquiries</div>
                            <div className="text-gray-500 text-sm">Verified buyers</div>
                          </div>
                        </div>
                        <div className="text-white text-xl">{featuredListing.inquiries}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button 
                    className="flex-1 bg-[#d4af37] hover:bg-[#c19b2b] text-black"
                    onClick={() => navigate('/apply')}
                  >
                    Request Access
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Verify
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Broker Dashboard Preview */}
      <motion.div 
        className="relative py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] tracking-widest uppercase text-sm">Broker Dashboard</span>
              <Briefcase className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-white mb-4">Professional Tools & Insights</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Manage your listings, track client interactions, and access exclusive broker features
            </p>
          </motion.div>

          {/* Broker Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: 'Advanced Analytics',
                description: 'Comprehensive dashboard with 16 charts tracking every critical metric',
                features: ['23 unique KPIs', 'Pipeline tracking', 'Performance insights', 'Regional analytics']
              },
              {
                icon: FileText,
                title: 'Listing Management',
                description: 'Full-featured listing control with status tracking and bulk operations',
                features: ['Multi-status pipeline', 'Draft system', 'Bulk uploads', 'Version history']
              },
              {
                icon: Users,
                title: 'Client Pipeline',
                description: 'Track verified buyers through every stage with lead scoring',
                features: ['Lead scoring', 'Activity tracking', 'Conversion metrics', 'Deal forecasting']
              },
              {
                icon: DollarSign,
                title: 'Financial Insights',
                description: 'Revenue tracking, commission calculations, and deal value analytics',
                features: ['Pipeline value', 'Commission tracking', 'Deal value trends', 'ROI analysis']
              },
              {
                icon: Bell,
                title: 'Smart Notifications',
                description: 'Real-time alerts for inquiries, viewings, and opportunities',
                features: ['Instant alerts', 'Custom filters', 'Priority inbox', 'Activity feed']
              },
              {
                icon: Grid3x3,
                title: 'Reports & Export',
                description: 'Generate detailed reports with one-click export to PDF',
                features: ['Custom reports', 'PDF export', 'Data visualization', 'Historical trends']
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#2a2a2a] hover:border-[#d4af37]/50 transition-all duration-500 h-full group">
                  <CardContent className="p-8">
                    <motion.div 
                      className="w-16 h-16 bg-[#d4af37]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#d4af37]/20 transition-all"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-8 h-8 text-[#d4af37]" />
                    </motion.div>
                    <h3 className="text-white text-xl mb-3">{feature.title}</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">{feature.description}</p>
                    <div className="space-y-2">
                      {feature.features.map((item, i) => (
                        <motion.div 
                          key={i}
                          className="flex items-center gap-2 text-gray-500 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.2 + i * 0.1 }}
                        >
                          <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full"></div>
                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions Bar */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a]/30 to-[#1a1a1a] border-[#d4af37]/30">
              <CardContent className="p-8">
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div>
                    <h3 className="text-white text-xl mb-2">Ready to Experience More?</h3>
                    <p className="text-gray-400">Apply for broker access and unlock the full platform</p>
                  </div>
                  <div className="flex gap-4">
                    <Button 
                      size="lg"
                      className="bg-[#d4af37] hover:bg-[#c19b2b] text-black"
                      onClick={() => navigate('/apply')}
                    >
                      Apply as Broker
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                      onClick={() => navigate('/services')}
                    >
                      View Services
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Client Dashboard Preview */}
      <motion.div 
        className="relative py-20 px-6 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] tracking-widest uppercase text-sm">Client Dashboard</span>
              <Users className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-white mb-4">Buyer Intelligence & Market Insights</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              High-net-worth buyers get exclusive access to market analytics, property comparisons, and financial tools
            </p>
          </motion.div>

          {/* Client Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: 'Smart Search & Filtering',
                description: 'Advanced filters by price, acreage, region, and property type with saved searches',
                features: ['Budget-based filtering', 'Saved searches', 'Property comparisons', 'Alert preferences']
              },
              {
                icon: BarChart3,
                title: 'Market Analytics',
                description: '13 comprehensive charts covering regional trends, pricing, and your activity',
                features: ['Price trends', 'Market snapshots', 'Property suitability', 'Financial tools']
              },
              {
                icon: DollarSign,
                title: 'Financial Planning',
                description: 'Mortgage calculator, affordability analysis, and budget tracking tools',
                features: ['Loan calculator', 'Budget comparison', 'Tax estimates', 'Payment breakdown']
              },
              {
                icon: Eye,
                title: 'Activity Tracking',
                description: 'Monitor your viewing history, saved properties, and search patterns',
                features: ['View history', 'Saved properties', 'Search activity', 'Property analytics']
              },
              {
                icon: Shield,
                title: 'Secure Access',
                description: 'NDA management, proof-of-funds verification, and document tracking',
                features: ['NDA signing', 'Credential status', 'Access levels', 'Document vault']
              },
              {
                icon: Users,
                title: 'Agent Relationship',
                description: 'Direct communication with your assigned broker and appointment scheduling',
                features: ['Agent profile', 'Contact history', 'Meeting scheduler', 'Message center']
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#2a2a2a] hover:border-[#d4af37]/50 transition-all duration-500 h-full group">
                  <CardContent className="p-8">
                    <motion.div 
                      className="w-16 h-16 bg-[#d4af37]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#d4af37]/20 transition-all"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-8 h-8 text-[#d4af37]" />
                    </motion.div>
                    <h3 className="text-white text-xl mb-3">{feature.title}</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">{feature.description}</p>
                    <div className="space-y-2">
                      {feature.features.map((item, i) => (
                        <motion.div 
                          key={i}
                          className="flex items-center gap-2 text-gray-500 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.15 + i * 0.1 }}
                        >
                          <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full"></div>
                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Client CTA */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a]/30 to-[#1a1a1a] border-[#d4af37]/30">
              <CardContent className="p-8">
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div>
                    <h3 className="text-white text-xl mb-2">Interested in Buying?</h3>
                    <p className="text-gray-400">Apply for buyer access to browse exclusive private listings</p>
                  </div>
                  <div className="flex gap-4">
                    <Button 
                      size="lg"
                      className="bg-[#d4af37] hover:bg-[#c19b2b] text-black"
                      onClick={() => navigate('/apply')}
                    >
                      Apply as Buyer
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                      onClick={() => navigate('/contact')}
                    >
                      Contact Us
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="relative py-32 px-6 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1694617447949-ce9399009bc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXJnZSUyMHJhbmNoJTIwcHJvcGVydHklMjBtb3VudGFpbnN8ZW58MXx8fHwxNzYzNjg5NjE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Join Platform"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-black/80 to-[#0a0a0a]/90"></div>
        </motion.div>

        <motion.div 
          className="relative z-10 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Star className="w-16 h-16 text-[#d4af37] mx-auto mb-8" />
          </motion.div>
          <h2 className="text-white mb-6">Join the Elite</h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            This is just a glimpse. Request access to experience the full power of the world's only private listing platform.
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-[#d4af37] to-[#c19b2b] hover:from-[#c19b2b] hover:to-[#d4af37] text-black px-12 shadow-2xl shadow-[#d4af37]/40 hover:shadow-[#d4af37]/60 transition-all duration-500"
            onClick={() => navigate('/apply')}
          >
            Request Full Access
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <footer className="border-t border-[#2a2a2a] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <Logo size="lg" showTagline={true} className="mb-6" />
            <SecurityFooterBadge className="mb-6" />
            <div className="flex flex-wrap justify-center gap-8">
              <button onClick={() => navigate('/about')} className="text-gray-400 hover:text-[#d4af37] transition-colors">About</button>
              <button onClick={() => navigate('/services')} className="text-gray-400 hover:text-[#d4af37] transition-colors">Services</button>
              <button onClick={() => navigate('/contact')} className="text-gray-400 hover:text-[#d4af37] transition-colors">Contact</button>
              <button onClick={() => navigate('/security')} className="text-gray-400 hover:text-[#d4af37] transition-colors">Security</button>
              <a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">Privacy</a>
            </div>
          </div>
          <p className="text-center text-gray-600">
            © 2025 PrivateLand.com. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}