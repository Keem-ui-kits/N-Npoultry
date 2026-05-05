'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Send, MessageCircle, Users } from 'lucide-react';
import { siteConfig } from '@/content/site';
import type { Product } from '@/types/product';
import { lerp, mapRange, getValueFromRanges } from '@/lib/math';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
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
  const prefersReduced = useReducedMotion();


  useEffect(() => {
    if (!cardRef.current || prefersReduced) return;

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

        rafId ??= requestAnimationFrame(() => {
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
      };


      ScrollTrigger.create({
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self: ScrollTrigger) => {
          const p = self.progress;

          const opacity = getValueFromRanges(p, [enterStart, enterEnd, exitStart, exitEnd], [0, 1, 1, 0]);

          const x = isMobile
            ? 0
            : getValueFromRanges(p, [enterStart, enterEnd, exitStart, exitEnd], [1920, 96, -96, -1920]);

          const y = isMobile
            ? getValueFromRanges(p, [enterStart, enterEnd, exitStart, exitEnd], [100, 0, 0, -100])
            : getValueFromRanges(p, [enterStart, enterEnd, exitStart, exitEnd], [540, 22, -22, -540]);
          const rotateY = isMobile
            ? 0
            : getValueFromRanges(p, [enterStart, enterEnd, exitStart, exitEnd], [45, 5, -5, -45]);
          const rotateZ = isMobile
            ? 0
            : getValueFromRanges(p, [enterStart, enterEnd, exitStart, exitEnd], [10, 2, -2, -10]);
          const z = isMobile
            ? 0
            : getValueFromRanges(p, [enterStart, enterEnd, exitStart, exitEnd], [-1200, 0, 100, -1200]);
          const scale = isMobile
            ? getValueFromRanges(p, [enterStart, enterEnd, exitStart, exitEnd], [0.9, 1, 1, 0.9])
            : getValueFromRanges(p, [enterStart, enterEnd, exitStart, exitEnd], [0.6, 1, 1.05, 0.6]);

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
      className="absolute top-52 md:top-auto w-[92vw] sm:w-[85vw] max-w-6xl h-auto md:h-[65vh] flex flex-col md:flex-row overflow-visible rounded-3xl bg-card dark:bg-brand-dark shadow-2xl origin-center preserve-3d perspective-1000 border border-border dark:border-white/10 group/card"
      style={{
        willChange: 'transform, opacity',
      }}
    >
      <div
        ref={contentRef}
        className="flex-1 p-8 md:p-12 flex flex-col justify-center relative z-10 preserve-3d"
      >
        <div className="flex items-center gap-3 mb-2 preserve-3d">
          {product.popular && (
            <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/25 flex-shrink-0">
              Most Popular
            </span>
          )}
        </div>
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

        {product.bestFor && product.bestFor.length > 0 && (
          <div className="mt-5 preserve-3d">
            <div className="flex items-center gap-1.5 mb-2">
              <Users className="w-3.5 h-3.5 text-white/35" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-white/35">
                Best for
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.bestFor.map((audience, i) => (
                <span
                  key={i}
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 text-white/60 border border-white/10"
                >
                  {audience}
                </span>
              ))}
            </div>
          </div>
        )}

        {product.objections && product.objections.length > 0 && (
          <div className="mt-5 space-y-2 preserve-3d">
            {product.objections.map((obj, i) => (
              <details key={i} className="group">
                <summary className="flex items-center gap-2 cursor-pointer text-xs text-white/45 hover:text-white/70 transition-colors list-none">
                  <span className="text-brand-gold/60 text-base leading-none">›</span>
                  <span className="font-medium">{obj.q}</span>
                </summary>
                <p className="mt-1 ml-4 text-xs text-white/40 leading-relaxed">{obj.a}</p>
              </details>
            ))}
          </div>
        )}

        <div className="mt-8 flex gap-4 preserve-3d">
          <Link
            href={`/quote?product=${product.id}`}
            className="gradient-brand text-brand-dark px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-brand-gold/20 transition-all flex items-center gap-2 group transform hover:scale-105 active:scale-95"
          >
            Request a Quote
            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <a
            href={`https://wa.me/${siteConfig.contacts.whatsapp}?text=${encodeURIComponent(`Hi, I'd like to order ${product.title} ${product.titleAccent}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 rounded-full font-bold hover:bg-[#25D366]/20 transition-all flex items-center gap-2 group transform hover:scale-105 active:scale-95"
          >
            WhatsApp
            <MessageCircle className="w-4 h-4" />
          </a>
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

        {/* Peek-behind hover panel — desktop only */}
        {product.bestFor && product.bestFor.length > 0 && (
          <div
            className="absolute bottom-0 left-0 right-0 hidden md:block pointer-events-none translate-y-full group-hover/card:translate-y-0 transition-transform duration-300 ease-out"
            aria-hidden="true"
          >
            <div className="px-8 pb-6 pt-10 bg-gradient-to-t from-black/80 via-black/60 to-transparent rounded-br-3xl">
              <p className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-2">
                Most popular with
              </p>
              <div className="flex flex-wrap gap-2">
                {product.bestFor.map((audience, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/20"
                  >
                    {audience}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
