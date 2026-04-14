'use client';

import HeroSection from '@/components/ui/hero-section-9';

export function ProductsTeaser() {
  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  const heroData = {
    title: (
      <>
        Premium <span className="gradient-brand-text">Poultry</span> <br /> Products
      </>
    ),
    subtitle: 'Daily collected farm-fresh eggs and organic nutrients. Trusted quality from Machakos, Kenya.',
    actions: [
      {
        text: 'Explore All Products',
        onClick: () => { handleNavigation('/products'); },
        variant: 'default' as const,
      },
    ],
    images: [
      '/table-eggs.png',
      '/manure-bags.png',
      '/ex-layer-hen.png',
    ],
  };

  return (
    <div className="w-full bg-background" id="products-teaser">
      <HeroSection
        title={heroData.title}
        subtitle={heroData.subtitle}
        actions={heroData.actions}
        images={heroData.images}
      />
    </div>
  );
}
