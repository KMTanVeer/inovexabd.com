import { cn } from './GlassContainer.tsx';

interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden", className)}>
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="circle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A3FF" />
            <stop offset="100%" stopColor="#8A00FF" />
          </linearGradient>
          <linearGradient id="text-grad" x1="0%" y1="0%" x2="100%" y2="0%">
             <stop offset="0%" stopColor="#FFFFFF" />
             <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>

        {/* Outer Circle with Gradient */}
        <circle cx="50" cy="50" r="48" fill="#020617" stroke="url(#circle-grad)" strokeWidth="3" />
        
        {/* Stylized iN Logo */}
        <g transform="translate(15, 20)">
          {/* Letter i */}
          <path d="M25 25 V45" stroke="white" strokeWidth="8" strokeLinecap="round" />
          {/* Letter N */}
          <path d="M38 45 V15 L58 45 V15" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Swoop / Orbit */}
          <path d="M10 40 C 20 50, 60 50, 75 10" stroke="#00A3FF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="75" cy="10" r="3.5" fill="#00A3FF" />
        </g>

        {/* Smaller brand text inside logo */}
        <text x="50" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" letterSpacing="1" fontFamily="sans-serif">INOVEXA</text>
        <path d="M25 78 H75" stroke="#3B82F6" strokeWidth="0.5" opacity="0.5" />
        <text x="50" y="85" textAnchor="middle" fill="#94A3B8" fontSize="4" letterSpacing="2" fontFamily="sans-serif">TECHNOLOGIES</text>
        <text x="50" y="93" textAnchor="middle" fill="#E11D48" fontSize="3" fontWeight="bold" letterSpacing="0.5" fontFamily="sans-serif">THINK SMART. BUILD SMARTER.</text>
      </svg>
    </div>
  );
}
