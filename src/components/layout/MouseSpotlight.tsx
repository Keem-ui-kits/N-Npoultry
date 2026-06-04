'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export default function MouseSpotlight() {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReduced) return;
    
    let active = true;
    const init = () => {
      if (!active) return;
      
      const updateBackground = () => {
        if (ref.current && active) {
          ref.current.style.background = `radial-gradient(800px circle at ${mousePosition.current.x.toFixed(1)}px ${mousePosition.current.y.toFixed(1)}px, rgba(var(--brand-gold-rgb), 0.05), rgba(var(--brand-gold-rgb), 0) 150px)`;
        }
        rafId.current = null;
      };

      const handleMouseMove = (e: MouseEvent) => {
        mousePosition.current = { x: e.clientX, y: e.clientY };
        rafId.current ??= requestAnimationFrame(updateBackground);
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    };

    // Defer initialization to after initial paint
    const idleId = window.requestIdleCallback(() => init());

    return () => {
      active = false;
      window.cancelIdleCallback(idleId);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[100] hidden md:block"
      style={{
        contain: 'layout style paint',
      }}
    />
  );
}
