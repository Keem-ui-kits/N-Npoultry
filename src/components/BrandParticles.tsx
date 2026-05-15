"use client";

import { gsap } from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";

export default function BrandParticles() {
  const [dimensions, setDimensions] = useState({ width: 1000, height: 600 });
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
    let rafId: number | null = null;

    const updateDimensions = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const el = containerRef.current;
        if (el) {
          setDimensions({ width: el.offsetWidth, height: el.offsetHeight });
        }
        rafId = null;
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions, { passive: true });

    return () => {
      window.removeEventListener("resize", updateDimensions);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const dots = useMemo(() => {
    if (!mounted) return [];

    const seed = (n: number) => {
      const x = Math.sin(n) * 10000;
      return x - Math.floor(x);
    };

    return Array.from({ length: 5 }, (_, i) => {
      const baseSeed = i * 200;
      const numKeyframes = 5;
      // Alternate gold and orange
      const isGold = i % 2 === 0;
      return {
        id: i,
        isGold,
        initialX: seed(baseSeed) * dimensions.width,
        initialY: seed(baseSeed + 1) * dimensions.height,
        keyframes: {
          x: Array.from(
            { length: numKeyframes },
            (_, j) => seed(baseSeed + 2 + j) * dimensions.width
          ),
          y: Array.from(
            { length: numKeyframes },
            (_, j) => seed(baseSeed + 10 + j) * dimensions.height
          ),
        },
        durationX: 12 + i * 3 + seed(baseSeed + 20) * 5,
        durationY: 15 + i * 4 + seed(baseSeed + 21) * 5,
      };
    });
  }, [dimensions.width, dimensions.height, mounted]);

  useEffect(() => {
    if (!mounted || dots.length === 0 || !containerRef.current) return;

    const ctx = gsap.context(() => {
      dots.forEach((dot, i) => {
        const dotEl = dotRefs.current[i];
        if (!dotEl) return;

        gsap.set(dotEl, {
          x: dot.initialX,
          y: dot.initialY,
        });

        gsap.to(dotEl, {
          keyframes: dot.keyframes.x.map((x) => ({ x })),
          duration: dot.durationX,
          repeat: -1,
          ease: "sine.inOut",
        });

        gsap.to(dotEl, {
          keyframes: dot.keyframes.y.map((y, idx) => ({
            y,
            opacity: idx % 2 === 0 ? 0.35 : 0.65,
          })),
          duration: dot.durationY,
          repeat: -1,
          ease: "power1.inOut",
        });
      });
    }, containerRef);

    return () => { ctx.revert(); };
  }, [dots, mounted]);

  if (!mounted) {
    return (
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ contain: "layout style paint" }}
        suppressHydrationWarning
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ contain: "layout style paint" }}
    >
      {dots.map((dot, i) => (
        <div
          key={`brand-dot-${String(dot.id)}`}
          ref={(el) => {
            dotRefs.current[i] = el;
          }}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: dot.isGold
              ? "rgba(236, 204, 116, 0.45)"
              : "rgba(245, 146, 104, 0.45)",
            boxShadow: dot.isGold
              ? "0 0 6px 2px rgba(236, 204, 116, 0.3)"
              : "0 0 6px 2px rgba(245, 146, 104, 0.3)",
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
