'use client';

import Lenis from 'lenis';
import type { ReactNode} from 'react';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReduced) return;

    try {
      history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        if (lenisRef.current) {
          lenisRef.current.raf(time);
          rafIdRef.current = requestAnimationFrame(raf);
        }
      }

      rafIdRef.current = requestAnimationFrame(raf);
    } catch (e) {
      console.error('Lenis init error:', e);
    }

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return <>{children}</>;
}
