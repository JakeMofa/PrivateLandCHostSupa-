import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Lock, Shield, Users, FileText, Search, CheckCircle, ArrowLeft, Sparkles, TrendingUp, Building2, Briefcase, UserCheck, Database, LineChart, Bell, FileCheck2, ArrowRight, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import Logo from './Logo';
import { SecurityFooterBadge } from './SecurityBadge';

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
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut" 
            }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGludGVyaW9yfGVufDF8fHx8MTc2MzY2MDc0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Luxury Estate Interior"
              className="w-full h-full object-cover opacity-20"
            />
          </motion.div>
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

            {/* Request Agent Access to List Properties */}
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

      {/* Platform Introduction */}
      <motion.div 
        className="relative py-32 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-20 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] tracking-widest uppercase text-sm">Our Platform</span>
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-white mb-6">A Confidential Marketplace for High-Value Real Estate</h2>
            <div className="h-1 w-16 mx-auto bg-[#d4af37]"></div>
          </motion.div>

          <motion.div 
            className="relative backdrop-blur-sm bg-gradient-to-br from-[#1a1a1a]/80 to-[#0f0f0f]/80 border border-[#2a2a2a]/50 p-16 rounded-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ borderColor: "rgba(212, 175, 55, 0.3)" }}
          >
            <p className="text-gray-300 leading-relaxed text-lg text-center max-w-5xl mx-auto">
              Matthew's Private Deal Platform is an exclusive marketplace designed to connect accredited investors, verified buyers, experienced brokers, and trusted sellers within a secure, data-driven, and compliance-focused environment. By combining technology, confidentiality, and professional integrity, the platform streamlines high-value off-market transactions while preserving privacy, accuracy, and control over every phase of the deal cycle.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* How It Works - 4 Steps Section */}
      <div className="relative py-32 px-6 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] tracking-widest uppercase text-sm">Process</span>
              <CheckCircle className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-white mb-6">How It Works</h2>
            <div className="h-1 w-16 mx-auto bg-[#d4af37] mb-6"></div>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              Your journey to exclusive off-market properties in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#d4af37]/30 hover:border-[#d4af37] p-10 rounded-sm transition-all duration-500">
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center text-black text-2xl group-hover:scale-110 transition-transform duration-500">
                  1
                </div>
                <h3 className="text-white text-2xl mb-4 mt-4">Request Access</h3>
                <p className="text-gray-400 leading-relaxed">
                  Submit your access request through our secure application form. Provide your credentials, investment criteria, and professional information for verification.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#d4af37]/30 hover:border-[#d4af37] p-10 rounded-sm transition-all duration-500">
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center text-black text-2xl group-hover:scale-110 transition-transform duration-500">
                  2
                </div>
                <h3 className="text-white text-2xl mb-4 mt-4">Apply & Verify</h3>
                <p className="text-gray-400 leading-relaxed">
                  Our administrative team reviews your application, verifies your credentials, and confirms your accreditation status or professional licensing.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#d4af37]/30 hover:border-[#d4af37] p-10 rounded-sm transition-all duration-500">
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center text-black text-2xl group-hover:scale-110 transition-transform duration-500">
                  3
                </div>
                <h3 className="text-white text-2xl mb-4 mt-4">Review & Sign NDA</h3>
                <p className="text-gray-400 leading-relaxed">
                  Once approved, you'll receive access to our digital NDA system. Review and electronically sign your confidentiality agreement to unlock property listings.
                </p>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#d4af37]/30 hover:border-[#d4af37] p-10 rounded-sm transition-all duration-500">
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center text-black text-2xl group-hover:scale-110 transition-transform duration-500">
                  4
                </div>
                <h3 className="text-white text-2xl mb-4 mt-4">Access Marketplace</h3>
                <p className="text-gray-400 leading-relaxed">
                  Welcome to the platform. Browse exclusive off-market listings, connect with verified brokers, and begin your confidential property search journey.
                </p>
              </div>
            </motion.div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-16">
            <Button
              size="lg"
              className="bg-[#d4af37] hover:bg-[#c19b2b] text-black px-12"
              onClick={() => navigate('/apply')}
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* For Buyer Clients Section */}
      <motion.div 
        className="relative py-32 px-6 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Search className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] tracking-widest uppercase text-sm">For Buyers</span>
              <Search className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-white mb-6">🏘 For Buyer Clients</h2>
            <div className="h-1 w-16 mx-auto bg-[#d4af37] mb-6"></div>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              Access Premium, Verified Opportunities — Securely and Confidentially
            </p>
          </motion.div>

          <div className="space-y-10">
            <motion.div 
              className="relative backdrop-blur-sm bg-black/40 border border-[#2a2a2a]/50 p-12 rounded-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ borderColor: "rgba(212, 175, 55, 0.3)", y: -5 }}
            >
              <p className="text-gray-300 leading-relaxed text-lg">
                As a qualified buyer or accredited investor, you gain access to exclusive off-market listings and development opportunities throughout Texas and beyond. Each listing is carefully vetted and made available only after NDA verification, ensuring you are viewing legitimate, high-quality opportunities that align with your investment goals.
              </p>
            </motion.div>

            <div className="relative bg-gradient-to-br from-[#1a1a1a] via-[#151515] to-[#0f0f0f] border-2 border-[#d4af37]/30 p-12 rounded-sm">
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#d4af37]"></div>
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-[#d4af37]"></div>
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-[#d4af37]"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#d4af37]"></div>

              <h3 className="text-white mb-8 text-2xl text-center">Key Benefits</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group bg-black/30 border-l-4 border-[#d4af37] p-8 rounded-sm hover:border-l-8 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent border border-[#d4af37]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Lock className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Confidential Access</h4>
                      <p className="text-gray-400">All listings are gated behind signed NDAs for total transaction security.</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-black/30 border-l-4 border-[#d4af37] p-8 rounded-sm hover:border-l-8 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent border border-[#d4af37]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <CheckCircle className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Verified Data</h4>
                      <p className="text-gray-400">View curated property details, financials, and growth metrics sourced directly from trusted brokers.</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-black/30 border-l-4 border-[#d4af37] p-8 rounded-sm hover:border-l-8 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent border border-[#d4af37]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Search className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Custom Search & Filter</h4>
                      <p className="text-gray-400">Refine opportunities by acreage, price per acre, city growth score, or investment category.</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-black/30 border-l-4 border-[#d4af37] p-8 rounded-sm hover:border-l-8 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent border border-[#d4af37]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Users className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Direct Broker Contact</h4>
                      <p className="text-gray-400">Communicate only with verified listing agents under confidentiality protection.</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-black/30 border-l-4 border-[#d4af37] p-8 rounded-sm hover:border-l-8 transition-all duration-500 md:col-span-2">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent border border-[#d4af37]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Shield className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Secure Client Portal</h4>
                      <p className="text-gray-400">Track signed NDAs, monitor updates, and review shared listings from your assigned agent.</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed text-center mt-10 text-lg">
                Whether your focus is ranch acquisitions, multifamily developments, or land investment, the platform delivers a seamless, secure experience that saves time, protects privacy, and enhances decision quality.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* For Seller Clients Section */}
      <motion.div 
        className="relative py-32 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] tracking-widest uppercase text-sm">For Sellers</span>
              <Building2 className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-white mb-6">🏡 For Seller Clients</h2>
            <div className="h-1 w-16 mx-auto bg-[#d4af37] mb-6"></div>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              Showcase Your Property to a Verified, Pre-Qualified Buyer Pool
            </p>
          </motion.div>

          <div className="space-y-10">
            <motion.div 
              className="relative backdrop-blur-sm bg-gradient-to-br from-[#1a1a1a]/80 to-[#0f0f0f]/80 border border-[#2a2a2a]/50 p-12 rounded-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ borderColor: "rgba(212, 175, 55, 0.3)", y: -5 }}
            >
              <p className="text-gray-300 leading-relaxed text-lg">
                Matthew's Private Deal Platform gives sellers the ability to discreetly present their properties to an exclusive audience of accredited and institutionally qualified buyers — without public exposure or MLS saturation. Every potential buyer undergoes access verification and NDA signing prior to viewing your data, ensuring your information is safeguarded.
              </p>
            </motion.div>

            <div className="relative bg-gradient-to-br from-[#1a1a1a] via-[#151515] to-[#0f0f0f] border-2 border-[#d4af37]/30 p-12 rounded-sm">
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#d4af37]"></div>
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-[#d4af37]"></div>
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-[#d4af37]"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#d4af37]"></div>

              <h3 className="text-white mb-8 text-2xl text-center">Key Benefits</h3>
              
              <div className="space-y-6">
                <div className="group bg-black/30 border-l-4 border-[#d4af37] p-8 rounded-sm hover:border-l-8 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent border border-[#d4af37]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Lock className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Controlled Visibility</h4>
                      <p className="text-gray-400">Maintain confidentiality while ensuring your property is viewed only by legitimate investors.</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-black/30 border-l-4 border-[#d4af37] p-8 rounded-sm hover:border-l-8 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent border border-[#d4af37]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Users className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Broker-Led Marketing</h4>
                      <p className="text-gray-400">Collaborate directly with licensed agents and brokers who specialize in off-market representation.</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-black/30 border-l-4 border-[#d4af37] p-8 rounded-sm hover:border-l-8 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent border border-[#d4af37]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Database className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Data Security</h4>
                      <p className="text-gray-400">All documents and images are stored within protected access layers and shared only post-NDA.</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-black/30 border-l-4 border-[#d4af37] p-8 rounded-sm hover:border-l-8 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent border border-[#d4af37]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <LineChart className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Performance Analytics</h4>
                      <p className="text-gray-400">Gain insight into buyer engagement, showing requests, and offer interest.</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-black/30 border-l-4 border-[#d4af37] p-8 rounded-sm hover:border-l-8 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent border border-[#d4af37]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <UserCheck className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Administrative Oversight</h4>
                      <p className="text-gray-400">Our administrator verifies all user credentials, managing permissions for safety and compliance.</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed text-center mt-10 text-lg">
                For landowners, developers, or institutional sellers, this approach ensures your asset is presented with discretion, exclusivity, and professionalism.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* For Brokerages Section */}
      <motion.div 
        className="relative py-32 px-6 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)', backgroundSize: '50px 50px'}}></div>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] tracking-widest uppercase text-sm">For Brokerages</span>
              <Briefcase className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-white mb-6">🧾 For Brokerages</h2>
            <div className="h-1 w-16 mx-auto bg-[#d4af37] mb-6"></div>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              Expand Your Network and Close Deals Faster in a Regulated, Referral-Friendly Ecosystem
            </p>
          </motion.div>

          <div className="space-y-10">
            <motion.div 
              className="relative backdrop-blur-sm bg-black/40 border border-[#2a2a2a]/50 p-12 rounded-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ borderColor: "rgba(212, 175, 55, 0.3)", y: -5 }}
            >
              <p className="text-gray-300 leading-relaxed text-lg">
                Brokerages that join Matthew's Private Deal Platform benefit from a centralized, digital environment purpose-built for collaboration and compliance. Our broker referral agreement structure allows transparent, documented compensation for inter-broker deals while maintaining each firm's independence and brand integrity.
              </p>
            </motion.div>

            <div className="relative bg-gradient-to-br from-[#1a1a1a] via-[#151515] to-[#0f0f0f] border-2 border-[#d4af37]/30 p-12 rounded-sm shadow-2xl">
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#d4af37]"></div>
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-[#d4af37]"></div>
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-[#d4af37]"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#d4af37]"></div>

              <h3 className="text-white mb-8 text-2xl text-center">Key Benefits</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group bg-black/30 border-l-4 border-[#d4af37] p-8 rounded-sm hover:border-l-8 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent border border-[#d4af37]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <FileText className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Referral Integration</h4>
                      <p className="text-gray-400">Automated NDA and broker-to-broker referral documentation with digital storage.</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-black/30 border-l-4 border-[#d4af37] p-8 rounded-sm hover:border-l-8 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent border border-[#d4af37]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <TrendingUp className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Commission Protection</h4>
                      <p className="text-gray-400">System-verified referral percentages (0.5% on 3% or 1% on intermediary 6% deals).</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-black/30 border-l-4 border-[#d4af37] p-8 rounded-sm hover:border-l-8 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent border border-[#d4af37]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Users className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Deal Collaboration</h4>
                      <p className="text-gray-400">Connect with other brokerages on large or cross-market transactions without client conflict.</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-black/30 border-l-4 border-[#d4af37] p-8 rounded-sm hover:border-l-8 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent border border-[#d4af37]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Building2 className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Internal Listing Management</h4>
                      <p className="text-gray-400">Post, edit, and monitor your listings through a private broker portal.</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-black/30 border-l-4 border-[#d4af37] p-8 rounded-sm hover:border-l-8 transition-all duration-500 md:col-span-2">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent border border-[#d4af37]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <FileCheck2 className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Compliance-Ready Framework</h4>
                      <p className="text-gray-400">All referrals and NDAs are logged, timestamped, and retrievable for audit or commission proof.</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed text-center mt-10 text-lg">
                This structure encourages collaboration across brokerages while ensuring all parties are legally protected and professionally recognized for their contributions.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* For Agents Section */}
      <motion.div 
        className="relative py-32 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <UserCheck className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] tracking-widest uppercase text-sm">For Agents</span>
              <UserCheck className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-white mb-6">👔 For Agents</h2>
            <div className="h-1 w-16 mx-auto bg-[#d4af37] mb-6"></div>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              Operate Within a Trusted, Tech-Driven Ecosystem That Protects Your Listings and Commission
            </p>
          </motion.div>

          <div className="space-y-10">
            <motion.div 
              className="relative backdrop-blur-sm bg-gradient-to-br from-[#1a1a1a]/80 to-[#0f0f0f]/80 border border-[#2a2a2a]/50 p-12 rounded-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ borderColor: "rgba(212, 175, 55, 0.3)", y: -5 }}
            >
              <p className="text-gray-300 leading-relaxed text-lg">
                Licensed agents can use the platform to upload and manage their listings, share select properties with verified clients, and handle all NDA and referral documentation directly within their portal. Agents retain full control of their deals while benefiting from Matthew's streamlined workflow tools and administrative support.
              </p>
            </motion.div>

            <div className="relative bg-gradient-to-br from-[#1a1a1a] via-[#151515] to-[#0f0f0f] border-2 border-[#d4af37]/30 p-12 rounded-sm">
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#d4af37]"></div>
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-[#d4af37]"></div>
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-[#d4af37]"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#d4af37]"></div>

              <h3 className="text-white mb-8 text-2xl text-center">Key Benefits</h3>
              
              <div className="space-y-6">
                <div className="group bg-black/30 border-l-4 border-[#d4af37] p-8 rounded-sm hover:border-l-8 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent border border-[#d4af37]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Lock className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Private Agent Portal</h4>
                      <p className="text-gray-400">Access your listings, signed NDAs, referral history, and new submissions all in one place.</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-black/30 border-l-4 border-[#d4af37] p-8 rounded-sm hover:border-l-8 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent border border-[#d4af37]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Users className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Client Invitations</h4>
                      <p className="text-gray-400">Share listings with prospective buyers via secure invitation links that require client registration.</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-black/30 border-l-4 border-[#d4af37] p-8 rounded-sm hover:border-l-8 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent border border-[#d4af37]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <FileText className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="text-white mb-2">NDA Workflow Automation</h4>
                      <p className="text-gray-400">Clients and collaborating agents must digitally sign NDAs before unlocking property information.</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-black/30 border-l-4 border-[#d4af37] p-8 rounded-sm hover:border-l-8 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent border border-[#d4af37]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Bell className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="text-white mb-2">New Listing Submission</h4>
                      <p className="text-gray-400">Upload new opportunities directly to the administrator for review and posting.</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-black/30 border-l-4 border-[#d4af37] p-8 rounded-sm hover:border-l-8 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent border border-[#d4af37]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <LineChart className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Tracking & Reporting</h4>
                      <p className="text-gray-400">View which clients have signed NDAs, what listings they've viewed, and monitor engagement activity.</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed text-center mt-10 text-lg">
                This ensures transparency, accountability, and security in every deal you manage — empowering you to focus on client relationships and closing successful transactions.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Platform Principles Section */}
      <motion.div 
        className="relative py-32 px-6 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] tracking-widest uppercase text-sm">Core Values</span>
              <Shield className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-white mb-6">⚙️ Our Platform Principles</h2>
            <div className="h-1 w-16 mx-auto bg-[#d4af37]"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div 
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#d4af37]/30 p-8 rounded-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              whileHover={{ borderColor: "rgba(212, 175, 55, 0.5)", y: -5 }}
            >
              <motion.div 
                className="w-14 h-14 bg-[#d4af37]/10 rounded-lg flex items-center justify-center mb-6"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Shield className="w-7 h-7 text-[#d4af37]" />
              </motion.div>
              <h3 className="text-white text-xl mb-3">Integrity First</h3>
              <p className="text-gray-400">Every listing and referral is verified and protected through enforceable agreements.</p>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#d4af37]/30 p-8 rounded-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ borderColor: "rgba(212, 175, 55, 0.5)", y: -5 }}
            >
              <motion.div 
                className="w-14 h-14 bg-[#d4af37]/10 rounded-lg flex items-center justify-center mb-6"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Search className="w-7 h-7 text-[#d4af37]" />
              </motion.div>
              <h3 className="text-white text-xl mb-3">Transparency</h3>
              <p className="text-gray-400">Built-in digital tracking for all NDAs, listings, and communications.</p>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#d4af37]/30 p-8 rounded-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ borderColor: "rgba(212, 175, 55, 0.5)", y: -5 }}
            >
              <motion.div 
                className="w-14 h-14 bg-[#d4af37]/10 rounded-lg flex items-center justify-center mb-6"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Lock className="w-7 h-7 text-[#d4af37]" />
              </motion.div>
              <h3 className="text-white text-xl mb-3">Confidentiality</h3>
              <p className="text-gray-400">Data shared only between approved, credentialed users under binding NDAs.</p>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#d4af37]/30 p-8 rounded-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ borderColor: "rgba(212, 175, 55, 0.5)", y: -5 }}
            >
              <motion.div 
                className="w-14 h-14 bg-[#d4af37]/10 rounded-lg flex items-center justify-center mb-6"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <TrendingUp className="w-7 h-7 text-[#d4af37]" />
              </motion.div>
              <h3 className="text-white text-xl mb-3">Efficiency</h3>
              <p className="text-gray-400">Centralized dashboards reduce administrative overhead and communication delays.</p>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#d4af37]/30 p-8 rounded-sm lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ borderColor: "rgba(212, 175, 55, 0.5)", y: -5 }}
            >
              <motion.div 
                className="w-14 h-14 bg-[#d4af37]/10 rounded-lg flex items-center justify-center mb-6"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <UserCheck className="w-7 h-7 text-[#d4af37]" />
              </motion.div>
              <h3 className="text-white text-xl mb-3">Professional Exclusivity</h3>
              <p className="text-gray-400">Access restricted to accredited investors and licensed professionals only.</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Join Us Section */}
      <motion.div 
        className="relative py-32 px-6 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, #d4af37 1px, transparent 0)', backgroundSize: '50px 50px'}}></div>
        </div>
        
        <motion.div 
          className="max-w-4xl mx-auto text-center relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
            <span className="text-[#d4af37] tracking-widest uppercase text-sm">Join Us</span>
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
          </div>
          
          <h2 className="text-white mb-6">Ready to Join?</h2>
          <div className="h-1 w-16 mx-auto bg-[#d4af37] mb-8"></div>
          <p className="text-gray-300 mb-14 text-lg max-w-2xl mx-auto leading-relaxed">
            Apply for membership and gain access to the most exclusive real estate opportunities.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#d4af37] to-[#c19b2b] hover:from-[#c19b2b] hover:to-[#d4af37] text-black px-12 py-6 text-lg shadow-xl shadow-[#d4af37]/30 hover:shadow-2xl hover:shadow-[#d4af37]/50 transition-all duration-500"
              onClick={() => navigate('/apply')}
            >
              Apply for Membership
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <footer className="border-t border-[#2a2a2a] py-16 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <Logo size="lg" showTagline={true} className="mb-8" />
            <SecurityFooterBadge className="mb-8" />
            <div className="flex flex-wrap justify-center gap-10 mb-10">
              <button onClick={() => navigate('/about')} className="text-gray-400 hover:text-[#d4af37] transition-colors duration-300">About</button>
              <button onClick={() => navigate('/services')} className="text-gray-400 hover:text-[#d4af37] transition-colors duration-300">Services</button>
              <button onClick={() => navigate('/demo')} className="text-gray-400 hover:text-[#d4af37] transition-colors duration-300">Demo</button>
              <button onClick={() => navigate('/contact')} className="text-gray-400 hover:text-[#d4af37] transition-colors duration-300">Contact</button>
              <button onClick={() => navigate('/security')} className="text-gray-400 hover:text-[#d4af37] transition-colors duration-300">Security</button>
              <a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors duration-300">Privacy</a>
            </div>
          </div>
          <div className="h-px w-48 mx-auto bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent mb-8"></div>
          <p className="text-center text-gray-600">
            © 2025 PrivateLand.com. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}