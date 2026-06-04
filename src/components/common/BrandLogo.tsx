import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'topbar' | 'mark';
  showMark?: boolean;
  highlightTopbarX?: boolean;
}

function BrandMark() {
  return (
    <div className="relative flex items-center justify-center w-10 h-10 select-none shrink-0">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-xl transform rotate-45 group-hover:rotate-180 transition-transform duration-700 shadow-[0_0_20px_rgba(37,99,235,0.3)] dark:shadow-[0_0_20px_rgba(37,99,235,0.5)]" />
      <div className="absolute inset-[3px] bg-white dark:bg-black rounded-[10px] transform rotate-45 group-hover:-rotate-90 transition-transform duration-700" />
      <span className="relative z-10 font-black text-2xl bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 font-display transition-transform duration-300">
        X
      </span>
    </div>
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
        <img src="/inovexabd-logo.png" alt="Inovexa Symbol" width={918} height={740} className="h-10 w-auto object-contain" />
        <span className="h-6 w-px bg-black/15 dark:bg-white/20" aria-hidden="true" />
        <img src="/inovexabd-banner.png" alt="Inovexa Banner" width={1143} height={158} className="h-5 md:h-6 w-auto object-contain dark:hidden" />
        <img src="/inovexabd-banner-dark-mode.png" alt="Inovexa Banner" width={714} height={99} className="h-5 md:h-6 w-auto object-contain hidden dark:block" />
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
        <span className="text-[8px] font-black tracking-[0.4em] uppercase text-black/50 dark:text-white/50 leading-none mt-1">
          Technologies
        </span>
      </div>
    </div>
  );
}
