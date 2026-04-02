'use client';

import { motion } from 'motion/react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  accent?: string;
}

export function PageHeader({ title, subtitle, accent }: PageHeaderProps) {
  return (
    <div className="relative pt-32 pb-16 md:pt-48 md:pb-24 bg-brand-dark overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--brand-gold)_1px,_transparent_1px)] [background-size:40px_40px]" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter mb-6">
            {title} <span className="text-brand-gold not-italic">{accent}</span>
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto font-medium">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
