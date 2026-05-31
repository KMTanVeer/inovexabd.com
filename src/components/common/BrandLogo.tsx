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
      <div className={`flex items-center gap-3 ${className}`}>
        {showMark && (
          <>
            <BrandMark />
            <span className="h-6 w-px bg-black/15 dark:bg-white/20" aria-hidden="true" />
          </>
        )}
        {highlightTopbarX ? (
          <span className="text-sm md:text-base font-semibold tracking-wide text-black dark:text-white">
            inove
            <span className="text-blue-600 dark:text-blue-400 drop-shadow-[0_0_10px_rgba(37,99,235,0.7)] dark:drop-shadow-[0_0_12px_rgba(96,165,250,0.9)]">x</span>
            abd.com
          </span>
        ) : (
          <span className="text-sm md:text-base font-semibold tracking-wide text-black dark:text-white">
            inovexabd.com
          </span>
        )}
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
          Technology
        </span>
      </div>
    </div>
  );
}
