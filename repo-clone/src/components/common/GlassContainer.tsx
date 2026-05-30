import { type ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassContainerProps {
  children: ReactNode;
  className?: string;
  hoverGlow?: boolean;
}

export function GlassContainer({ children, className, hoverGlow = false }: GlassContainerProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md transition-all duration-500",
        hoverGlow && "hover:border-blue-500/30 dark:hover:border-blue-500/30 hover:bg-white/60 dark:hover:bg-white/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
        className
      )}
    >
      {/* Liquid glass highlight effect */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/20 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-black/5 dark:via-white/10 to-transparent" />
      
      {children}
    </div>
  );
}
