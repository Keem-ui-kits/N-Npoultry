'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import type { Product } from '@/types/product';

gsap.registerPlugin(ScrollTrigger);

interface ProductCardProps {
  product: Product;
  index: number;
  isMobile: boolean;
}

export function ProductCard({ product, index, isMobile }: ProductCardProps) {
  const rangeStart = index * 0.3;
  const rangeEnd = (index + 1) * 0.3;

  const enterStart =
    index === 0 ? (isMobile ? 0.02 : 0.02) : isMobile ? rangeStart - 0.05 : rangeStart - 0.1;
  const enterEnd =
    index === 0 ? (isMobile ? 0.12 : 0.15) : isMobile ? rangeStart + 0.03 : rangeStart + 0.05;
  const exitStart = isMobile ? rangeEnd - 0.03 : rangeEnd - 0.05;
  const exitEnd = isMobile ? rangeEnd + 0.05 : rangeEnd + 0.05;

  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const contentRotateX = useRef(0);
  const contentRotateY = useRef(0);

  const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
  const mapRange = (
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number,
  ) => {
    if (value <= inMin) return outMin;
    if (value >= inMax) return outMax;
    const t = (value - inMin) / (inMax - inMin);
    return lerp(outMin, outMax, t);
  };

  const getValue = (progress: number, ranges: number[], values: number[]): number => {
    if (!ranges.length || !values.length) return 0;
    if (progress <= ranges[0]!) return values[0]!;
    if (progress >= ranges[ranges.length - 1]!) return values[values.length - 1]!;

    for (let i = 0; i < ranges.length - 1; i++) {
        const minValue = ranges[i]!;
        const maxValue = ranges[i + 1]!;
        const outMin = values[i]!;
        const outMax = values[i + 1]!;

        if (progress >= minValue && progress <= maxValue) {
            return mapRange(progress, minValue, maxValue, outMin, outMax);
        }
    }
    return values[0]!;
  };

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      const container = cardRef.current?.closest('section');
      if (!container) return;

      let targetRotateX = 0;
      let targetRotateY = 0;
      let rafId: number | null = null;

      const updateMouseRotation = () => {
        if (contentRef.current && !isMobile) {
          contentRotateX.current = lerp(contentRotateX.current, targetRotateX, 0.1);
          contentRotateY.current = lerp(contentRotateY.current, targetRotateY, 0.1);

          gsap.set(contentRef.current, {
            rotateX: contentRotateX.current,
            rotateY: contentRotateY.current,
          });
        }

        if (
          Math.abs(contentRotateX.current - targetRotateX) > 0.01 ||
          Math.abs(contentRotateY.current - targetRotateY) > 0.01
        ) {
          rafId = requestAnimationFrame(updateMouseRotation);
        } else {
          rafId = null;
        }
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!cardRef.current || isMobile) return;

        if (!rafId) {
          rafId = requestAnimationFrame(() => {
            if (!cardRef.current) return;

            const rect = cardRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            mousePos.current = {
              x: e.clientX - centerX,
              y: e.clientY - centerY,
            };

            targetRotateX = mapRange(mousePos.current.y, -300, 300, 5, -5);
            targetRotateY = mapRange(mousePos.current.x, -300, 300, -5, 5);

            updateMouseRotation();
            rafId = null;
          });
        }
      };


      ScrollTrigger.create({
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self: any) => {
          const p = self.progress;

          const opacity = getValue(p, [enterStart, enterEnd, exitStart, exitEnd], [0, 1, 1, 0]);

          const x = isMobile
            ? 0
            : getValue(p, [enterStart, enterEnd, exitStart, exitEnd], [1920, 96, -96, -1920]);
          const y = isMobile
            ? getValue(p, [enterStart, enterEnd, exitStart, exitEnd], [100, 0, 0, -100])
            : getValue(p, [enterStart, enterEnd, exitStart, exitEnd], [540, 22, -22, -540]);
          const rotateY = isMobile
            ? 0
            : getValue(p, [enterStart, enterEnd, exitStart, exitEnd], [45, 5, -5, -45]);
          const rotateZ = isMobile
            ? 0
            : getValue(p, [enterStart, enterEnd, exitStart, exitEnd], [10, 2, -2, -10]);
          const z = isMobile
            ? 0
            : getValue(p, [enterStart, enterEnd, exitStart, exitEnd], [-1200, 0, 100, -1200]);
          const scale = isMobile
            ? getValue(p, [enterStart, enterEnd, exitStart, exitEnd], [0.9, 1, 1, 0.9])
            : getValue(p, [enterStart, enterEnd, exitStart, exitEnd], [0.6, 1, 1.05, 0.6]);

          const contentParallaxX = isMobile ? 0 : mapRange(p, enterStart, exitEnd, 100, -100);
          const titleParallaxX = isMobile ? 0 : mapRange(p, enterStart, exitEnd, 200, -200);

          if (cardRef.current) {
            gsap.set(cardRef.current, {
              opacity,
              x,
              y,
              rotateY,
              rotateZ,
              z,
              scale,
              transformPerspective: 1000,
              zIndex: 10 - index,
            });
          }

          if (titleRef.current) {
            gsap.set(titleRef.current, {
              x: titleParallaxX,
              translateZ: 40,
            });
          }

          if (paraRef.current) {
            gsap.set(paraRef.current, {
              x: contentParallaxX,
              translateZ: 30,
            });
          }

          if (detailsRef.current) {
            gsap.set(detailsRef.current, {
              x: contentParallaxX,
              translateZ: 25,
            });
          }

          if (imageRef.current) {
            gsap.set(imageRef.current, {
              translateZ: 50,
              rotateY: contentParallaxX / 10,
            });
          }
        },
      });

      if (cardRef.current && !isMobile) {
        cardRef.current.addEventListener('mousemove', handleMouseMove as EventListener, { passive: true });
      }

      return () => {
        if (cardRef.current) {
          cardRef.current.removeEventListener('mousemove', handleMouseMove as EventListener);
        }
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
      };
    }, cardRef);

    return () => { ctx.revert(); };
  }, [index, isMobile]);

  return (
    <div
      ref={cardRef}
      className="absolute top-52 md:top-auto w-[92vw] sm:w-[85vw] max-w-6xl h-auto md:h-[65vh] flex flex-col md:flex-row overflow-visible rounded-3xl bg-card dark:bg-brand-dark shadow-2xl origin-center preserve-3d perspective-1000 border border-border dark:border-white/10"
      style={{
        willChange: 'transform, opacity',
      }}
    >
      <div
        ref={contentRef}
        className="flex-1 p-8 md:p-12 flex flex-col justify-center relative z-10 preserve-3d"
      >
        <h3
          ref={titleRef}
          className="text-foreground dark:text-white text-2xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 tracking-tight preserve-3d"
        >
          {product.title}{' '}
          <span className="text-brand-gold">
            {product.titleAccent}
          </span>
        </h3>

        <p
          ref={paraRef}
          className="text-foreground/80 dark:text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed mb-6 md:mb-8 preserve-3d"
        >
          {product.description}
        </p>

        <div
          ref={detailsRef}
          className="flex flex-col gap-3 preserve-3d"
        >
          {product.details.map((detail, i) => (
            <div
              key={i}
              className="flex items-start gap-3 text-foreground/70 dark:text-gray-400 text-sm md:text-base lg:text-lg font-medium"
            >
              <span className="mt-1 text-brand-gold">✦</span>
              <span>{detail}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="flex-1 relative flex items-center justify-center p-8 overflow-hidden md:overflow-visible preserve-3d"
      >
        <div
          ref={imageRef}
          className="relative w-full h-[300px] md:h-full flex items-center justify-center pointer-events-none drop-shadow-2xl"
        >
          <Image
            src={product.image}
            alt={product.title}
            className="object-contain max-w-[120%] max-h-[120%] scale-110"
            fill
            sizes="(max-width: 768px) 90vw, 50vw"
            priority={index === 0}
            quality={85}
          />
        </div>
      </div>
    </div>
  );
}
