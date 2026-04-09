'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from './use-reduced-motion';

interface UseTextRevealOptions {
  /** Which units to split on. Defaults to 'words'. */
  splitType?: 'chars' | 'words' | 'lines';
  /** Delay before the animation starts (seconds). */
  delay?: number;
  /** Only animate once when the element first enters the viewport. */
  once?: boolean;
}

/**
 * Attaches a GSAP-powered fade-up text reveal to the returned ref.
 * Each word/char slides up from a clip mask when the element enters the viewport.
 * Respects prefers-reduced-motion — the element is simply shown without animation.
 *
 * When @chenglou/pretext is installed, swap the GSAP split logic below for
 * Pretext's `prepareWithSegments` / `layoutWithLines` APIs for pixel-perfect
 * character-level measurement.
 */
export function useTextReveal<T extends HTMLElement>(
  options: UseTextRevealOptions = {},
) {
  const { delay = 0, once = true } = options;
  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;

    // Split text into word spans so each word can animate independently
    const originalHTML = el.innerHTML;
    const words = el.innerText.split(/(\s+)/);
    el.innerHTML = words
      .map((w) =>
        w.trim()
          ? `<span class="inline-block overflow-hidden"><span class="inline-block word-unit">${w}</span></span>`
          : w,
      )
      .join('');

    const units = el.querySelectorAll<HTMLElement>('.word-unit');

    gsap.set(units, { y: '110%', opacity: 0 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          gsap.to(units, {
            y: '0%',
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.06,
            delay,
          });
          if (once) observer.disconnect();
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (el) el.innerHTML = originalHTML;
    };
  }, [prefersReducedMotion, delay, once]);

  return ref;
}
