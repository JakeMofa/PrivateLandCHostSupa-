import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Shield, Lock, Users, ChevronDown, Menu, X, Sparkles, ArrowRight, Eye, FileCheck, Handshake, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { motion } from 'motion/react';
import Logo from './Logo';
import { SecurityTrustBadges, SecurityFooterBadge } from './SecurityBadge';

export default function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-20 left-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-[#2a2a2a]/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-white cursor-pointer group" onClick={() => navigate('/')}>
              <span className="text-[#d4af37] transition-all duration-300 group-hover:tracking-wider">Private</span> 
              <span className="transition-all duration-300 group-hover:tracking-wide"> Land</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => navigate('/')} 
                className="text-gray-300 hover:text-[#d4af37] transition-all duration-300 relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#d4af37] group-hover:w-full transition-all duration-300"></span>
              </button>
              <button 
                onClick={() => navigate('/about')} 
                className="text-gray-300 hover:text-[#d4af37] transition-all duration-300 relative group"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#d4af37] group-hover:w-full transition-all duration-300"></span>
              </button>
              <button 
                onClick={() => navigate('/services')} 
                className="text-gray-300 hover:text-[#d4af37] transition-all duration-300 relative group"
              >
                Services
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#d4af37] group-hover:w-full transition-all duration-300"></span>
              </button>
              <button 
                onClick={() => navigate('/demo')} 
                className="text-gray-300 hover:text-[#d4af37] transition-all duration-300 relative group"
              >
                Demo
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#d4af37] group-hover:w-full transition-all duration-300"></span>
              </button>
              <button 
                onClick={() => navigate('/contact')} 
                className="text-gray-300 hover:text-[#d4af37] transition-all duration-300 relative group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#d4af37] group-hover:w-full transition-all duration-300"></span>
              </button>
              <Button
                variant="outline"
                className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-[#2a2a2a] space-y-4">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/');
                }} 
                className="block w-full text-left text-gray-300 hover:text-[#d4af37] transition-colors py-2"
              >
                Home
              </button>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/about');
                }} 
                className="block w-full text-left text-gray-300 hover:text-[#d4af37] transition-colors py-2"
              >
                About
              </button>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/services');
                }} 
                className="block w-full text-left text-gray-300 hover:text-[#d4af37] transition-colors py-2"
              >
                Services
              </button>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/demo');
                }} 
                className="block w-full text-left text-gray-300 hover:text-[#d4af37] transition-colors py-2"
              >
                Demo
              </button>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/contact');
                }} 
                className="block w-full text-left text-gray-300 hover:text-[#d4af37] transition-colors py-2"
              >
                Contact
              </button>
              <Button
                variant="outline"
                className="w-full border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/login');
                }}
              >
                Login
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1635111031688-9b13c0125d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlc3RhdGUlMjBhZXJpYWx8ZW58MXx8fHwxNzYzNjYwNzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Luxury Estate"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black"></div>
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/30 to-black/70"></div>
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] tracking-widest uppercase text-sm">World's Only Private Listing Platform</span>
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
            </div>
          </motion.div>

          <motion.h1 
            className="text-white mb-8 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover Privately Listed Real Estate
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-gray-300 mb-12 max-w-3xl mx-auto text-lg leading-relaxed">
              Welcome to the only platform in the world that offers privately listed real estate. Our mission is to connect verified buyers to private sellers without including the general problems of the public market.
            </p>
          </motion.div>

          <motion.div 
            className="flex gap-6 justify-center flex-wrap"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#d4af37] to-[#c19b2b] hover:from-[#c19b2b] hover:to-[#d4af37] text-black px-10 shadow-xl shadow-[#d4af37]/30 hover:shadow-2xl hover:shadow-[#d4af37]/50 transition-all duration-500 hover:scale-105"
              onClick={() => navigate('/apply')}
            >
              Request Access
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black px-10 transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/about')}
            >
              Learn More
            </Button>
          </motion.div>

          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-[#d4af37]/20"></div>
          <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-[#d4af37]/20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-[#d4af37]/20"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-[#d4af37]/20"></div>
        </div>

        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-[#d4af37]" />
        </motion.div>
      </div>

      {/* Ornamental Divider */}
      <motion.div 
        className="relative flex items-center justify-center py-20"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
          <div className="h-px w-32 bg-gradient-to-r from-transparent to-[#d4af37]/50"></div>
          <motion.div 
            className="w-2 h-2 rotate-45 border border-[#d4af37]"
            animate={{ rotate: [45, 90, 45] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <motion.div 
            className="w-1.5 h-1.5 bg-[#d4af37]"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <motion.div 
            className="w-2 h-2 rotate-45 border border-[#d4af37]"
            animate={{ rotate: [45, 0, 45] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <div className="h-px w-32 bg-gradient-to-l from-transparent to-[#d4af37]/50"></div>
        </div>
      </motion.div>

      {/* Mission Section */}
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
              <Eye className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] tracking-widest uppercase text-sm">Our Mission</span>
              <Eye className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-white mb-6">Discretion & Privacy</h2>
            <div className="h-1 w-16 mx-auto bg-[#d4af37]"></div>
          </motion.div>

          <motion.div 
            className="relative backdrop-blur-sm bg-gradient-to-br from-[#1a1a1a]/80 to-[#0f0f0f]/80 border border-[#2a2a2a]/50 p-16 rounded-sm text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gray-300 leading-relaxed text-lg max-w-5xl mx-auto mb-8">
              Our company offers discretion and privacy while still being able to connect people with the opportunity to buy or sell their property. We tailor our clients experience directly to them through our platform and offer a unique experience for every buyer, seller, and agent.
            </p>
            <Button 
              size="lg"
              variant="outline"
              className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300"
              onClick={() => navigate('/about')}
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
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

        <div className="max-w-7xl mx-auto relative">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] tracking-widest uppercase text-sm">What We Offer</span>
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-white mb-6">Exclusive Benefits</h2>
            <div className="h-1 w-16 mx-auto bg-[#d4af37]"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            <motion.div 
              className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] p-12 rounded-sm text-center hover:border-[#d4af37]/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#d4af37]/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/0 via-[#d4af37]/5 to-[#d4af37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm"></div>
              <div className="relative">
                <motion.div 
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 mb-8 border-2 border-[#d4af37]/30 group-hover:border-[#d4af37] group-hover:scale-110 transition-all duration-500"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Lock className="w-10 h-10 text-[#d4af37]" />
                </motion.div>
                <h3 className="text-white mb-4">Private Listings</h3>
                <p className="text-gray-400 leading-relaxed">
                  Access exclusive off-market properties not available to the general public.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] p-12 rounded-sm text-center hover:border-[#d4af37]/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#d4af37]/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/0 via-[#d4af37]/5 to-[#d4af37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm"></div>
              <div className="relative">
                <motion.div 
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 mb-8 border-2 border-[#d4af37]/30 group-hover:border-[#d4af37] group-hover:scale-110 transition-all duration-500"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <Shield className="w-10 h-10 text-[#d4af37]" />
                </motion.div>
                <h3 className="text-white mb-4">Verified Members</h3>
                <p className="text-gray-400 leading-relaxed">
                  Work with vetted professionals and accredited investors who understand discretion.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] p-12 rounded-sm text-center hover:border-[#d4af37]/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#d4af37]/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/0 via-[#d4af37]/5 to-[#d4af37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm"></div>
              <div className="relative">
                <motion.div 
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 mb-8 border-2 border-[#d4af37]/30 group-hover:border-[#d4af37] group-hover:scale-110 transition-all duration-500"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                >
                  <Users className="w-10 h-10 text-[#d4af37]" />
                </motion.div>
                <h3 className="text-white mb-4">Confidential Transactions</h3>
                <p className="text-gray-400 leading-relaxed">
                  Your privacy is paramount. All dealings are conducted with complete discretion.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* How It Works Section */}
      <div className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-4">
              <FileCheck className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] tracking-widest uppercase text-sm">The Process</span>
              <FileCheck className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-white mb-6">How Our Platform Works</h2>
            <div className="h-1 w-16 mx-auto bg-[#d4af37]"></div>
          </div>

          <div className="space-y-12">
            <div className="relative backdrop-blur-sm bg-gradient-to-br from-[#1a1a1a]/80 to-[#0f0f0f]/80 border border-[#2a2a2a]/50 p-12 rounded-sm">
              <p className="text-gray-300 leading-relaxed text-lg mb-8">
                We offer a variety of products for our clients. If you're a buyer, seller, brokerage, or a real estate agent, you have come to the right place in terms of helping yourself gain access to deals that are not available to public market.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                We focus primarily on properties that people are willing to sell but do not want the headache of dealing with a public market by providing people with a platform to display the properties information discretely to accredited investors. In order to gain access to these private listings you have to be an accredited investor and the reason for that is to offer exclusivity and a more filtered buyer client list to our sellers.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-l-4 border-[#d4af37] p-10 rounded-sm hover:border-l-8 transition-all duration-500">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37] to-[#d4af37]/50 text-black text-2xl mb-4">
                    1
                  </div>
                </div>
                <h3 className="text-white mb-4 text-xl">Buyers</h3>
                <p className="text-gray-400 leading-relaxed">
                  Request access through our services page. We'll verify your credentials and proof of funds to provide tailored property access.
                </p>
              </div>

              <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-l-4 border-[#d4af37] p-10 rounded-sm hover:border-l-8 transition-all duration-500">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37] to-[#d4af37]/50 text-black text-2xl mb-4">
                    2
                  </div>
                </div>
                <h3 className="text-white mb-4 text-xl">Sellers</h3>
                <p className="text-gray-400 leading-relaxed">
                  List your property privately through our services page. We'll connect you with verified buyers who match your criteria.
                </p>
              </div>

              <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-l-4 border-[#d4af37] p-10 rounded-sm hover:border-l-8 transition-all duration-500">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37] to-[#d4af37]/50 text-black text-2xl mb-4">
                    3
                  </div>
                </div>
                <h3 className="text-white mb-4 text-xl">Agents</h3>
                <p className="text-gray-400 leading-relaxed">
                  Access our buyers agent portal to find exclusive deals for your clients and expand your network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Access Control Section */}
      <div className="relative py-32 px-6 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)', backgroundSize: '50px 50px'}}></div>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] tracking-widest uppercase text-sm">Tailored Access</span>
              <CheckCircle className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-white mb-6">Threshold-Based Access</h2>
            <div className="h-1 w-16 mx-auto bg-[#d4af37]"></div>
          </div>

          <div className="space-y-8">
            <div className="relative backdrop-blur-sm bg-black/40 border-l-4 border-[#d4af37] p-14 rounded-sm">
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                Our partnerships with our clients are of dire importance to us and we recognize the importance of discretion and privacy when it comes to these deals. Therefore, there is a threshold of access to each individual client.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                For example, if a buyer client has access to the platform and they're approved for five million dollars (proof of funds is mandatory upon platform access), they will only be able to view properties up to that five million dollar price tag. This ensures that only those with the capital to purchase a property are the ones able to view the property.
              </p>
            </div>

            <div className="relative backdrop-blur-sm bg-black/40 border-l-4 border-[#d4af37] p-14 rounded-sm">
              <h3 className="text-white mb-6 text-2xl">Off-Platform Private Sales</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                We also work with people who want their property sold but don't want it listed anywhere and want a more authentic way of sourcing a buyer for their property. This means we keep the sellers property off the platform and we listen to buyers request to what they're looking for and only present the property to people that match the description of the sellers property. This allows the seller a more tailored private experience while also being able to find a buyer that is looking for exactly what they have.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Code of Conduct Section */}
      <div className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-4">
              <Handshake className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] tracking-widest uppercase text-sm">Our Standards</span>
              <Handshake className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-white mb-6">Our Code of Conduct</h2>
            <div className="h-1 w-16 mx-auto bg-[#d4af37]"></div>
          </div>

          <div className="relative bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-black border-4 border-[#d4af37]/40 p-20 rounded-sm text-center shadow-2xl">
            <div className="absolute -top-2 -left-2 w-16 h-16 border-t-4 border-l-4 border-[#d4af37]"></div>
            <div className="absolute -top-2 -right-2 w-16 h-16 border-t-4 border-r-4 border-[#d4af37]"></div>
            <div className="absolute -bottom-2 -left-2 w-16 h-16 border-b-4 border-l-4 border-[#d4af37]"></div>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-4 border-r-4 border-[#d4af37]"></div>
            
            <div className="relative">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#d4af37]/30 to-[#d4af37]/10 mb-10 border-4 border-[#d4af37]/50">
                <Shield className="w-12 h-12 text-[#d4af37]" />
              </div>
              <p className="text-gray-300 leading-relaxed text-lg mb-8 max-w-3xl mx-auto">
                Our code of conduct is essential to how we operate our company. It is very simple, following the standard of respect, and privacy maintains that each member follows the same core ethical values.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg max-w-3xl mx-auto">
                We ensure that our clients information remains private and the details of their property are only accessed by those who are qualified and want the information. As our platform continues to grow we maintain our policy of privacy through non-disclosure agreements and discretionary actions for both buyer and seller clients.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Broker Partnership Section */}
      <div className="relative py-32 px-6 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] tracking-widest uppercase text-sm">Professional Network</span>
              <Users className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-white mb-6">Broker Partnerships</h2>
            <div className="h-1 w-16 mx-auto bg-[#d4af37] mb-8"></div>
            <p className="text-gray-300 text-lg max-w-4xl mx-auto leading-relaxed">
              Our partnership with our Brokers are very important to us as we partner with them to find more private listings and value the trust they have in us to list their property. If you have any questions about how our operations work please feel free to contact us at anytime to talk to a representative on how we go about helping you to the best of our ability.
            </p>
          </div>

          <div className="text-center">
            <p className="text-[#d4af37] text-xl mb-10 italic">
              We look forward to working with you.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#d4af37] to-[#c19b2b] hover:from-[#c19b2b] hover:to-[#d4af37] text-black px-12 shadow-xl shadow-[#d4af37]/30 hover:shadow-2xl hover:shadow-[#d4af37]/50 transition-all duration-500 hover:scale-105"
              onClick={() => navigate('/contact')}
            >
              Contact Us
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="relative backdrop-blur-sm bg-gradient-to-br from-[#1a1a1a]/80 to-[#0f0f0f]/80 border-2 border-[#d4af37]/40 p-20 rounded-sm">
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] tracking-widest uppercase text-sm">Get Started</span>
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-white mb-6">Ready to Access Private Listings?</h2>
            <div className="h-1 w-16 mx-auto bg-[#d4af37] mb-10"></div>
            <p className="text-gray-300 mb-12 text-lg max-w-2xl mx-auto">
              Join our exclusive network and gain access to the most prestigious real estate opportunities unavailable to the public market.
            </p>
            <div className="flex gap-6 justify-center flex-wrap">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#d4af37] to-[#c19b2b] hover:from-[#c19b2b] hover:to-[#d4af37] text-black px-12 shadow-xl shadow-[#d4af37]/30 hover:shadow-2xl hover:shadow-[#d4af37]/50 transition-all duration-500 hover:scale-105"
                onClick={() => navigate('/apply')}
              >
                Apply for Access
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black px-12 transition-all duration-300"
                onClick={() => navigate('/services')}
              >
                View Services
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Trust Section */}
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

        <div className="max-w-7xl mx-auto relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] tracking-widest uppercase text-sm">🔒 Secure Access Portal</span>
              <Shield className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-white mb-6">Bank-Grade Security & Privacy</h2>
            <div className="h-1 w-16 mx-auto bg-[#d4af37] mb-8"></div>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
              Your trust is our foundation. We employ enterprise-grade security measures used by global financial institutions to protect your data and ensure complete confidentiality.
            </p>
          </motion.div>

          {/* Security Trust Badges */}
          <SecurityTrustBadges className="mb-12" />

          {/* Security Highlights */}
          <motion.div 
            className="grid md:grid-cols-2 gap-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-8 hover:border-[#d4af37]/50 transition-all">
              <h3 className="text-white mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d4af37]/10 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#d4af37]" />
                </div>
                Data Encryption & Monitoring
              </h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                  <span>AES-256 encryption for all data at rest</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                  <span>TLS 1.3 certified end-to-end encryption</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                  <span>24/7 monitoring with Splunk & Datadog</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                  <span>Instant threat detection & alerts</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-8 hover:border-[#d4af37]/50 transition-all">
              <h3 className="text-white mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d4af37]/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#d4af37]" />
                </div>
                Advanced Protection & Compliance
              </h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                  <span>AI-powered fraud pattern detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                  <span>DDoS protection via CloudFlare & AWS Shield</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                  <span>SOC 2 Type II certified data centers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                  <span>Verified Accredited Investor Platform</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* CTA to Security Page */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black px-12 transition-all duration-300"
              onClick={() => navigate('/security')}
            >
              <Shield className="w-5 h-5 mr-2" />
              View Full Security Details
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
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