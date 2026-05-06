'use client';

import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import type { LucideIcon } from 'lucide-react';
import type { MouseEvent } from 'react';
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
  const rafId = useRef<number | null>(null);
  const lastUpdate = useRef(0);
  const isMobile = useIsMobile();

  useGSAP(() => {
    if (!cardRef.current) return;

    gsap.set(cardRef.current, { opacity: 0, y: 40 });

    ScrollTrigger.create({
      trigger: cardRef.current,
      start: 'top bottom-=80px',
      onEnter: () => {
        gsap.to(cardRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: index * 0.15,
          ease: 'back.out(1.4)',
        });
      },
    });

    if (!isMobile) {
      const card = cardRef.current;

      const handleMouseEnter = () => {
        gsap.to(card, { scale: 1.02, y: -4, duration: 0.35, ease: 'power2.out' });
        if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 });
      };

      const handleMouseLeave = () => {
        gsap.to(card, { scale: 1, y: 0, rotateX: 0, rotateY: 0, duration: 0.35, ease: 'power2.out' });
        if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
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
      if (!cardRef.current || !spotlightRef.current) return;
      const rect = currentTarget.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;

      gsap.to(cardRef.current, {
        rotateX: (y - 0.5) * -10,
        rotateY: (x - 0.5) * 10,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000,
      });

      gsap.set(spotlightRef.current, {
        background: `radial-gradient(320px circle at ${(x * 100).toFixed(1)}% ${(y * 100).toFixed(1)}%, rgba(var(--brand-gold-rgb),0.12), transparent 65%)`,
      });
    });
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      className="group relative flex flex-col p-7 md:p-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-brand-gold/20 hover:bg-white/[0.04] transition-colors duration-300 cursor-default overflow-hidden"
    >
      {/* Spotlight overlay */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 opacity-0 rounded-2xl"
        aria-hidden="true"
      />

      <div className="relative z-10" style={{ transform: 'translateZ(16px)' }}>
        {/* Step number — large ghost text */}
        <div className="flex items-start justify-between mb-6">
          <span className="text-7xl font-black leading-none select-none text-white/[0.05]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'rgba(236,204,116,0.1)', border: '1px solid rgba(236,204,116,0.2)' }}
          >
            <step.icon className="w-4 h-4 text-brand-gold" />
          </div>
        </div>

        {/* Step label */}
        <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-brand-gold/70 mb-3">
          Step {String(index + 1).padStart(2, '0')}
        </p>

        <h3 className="text-xl font-black text-white mb-3 leading-snug">
          {step.title}
        </h3>
        <p className="text-sm text-white/45 leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}
