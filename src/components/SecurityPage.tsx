import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { 
  ArrowLeft, 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  Server, 
  AlertTriangle, 
  CheckCircle2,
  Zap,
  FileText,
  Users,
  Globe,
  Activity,
  Bell
} from 'lucide-react';
import { SecurityTrustBadges, SecurityFooterBadge } from './SecurityBadge';
import { motion } from 'motion/react';
import Logo from './Logo';

export default function SecurityPage() {
  const navigate = useNavigate();

  const securityFeatures = [
    {
      icon: Lock,
      title: "Encryption Standards",
      description: "All data encrypted with AES-256 encryption at rest and TLS 1.3 in transit",
      details: [
        "End-to-end encryption for all communications",
        "Zero-knowledge architecture for sensitive documents",
        "Hardware Security Modules (HSM) for key management",
        "Perfect Forward Secrecy (PFS) enabled"
      ],
      status: "Active",
      color: "text-green-500"
    },
    {
      icon: Eye,
      title: "24/7 Monitoring & Detection",
      description: "Continuous surveillance with instant threat alerts and response",
      details: [
        "Real-time log analysis with Splunk Enterprise",
        "Infrastructure monitoring via Datadog",
        "Automated vulnerability scanning daily",
        "API monitoring and rate limiting",
        "Instant security incident alerts"
      ],
      status: "Active",
      color: "text-[#d4af37]"
    },
    {
      icon: Zap,
      title: "AI Threat Analysis",
      description: "Machine learning algorithms detect and prevent security threats in real-time",
      details: [
        "Fraud pattern detection and prevention",
        "Behavioral anomaly detection",
        "Automated threat intelligence feeds",
        "Instant threat response protocols",
        "Predictive security analytics"
      ],
      status: "Active",
      color: "text-purple-500"
    },
    {
      icon: Shield,
      title: "DDoS Protection",
      description: "Enterprise-grade protection against distributed denial of service attacks",
      details: [
        "CloudFlare Enterprise WAF (Web Application Firewall)",
        "AWS Shield Advanced protection",
        "Rate limiting and traffic filtering",
        "99.99% uptime SLA guarantee",
        "Automatic attack mitigation"
      ],
      status: "Active",
      color: "text-blue-500"
    },
    {
      icon: Users,
      title: "Access & Identity Management",
      description: "Multi-factor authentication and role-based access controls",
      details: [
        "Multi-factor authentication (MFA) required",
        "Biometric authentication support",
        "Role-based access control (RBAC)",
        "Single Sign-On (SSO) integration",
        "Session management and timeout controls"
      ],
      status: "Active",
      color: "text-cyan-500"
    },
    {
      icon: Database,
      title: "Data Storage & Regions",
      description: "SOC 2 compliant data centers with geographic redundancy",
      details: [
        "Multi-region data replication",
        "Geographic data residency compliance",
        "Automated backup every 6 hours",
        "Point-in-time recovery capabilities",
        "99.9% data durability guarantee"
      ],
      status: "Active",
      color: "text-orange-500"
    },
    {
      icon: AlertTriangle,
      title: "Data Breach Response",
      description: "Comprehensive incident response plan with immediate notification protocols",
      details: [
        "72-hour breach notification commitment",
        "Dedicated incident response team",
        "Forensic analysis and reporting",
        "User notification automation",
        "Regulatory compliance reporting"
      ],
      status: "Active",
      color: "text-red-500"
    },
    {
      icon: FileText,
      title: "Data Handling & Retention",
      description: "Strict data lifecycle management and privacy controls",
      details: [
        "Data minimization principles",
        "Automatic PII redaction",
        "7-year data retention for compliance",
        "Secure data deletion protocols",
        "GDPR and CCPA compliant"
      ],
      status: "Active",
      color: "text-indigo-500"
    },
    {
      icon: Globe,
      title: "Data Leakage Prevention",
      description: "Advanced DLP systems prevent unauthorized data exfiltration",
      details: [
        "Network traffic analysis and filtering",
        "Document watermarking and tracking",
        "Endpoint data protection",
        "Email and file transfer monitoring",
        "Insider threat detection"
      ],
      status: "Active",
      color: "text-pink-500"
    }
  ];

  const certifications = [
    { name: "SOC 2 Type II", icon: Shield },
    { name: "ISO 27001", icon: CheckCircle2 },
    { name: "GDPR Compliant", icon: FileText },
    { name: "CCPA Compliant", icon: Users },
    { name: "PCI DSS", icon: Lock },
    { name: "HIPAA Ready", icon: Database }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-b border-[#2a2a2a] sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-[#2a2a2a] hover:text-[#d4af37]"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="cursor-pointer" onClick={() => navigate('/')}>
              <Logo size="sm" showTagline={false} />
            </div>
          </div>
          <Button
            className="bg-[#d4af37] text-black hover:bg-[#d4af37]/90"
            onClick={() => navigate('/')}
          >
            Return Home
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 border-b border-[#2a2a2a]">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-green-400 text-sm">All Security Systems Active</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white mb-6"
          >
            Bank-Grade Security Infrastructure
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-3xl mx-auto mb-12"
          >
            Your privacy and security are our highest priorities. PrivateLand employs enterprise-grade security measures used by financial institutions worldwide.
          </motion.p>

          <SecurityTrustBadges />
        </div>
      </section>

      {/* Real-time Security Status */}
      <section className="px-6 py-12 border-b border-[#2a2a2a] bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white flex items-center gap-2">
                <Activity className="w-6 h-6 text-[#d4af37]" />
                Real-Time Security Status
              </h2>
              <span className="text-xs text-gray-500">Updated every 30 seconds</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">System Status</span>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-2xl text-white mb-1">100%</div>
                <div className="text-xs text-gray-500">All systems operational</div>
              </div>

              <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Threats Blocked</span>
                  <Shield className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div className="text-2xl text-white mb-1">47,392</div>
                <div className="text-xs text-gray-500">In the last 24 hours</div>
              </div>

              <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Uptime</span>
                  <Activity className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-2xl text-white mb-1">99.99%</div>
                <div className="text-xs text-gray-500">Last 30 days</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features Grid */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white text-center mb-12">
            Comprehensive Security Framework
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#d4af37]/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  <div className={`flex items-center gap-1 text-xs ${feature.color}`}>
                    <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                    {feature.status}
                  </div>
                </div>
                
                <h3 className="text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{feature.description}</p>
                
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-500">
                      <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="px-6 py-16 border-t border-[#2a2a2a] bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white text-center mb-12">
            Industry Certifications & Compliance
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 text-center hover:border-[#d4af37]/50 transition-all"
              >
                <cert.icon className="w-8 h-8 text-[#d4af37] mx-auto mb-3" />
                <div className="text-white text-sm">{cert.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Statement */}
      <section className="px-6 py-16 border-t border-[#2a2a2a]">
        <div className="max-w-4xl mx-auto text-center">
          <Lock className="w-12 h-12 text-[#d4af37] mx-auto mb-6" />
          <h2 className="text-white mb-6">
            Your Trust is Our Foundation
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            We understand that high-net-worth individuals and accredited investors require the highest levels of security and discretion. Our infrastructure is built to the same standards used by global financial institutions, ensuring your data remains private and secure at all times.
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#d4af37]" />
              <span>Instant security alerts</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Proactive threat prevention</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-500" />
              <span>End-to-end encryption</span>
            </div>
          </div>
        </div>
      </section>

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
