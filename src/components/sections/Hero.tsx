'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, MapPin, MessageCircle } from 'lucide-react';
import { WhatsAppOrderSheet } from '@/components/ui/WhatsAppOrderSheet';
import { AvailabilityStrip } from './AvailabilityStrip';
import type { HomeConfig } from '@/sanity/lib/queries';

interface AvailabilityData {
  tableEggs?: number | null;
  manure?: number | null;
  exLayerHens?: number | null;
  lastUpdated?: string | null;
  note?: string | null;
}

const BrandParticles = dynamic(() => import('@/components/BrandParticles'), { ssr: false });

// Framer motion variants removed for Hero content. CSS animations are used instead for LCP.

export function Hero({
  whatsapp,
  availability,
  heroConfig,
}: {
  whatsapp?: string;
  availability?: AvailabilityData | null;
  heroConfig?: HomeConfig['hero'];
}) {
  const [orderSheetOpen, setOrderSheetOpen] = useState(false);

  return (
    <div className="relative min-h-[100svh] flex flex-col overflow-hidden bg-[#030213]">
      <BrandParticles />

      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 z-0 animate-hero-bg-zoom"
        style={{ animationFillMode: 'both' }}
      >
        <Image
          src="/images/hero-bg.jpeg"
          alt="Freshly collected eggs on N&N Poultry Palace farm in Machakos, Kenya"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, (max-width: 1920px) 100vw, 1920px"
          quality={85}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030213] via-[#030213]/75 to-[#030213]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030213]/60 via-transparent to-[#030213]/40" />
      </div>

      {/* Ambient Visuals */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-gold/10 blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.7 }}
        className="absolute bottom-1/3 -right-20 w-96 h-96 bg-brand-orange/10 blur-[120px] rounded-full pointer-events-none"
      />

      {/* Hero Content — fills viewport, pushes strip to natural bottom */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-5 max-w-5xl mx-auto w-full flex-1 pt-24 pb-24 sm:pt-28 sm:pb-28"
      >
        {/* Location badge */}
        <div
          className="flex items-center gap-2.5 mb-6 sm:mb-8 px-4 sm:px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl animate-hero-fade-in"
          style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold" />
          </span>
          <MapPin className="w-3.5 h-3.5 text-brand-gold" />
          <span className="text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase text-white/90">
            {heroConfig?.locationBadge ?? 'Machakos Farm'}
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-black text-white leading-[1.08] tracking-tight mb-4 sm:mb-6 md:mb-8 animate-hero-fade-in"
          style={{ fontSize: 'clamp(2rem, 7.5vw, 5.75rem)', animationDelay: '0.35s', animationFillMode: 'both' }}
        >
          <span className="whitespace-nowrap">
            {heroConfig?.headlinePre ?? 'Every egg,'}{' '}
            <span className="gradient-brand-text">{heroConfig?.headlineAccent ?? 'every day,'}</span>
          </span>
          {' '}{heroConfig?.headlinePost ?? 'Done right.'}
        </h1>

        {/* Subtext */}
        <p
          className="text-sm sm:text-base md:text-lg text-white/65 max-w-[17rem] sm:max-w-2xl mb-8 sm:mb-10 md:mb-12 leading-relaxed font-medium animate-hero-fade-in"
          style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
        >
          {heroConfig?.subtext ?? (
            <>
              Collected at <span className="text-white font-semibold">2 PM</span>. Packed by{' '}
              <span className="text-white font-semibold">5 PM</span>. On your doorstep before noon
              {' '}— straight from <span className="text-brand-gold font-semibold">Machakos, Kenya.</span>
            </>
          )}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col items-center gap-3 sm:gap-5 animate-hero-fade-in"
          style={{ animationDelay: '0.65s', animationFillMode: 'both' }}
        >
          <div className="flex flex-row items-center gap-3 sm:gap-4">
            <button
              onClick={() => { setOrderSheetOpen(true) }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-9 sm:py-4 md:px-11 md:py-5 rounded-full gradient-brand text-brand-dark font-black text-sm sm:text-base md:text-lg tracking-wide transition-all duration-500 hover:shadow-[0_0_36px_rgba(236,204,116,0.35)] hover:scale-[1.03] active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              {heroConfig?.ctaPrimary ?? 'Order on WhatsApp'}
            </button>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-9 sm:py-4 md:px-11 md:py-5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-semibold text-sm sm:text-base md:text-lg tracking-wide transition-all duration-500 hover:bg-white/10 hover:border-white/35 hover:scale-[1.03] active:scale-[0.98]"
            >
              {heroConfig?.ctaSecondary ?? 'Explore'}
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>

          <p className="flex items-center gap-2 text-brand-gold/70 font-semibold text-[10px] sm:text-xs tracking-[0.18em] uppercase mt-1">
            <span className="w-6 sm:w-8 h-px bg-brand-gold/25" />
            {heroConfig?.slotNote ?? 'Slots fill by 10 AM daily'}
            <span className="w-6 sm:w-8 h-px bg-brand-gold/25" />
          </p>
        </div>

        <WhatsAppOrderSheet
          isOpen={orderSheetOpen}
          onClose={() => { setOrderSheetOpen(false) }}
          whatsapp={whatsapp}
        />
      </div>

      {/* Bottom Availability Strip */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-20 mt-auto"
      >
        <AvailabilityStrip availability={availability} />
      </motion.div>
    </div>
  );
}
