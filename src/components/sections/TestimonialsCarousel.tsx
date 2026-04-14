'use client';

import { Star, StarHalf } from 'lucide-react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: string | number;
  name: string;
  company?: string;
  location?: string;
  rating: number;
  text: string;
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="flex gap-0.5">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${String(i)}`} className="w-4 h-4 fill-brand-gold text-brand-gold" />
      ))}
      {hasHalfStar && <StarHalf className="w-4 h-4 fill-brand-gold text-brand-gold" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${String(i)}`} className="w-4 h-4 text-brand-gold/30" />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="w-[300px] sm:w-[340px] shrink-0 rounded-2xl bg-white dark:bg-brand-dark border border-border dark:border-white/10 p-6 shadow-md flex flex-col gap-4">
      <StarRating rating={testimonial.rating} />
      <blockquote className="text-sm sm:text-base text-foreground/80 dark:text-white/70 leading-relaxed flex-grow">
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>
      <div>
        <p className="font-bold text-sm text-foreground dark:text-white">{testimonial.name}</p>
        {testimonial.company && (
          <p className="text-brand-gold text-xs font-semibold mt-0.5">{testimonial.company}</p>
        )}
        {testimonial.location && (
          <p className="text-muted-foreground dark:text-white/40 text-xs italic mt-0.5">{testimonial.location}</p>
        )}
      </div>
    </div>
  );
}

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  // Triple the list so the loop never shows a gap regardless of how many items there are
  const items = [...testimonials, ...testimonials, ...testimonials];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative w-full overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      role="region"
      aria-label="Customer Testimonials"
    >
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        .marquee-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-track">
        {items.map((t, i) => (
          <TestimonialCard key={`${String(t.id)}-${String(i)}`} testimonial={t} />
        ))}
      </div>
    </motion.div>
  );
}
