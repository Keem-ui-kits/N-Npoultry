'use client';

import { products } from '@/content/products';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect } from 'react';

export function ProductsDetailed() {
  useEffect(() => {
    const handleScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          // Calculate offset: navbar height (80px) + extra padding (40px)
          const offset = 120;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    // Run on mount
    const timeoutId = setTimeout(handleScroll, 500);
    
    // Also listen for hash changes
    window.addEventListener('hashchange', handleScroll);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('hashchange', handleScroll);
    };
  }, []);

  return (
    <section id="products" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-36">
        {products.map((product, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={product.id}
              id={product.id}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                isEven ? '' : 'lg:[&>*:first-child]:order-2'
              }`}
            >
              {/* Image (Desktop Only) */}
              <div className="hidden lg:flex relative aspect-square bg-brand-dark/60 rounded-[3rem] border border-white/10 items-center justify-center overflow-hidden group shadow-2xl">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: `radial-gradient(ellipse at center, ${product.color} 0%, transparent 70%)`,
                  }}
                />
                <Image
                  src={product.image}
                  alt={`${product.title} ${product.titleAccent}`}
                  fill
                  className="object-contain p-10 group-hover:scale-105 transition-transform duration-700"
                  sizes="50vw"
                  priority={index === 0}
                />
              </div>

              {/* Content / Mobile Background */}
              <div className="relative space-y-8 p-8 md:p-12 lg:p-0 rounded-[2.5rem] overflow-hidden lg:overflow-visible">
                {/* Mobile Background Image (Only visible < lg) */}
                <div className="absolute inset-0 lg:hidden -z-10">
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    className="object-contain opacity-15 scale-110 blur-[2px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90" />
                </div>
                {/* Product Number */}
                <span
                  className="text-7xl md:text-8xl font-black leading-none select-none"
                  style={{
                    WebkitTextStroke: '1px rgba(255,255,255,0.1)',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  0{index + 1}
                </span>

                <div>
                  <h2 className="text-4xl md:text-5xl xl:text-6xl font-black uppercase tracking-tight leading-none mb-4">
                    {product.title}{' '}
                    <span className="text-brand-gold">{product.titleAccent}</span>
                  </h2>
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed italic">
                    {product.fullDescription || product.description}
                  </p>
                </div>

                {/* Key Features */}
                {product.features && product.features.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-brand-gold">
                      Key Features
                    </h3>
                    <ul className="space-y-3">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-base md:text-lg font-medium text-white">
                          <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
