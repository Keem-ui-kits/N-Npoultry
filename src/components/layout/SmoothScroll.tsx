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
    const hash = window.location.hash;
    let id: ReturnType<typeof setTimeout> | undefined;
    if (hash) {
      // Cross-page hash navigation: poll until the target element is in the DOM,
      // then jump immediately so the user lands exactly on the section.
      let attempts = 0;
      const tryScroll = () => {
        let target: HTMLElement | null = null;
        try {
          target = document.querySelector(hash);
        } catch {
          // hash is not a valid CSS selector (e.g. tracking params like #sid=…)
          return;
        }
        if (target && lenisRef.current) {
          lenisRef.current.scrollTo(target, { offset: -88, immediate: true });
        } else if (++attempts < 20) {
          id = setTimeout(tryScroll, 50);
        }
      };
      id = setTimeout(tryScroll, 50);
    } else if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    return () => { clearTimeout(id); };
  }, [pathname]);

  // Handle hash-link navigation so Lenis intercepts #anchor scrolls
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && lenisRef.current) {
        let target: Element | null = null;
        try {
          target = document.querySelector(hash);
        } catch {
          return;
        }
        if (target) lenisRef.current.scrollTo(target as HTMLElement);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => { window.removeEventListener('hashchange', handleHashChange); };
  }, []);

  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Cleanup any existing instance first
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }

    if (typeof window === 'undefined' || prefersReduced) return;

    try {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
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

      // Sync with GSAP ScrollTrigger
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        lenis.on('scroll', () => {
          ScrollTrigger.update();
        });
      });

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
  }, [prefersReduced]);

  return <>{children}</>;
}
