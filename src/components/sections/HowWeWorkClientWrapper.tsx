'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { ReactNode} from 'react';
import { useRef } from 'react';
import { useIsMobile } from '@/hooks/use-is-mobile';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface HowWeWorkClientWrapperProps {
  children: ReactNode;
}

export function HowWeWorkClientWrapper({ children }: HowWeWorkClientWrapperProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const title = containerRef.current.querySelector('[data-hww-title]');
      const span1 = containerRef.current.querySelector('[data-hww-span1]');
      const span2 = containerRef.current.querySelector('[data-hww-span2]');
      const para = containerRef.current.querySelector('[data-hww-para]');
      const line = containerRef.current.querySelector('[data-hww-line]');
      const glow = containerRef.current.querySelector('[data-hww-glow]');
      const header = containerRef.current.querySelector('[data-hww-header]');

      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: header,
              start: 'top bottom-=100px',
              toggleActions: 'play none none none',
            },
          },
        );
      }

      if (!isMobile) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            if (title) {
              gsap.set(title, {
                rotateX: 18 - progress * 36,
                rotateY: -12 + progress * 24,
                y: 60 - progress * 120,
                translateZ: -60 + progress * 120,
                scale: 0.92 + (progress < 0.5 ? progress * 0.22 : (1 - progress) * 0.22),
                transformPerspective: 1200,
              });
            }

            if (span1) {
              gsap.set(span1, { translateZ: progress * 40 });
            }

            if (span2) {
              gsap.set(span2, {
                translateZ: 40 - progress * 80,
                rotateY: -8 + progress * 16,
              });
            }

            if (para) {
              gsap.set(para, {
                rotateX: 10 - progress * 20,
                y: 30 - progress * 60,
                translateZ: -30 + progress * 60,
              });
            }
          },
        });
      }

      if (line) {
        gsap.fromTo(
          line,
          { width: 0 },
          {
            width: '100%',
            duration: 1.5,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: line,
              start: 'top bottom-=100px',
              toggleActions: 'play none none none',
            },
          },
        );
      }

      if (glow) {
        gsap.fromTo(
          glow,
          { opacity: 0.4 },
          {
            opacity: 0.7,
            duration: 1.5,
            delay: 0.5,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
          },
        );
      }
    },
    { scope: containerRef, dependencies: [isMobile] },
  );

  return (
    <section ref={containerRef} id="how-we-work" className="py-16 sm:py-24 md:py-32 overflow-hidden relative z-20 bg-background transition-colors duration-500">
      {children}
    </section>
  );
}
