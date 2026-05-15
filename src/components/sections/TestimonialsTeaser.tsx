'use client';

import { useState, useEffect } from 'react';
import { testimonials as staticTestimonials } from '@/content/testimonials';
import type { Testimonial } from '@/content/testimonials';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';

const AUTO_ADVANCE_MS = 5000;

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${String(rating)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-3.5 h-3.5"
            fill={filled || half ? '#eccc74' : 'none'}
            stroke="#eccc74"
            strokeWidth="1.5"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      })}
    </div>
  );
}

export function TestimonialsTeaser({ testimonials = staticTestimonials }: { testimonials?: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setTimeout(
      () => { setIndex((prev) => (prev + 1) % testimonials.length) },
      AUTO_ADVANCE_MS
    );
    return () => { clearTimeout(t) };
  }, [index, testimonials.length]);

  const current = testimonials[index] ?? testimonials[0];
  if (!current) return null;

  return (
    <motion.section
      id="testimonials-teaser"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="py-24 md:py-32 bg-background border-t border-white/[0.06] relative overflow-hidden"
    >
      <div
        className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full blur-[130px] opacity-[0.03] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #eccc74, transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section label + heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-brand-gold/25 bg-brand-gold/[0.07]">
            <Star className="w-3 h-3 text-brand-gold" />
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-brand-gold">
              Customer Stories
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[0.9] text-white">
            What{' '}
            <span className="gradient-brand-text">Machakos</span>
            <br className="hidden sm:block" /> is saying
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-20">

          {/* Auto-cycling testimonial */}
          <div className="flex-1 border-l-2 border-brand-gold/30 pl-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote className="text-base md:text-lg font-medium text-white/75 leading-relaxed mb-5 italic">
                  &ldquo;{current.text}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-orange/15 border border-brand-orange/25 flex items-center justify-center font-black text-brand-orange text-xs flex-shrink-0">
                    {current.name.charAt(0)}
                  </div>
                  <div>
                    <StarRow rating={current.rating} />
                    <p className="font-bold text-white text-xs mt-0.5">{current.name}</p>
                    {(current.company ?? current.location) && (
                      <p className="text-white/40 text-xs">
                        {[current.company, current.location].filter(Boolean).join(' · ')}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots — click to jump */}
            <div className="flex items-center gap-1.5 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setIndex(i) }}
                  aria-label={`Go to testimonial ${String(i + 1)}`}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === index
                      ? 'w-5 bg-brand-gold'
                      : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="shrink-0">
            <p className="text-sm text-white/40 mb-4 max-w-xs leading-relaxed">
              From breakfast kiosks in Athi River to family homes in Syokimau — real customers, real orders.
            </p>
            <Link
              href="/about#testimonials"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-white/15 bg-white/[0.04] text-white font-bold text-sm hover:bg-white/[0.08] hover:border-white/25 transition-all duration-200 active:scale-[0.98]"
            >
              Read more stories
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
