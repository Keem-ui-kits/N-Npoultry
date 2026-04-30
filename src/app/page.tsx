import { PageWrapper } from '@/components/layout/PageWrapper';
import { Hero } from '@/components/sections/Hero';
import { getSiteConfig } from '@/sanity/lib/queries';
import { ProductsTeaser } from '@/components/sections/ProductsTeaser';
import { HowWeWork } from '@/components/sections/HowWeWork';
import { TestimonialsTeaser } from '@/components/sections/TestimonialsTeaser';
import { EducationHubTeaser } from '@/components/sections/EducationHubTeaser';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
import type { Metadata } from 'next';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: 'N&N Poultry Palace | Farm-Fresh Nutritious Eggs in Machakos',
  description:
    'Your trusted source for day-collected table eggs and organic poultry manure. Wholesome, responsibly produced products from our family-run farm in Machakos, Kenya.',
  openGraph: {
    title: 'N&N Poultry Palace | Farm-Fresh Nutritious Eggs',
    description:
      'Daily collected farm-fresh eggs and organic nutrients. Trusted quality from Machakos.',
    url: siteConfig.baseUrl,
    siteName: siteConfig.name,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'N&N Poultry Palace' }],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'N&N Poultry Palace | Farm-Fresh Eggs',
    description: 'Quality poultry products straight from the farm.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: siteConfig.baseUrl,
  },
};

export default async function Home() {
  const siteConfig = await getSiteConfig();
  return (
    <PageWrapper>
      <Hero heroImageUrl={siteConfig?.heroImageUrl} />
      <ErrorBoundary>
        <ProductsTeaser />
      </ErrorBoundary>
      <ErrorBoundary>
        <HowWeWork />
      </ErrorBoundary>
      <ErrorBoundary>
        <TestimonialsTeaser />
      </ErrorBoundary>
      <ErrorBoundary>
        <EducationHubTeaser />
      </ErrorBoundary>
      <ContactCTA />
    </PageWrapper>
  );
}
