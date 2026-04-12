'use client';

import { testimonials } from '@/content/testimonials';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';

export function TestimonialsTeaser() {
  const featured = testimonials.slice(0, 2);

  return (
    <section id="testimonials-teaser" className="py-24 bg-muted/20 dark:bg-brand-dark/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight">
            Trusted <span className="gradient-brand-text">by many</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-medium">
            Join the many happy families and businesses who trust N&N Poultry Palace for their daily needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-16">
          {featured.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-card dark:bg-brand-dark border border-border dark:border-white/10 rounded-2xl p-6 md:p-8 relative shadow-xl"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-brand-gold opacity-10" />
              <blockquote className="text-base md:text-lg font-medium mb-6 leading-relaxed">
                {item.text}
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center font-bold text-brand-gold">
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
