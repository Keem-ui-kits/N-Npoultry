'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { cn } from './utils';
import Image from 'next/image';

interface ProductData {
  title: string;
  titleAccent: string;
  description: string;
  image: string;
  color: string;
  details: string[];
}

const Card = ({ i, product }: { i: number; product: ProductData }) => {
  return (
    <div className="min-h-[560px] flex items-center justify-center sticky top-20 sm:top-24">
      <motion.div
        initial={{ scale: 0.9, y: 50, opacity: 0 }}
        whileInView={{ scale: 1, y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          top: `calc(2vh + ${String(i * 25)}px)`,
        }}
        className={cn(
          'relative flex overflow-hidden flex-col h-[520px] w-[94%] sm:w-[85%] rounded-[2.5rem] p-8 sm:p-12 origin-top shadow-2xl bg-[#fdfdfd] dark:bg-brand-dark text-white border border-white/10',
        )}
      >
        <div className="relative z-20 flex flex-col h-full bg-transparent">
          {/* Main Content */}
          <div className="relative z-20 flex flex-col h-full">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-none uppercase mb-6">
              {product.title}{' '}
              <span
                className="text-brand-gold"
              >
                {product.titleAccent}
              </span>
            </h2>

            <div className="flex flex-col gap-3">
              <p className="text-base sm:text-lg text-white/70 font-medium leading-relaxed max-w-xl">
                {product.description}
              </p>

              <div className="flex flex-col gap-2 mt-1">
                {product.details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 text-white/60 text-sm sm:text-base font-medium"
                  >
                    <span style={{ color: product.color }}>✦</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Background Image */}
          <div
            className={cn(
              'absolute bottom-0 right-0 left-0 z-10 overflow-visible',
              product.title === 'Table' ? 'h-[280px] sm:h-[320px]' : 'h-[220px] sm:h-[260px]',
            )}
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 94vw, 85vw"
              className={cn(
                'object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] object-bottom',
                product.title === 'Table'
                  ? 'scale-125 sm:scale-150 translate-y-4'
                  : 'scale-100 sm:scale-110 translate-y-2',
              )}
            />
          </div>
        </div>

        {/* Glow and decorative elements */}
        <div
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none"
          style={{ backgroundColor: product.color }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none"
          style={{ backgroundColor: product.color }}
        />
      </motion.div>
    </div>
  );
};

export default function StackingCards({ products }: { products: ProductData[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || products.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      {products.map((product, i) => (
        <Card key={`p_${String(i)}`} i={i} product={product} />
      ))}
    </div>
  );
}
