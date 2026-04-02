'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, StarHalf } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/components/ui/utils';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="flex gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-brand-gold text-brand-gold" />
      ))}
      {hasHalfStar && <StarHalf className="w-4 h-4 fill-brand-gold text-brand-gold" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-brand-gold" />
      ))}
    </div>
  );
}

interface TestimonialCardProps {
  position: number;
  testimonial: Testimonial;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <button
      type="button"
      onClick={() => { handleMove(position); }}
      className={cn(
        'absolute left-1/2 top-1/2 cursor-pointer p-5 sm:p-8 transition-all duration-500 ease-in-out rounded-2xl flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold',
        isCenter
          ? 'z-10 bg-brand-dark text-white border-2 border-brand-gold/60 shadow-2xl'
          : 'z-0 bg-white dark:bg-[#1a3a4a] text-foreground dark:text-gray-200 border border-border dark:border-white/10 hover:border-brand-gold/40 shadow-lg',
      )}
      style={{
        width: cardSize,
        height: isCenter ? cardSize * 1.15 : cardSize,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -30 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? '0px 8px 30px rgba(var(--brand-gold-rgb), 0.25)'
          : '0px 4px 20px rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="flex flex-col h-full overflow-hidden">
        <div className="mb-3 sm:mb-4">
          <StarRating rating={testimonial.rating} />
        </div>
          <blockquote
            className={cn(
              'mb-6 flex-grow flex items-center leading-relaxed',
              isCenter ? 'text-lg text-white font-medium' : 'text-base text-foreground/80 dark:text-gray-300',
            )}
          >
            {testimonial.text}
          </blockquote>
        <div className="mt-auto pt-3 sm:pt-4">
          <p
            className={cn(
              'text-sm sm:text-lg font-bold tracking-tight',
              isCenter ? 'text-brand-gold' : 'text-foreground dark:text-white',
            )}
          >
            {testimonial.name}
          </p>
          <p
            className={cn(
              'text-[10px] sm:text-sm italic mt-0.5',
              isCenter ? 'text-white/60' : 'text-muted-foreground dark:text-gray-400',
            )}
          >
            {testimonial.location}
          </p>
        </div>
      </div>
    </button>
  );
};

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push(item);
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift(item);
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const updateSize = () => {
      const { matches } = window.matchMedia('(min-width: 640px)');
      setCardSize(matches ? 365 : Math.min(window.innerWidth - 60, 320));
    };
    
    const debouncedUpdateSize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateSize, 100);
    };

    updateSize();
    window.addEventListener('resize', debouncedUpdateSize);
    return () => {
      window.removeEventListener('resize', debouncedUpdateSize);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleMoveRef = useRef(handleMove);
  useEffect(() => {
    handleMoveRef.current = handleMove;
  });

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleMoveRef.current(1);
    }, 5000);
    return () => { clearInterval(timer); };
  }, [isPaused]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative w-full overflow-hidden"
      style={{ height: 520 }}
      onMouseEnter={() => { setIsPaused(true); }}
      onMouseLeave={() => { setIsPaused(false); }}
      onFocusCapture={() => { setIsPaused(true); }}
      onBlurCapture={() => { setIsPaused(false); }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer Testimonials"
    >
      {testimonialsList.map((testimonial, index) => {
        const position = index - Math.floor(testimonialsList.length / 2);
        return (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
        <button
          onClick={() => { handleMove(-1); }}
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300',
            'bg-white dark:bg-brand-dark border-2 border-brand-dark/20 dark:border-white/20',
            'hover:bg-brand-dark hover:text-white hover:border-brand-gold dark:hover:bg-brand-gold dark:hover:text-brand-dark',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2',
            'shadow-md',
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => { handleMove(1); }}
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300',
            'bg-white dark:bg-brand-dark border-2 border-brand-dark/20 dark:border-white/20',
            'hover:bg-brand-dark hover:text-white hover:border-brand-gold dark:hover:bg-brand-gold dark:hover:text-brand-dark',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2',
            'shadow-md',
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
