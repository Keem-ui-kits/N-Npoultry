'use client';

import HeroSection from '@/components/ui/hero-section-9';
import type { Product } from '@/types/product';

export function ProductsTeaserDesktop({ products }: { products: Product[] }) {
  const heroData = {
    title: (
      <>
        Premium <span className="gradient-brand-text">Poultry</span> <br /> Products
      </>
    ),
    subtitle:
      'Daily collected farm-fresh eggs and organic nutrients. Trusted quality from Machakos, Kenya.',
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
