'use client';

import { useEffect, useRef } from 'react';

export default function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let lastUpdate = 0;
    const throttleMs = 16; // Smoother 60fps-ish target

    const updateBackground = () => {
      if (typeof window === 'undefined') return;

      const now = performance.now();
      if (now - lastUpdate < throttleMs) {
        rafId.current = requestAnimationFrame(updateBackground);
        return;
      }
      lastUpdate = now;

      if (ref.current) {
        // Using N&N primary colors: var(--brand-dark) (dark blue) or var(--brand-gold) (gold)
        // Let's use a subtle gold/orange burst to match the premium theme
        ref.current.style.background = `radial-gradient(800px circle at ${mousePosition.current.x}px ${mousePosition.current.y}px, rgba(var(--brand-gold-rgb), 0.05), rgba(var(--brand-gold-rgb), 0) 150px)`;
      }
      rafId.current = requestAnimationFrame(updateBackground);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(updateBackground);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(updateBackground);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[100] hidden md:block"
      style={{
        willChange: 'background',
        contain: 'layout style paint',
      }}
    />
  );
}
