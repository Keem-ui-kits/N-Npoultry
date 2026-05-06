'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import { Camera } from 'lucide-react';

interface GalleryPhoto {
  url: string;
  alt: string;
}

const FALLBACK_PHOTOS: GalleryPhoto[] = [
  { url: '/assets/education/grading%20of%20eggs.jpeg', alt: 'Strict egg grading for quality assurance' },
  { url: '/assets/education/layers.jpeg', alt: 'Healthy layer hens at peak production' },
  { url: '/assets/education/pullets.jpeg', alt: 'N&N pullets in their growing environment' },
  { url: '/assets/education/chicks%20feeding.jpeg', alt: 'Healthy chicks at feeding time' },
  { url: '/assets/education/one%20day%20old%20chicks.jpeg', alt: 'Day-one chicks arriving at N&N farm' },
];

export function FarmGallery({ photos }: { photos?: GalleryPhoto[] }) {
  const prefersReduced = useReducedMotion();
  const displayPhotos = photos && photos.length > 0 ? photos : FALLBACK_PHOTOS;
  const track = [...displayPhotos, ...displayPhotos];

  return (
    <section className="py-16 md:py-20 border-t border-white/[0.06]" aria-label="Farm gallery">

      {/* Bold editorial header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full border border-brand-gold/25 bg-brand-gold/[0.07]">
              <Camera className="w-3 h-3 text-brand-gold" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-brand-gold">
                Inside N&N Poultry Palace
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[0.9] text-white">
              The Farm,{' '}
              <span className="gradient-brand-text">Live.</span>
            </h2>
          </div>
          <p className="text-sm text-white/35 font-medium max-w-xs sm:text-right leading-relaxed">
            Real photos from our Machakos operation — no filters, no stock imagery.
          </p>
        </motion.div>
      </div>

      {/* Marquee container */}
      <div className="relative overflow-hidden group/gallery" role="list" aria-label="Farm photos">
        {/* Edge fades */}
        <div
          className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--background), transparent)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--background), transparent)' }}
          aria-hidden="true"
        />

        {/* Scrolling track */}
        <div
          className="flex gap-3 w-max pl-4 pr-4 pb-3 group-hover/gallery:[animation-play-state:paused]"
          style={{
            animation: prefersReduced ? 'none' : 'gallery-marquee 42s linear infinite',
            willChange: 'transform',
          }}
        >
          {track.map((photo, i) => {
            const isOriginal = i < displayPhotos.length;
            return (
              <div
                key={i}
                role={isOriginal ? 'listitem' : 'presentation'}
                aria-hidden={!isOriginal}
                className="flex-shrink-0 relative rounded-lg overflow-hidden bg-white/5"
                style={{
                  width: 'clamp(240px, 30vw, 320px)',
                  height: 'clamp(200px, 22vw, 280px)',
                }}
              >
                <Image
                  src={photo.url}
                  alt={isOriginal ? photo.alt : ''}
                  fill
                  className="object-cover pointer-events-none select-none transition-transform duration-700 group-hover/gallery:scale-[1.03]"
                  sizes="320px"
                  loading={i < 4 ? 'eager' : 'lazy'}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
