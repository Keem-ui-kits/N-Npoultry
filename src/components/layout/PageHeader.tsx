'use client';

import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

const BrandParticles = dynamic(() => import('@/components/BrandParticles'), { ssr: false });

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
        "relative overflow-hidden",
        compact 
          ? "pt-24 pb-12 md:pt-32 md:pb-16" 
          : "pt-32 pb-16 md:pt-48 md:pb-24"
      )}
    >
      <div className="absolute inset-0 bg-[#030213] pointer-events-none z-0">
        <div className="svg-grain absolute inset-0 opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/50 to-[#030213]" />
        <div className="absolute top-0 right-1/4 w-[40vw] h-[40vw] bg-brand-gold/10 blur-[100px] rounded-full pointer-events-none" />
      </div>
      <BrandParticles />
      
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
