'use client';

import HeroSection from '@/components/ui/hero-section-9';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import type { Product } from '@/types/product';

export function ProductsTeaserDesktop({ products }: { products: Product[] }) {
  const heroData = {
    badge: (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-gold/25 bg-brand-gold/[0.07]">
        <Package className="w-3 h-3 text-brand-gold" />
        <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-brand-gold">
          Our Products
        </span>
      </div>
    ),
    title: (
      <>
        THREE PRODUCTS <span className="text-brand-gold">ONE TRUSTED</span> SOURCE
      </>
    ),
    subtitle:
      'Table eggs graded daily, organic manure from our flock, and ex-layer hens when the cycle turns — all raised and dispatched from our farm outside Machakos Town.',
    actions: [
      {
        text: 'Explore All Products',
        onClick: () => { window.location.href = '/products#table-eggs'; },
        variant: 'default' as const,
      },
    ],
    images: products.map((p) => p.image),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <HeroSection
        badge={heroData.badge}
        title={heroData.title}
        subtitle={heroData.subtitle}
        actions={heroData.actions}
        images={heroData.images}
      />
    </motion.div>
  );
}
