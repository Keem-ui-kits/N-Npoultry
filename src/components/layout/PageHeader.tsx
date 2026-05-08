'use client';

import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  accent?: string;
  compact?: boolean;
}

export function PageHeader({ title, subtitle, accent, compact }: PageHeaderProps) {
  return (
    <div 
      className={cn(
        "relative bg-brand-dark overflow-hidden",
        compact 
          ? "pt-24 pb-12 md:pt-32 md:pb-16" 
          : "pt-32 pb-16 md:pt-48 md:pb-24"
      )}
    >
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--brand-gold)_1px,_transparent_1px)] [background-size:40px_40px]" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className={cn(
            "font-black text-white italic uppercase tracking-tighter mb-6",
            compact ? "text-4xl md:text-6xl" : "text-5xl md:text-8xl"
          )}>
            {title} <span className="text-brand-gold not-italic">{accent}</span>
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-medium">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
