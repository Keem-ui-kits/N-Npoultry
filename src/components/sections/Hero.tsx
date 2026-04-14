'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const preheaderRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Ken Burns: slow scale-up of background image
      gsap.fromTo(
        bgRef.current,
        { scale: 1.08 },
        {
          scale: 1,
          duration: 2.4,
          ease: 'power2.out',
        }
      );

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

      // Staggered text reveals
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        preheaderRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.4)' }
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'back.out(1.2)' },
          '-=0.4'
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.2)' },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.4)' },
          '-=0.4'
        );
    }, containerRef);

    return () => { ctx.revert(); };
  }, [prefersReduced]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Cinematic background */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/hero-bg.jpeg"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Dark gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 py-28 flex flex-col items-center text-center">
        {/* Preheader */}
        <div
          ref={preheaderRef}
          className="flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-brand-gold" />
          <span className="text-sm font-semibold tracking-widest text-brand-gold uppercase">
            Premium Quality Suppliers
          </span>
        </div>

        {/* Heading */}
        <h1
          ref={headingRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6"
        >
          Farm-Fresh<br />
          <span className="gradient-brand-text">Nutritious Eggs</span>
        </h1>

        {/* Description */}
        <p
          ref={descRef}
          className="text-lg md:text-xl text-white/75 max-w-2xl mb-10 leading-relaxed"
        >
          From day-collected table eggs to organic farm nutrients, everything you need
          from a supplier you can rely on. Built with premium quality in mind.
        </p>

        {/* CTA */}
        <a
          ref={ctaRef}
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-brand text-brand-dark font-bold text-base tracking-wide transition-all duration-300 hover:shadow-[0_0_32px_rgba(236,204,116,0.5)] hover:scale-105"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
