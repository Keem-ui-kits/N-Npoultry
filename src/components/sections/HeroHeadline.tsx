'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

/**
 * Hero headline with a character-by-character stagger reveal.
 * Line 1 ("Farm-Fresh") slides up char-by-char from a clip mask.
 * Line 2 ("Nutritious Eggs") uses word-level opacity reveal to preserve
 * the gradient-brand-text background-clip treatment.
 *
 * When @chenglou/pretext is installed, replace the manual DOM splitting below
 * with Pretext's prepareWithSegments API for precise font-metric-aware layout.
 */
export function HeroHeadline() {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    if (!l1 || !l2 || prefersReducedMotion) return;

    // Line 1: char split, slide up from clip mask
    const chars = l1.innerText.split('').map((ch) => {
      const outer = document.createElement('span');
      outer.style.display = 'inline-block';
      outer.style.overflow = 'hidden';
      const inner = document.createElement('span');
      inner.style.display = 'inline-block';
      inner.textContent = ch === ' ' ? '\u00a0' : ch;
      outer.appendChild(inner);
      return { outer, inner };
    });
    l1.innerHTML = '';
    chars.forEach(({ outer }) => { l1.appendChild(outer); });

    gsap.set(chars.map((c) => c.inner), { y: '110%' });
    gsap.to(chars.map((c) => c.inner), {
      y: '0%',
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.04,
      delay: 0.1,
    });

    // Line 2: word-level opacity reveal (preserves gradient background-clip)
    const words = l2.innerText.split(/(\s+)/);
    l2.innerHTML = words
      .map((w) =>
        w.trim()
          ? `<span class="inline-block word-g">${w}</span>`
          : w,
      )
      .join('');
    const wordEls = l2.querySelectorAll<HTMLElement>('.word-g');
    gsap.set(wordEls, { opacity: 0, y: 20 });
    gsap.to(wordEls, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.1,
      delay: 0.5,
    });
  }, [prefersReducedMotion]);

  return (
    <h1 className="mb-6 text-5xl font-black tracking-tight md:text-7xl lg:text-[5.5rem] w-full uppercase break-words leading-[0.9] overflow-hidden">
      <span ref={line1Ref} className="block">
        Farm-Fresh
      </span>
      <span ref={line2Ref} className="gradient-brand-text block">
        Nutritious Eggs
      </span>
    </h1>
  );
}
