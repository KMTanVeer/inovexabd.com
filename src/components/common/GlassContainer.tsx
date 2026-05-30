import React from 'react';

export function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function GlassContainer({ children, className, ...props }: GlassContainerProps) {
  return (
    <div 
      className={cn(
        "bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl border border-black/5 dark:border-white/5 rounded-2xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
