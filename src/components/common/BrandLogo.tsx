import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'topbar' | 'mark';
  showMark?: boolean;
  highlightTopbarX?: boolean;
}

function BrandMark({ className }: { className?: string }) {
  return (
    <img 
      src="/inovexabd-logo-small.webp" 
      srcSet="/inovexabd-logo-small.webp 1x, /inovexabd-logo.webp 2x"
      alt="Inovexa Symbol" 
      width={40} 
      height={32} 
      className={`h-10 w-auto object-contain select-none shrink-0 ${className || ''}`}
    />
  );
}

export function BrandLogo({ className, variant = 'full', showMark = true, highlightTopbarX = false }: BrandLogoProps) {
  if (variant === 'mark') {
    return (
      <div className={className}>
        <BrandMark />
      </div>
    );
  }

  if (variant === 'topbar') {
    return (
      <div className={`flex items-center gap-1.5 md:gap-3 ${className}`}>
        <img 
          src="/inovexabd-logo-small.webp" 
          srcSet="/inovexabd-logo-small.webp 1x, /inovexabd-logo.webp 2x"
          alt="Inovexa Symbol" 
          width={50} 
          height={40} 
          className="h-10 w-auto object-contain" 
        />
        <span className="h-6 w-px bg-black/15 dark:bg-white/20" aria-hidden="true" />
        <img 
          src="/inovexabd-banner-small.webp" 
          srcSet="/inovexabd-banner-small.webp 1x, /inovexabd-banner.webp 2x"
          alt="Inovexa Banner" 
          width={173} 
          height={24} 
          className="h-5 md:h-6 w-auto object-contain dark:hidden" 
        />
        <img 
          src="/inovexabd-banner-dark-mode-small.webp" 
          srcSet="/inovexabd-banner-dark-mode-small.webp 1x, /inovexabd-banner-dark-mode.webp 2x"
          alt="Inovexa Banner" 
          width={173} 
          height={24} 
          className="h-5 md:h-6 w-auto object-contain hidden dark:block" 
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showMark && <BrandMark />}

      {/* Wordmark */}
      <div className="flex flex-col justify-center select-none">
        <div className="flex items-center drop-shadow-sm">
          <span className="font-black text-2xl tracking-tighter leading-none text-black dark:text-white font-display uppercase">
            INOVE
          </span>
          <span className="font-black text-[26px] tracking-tighter leading-none text-blue-600 dark:text-blue-500 font-display uppercase relative">
            X
          </span>
          <span className="font-black text-2xl tracking-tighter leading-none text-black dark:text-white font-display uppercase">
            A
          </span>
        </div>
        <span className="text-[8px] font-black tracking-[0.4em] uppercase text-zinc-700 dark:text-zinc-300 leading-none mt-1">
          Technologies
        </span>
      </div>
    </div>
  );
}
