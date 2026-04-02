'use client';

import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useIsMobile } from '@/hooks/use-is-mobile';
import type { Product } from '@/types/product';
import { products } from '@/content/products';
import { ProductCard } from './ProductCard';
import { NavigationDot } from './NavigationDot';
import { ScrollingTextWrapper } from './ScrollingTextWrapper';

const StackingCards = dynamic(() => import('@/components/ui/stacking-cards'), { ssr: false });

interface ProductsClientProps {
  products: Product[];
}

export function ProductsClient({ products }: ProductsClientProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && titleRef.current) {
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'top+=15% top',
          scrub: true,
        },
        opacity: 0,
        y: -150,
        scale: 0.9,
        filter: 'blur(4px)',
      });
    }
  }, [isMobile]);

  return (
    <section
      ref={containerRef}
      id="products"
      className={`relative w-full bg-gradient-to-b from-white to-[#f8f9fa] dark:from-background dark:to-muted/20 ${isMobile ? 'h-auto py-8 pb-16 -mt-8' : 'h-[600vh]'}`}
    >
      <div
        className={isMobile ? 'relative px-6' : 'sticky overflow-hidden top-0 h-screen flex items-center justify-center'}
      >
        {/* Navigation Dots */}
        {!isMobile && (
          <nav className="absolute bottom-6 sm:bottom-12 left-4 sm:left-1/2 sm:-translate-x-1/2 z-50 flex items-center gap-4 bg-white/40 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/50">
            {products.map((product, index) => (
              <NavigationDot
                key={product.id}
                product={product}
                index={index}
                containerRef={containerRef}
              />
            ))}
          </nav>
        )}

        {/* Scrolling Background Text */}
        {!isMobile && (
          <ScrollingTextWrapper
            containerRef={containerRef}
            className="absolute bottom-0 h-full leading-[100vh] flex justify-center whitespace-nowrap text-[15vh] sm:text-[25vw] md:text-[35vw] font-black select-none pointer-events-none left-0 opacity-10 text-brand-dark dark:text-white"
            style={{
              WebkitTextStroke: '2px currentColor',
              WebkitTextFillColor: 'transparent',
              y: '10%',
            }}
          >
            N&amp;N POULTRY PALACE &bull; N&amp;N POULTRY PALACE &bull;{' '}
          </ScrollingTextWrapper>
        )}

        {/* Section Title (pinned briefly) */}
        <header
          ref={titleRef}
          className={isMobile ? 'relative mb-2 sm:mb-8' : 'absolute top-20 md:top-24 left-4 md:left-12 z-20'}
        >
          <h2 className="text-foreground dark:text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight uppercase">
            THREE PRODUCTS, <br className="hidden sm:block" />
            <span className="gradient-brand-text">ONE TRUSTED</span> SOURCE
          </h2>
          <p className="text-muted-foreground dark:text-zinc-400 text-lg md:text-xl font-medium mt-2">
            Freshness you can count on
          </p>
        </header>

        {/* 3D Product Cards (Desktop) */}
        {!isMobile ? (
          <div className="relative w-full h-full flex items-center justify-center pt-16 overflow-visible">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} isMobile={isMobile} />
            ))}
          </div>
        ) : (
          /* Stacking Cards (Mobile) */
          <div className="relative mt-0 pb-12">
            <StackingCards products={products} />
          </div>
        )}
      </div>
    </section>
  );
}

export function Products() {
  return <ProductsClient products={products} />;
}
