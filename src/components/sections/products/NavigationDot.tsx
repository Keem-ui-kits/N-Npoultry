'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef, useEffect } from 'react';
import type { Product } from '@/types/product';

interface NavigationDotProps {
  product: Product;
  index: number;
  containerRef: React.RefObject<HTMLElement | null>;
}

export function NavigationDot({
  product,
  index,
  containerRef,
}: NavigationDotProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const rangeStart = index * 0.3;
  const rangeEnd = index * 0.3 + 0.3;

  const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

  useEffect(() => {
    if (!dotRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom-=150vh top',
        scrub: true,
        onUpdate: (self) => {
          if (!dotRef.current) return;

          const p = self.progress;
          const centerProgress = (rangeStart + rangeEnd) / 2;
          const distanceFromCenter = Math.abs(p - centerProgress);
          const maxDistance = (rangeEnd - rangeStart) / 2;

          const mappedProgress = Math.max(0, Math.min(1, 1 - distanceFromCenter / maxDistance));
          const easedProgress = Math.pow(mappedProgress, 0.7);

          const scale = lerp(1, 1.5, easedProgress);
          
          // Using colorRgb from the Product interface to fix hex parsing bug
          const [r1, g1, b1] = product.colorRgb;

          const r = Math.round(lerp(200, r1, easedProgress));
          const g = Math.round(lerp(200, g1, easedProgress));
          const b = Math.round(lerp(200, b1, easedProgress));
          const a = lerp(0.3, 1, easedProgress);

          gsap.set(dotRef.current, {
            scale: scale,
            backgroundColor: `rgba(${r},${g},${b},${a})`,
          });
        },
      });
    }, dotRef);

    return () => {
      ctx.revert();
    };
  }, [index, product.colorRgb, containerRef, rangeEnd, rangeStart]);

  return (
    <button className="relative group cursor-default" aria-label={`Skip to ${product.title}`}>
      <div
        ref={dotRef}
        className="w-3 h-3 rounded-full bg-black/20 group-hover:bg-black/40 transition-colors"
      />
      <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono whitespace-nowrap bg-card text-foreground px-2 py-1 rounded shadow-md border border-border">
        {product.title}
      </div>
    </button>
  );
}
