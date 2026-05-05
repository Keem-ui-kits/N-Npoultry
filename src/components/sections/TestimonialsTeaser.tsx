'use client';

import { testimonials } from '@/content/testimonials';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5 mb-4" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <motion.svg
            key={star}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: star * 0.05, duration: 0.25 }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill={filled || half ? '#eccc74' : 'none'}
            stroke="#eccc74"
            strokeWidth="1.5"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </motion.svg>
        );
      })}
    </div>
  );
}

export function TestimonialsTeaser() {
  const featured = testimonials.slice(0, 2);

  return (
    <section id="testimonials-teaser" className="py-24 bg-muted/20 dark:bg-brand-dark/20 relative overflow-hidden">
      {/* Subtle warm glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[100px] opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #eccc74, transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-brand-gold/30 bg-brand-gold/10">
              <span className="text-xs font-bold tracking-widest uppercase text-brand-gold">Customer Stories</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight">
              What <span className="gradient-brand-text">Machakos</span> is saying
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-medium">
              From breakfast kiosks in Athi River to family homes in Syokimau — real customers, real orders, real results.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-16">
          {featured.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-card dark:bg-brand-dark border border-border dark:border-white/10 rounded-2xl p-6 md:p-8 relative shadow-xl group hover:border-brand-gold/20 transition-colors duration-300"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-brand-gold opacity-10" />
              <StarRating rating={item.rating} />
              <blockquote className="text-base md:text-lg font-medium mb-6 leading-relaxed">
                {item.text}
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center font-bold text-brand-gold flex-shrink-0">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-base">{item.name}</p>
                  {item.company && (
                    <p className="text-brand-gold text-xs font-semibold">{item.company}</p>
                  )}
                  {item.location && (
                    <p className="text-muted-foreground italic text-xs">{item.location}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/about#testimonials"
            className="flex items-center gap-2 px-10 py-4 bg-brand-dark dark:bg-white text-white dark:text-brand-dark rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl"
          >
            Read More Stories
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
