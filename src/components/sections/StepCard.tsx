'use client';

import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import type { LucideIcon } from 'lucide-react';
import type { MouseEvent} from 'react';
import { useRef } from 'react';
import { useIsMobile } from '@/hooks/use-is-mobile';

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface StepCardProps {
  step: Step;
  index: number;
}

export function StepCard({ step, index }: StepCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const lastUpdate = useRef(0);
  const isMobile = useIsMobile();

  useGSAP(() => {
    if (!cardRef.current) return;

    gsap.set(cardRef.current, {
      opacity: 0,
      y: 50,
      rotateY: 30,
    });

    ScrollTrigger.create({
      trigger: cardRef.current,
      start: 'top bottom-=100px',
      onEnter: () => {
        gsap.to(cardRef.current, {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'back.out(1.7)',
        });
      },
    });

    if (!isMobile) {
      const card = cardRef.current;

      const handleMouseEnter = () => {
        gsap.to(card, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
        if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 });
        if (glowRef.current) gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });
      };

      const handleMouseLeave = () => {
        gsap.to(card, { scale: 1, rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' });
        if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
        if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    }
  }, { scope: cardRef, dependencies: [index, isMobile] });

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent<HTMLDivElement>) {
    if (isMobile || !cardRef.current) return;

    const now = performance.now();
    if (now - lastUpdate.current < 32) return;
    lastUpdate.current = now;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = currentTarget.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;

      gsap.to(cardRef.current, {
        rotateX: (y - 0.5) * -16,
        rotateY: (x - 0.5) * 16,
        translateZ: (y - 0.5) * 40,
        duration: 0.3,
        glowX: x * 100,
        glowY: y * 100,
        ease: 'power2.out',
        transformPerspective: 1000,
      });

      if (spotlightRef.current) {
        gsap.set(spotlightRef.current, {
          background: `radial-gradient(400px circle at ${(x * 100).toFixed(1)}% ${(y * 100).toFixed(1)}%, rgba(var(--brand-gold-rgb),0.2), transparent 70%)`,
        });
      }

      if (glowRef.current) {
        gsap.set(glowRef.current, {
          background: `radial-gradient(300px circle at ${(x * 100).toFixed(1)}% ${(y * 100).toFixed(1)}%, rgba(var(--brand-gold-rgb),0.15), transparent 60%)`,
        });
      }
    });
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      className="group relative p-6 md:p-8 rounded-2xl md:rounded-3xl bg-card dark:bg-brand-dark border border-border dark:border-white/10 hover:bg-accent dark:hover:bg-[#1a3f50] transition-colors backdrop-blur-sm cursor-pointer"
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -inset-px opacity-0 rounded-2xl md:rounded-3xl"
      />
      <div
        ref={glowRef}
        className="pointer-events-none absolute -inset-1 opacity-0 rounded-2xl md:rounded-3xl"
        style={{ transform: 'translateZ(-10px)' }}
      />

      <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        <div className="w-12 h-12 bg-gradient-to-br from-brand-gold/20 to-brand-orange/20 rounded-2xl flex items-center justify-center text-brand-gold mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
          <step.icon className="w-6 h-6" />
        </div>
        <h3 className="text-lg md:text-xl font-black mb-2 md:mb-3 text-white">
          {step.title}
        </h3>
        <p className="text-sm md:text-base text-white/50 leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}
