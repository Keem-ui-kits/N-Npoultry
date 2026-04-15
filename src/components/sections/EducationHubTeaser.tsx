'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { educationArticles, educationCategories } from '@/content/education';

// Show first article from each category — gives a preview of each pillar
const teaserArticles = educationCategories.map((cat) =>
  educationArticles.find((a) => a.category === cat.id)
).filter(Boolean) as typeof educationArticles;

const categoryLabel: Record<string, string> = {
  'the-chick-journey': 'The Chick Journey',
  'growth-and-care': 'Growth & Care',
  'product-excellence': 'Product Excellence',
};

const categoryColor: Record<string, string> = {
  'the-chick-journey': '#eccc74',
  'growth-and-care': '#4ade80',
  'product-excellence': '#f97316',
};

export function EducationHubTeaser() {
  return (
    <section className="relative py-24 md:py-36 bg-background overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[120px] opacity-[0.06] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #eccc74, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-brand-gold/30 bg-brand-gold/10">
              <BookOpen className="w-3.5 h-3.5 text-brand-gold" />
              <span className="text-xs font-bold tracking-widest uppercase text-brand-gold">
                Education Hub
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95]">
              Know Your{' '}
              <span className="gradient-brand-text">Farm.</span>
            </h2>
            <p className="mt-4 text-lg text-white/60 max-w-lg leading-relaxed">
              From day-one chicks to farm-fresh eggs — learn exactly how we raise
              every bird and why it matters for the quality on your table.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Link
              href="/education-hub"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/5 text-white font-bold text-sm tracking-wide hover:bg-white/10 hover:border-white/25 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-brand-gold"
            >
              See all articles
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Article cards */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {teaserArticles.map((article, i) => {
            const color = categoryColor[article.category] ?? '#eccc74';
            const label = categoryLabel[article.category] ?? article.category;

            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              >
                <Link
                  href={`/education-hub/${article.id}`}
                  className="group block rounded-[2rem] overflow-hidden border border-white/8 bg-white/[0.03] hover:border-white/18 hover:bg-white/[0.06] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand-gold"
                >
                  {/* Image */}
                  <div className="relative h-52 md:h-56 overflow-hidden">
                    <div
                      className="absolute inset-0 z-10 opacity-30 mix-blend-multiply"
                      style={{ background: `radial-gradient(ellipse at center, ${color}, transparent 70%)` }}
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" aria-hidden="true" />
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    {/* category pill */}
                    <div
                      className="absolute bottom-4 left-4 z-20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm"
                      style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
                    >
                      {label}
                    </div>
                  </div>

                  {/* Text */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-black leading-snug text-white group-hover:text-brand-gold transition-colors duration-200">
                      {article.title}
                    </h3>
                    <p className="text-sm text-white/55 leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs font-bold tracking-wide pt-1" style={{ color }}>
                      Read more
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
