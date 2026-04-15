'use client';

import Image from 'next/image';
import type { Product } from '@/types/product';

function resolveColor(color: string): string {
  if (color === 'var(--brand-gold)') return '#eccc74';
  // Secondary products use brand-orange — red/green are off-brand
  if (color === 'var(--product-green)' || color === 'var(--product-red)') return '#f59268';
  return color;
}

interface RevealProductItemProps {
  product: Product;
  index: number;
}

function RevealProductItem({ product, index }: RevealProductItemProps) {
  const accentColor = resolveColor(product.color);

  return (
    <div
      className="group relative flex items-center justify-between py-5 border-b border-white/8 last:border-0 overflow-visible"
    >
      {/* Left: index + title */}
      <div className="flex items-baseline gap-4 min-w-0">
        <span
          className="text-sm font-black tabular-nums shrink-0 transition-colors duration-300"
          style={{ color: `${accentColor}60` }}
          aria-hidden="true"
        >
          0{index + 1}
        </span>

        <span className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-none text-white transition-opacity duration-500 group-hover:opacity-30">
          {product.title}{' '}
          <span style={{ color: accentColor }}>
            {product.titleAccent}
          </span>
        </span>
      </div>

      {/* Mobile/tablet: image always visible inline */}
      <div
        className="lg:hidden pointer-events-none relative shrink-0 w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)]"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 z-10 opacity-20 mix-blend-multiply"
          style={{ background: `radial-gradient(ellipse at center, ${accentColor}, transparent 70%)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
        <Image
          src={product.image}
          alt=""
          fill
          className="object-contain p-3 drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
          sizes="(max-width: 640px) 80px, 112px"
        />
      </div>

      {/* Desktop: hover-reveal overlay */}
      <div
        className="hidden lg:block pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 z-40 w-36 h-36 xl:w-44 xl:h-44 rounded-2xl overflow-hidden shadow-[0_16px_48px_-8px_rgba(0,0,0,0.7)] scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 z-10 opacity-20 mix-blend-multiply"
          style={{ background: `radial-gradient(ellipse at center, ${accentColor}, transparent 70%)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
        <Image
          src={product.image}
          alt=""
          fill
          className="object-contain p-3 drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
          sizes="(max-width: 1280px) 144px, 176px"
        />
      </div>

      {/* Glow underline slides in on hover */}
      <span
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500 ease-out"
        style={{ background: `linear-gradient(to right, ${accentColor}80, transparent)` }}
        aria-hidden="true"
      />
    </div>
  );
}

interface RevealProductListProps {
  products: Product[];
}

export function RevealProductList({ products }: RevealProductListProps) {
  return (
    <div className="w-full">
      <p className="text-xs font-black uppercase tracking-widest text-white/30 mb-2 px-1">
        Our Products
      </p>
      <div className="flex flex-col">
        {products.map((product, index) => (
          <RevealProductItem key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  );
}
