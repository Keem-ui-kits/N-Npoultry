'use client';

import { useRef, useState } from 'react';
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / (el.scrollWidth / teaserArticles.length));
    setActiveIndex(index);
  };

  const featured = teaserArticles[0];
  const secondary = teaserArticles.slice(1);

  return (
    <section className="relative py-24 md:py-32 bg-background border-t border-white/[0.06] overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full blur-[130px] opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #eccc74, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-brand-gold/25 bg-brand-gold/[0.07]">
              <BookOpen className="w-3 h-3 text-brand-gold" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-brand-gold">
                Education Hub
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[0.9] text-white">
              Know Your{' '}
              <span className="gradient-brand-text">Farm.</span>
            </h2>
            <p className="mt-4 text-base text-white/45 max-w-md leading-relaxed">
              From day-one chicks to farm-fresh eggs — learn exactly how we raise
              every bird and why it matters.
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
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/12 bg-white/[0.03] text-white font-bold text-sm tracking-wide hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200 active:scale-[0.98]"
            >
              See all articles
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Mobile: horizontal snap carousel */}
        <div className="md:hidden relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-4 pb-4"
          >
            {teaserArticles.map((article, i) => {
              const color = categoryColor[article.category] ?? '#eccc74';
              const label = categoryLabel[article.category] ?? article.category;
              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                  className={`w-[82vw] shrink-0 snap-start rounded-2xl transition-all duration-300 ${i === activeIndex ? 'ring-1 ring-brand-gold/30' : ''}`}
                >
                  <Link
                    href={`/education-hub/${article.id}`}
                    className="group block rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" aria-hidden="true" />
                      <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="85vw" />
                      <div className="absolute bottom-3 left-3 z-20 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm" style={{ background: `${color}22`, color, border: `1px solid ${color}40` }}>
                        {label}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-black text-white mb-2 leading-snug group-hover:text-brand-gold transition-colors duration-200">{article.title}</h3>
                      <p className="text-sm text-white/45 leading-relaxed line-clamp-2">{article.excerpt}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Fade hint */}
          <div
            className="absolute right-0 top-0 bottom-4 w-12 pointer-events-none z-10"
            aria-hidden="true"
            style={{ background: 'linear-gradient(to right, transparent, var(--background))' }}
          />

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4" aria-hidden="true">
            {teaserArticles.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-brand-gold' : 'w-1.5 bg-white/20'}`} />
            ))}
          </div>
        </div>

        {/* Desktop: asymmetric 3fr / 2fr grid — NOT the generic 3-equal-columns layout */}
        {featured && (
          <div className="hidden md:grid md:grid-cols-[3fr_2fr] gap-5">

            {/* Featured article — tall left column */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/education-hub/${featured.id}`}
                className="group block rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300 h-full"
              >
                {/* Taller image for featured */}
                <div className="relative h-72 md:h-80 overflow-hidden">
                  <div
                    className="absolute inset-0 z-10 opacity-25 mix-blend-multiply"
                    style={{ background: `radial-gradient(ellipse at center, ${categoryColor[featured.category] ?? '#eccc74'}, transparent 70%)` }}
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent z-10" aria-hidden="true" />
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 1280px) 60vw, 800px"
                  />
                  <div
                    className="absolute bottom-4 left-4 z-20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm"
                    style={{
                      background: `${categoryColor[featured.category] ?? '#eccc74'}22`,
                      color: categoryColor[featured.category] ?? '#eccc74',
                      border: `1px solid ${categoryColor[featured.category] ?? '#eccc74'}40`,
                    }}
                  >
                    {categoryLabel[featured.category] ?? featured.category}
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-xl md:text-2xl font-black leading-snug text-white group-hover:text-brand-gold transition-colors duration-200 mb-3">
                    {featured.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed line-clamp-3">{featured.excerpt}</p>
                  <div
                    className="flex items-center gap-1.5 text-xs font-bold tracking-wide pt-4"
                    style={{ color: categoryColor[featured.category] ?? '#eccc74' }}
                  >
                    Read more
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Right column — 2 stacked smaller articles */}
            <div className="flex flex-col gap-5">
              {secondary.map((article, i) => {
                const color = categoryColor[article.category] ?? '#eccc74';
                const label = categoryLabel[article.category] ?? article.category;
                return (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: (i + 1) * 0.1 }}
                    className="flex-1"
                  >
                    <Link
                      href={`/education-hub/${article.id}`}
                      className="group block rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300 h-full"
                    >
                      <div className="relative h-36 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" aria-hidden="true" />
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(max-width: 1280px) 35vw, 480px"
                        />
                        <div
                          className="absolute bottom-3 left-3 z-20 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm"
                          style={{ background: `${color}22`, color, border: `1px solid ${color}40` }}
                        >
                          {label}
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-base font-black leading-snug text-white group-hover:text-brand-gold transition-colors duration-200 mb-2">
                          {article.title}
                        </h3>
                        <p className="text-xs text-white/45 leading-relaxed line-clamp-2">{article.excerpt}</p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
