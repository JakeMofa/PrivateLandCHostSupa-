import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Mail, Phone, MapPin, Clock, ArrowLeft, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import Logo from './Logo';
import { SecurityFooterBadge } from './SecurityBadge';

export default function ContactPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
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
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] max-w-lg w-full">
            <CardContent className="pt-12 pb-12 text-center">
              <motion.div 
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#d4af37]/10 mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <CheckCircle className="w-12 h-12 text-[#d4af37]" />
              </motion.div>
              <h2 className="text-white mb-4">Message Sent</h2>
              <p className="text-gray-400 mb-8">
                Thank you for contacting us. We will respond to your inquiry within 24 hours.
              </p>
              <Button
                className="bg-[#d4af37] hover:bg-[#c19b2b] text-black"
                onClick={() => navigate('/')}
              >
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

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

      {/* Hero Section */}
      <motion.div 
        className="relative h-[40vh] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjM2NjA3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Contact Us"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0a0a0a]"></div>
        </motion.div>

        <motion.div 
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Button
            variant="ghost"
            className="mb-8 text-gray-400 hover:text-[#d4af37] hover:bg-transparent"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-white mb-6">Contact Us</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Get in touch with our team for inquiries about membership or listings
          </p>
        </motion.div>
      </motion.div>

      {/* Contact Information & Form */}
      <div className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h2 className="text-white mb-6">Get in Touch</h2>
                <p className="text-gray-400">
                  For inquiries about membership, property listings, or any other questions, our team is here to assist you.
                </p>
              </div>

              <div className="space-y-6">
                <motion.div 
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <motion.div 
                    className="flex-shrink-0 w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center"
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Mail className="w-5 h-5 text-[#d4af37]" />
                  </motion.div>
                  <div>
                    <h3 className="text-white mb-1">Email</h3>
                    <p className="text-gray-400">contact@privateestategroup.com</p>
                    <p className="text-gray-500">Response within 24 hours</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.div 
                    className="flex-shrink-0 w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Phone className="w-5 h-5 text-[#d4af37]" />
                  </motion.div>
                  <div>
                    <h3 className="text-white mb-1">Phone</h3>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                    <p className="text-gray-500">Monday - Friday, 9AM - 6PM EST</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <motion.div 
                    className="flex-shrink-0 w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <MapPin className="w-5 h-5 text-[#d4af37]" />
                  </motion.div>
                  <div>
                    <h3 className="text-white mb-1">Office</h3>
                    <p className="text-gray-400">By Appointment Only</p>
                    <p className="text-gray-500">Multiple locations worldwide</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.div 
                    className="flex-shrink-0 w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Clock className="w-5 h-5 text-[#d4af37]" />
                  </motion.div>
                  <div>
                    <h3 className="text-white mb-1">Business Hours</h3>
                    <p className="text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                    <p className="text-gray-400">Saturday: 10:00 AM - 4:00 PM EST</p>
                    <p className="text-gray-400">Sunday: Closed</p>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] p-8 rounded-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="text-white mb-3">Need Immediate Assistance?</h3>
                <p className="text-gray-400 mb-6">
                  For urgent matters or time-sensitive property inquiries, please call our direct line or submit an application for priority processing.
                </p>
                <Button 
                  variant="outline" 
                  className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                  onClick={() => navigate('/apply')}
                >
                  Apply for Priority Access
                </Button>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
                <CardHeader>
                  <CardTitle className="text-white">Send us a Message</CardTitle>
                  <CardDescription className="text-gray-400">
                    Fill out the form below and we'll get back to you shortly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="What is this regarding?"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="bg-black/50 border-[#2a2a2a] text-white placeholder:text-gray-600"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-300">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="bg-black/50 border-[#2a2a2a] text-white placeholder:text-gray-600 min-h-[150px]"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#d4af37] hover:bg-[#c19b2b] text-black"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#2a2a2a] py-16 px-6">
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