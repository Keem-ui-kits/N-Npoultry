'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

/**
 * Canvas-based particle system for the Hero background.
 * Uses a simple Perlin-style noise approximation (smooth random drift)
 * without an external dependency. When simplex-noise is installed, replace
 * the `drift` function with createNoise2D() from 'simplex-noise' for
 * true Perlin flow-field behaviour.
 *
 * Falls back to null (hidden canvas) when prefers-reduced-motion is set.
 */

const PARTICLE_COUNT_DESKTOP = 120;
const PARTICLE_COUNT_MOBILE = 40;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  seed: number;
}

/** Smooth pseudo-random drift using sine waves as a noise substitute. */
function drift(x: number, y: number, t: number, seed: number): { dx: number; dy: number } {
  const angle =
    Math.sin(x * 0.003 + t * 0.4 + seed) * Math.cos(y * 0.003 + t * 0.3 + seed * 2.1);
  return { dx: Math.cos(angle) * 0.3, dy: Math.sin(angle) * 0.3 };
}

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: 0,
      vy: 0,
      size: Math.random() * 2.5 + 1,
      seed: Math.random() * 100,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;

      for (const p of particles) {
        const { dx, dy } = drift(p.x, p.y, t, p.seed);
        p.vx = p.vx * 0.9 + dx * 0.1;
        p.vy = p.vy * 0.9 + dy * 0.1;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x += canvas.width;
        if (p.x > canvas.width) p.x -= canvas.width;
        if (p.y < 0) p.y += canvas.height;
        if (p.y > canvas.height) p.y -= canvas.height;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(236, 204, 116, 0.18)`; // brand-gold at low opacity
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full opacity-60"
      aria-hidden="true"
      style={{ willChange: 'transform' }}
    />
  );
}
