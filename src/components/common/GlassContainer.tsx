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
        "bg-gradient-to-b from-white/40 via-indigo-50/15 to-indigo-100/30 dark:from-white/10 dark:via-zinc-900/40 dark:to-white/5 backdrop-blur-xl border border-indigo-100/70 dark:border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_10px_30px_-5px_rgba(99,102,241,0.05)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_15px_30px_rgba(0,0,0,0.3)] transition-all duration-300",
        hoverGlow && "hover:border-blue-500/40 dark:hover:border-blue-500/30 hover:bg-white/90 dark:hover:bg-white/10 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_20px_45px_rgba(59,130,246,0.1)] dark:hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_20px_45px_rgba(0,0,0,0.45)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
