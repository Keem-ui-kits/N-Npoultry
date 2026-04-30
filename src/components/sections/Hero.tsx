'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

export function Hero({ heroImageUrl }: { heroImageUrl?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Parallax on scroll
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Cleaned up text reveals for performance
    }, containerRef);

    return () => { ctx.revert(); };
  }, [prefersReduced]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Cinematic background — priority + fetchPriority so browser preloads immediately */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <Image
          src={heroImageUrl ?? '/images/hero-bg.jpeg'}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

      {/* Content — no initial opacity:0 so it's visible before JS runs */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 py-28 flex flex-col items-center text-center"
      >
        <div className="flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both">
          <Sparkles className="w-4 h-4 text-brand-gold" />
          <span className="text-sm font-semibold tracking-widest text-brand-gold uppercase">
            Premium Quality Suppliers
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 fill-mode-both">
          Farm-Fresh<br />
          <span className="gradient-brand-text">Nutritious Eggs</span>
        </h1>

        <p className="text-lg md:text-xl text-white/75 max-w-2xl mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300 fill-mode-both">
          From day-collected table eggs to organic farm nutrients, everything you need
          from a supplier you can rely on. Built with premium quality in mind.
        </p>

        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-brand text-brand-dark font-bold text-base tracking-wide transition-all duration-300 hover:shadow-[0_0_32px_rgba(236,204,116,0.5)] hover:scale-105 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-500 fill-mode-both"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
