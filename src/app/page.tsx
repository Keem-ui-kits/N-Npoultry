import { PageWrapper } from '@/components/layout/PageWrapper';
import { Hero } from '@/components/sections/Hero';
import { FarmPulse } from '@/components/sections/FarmPulse';
import { getSiteConfig, getFarmPhotos } from '@/sanity/lib/queries';
import { ProductsTeaser } from '@/components/sections/ProductsTeaser';
import { HowWeWork } from '@/components/sections/HowWeWork';
import { TestimonialsTeaser } from '@/components/sections/TestimonialsTeaser';
import { EducationHubTeaser } from '@/components/sections/EducationHubTeaser';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { FarmGallery } from '@/components/sections/FarmGallery';
import { BroadcastSignup } from '@/components/sections/BroadcastSignup';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
import type { Metadata } from 'next';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: 'N&N Poultry Palace | Farm-Fresh Eggs & Poultry Products in Machakos',
  description:
    'Order farm-fresh table eggs, organic poultry manure, and ex-layer hens from N&N Poultry Palace in Machakos, Kenya. Daily delivery to Syokimau, Athi River, Mlolongo, and surrounding areas. WhatsApp ordering available.',
  openGraph: {
    title: 'N&N Poultry Palace | Farm-Fresh Eggs in Machakos, Kenya',
    description:
      'Daily collected eggs, organic manure, and quality hens. Trusted by families and businesses across Machakos County.',
    url: siteConfig.baseUrl,
    siteName: siteConfig.name,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'N&N Poultry Palace — fresh eggs and poultry products from Machakos, Kenya' }],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'N&N Poultry Palace | Farm-Fresh Eggs — Machakos, Kenya',
    description: 'Daily-collected eggs, organic poultry manure, and quality hens. WhatsApp ordering available.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: siteConfig.baseUrl,
  },
  keywords: [
    'farm fresh eggs Machakos',
    'table eggs Kenya',
    'poultry manure Machakos',
    'ex-layer hens Kenya',
    'egg delivery Syokimau',
    'egg delivery Athi River',
    'egg delivery Mlolongo',
    'N&N Poultry Palace',
    'fresh eggs Machakos County',
    'wholesale eggs Kenya',
  ],
};

export default async function Home() {
  const [config, farmPhotos] = await Promise.all([
    getSiteConfig(),
    getFarmPhotos(),
  ]);

  return (
    <PageWrapper>
      <Hero whatsapp={config?.contacts?.whatsapp} availability={config?.availability} />
      <ErrorBoundary>
        <FarmPulse
          whatsapp={config?.contacts?.whatsapp}
        />
      </ErrorBoundary>
      <FarmGallery photos={farmPhotos} />
      <ErrorBoundary>
        <HowWeWork />
      </ErrorBoundary>
      <ErrorBoundary>
        <ProductsTeaser />
      </ErrorBoundary>
      <ErrorBoundary>
        <TestimonialsTeaser />
      </ErrorBoundary>
      <EducationHubTeaser />
      <BroadcastSignup whatsapp={config?.contacts?.whatsapp} />
      <ContactCTA whatsapp={config?.contacts?.whatsapp} />
    </PageWrapper>
  );
}
