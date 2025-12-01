import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Shield, Award, Target, ArrowLeft, Users, Lock, Handshake, Search, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import Logo from './Logo';
import { SecurityFooterBadge } from './SecurityBadge';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px]"
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
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px]"
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

      {/* Hero Section */}
      <motion.div 
        className="relative h-[85vh] flex items-center justify-center overflow-hidden"
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
              rotate: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBvZmZpY2V8ZW58MXx8fHwxNzYzNjYwNzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="PrivateLand.com"
              className="w-full h-full object-cover opacity-20 scale-105"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-[#0a0a0a]"></div>
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60"></div>
        </motion.div>

        <motion.div 
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Button
            variant="ghost"
            className="mb-12 text-gray-400 hover:text-[#d4af37] hover:bg-transparent transition-all duration-300"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <motion.div 
            className="mb-12 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-transparent to-[#d4af37]/50"></div>
            <div className="inline-block px-8 py-3 border-2 border-[#d4af37]/40 rounded-sm mb-8 backdrop-blur-sm bg-black/30 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/5 via-[#d4af37]/10 to-[#d4af37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="text-[#d4af37] tracking-wider relative">PrivateLand</span><span className="text-white relative">.com</span>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-white mb-8 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <span className="block mb-2">About Us</span>
            <motion.span 
              className="block h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 1, delay: 1.2 }}
            ></motion.span>
          </motion.h1>
          <motion.p 
            className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            A platform built by agents, for buyers and sellers who value respect, discretion, and privacy
          </motion.p>
          
          {/* Decorative corners */}
          <motion.div 
            className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#d4af37]/20"
            initial={{ opacity: 0, x: -20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          ></motion.div>
          <motion.div 
            className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-[#d4af37]/20"
            initial={{ opacity: 0, x: 20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-[#d4af37]/20"
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 1.7 }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#d4af37]/20"
            initial={{ opacity: 0, x: 20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
          ></motion.div>
        </motion.div>
      </motion.div>

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

      {/* Who Are We Section */}
      <div className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 relative">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] tracking-widest uppercase text-sm">Our Story</span>
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-white mb-6">Who Are We?</h2>
            <div className="h-1 w-16 mx-auto bg-[#d4af37]"></div>
          </div>

          <div className="space-y-12">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#d4af37]/50 to-transparent"></div>
              <p className="text-gray-300 leading-relaxed text-center max-w-5xl mx-auto text-lg backdrop-blur-sm bg-gradient-to-br from-[#1a1a1a]/50 to-[#0f0f0f]/50 border border-[#2a2a2a]/50 p-12 rounded-sm">
                PrivateLand is a company run by agents for buyers and sellers who value respect, discretion and privacy when it comes to the process of buying and selling real estate. We offer a sense of security and opportunity to our members that allows them to search for and acquire properties that aren't available to the public market.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10 py-16">
              <motion.div 
                className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] p-12 rounded-sm hover:border-[#d4af37]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#d4af37]/10"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-[#d4af37]/30 transition-all duration-500 group-hover:border-[#d4af37]"></div>
                <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-[#d4af37]/30 transition-all duration-500 group-hover:border-[#d4af37]"></div>
                
                <motion.div 
                  className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 mb-8 border border-[#d4af37]/30 group-hover:scale-110 transition-transform duration-500"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Users className="w-10 h-10 text-[#d4af37]" />
                </motion.div>
                <h3 className="text-white mb-4 text-xl">Exclusive Network</h3>
                <p className="text-gray-400 leading-relaxed">
                  We source deals through our own brokerage and partner with many other brokerages and agents around the country to ensure we have constant deal flow of private listings available to our clients.
                </p>
              </motion.div>

              <motion.div 
                className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] p-12 rounded-sm hover:border-[#d4af37]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#d4af37]/10"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-[#d4af37]/30 transition-all duration-500 group-hover:border-[#d4af37]"></div>
                <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-[#d4af37]/30 transition-all duration-500 group-hover:border-[#d4af37]"></div>
                
                <motion.div 
                  className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 mb-8 border border-[#d4af37]/30 group-hover:scale-110 transition-transform duration-500"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                >
                  <Handshake className="w-10 h-10 text-[#d4af37]" />
                </motion.div>
                <h3 className="text-white mb-4 text-xl">Building Relationships</h3>
                <p className="text-gray-400 leading-relaxed">
                  The goal of this platform is not only to give people a chance to buy and sell land but also to create opportunities and relationships with like-minded individuals in regards to business.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Ornamental Divider */}
      <div className="relative flex items-center justify-center py-16">
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="h-px w-96 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent"></div>
        </div>
      </div>

      {/* Why Private Listings Section */}
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
              <Lock className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] tracking-widest uppercase text-sm">Our Approach</span>
              <Lock className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-white mb-6">Why Private Listings?</h2>
            <div className="h-1 w-16 mx-auto bg-[#d4af37] mb-6"></div>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              Understanding the value of discretion in high-value real estate transactions
            </p>
          </motion.div>

          <div className="space-y-10">
            <motion.div 
              className="group relative bg-gradient-to-r from-black/40 via-black/60 to-black/40 backdrop-blur-sm border-l-4 border-[#d4af37] p-14 rounded-sm hover:border-l-8 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-[#d4af37]/20"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-8">
                <div className="flex-shrink-0 relative">
                  <motion.div 
                    className="absolute inset-0 bg-[#d4af37]/20 blur-xl group-hover:blur-2xl transition-all duration-500"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  ></motion.div>
                  <motion.div 
                    className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37] to-[#d4af37]/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Lock className="w-8 h-8 text-black" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-white mb-5 text-2xl">For Sellers</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    The reason why we have built this platform is to allow people the chance to sell or buy a property with the respect and privacy it deserves while dealing with a verified client that respects the process. Listing your property with us ensures not only your security but also a guarantee that your property shall not be discussed with anyone that has no reason to access your information.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="group relative bg-gradient-to-r from-black/40 via-black/60 to-black/40 backdrop-blur-sm border-l-4 border-[#d4af37] p-14 rounded-sm hover:border-l-8 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-[#d4af37]/20"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-8">
                <div className="flex-shrink-0 relative">
                  <motion.div 
                    className="absolute inset-0 bg-[#d4af37]/20 blur-xl group-hover:blur-2xl transition-all duration-500"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  ></motion.div>
                  <motion.div 
                    className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37] to-[#d4af37]/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                    animate={{ rotate: [0, -5, 0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <Search className="w-8 h-8 text-black" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-white mb-5 text-2xl">For Buyers</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    The main reason why someone should source properties through our platform is very simple, and that is to have information that not a lot of other people have based on what they're specifically looking for. Access opportunities before they hit the public market and work with verified professionals who understand discretion.
                  </p>
                </div>
              </div>
            </motion.div>
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
              <Shield className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] tracking-widest uppercase text-sm">For Professionals</span>
              <Shield className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-white mb-6">For Real Estate Agents</h2>
            <div className="h-1 w-16 mx-auto bg-[#d4af37] mb-6"></div>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              Partner with us to protect your clients and expand opportunities
            </p>
          </motion.div>

          <motion.div 
            className="relative bg-gradient-to-br from-[#1a1a1a] via-[#151515] to-[#0f0f0f] border-2 border-[#d4af37]/30 p-16 rounded-sm shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#d4af37]"
              animate={{ x: [-2, 2, -2], y: [-2, 2, -2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
            <motion.div 
              className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-[#d4af37]"
              animate={{ x: [2, -2, 2], y: [-2, 2, -2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            ></motion.div>
            <motion.div 
              className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-[#d4af37]"
              animate={{ x: [-2, 2, -2], y: [2, -2, 2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            ></motion.div>
            <motion.div 
              className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#d4af37]"
              animate={{ x: [2, -2, 2], y: [2, -2, 2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            ></motion.div>
            
            <div className="mb-12">
              <h3 className="text-white mb-8 text-2xl text-center">Why List Your Client's Property With Us?</h3>
              <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                <motion.p 
                  className="pl-6 border-l-2 border-[#d4af37]/50"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  As an agent you legally have to put your client first to protect their privacy. Even though we may not be your brokerage, we care just as much about the same principle and value the security of their information.
                </motion.p>
                <motion.p 
                  className="pl-6 border-l-2 border-[#d4af37]/50"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  By listing with us you're not only ensuring their security but also introducing your seller to an exclusive buyer client list that knows what they want in terms of investment, but also has a legal obligation to abide by our code of conduct standards.
                </motion.p>
              </div>
            </div>

            <div className="pt-12 border-t border-[#d4af37]/20">
              <div className="grid md:grid-cols-3 gap-10">
                <motion.div 
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.div 
                    className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent border-2 border-[#d4af37]/40 mb-6 group-hover:border-[#d4af37] group-hover:scale-110 transition-all duration-500"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Shield className="w-9 h-9 text-[#d4af37]" />
                  </motion.div>
                  <h4 className="text-white mb-3 text-lg">Client Security</h4>
                  <p className="text-gray-500">Protected information</p>
                </motion.div>
                <motion.div 
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.div 
                    className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent border-2 border-[#d4af37]/40 mb-6 group-hover:border-[#d4af37] group-hover:scale-110 transition-all duration-500"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <Users className="w-9 h-9 text-[#d4af37]" />
                  </motion.div>
                  <h4 className="text-white mb-3 text-lg">Verified Buyers</h4>
                  <p className="text-gray-500">Exclusive client list</p>
                </motion.div>
                <motion.div 
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <motion.div 
                    className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent border-2 border-[#d4af37]/40 mb-6 group-hover:border-[#d4af37] group-hover:scale-110 transition-all duration-500"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  >
                    <Award className="w-9 h-9 text-[#d4af37]" />
                  </motion.div>
                  <h4 className="text-white mb-3 text-lg">Code of Conduct</h4>
                  <p className="text-gray-500">Professional standards</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Values Section */}
      <div className="relative py-32 px-6 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)', backgroundSize: '50px 50px'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] tracking-widest uppercase text-sm">What Drives Us</span>
              <Target className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-white mb-6">Our Core Values</h2>
            <div className="h-1 w-16 mx-auto bg-[#d4af37]"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="group relative bg-black/40 backdrop-blur-sm border border-[#2a2a2a] p-12 rounded-sm text-center hover:border-[#d4af37]/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#d4af37]/20">
              <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/0 via-[#d4af37]/5 to-[#d4af37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 mb-8 border-2 border-[#d4af37]/30 group-hover:border-[#d4af37] group-hover:scale-110 transition-all duration-500">
                  <Shield className="w-12 h-12 text-[#d4af37]" />
                </div>
                <h3 className="text-white mb-5 text-xl">Discretion</h3>
                <p className="text-gray-400 leading-relaxed">
                  Your privacy is our top priority. All transactions and communications are handled with the utmost confidentiality.
                </p>
              </div>
            </div>

            <div className="group relative bg-black/40 backdrop-blur-sm border border-[#2a2a2a] p-12 rounded-sm text-center hover:border-[#d4af37]/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#d4af37]/20">
              <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/0 via-[#d4af37]/5 to-[#d4af37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 mb-8 border-2 border-[#d4af37]/30 group-hover:border-[#d4af37] group-hover:scale-110 transition-all duration-500">
                  <Award className="w-12 h-12 text-[#d4af37]" />
                </div>
                <h3 className="text-white mb-5 text-xl">Respect</h3>
                <p className="text-gray-400 leading-relaxed">
                  We place high value on the timeline of our clients above all to serve you the best way we know how on your terms.
                </p>
              </div>
            </div>

            <div className="group relative bg-black/40 backdrop-blur-sm border border-[#2a2a2a] p-12 rounded-sm text-center hover:border-[#d4af37]/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#d4af37]/20">
              <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/0 via-[#d4af37]/5 to-[#d4af37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 mb-8 border-2 border-[#d4af37]/30 group-hover:border-[#d4af37] group-hover:scale-110 transition-all duration-500">
                  <Target className="w-12 h-12 text-[#d4af37]" />
                </div>
                <h3 className="text-white mb-5 text-xl">Exclusivity</h3>
                <p className="text-gray-400 leading-relaxed">
                  Access to off-market listings and opportunities unavailable through traditional channels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Commitment Section */}
      <div className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-black border-4 border-[#d4af37]/40 p-20 rounded-sm text-center shadow-2xl">
            {/* Decorative corner accents */}
            <div className="absolute -top-2 -left-2 w-16 h-16 border-t-4 border-l-4 border-[#d4af37]"></div>
            <div className="absolute -top-2 -right-2 w-16 h-16 border-t-4 border-r-4 border-[#d4af37]"></div>
            <div className="absolute -bottom-2 -left-2 w-16 h-16 border-b-4 border-l-4 border-[#d4af37]"></div>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-4 border-r-4 border-[#d4af37]"></div>
            
            <div className="relative">
              <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-[#d4af37]/30 to-[#d4af37]/10 mb-10 border-4 border-[#d4af37]/50 shadow-lg shadow-[#d4af37]/30">
                <Handshake className="w-14 h-14 text-[#d4af37]" />
              </div>
              <h2 className="text-white mb-8 text-3xl">Our Commitment to You</h2>
              <div className="h-1 w-24 mx-auto bg-[#d4af37] mb-10"></div>
              <p className="text-gray-300 leading-relaxed mb-10 text-lg max-w-3xl mx-auto">
                We are grateful for the opportunity our clients give us by allowing us access and permission to discuss their property. Our code of conduct is a requirement in all business dealings to ensure our clients want to maintain a relationship with us in the future as much as we want to with them.
              </p>
              <div className="relative inline-block">
                <div className="absolute -left-6 top-0 text-[#d4af37] text-6xl opacity-30">"</div>
                <div className="absolute -right-6 bottom-0 text-[#d4af37] text-6xl opacity-30">"</div>
                <p className="text-[#d4af37] italic text-xl px-12">
                  We place high value on the timeline of our clients above all to serve you the best way we know how on your terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-32 px-6 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-[#d4af37]/50"></div>
          
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
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-[#d4af37] to-[#c19b2b] hover:from-[#c19b2b] hover:to-[#d4af37] text-black px-12 py-6 text-lg shadow-xl shadow-[#d4af37]/30 hover:shadow-2xl hover:shadow-[#d4af37]/50 transition-all duration-500 hover:scale-105"
            onClick={() => navigate('/apply')}
          >
            Apply for Membership
          </Button>
        </div>
      </div>

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