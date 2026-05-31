import React from 'react';

export function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
}

export function GlassContainer({ children, className, hoverGlow = false, ...props }: GlassContainerProps) {
  return (
    <div 
      className={cn(
        "bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl border border-black/5 dark:border-white/5 rounded-2xl",
        hoverGlow && "hover:border-blue-500/30 dark:hover:border-blue-500/30 hover:bg-white/60 dark:hover:bg-white/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-500",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
