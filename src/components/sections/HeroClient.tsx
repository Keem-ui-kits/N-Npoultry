'use client';

import React, { useRef } from 'react';
import { motion, type Variants } from 'motion/react';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface HeroClientProps {
  children: React.ReactNode;
}

export function HeroClient({ children }: HeroClientProps) {
  const containerRef = useRef<HTMLElement>(null);
  const bgImageWrapRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);

  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (
        prefersReducedMotion ||
        !containerRef.current ||
        !bgImageRef.current ||
        !bgImageWrapRef.current
      )
        return;

      const bgImage = bgImageRef.current;
      const bgImageWrap = bgImageWrapRef.current;
      const container = containerRef.current;

      window.requestIdleCallback(() => {
        gsap.set(bgImage, {
          opacity: 0,
          scale: 0.8,
          y: 50,
          rotate: -5,
        });

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.to(
          bgImage,
          { opacity: 0.25, scale: 1, y: 0, duration: 2, ease: 'power4.out' },
          0.5,
        );

        gsap.to(bgImage, {
          y: 20,
          rotate: 5,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        const handleMouseMove = (e: MouseEvent) => {
          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(bgImageWrap, {
            rotateY: x / 150,
            rotateX: -y / 150,
            duration: 1,
            ease: 'power2.out',
            transformPerspective: 1500,
          });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => { window.removeEventListener('mousemove', handleMouseMove); };
      });
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] },
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0,
      },
    },
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[100dvh] sm:min-h-screen flex items-center justify-center overflow-x-hidden bg-gradient-to-br from-background via-background to-muted/20 pt-24 pb-12"
      style={{ perspective: '1000px' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-gold/10 via-transparent to-transparent pointer-events-none" />

      <div
        ref={bgImageWrapRef}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Image
          ref={bgImageRef}
          src="/whisk-background.png"
          alt=""
          role="presentation"
          fill
          sizes="100vw"
          quality={60}
          priority={true}
          placeholder="empty"
          className="object-contain filter brightness-110 p-12 md:p-24 blur-[2px]"
          style={{ transform: 'translateZ(-50px)' }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial={false}
        animate="visible"
        className="relative z-10 flex w-full flex-col items-center justify-center px-4 py-4 sm:py-12 text-center max-w-5xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
}

