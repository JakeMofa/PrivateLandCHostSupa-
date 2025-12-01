import svgPaths from "../imports/svg-w3pa8wxfqw";

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showTagline = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-12 w-24',  // For compact headers
    md: 'h-16 w-32',  // For main navigation
    lg: 'h-20 w-40',  // For footer/hero
  };

  const textSizes = {
    sm: { brand: 'text-sm', tagline: 'text-[6px]' },
    md: { brand: 'text-lg', tagline: 'text-[7px]' },
    lg: { brand: 'text-xl', tagline: 'text-[8px]' },
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Lock Symbol */}
      <div className="absolute inset-[6.25%_40%_62.5%_40%]">
        <div className="absolute inset-[-1.5%_-1.88%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42 52">
            <g>
              <path d={svgPaths.p316d9280} stroke="#D4AF37" strokeWidth="1.5" />
              <path d={svgPaths.p9eb4e80} stroke="#D4AF37" strokeWidth="1.5" />
              <path d={svgPaths.p29619100} fill="#D4AF37" />
              <path d="M0.75 10.75H10.75" stroke="#D4AF37" strokeWidth="1.5" />
              <path d="M30.75 10.75H40.75" stroke="#D4AF37" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      </div>
      
      {/* Brand Name */}
      <p className={`absolute font-['Inter',sans-serif] font-normal inset-[47.5%_16.25%_34.38%_16.25%] leading-[normal] not-italic text-[#d4af37] ${textSizes[size].brand} text-center text-nowrap whitespace-pre`}>
        PrivateLand
      </p>
      
      {/* Tagline */}
      {showTagline && (
        <p className={`absolute font-['Inter',sans-serif] font-normal inset-[72.5%_23.5%_20.63%_23.5%] leading-[normal] not-italic text-[#d4af37] ${textSizes[size].tagline} text-center text-nowrap whitespace-pre tracking-wider`}>
          EXCLUSIVE PROPERTIES
        </p>
      )}
    </div>
  );
}
