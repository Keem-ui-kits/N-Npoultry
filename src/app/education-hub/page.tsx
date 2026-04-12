import { PageWrapper } from '@/components/layout/PageWrapper';
import { educationCategories } from '@/content/education';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getEducationArticles } from '@/sanity/lib/queries';
import { EducationTabsClient } from '@/components/sections/EducationTabsClient';

export const metadata: Metadata = {
  title: 'Education Hub | N&N Poultry Palace',
  description: 'Learn about our farming practices, the poultry lifecycle, and how we guarantee fresh and nutritious eggs daily.',
};

export default async function EducationHubPage() {
  const educationArticles = await getEducationArticles();

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden px-4 md:px-8">
        <div className="absolute inset-0 bg-[#030213] pointer-events-none z-0">
          <div className="svg-grain absolute inset-0 opacity-20 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/50 to-[#030213]" />
          {/* Subtle Glow */}
          <div className="absolute top-0 right-1/4 w-[40vw] h-[40vw] bg-brand-gold/10 blur-[100px] rounded-full pointer-events-none" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center pt-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white drop-shadow-lg">
            Education <span className="gradient-brand-text italic font-serif">Hub</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            Discover the journey from one-day-old chicks to premium table eggs. At N&N Poultry Palace, transparency and sustainable farming are at the core of what we do.
          </p>
        </div>
      </section>

      {/* Tabbed Mini-Pages */}
      <EducationTabsClient categories={educationCategories} articles={educationArticles} />

      {/* Footer CTA */}
      <section className="py-32 relative px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-50 z-0" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Ready to Taste the Difference?</h2>
          <p className="text-xl text-white/70 mb-10 font-light">
            Now that you know how we care for our flock, experience our farm-fresh eggs for yourself.
          </p>
          <Link href="/products" className="inline-flex items-center gap-2 px-8 py-4 gradient-brand text-brand-dark rounded-full font-bold hover:shadow-[0_0_20px_rgba(var(--brand-gold-rgb),0.4)] transition-all transform hover:scale-105">
            View Products <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
