'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import type { HomeConfig } from '@/sanity/lib/queries';

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

export function FarmGallery({
  photos,
  farmGalleryConfig,
}: {
  photos?: GalleryPhoto[];
  farmGalleryConfig?: HomeConfig['farmGallery'];
}) {
  const fg = farmGalleryConfig;
  const displayPhotos = photos && photos.length > 0 ? photos : FALLBACK_PHOTOS;
  const track = [...displayPhotos, ...displayPhotos];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="py-16 md:py-20 border-t border-white/[0.06] relative" 
      aria-label="Farm gallery"
    >

      {/* Bold editorial header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full border border-brand-gold/25 bg-brand-gold/[0.07]">
              <Camera className="w-3 h-3 text-brand-gold" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-brand-gold">
                {fg?.badgeText ?? 'Inside N&N Poultry Palace'}
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[0.9] text-white">
              {fg?.heading ?? 'The Farm,'}{' '}
              <span className="text-brand-gold">{fg?.headingAccent ?? 'Live.'}</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/50 font-medium max-w-sm md:text-right leading-relaxed">
            {fg?.description ?? 'What you see is what you get. These are real moments from our farm in Machakos—no filters, no stock photos, just honest hard work.'}
          </p>
        </motion.div>
      </div>

      {/* Marquee container */}
      <div className="relative overflow-hidden group/gallery" style={{ touchAction: 'pan-y' }} role="list" aria-label="Farm photos">
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
        {/* Animation via CSS class + motion-reduce so SSR and client markup match */}
        <div
          className="flex gap-3 w-max pl-4 pr-4 pb-3 will-change-transform [animation:gallery-marquee_42s_linear_infinite] motion-reduce:[animation:none] group-hover/gallery:[animation-play-state:paused] group-active/gallery:[animation-play-state:paused] active:[animation-play-state:paused]"
        >
          {track.map((photo, i) => {
            const isOriginal = i < displayPhotos.length;
            return (
              <div
                key={i}
                role={isOriginal ? 'listitem' : 'presentation'}
                aria-hidden={!isOriginal}
                className="flex-shrink-0 relative rounded-lg overflow-hidden bg-white/5 group/photo"
                style={{
                  width: 'clamp(240px, 30vw, 320px)',
                  height: 'clamp(200px, 22vw, 280px)',
                }}
              >
                <Image
                  src={photo.url}
                  alt={isOriginal ? photo.alt : ''}
                  fill
                  className="object-cover pointer-events-none select-none transition-transform duration-700 group-hover/gallery:scale-[1.03] group-hover/photo:scale-105 group-active/photo:scale-105"
                  sizes="320px"
                  loading="lazy"
                />

                {/* Text overlay on touch/hold/hover */}
                {photo.alt && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover/photo:opacity-100 group-active/photo:opacity-100 active:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col justify-end p-4 md:p-5">
                    <span className="text-white font-medium text-xs sm:text-sm leading-snug translate-y-3 group-hover/photo:translate-y-0 group-active/photo:translate-y-0 active:translate-y-0 transition-transform duration-300">
                      {photo.alt}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
