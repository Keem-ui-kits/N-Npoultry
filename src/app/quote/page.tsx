import { PageWrapper } from '@/components/layout/PageWrapper';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import QuoteContent from './QuoteContent';

export const metadata: Metadata = {
  title: 'Request a Quote | N&N Poultry Palace',
  description: 'Request a tailored commercial proposal for your farm-fresh egg supply, poultry manure, or ex-layer hens.',
};

export default function QuotePage() {
  return (
    <PageWrapper>
      <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#030213] to-black">
        {/* Decorative background gems */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <Suspense fallback={<div className="h-[600px] w-full bg-white/5 rounded-3xl animate-pulse" />}>
            <QuoteContent />
          </Suspense>
        </div>
      </section>
    </PageWrapper>
  );
}
