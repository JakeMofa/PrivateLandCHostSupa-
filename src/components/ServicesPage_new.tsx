import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Lock, Shield, Users, FileText, Search, CheckCircle, ArrowLeft, Sparkles, TrendingUp, Building2, Briefcase, UserCheck, Database, LineChart, Bell, FileCheck2, ArrowRight, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

export default function ServicesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGludGVyaW9yfGVufDF8fHx8MTc2MzY2MDc0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Luxury Estate Interior"
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-[#0a0a0a]"></div>
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60"></div>
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <Button
            variant="ghost"
            className="mb-12 text-gray-400 hover:text-[#d4af37] hover:bg-transparent transition-all duration-300"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="mb-12 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-transparent to-[#d4af37]/50"></div>
            <div className="inline-block px-8 py-3 border-2 border-[#d4af37]/40 rounded-sm mb-8 backdrop-blur-sm bg-black/30 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/5 via-[#d4af37]/10 to-[#d4af37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="text-[#d4af37] tracking-wider relative">PrivateLand</span><span className="text-white relative">.com</span>
            </div>
          </div>
          
          <h1 className="text-white mb-8 tracking-tight">
            <span className="block mb-2">The Services We Offer For Clients</span>
            <span className="block h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></span>
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            Comprehensive solutions for discerning investors, sellers, brokerages, and licensed agents
          </p>

          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#d4af37]/20"></div>
          <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-[#d4af37]/20"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-[#d4af37]/20"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#d4af37]/20"></div>
        </div>
      </div>

      {/* Ornamental Divider */}
      <div className="relative flex items-center justify-center py-20">
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
          <div className="h-px w-32 bg-gradient-to-r from-transparent to-[#d4af37]/50"></div>
          <div className="w-2 h-2 rotate-45 border border-[#d4af37]"></div>
          <div className="w-1.5 h-1.5 bg-[#d4af37]"></div>
          <div className="w-2 h-2 rotate-45 border border-[#d4af37]"></div>
          <div className="h-px w-32 bg-gradient-to-l from-transparent to-[#d4af37]/50"></div>
        </div>
      </div>

      {/* Quick Action Services */}
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
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] tracking-widest uppercase text-sm">Get Started</span>
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-white mb-4">Quick Access Services</h2>
            <div className="h-1 w-16 mx-auto bg-[#d4af37]"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Request Access to Listings */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="h-full bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#2a2a2a] hover:border-[#d4af37] transition-all duration-500 p-8 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <motion.div 
                  className="w-16 h-16 bg-[#d4af37]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#d4af37]/20 transition-all"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Eye className="w-8 h-8 text-[#d4af37]" />
                </motion.div>

                <h3 className="text-white text-xl mb-3">Request Access to Listings</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  View exclusive off-market properties after verification and NDA signing
                </p>

                <Button
                  className="w-full bg-transparent border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all"
                  onClick={() => navigate('/apply')}
                >
                  Request Access
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>

            {/* Request Agent Access to View Property */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="h-full bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#2a2a2a] hover:border-[#d4af37] transition-all duration-500 p-8 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <motion.div 
                  className="w-16 h-16 bg-[#d4af37]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#d4af37]/20 transition-all"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <UserCheck className="w-8 h-8 text-[#d4af37]" />
                </motion.div>

                <h3 className="text-white text-xl mb-3">Request Agent Access to View Property</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Licensed agents can request access to view specific properties for clients
                </p>

                <Button
                  className="w-full bg-transparent border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all"
                  onClick={() => navigate('/apply')}
                >
                  Agent Request
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>

            {/* Request Agent Access to List Properties - NEW */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="h-full bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#2a2a2a] hover:border-[#d4af37] transition-all duration-500 p-8 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <motion.div 
                  className="w-16 h-16 bg-[#d4af37]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#d4af37]/20 transition-all"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <FileText className="w-8 h-8 text-[#d4af37]" />
                </motion.div>

                <h3 className="text-white text-xl mb-3">Request Agent Access to List Properties</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Agents can apply for permission to add and manage listings on the platform
                </p>

                <Button
                  className="w-full bg-transparent border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all"
                  onClick={() => navigate('/apply')}
                >
                  Apply to List
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>

            {/* Brokerage Partnership Option */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="h-full bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#2a2a2a] hover:border-[#d4af37] transition-all duration-500 p-8 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <motion.div 
                  className="w-16 h-16 bg-[#d4af37]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#d4af37]/20 transition-all"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Briefcase className="w-8 h-8 text-[#d4af37]" />
                </motion.div>

                <h3 className="text-white text-xl mb-3">Brokerage Partnership Option</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Partner your brokerage with our platform for exclusive deal collaboration
                </p>

                <Button
                  className="w-full bg-transparent border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all"
                  onClick={() => navigate('/contact')}
                >
                  Partner With Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Featured: List Your Land/Property - Separate Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a]/50 to-[#1a1a1a] border-2 border-[#d4af37]/50 p-12 rounded-sm overflow-hidden group hover:border-[#d4af37] transition-all duration-500">
              {/* Decorative corners */}
              <div className="absolute -top-2 -left-2 w-16 h-16 border-t-2 border-l-2 border-[#d4af37] opacity-50"></div>
              <div className="absolute -top-2 -right-2 w-16 h-16 border-t-2 border-r-2 border-[#d4af37] opacity-50"></div>
              <div className="absolute -bottom-2 -left-2 w-16 h-16 border-b-2 border-l-2 border-[#d4af37] opacity-50"></div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-2 border-r-2 border-[#d4af37] opacity-50"></div>

              {/* Gold glow effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/5 via-[#d4af37]/10 to-[#d4af37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>

              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-[#d4af37]" />
                    <span className="text-[#d4af37] tracking-widest uppercase text-sm">Featured Service</span>
                  </div>
                  
                  <motion.div 
                    className="w-20 h-20 bg-[#d4af37]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#d4af37]/20 transition-all"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Building2 className="w-10 h-10 text-[#d4af37]" />
                  </motion.div>

                  <h3 className="text-white text-3xl mb-4">List Your Land / Property</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                    Showcase your property to our exclusive network of verified, high-net-worth buyers and institutional investors. Get maximum exposure while maintaining complete confidentiality.
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-gray-400">
                      <div className="w-2 h-2 bg-[#d4af37] rounded-full"></div>
                      <span>Access to pre-qualified buyers</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                      <div className="w-2 h-2 bg-[#d4af37] rounded-full"></div>
                      <span>NDA-protected property details</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                      <div className="w-2 h-2 bg-[#d4af37] rounded-full"></div>
                      <span>Professional marketing support</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                      <div className="w-2 h-2 bg-[#d4af37] rounded-full"></div>
                      <span>Real-time analytics & insights</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      size="lg"
                      className="bg-[#d4af37] hover:bg-[#c19b2b] text-black"
                      onClick={() => navigate('/contact')}
                    >
                      List Your Property
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                      onClick={() => navigate('/demo')}
                    >
                      See Demo
                    </Button>
                  </div>
                </div>

                <motion.div 
                  className="relative h-[400px] rounded-sm overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1598975731742-847e73ce82c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW5jaCUyMGVzdGF0ZSUyMHByb3BlcnR5JTIwdmlld3xlbnwxfHx8fDE3NjM2ODk2MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="List Your Property"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Feature Highlight Banner */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a]/30 to-[#1a1a1a] border border-[#d4af37]/30 p-8 rounded-sm">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#d4af37]/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg mb-1">All Services Include NDA Protection</h3>
                    <p className="text-gray-400 text-sm">Your privacy and confidentiality are guaranteed on every transaction</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                  onClick={() => navigate('/demo')}
                >
                  View Platform Demo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Rest of services page content continues... */}
      <footer className="border-t border-[#2a2a2a] py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <button onClick={() => navigate('/about')} className="text-gray-400 hover:text-[#d4af37] transition-colors">About</button>
            <button onClick={() => navigate('/services')} className="text-gray-400 hover:text-[#d4af37] transition-colors">Services</button>
            <button onClick={() => navigate('/contact')} className="text-gray-400 hover:text-[#d4af37] transition-colors">Contact</button>
            <a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">Privacy</a>
          </div>
          <p className="text-center text-gray-600">
            © 2025 PrivateLand.com. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
