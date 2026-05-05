'use client';

import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';

interface GalleryPhoto {
  url: string;
  alt: string;
}

const FALLBACK_PHOTOS: GalleryPhoto[] = [
  { url: '/assets/education/one day old chicks.jpeg', alt: 'Day-one chicks arriving at N&N farm' },
  { url: '/assets/education/chicks feeding.jpeg', alt: 'Feeding time at the farm' },
  { url: '/assets/education/grown chicks to hen.jpeg', alt: 'Our pullets growing out' },
  { url: '/assets/education/grown chicks-hens.jpeg', alt: 'Our hens in their environment' },
  { url: '/assets/education/layer-hens.jpeg', alt: 'Layer hens at peak production' },
  { url: '/assets/education/poultry-manure.png', alt: 'Organic poultry manure ready for delivery' },
];

export function FarmGallery({ photos }: { photos?: GalleryPhoto[] }) {
  const prefersReduced = useReducedMotion();
  const displayPhotos = photos && photos.length > 0 ? photos : FALLBACK_PHOTOS;

  // Duplicate set for seamless loop — translateX(-50%) returns to origin
  const track = [...displayPhotos, ...displayPhotos];

  return (
    <section className="py-10 overflow-hidden" aria-label="Farm gallery">
      <div className="mb-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <p className="text-[11px] font-bold tracking-widest uppercase text-white/40">
          Look Inside the Farm
        </p>
      </div>

      {/* Marquee container — group so hover reaches the track */}
      <div className="relative overflow-hidden group/gallery" role="list" aria-label="Farm photos">
        {/* Edge fade overlays */}
        <div
          className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--background), transparent)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--background), transparent)' }}
          aria-hidden="true"
        />

        {/* Scrolling track */}
        <div
          className="flex gap-3 w-max pl-4 pr-4 pb-3 group-hover/gallery:[animation-play-state:paused]"
          style={{
            animation: prefersReduced ? 'none' : 'gallery-marquee 38s linear infinite',
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
                className="flex-shrink-0 relative rounded-2xl overflow-hidden bg-white/5"
                style={{
                  width: 'clamp(220px, 28vw, 300px)',
                  height: '220px',
                }}
              >
                <Image
                  src={photo.url}
                  alt={isOriginal ? photo.alt : ''}
                  fill
                  className="object-cover pointer-events-none select-none transition-transform duration-500 group-hover/gallery:scale-[1.02]"
                  sizes="300px"
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
