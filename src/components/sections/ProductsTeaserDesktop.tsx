'use client';

import HeroSection from '@/components/ui/hero-section-9';
import type { Product } from '@/types/product';

export function ProductsTeaserDesktop({ products }: { products: Product[] }) {
  const heroData = {
    title: (
      <>
        THREE PRODUCTS <span className="gradient-brand-text">ONE TRUSTED</span> SOURCE
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
    <HeroSection
      title={heroData.title}
      subtitle={heroData.subtitle}
      actions={heroData.actions}
      images={heroData.images}
    />
  );
}
