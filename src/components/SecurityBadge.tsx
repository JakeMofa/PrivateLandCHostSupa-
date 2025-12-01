import { Shield, Lock, Eye, Zap, Database, Server, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface SecurityBadgeProps {
  type?: 'compact' | 'detailed' | 'inline';
  variant?: 'primary' | 'secondary' | 'success';
  className?: string;
}

export function SecurityBadge({ type = 'compact', variant = 'primary', className = '' }: SecurityBadgeProps) {
  const baseClasses = "flex items-center gap-2 px-3 py-1.5 rounded-md border";
  
  const variantClasses = {
    primary: "bg-[#d4af37]/5 border-[#d4af37]/30 text-[#d4af37]",
    secondary: "bg-green-500/5 border-green-500/30 text-green-400",
    success: "bg-blue-500/5 border-blue-500/30 text-blue-400",
  };

  if (type === 'inline') {
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs ${className}`}>
        <Lock className="w-3 h-3 text-[#d4af37]" />
        <span className="text-[#d4af37]">Secure Access Portal</span>
      </span>
    );
  }

  if (type === 'compact') {
    return (
      <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
        <Shield className="w-4 h-4" />
        <span className="text-xs whitespace-nowrap">🔒 TLS Encrypted</span>
      </div>
    );
  }

  return null;
}

export function SecurityStatusBar({ className = '' }: { className?: string }) {
  const securityFeatures = [
    { icon: Lock, label: "256-bit Encryption", status: "active" },
    { icon: Eye, label: "24/7 Monitoring", status: "active" },
    { icon: Shield, label: "DDoS Protected", status: "active" },
    { icon: Zap, label: "AI Threat Detection", status: "active" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-4 ${className}`}
    >
      <div className="flex items-center justify-between gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm text-gray-300">All Systems Secure</span>
        </div>
        
        <div className="flex items-center gap-4 flex-wrap">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <feature.icon className="w-4 h-4 text-[#d4af37]" />
              <span className="text-xs text-gray-400">{feature.label}</span>
              <CheckCircle2 className="w-3 h-3 text-green-500" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function SecurityTrustBadges({ layout = 'horizontal', className = '' }: { layout?: 'horizontal' | 'vertical', className?: string }) {
  const badges = [
    {
      icon: Shield,
      title: "Bank-Grade Security",
      subtitle: "AES-256 Encryption"
    },
    {
      icon: Eye,
      title: "24/7 Monitoring",
      subtitle: "Splunk • Datadog"
    },
    {
      icon: Lock,
      title: "TLS 1.3 Certified",
      subtitle: "End-to-End Encrypted"
    },
    {
      icon: Zap,
      title: "AI Threat Analysis",
      subtitle: "Real-time Protection"
    },
    {
      icon: Server,
      title: "DDoS Protection",
      subtitle: "CloudFlare • AWS Shield"
    },
    {
      icon: Database,
      title: "Secure Data Centers",
      subtitle: "SOC 2 Compliant"
    }
  ];

  const layoutClasses = layout === 'horizontal' 
    ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'
    : 'grid grid-cols-1 sm:grid-cols-2 gap-4';

  return (
    <div className={`${layoutClasses} ${className}`}>
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 hover:border-[#d4af37]/50 transition-all"
        >
          <badge.icon className="w-6 h-6 text-[#d4af37] mb-2" />
          <h4 className="text-white text-sm mb-1">{badge.title}</h4>
          <p className="text-gray-500 text-xs">{badge.subtitle}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function SecurityFooterBadge({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 ${className}`}>
      <div className="flex items-center gap-1.5">
        <Lock className="w-3 h-3 text-green-500" />
        <span>TLS 1.3 Encrypted</span>
      </div>
      <span className="text-gray-700">•</span>
      <div className="flex items-center gap-1.5">
        <Eye className="w-3 h-3 text-[#d4af37]" />
        <span>24/7 Monitored</span>
      </div>
      <span className="text-gray-700">•</span>
      <div className="flex items-center gap-1.5">
        <Shield className="w-3 h-3 text-blue-500" />
        <span>DDoS Protected</span>
      </div>
      <span className="text-gray-700">•</span>
      <div className="flex items-center gap-1.5">
        <Zap className="w-3 h-3 text-purple-500" />
        <span>AI Threat Detection</span>
      </div>
      <span className="text-gray-700">•</span>
      <div className="flex items-center gap-1.5">
        <CheckCircle2 className="w-3 h-3 text-green-500" />
        <span>Verified Accredited Investor Platform</span>
      </div>
    </div>
  );
}
