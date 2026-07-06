import { Suspense } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Hero } from '@/components/sections/Hero';
import { FarmPulse } from '@/components/sections/FarmPulse';
import {
  getSiteConfig,
  getFarmPhotos,
  getHomeConfig,
  getTestimonials,
  getEducationArticles,
  type HomeConfig,
} from '@/sanity/lib/queries';
import type { Testimonial } from '@/content/testimonials';
import type { EducationArticle } from '@/content/education';
import dynamic from 'next/dynamic';
import { ProductsTeaser } from '@/components/sections/ProductsTeaser';
import { EducationHubTeaser } from '@/components/sections/EducationHubTeaser';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
import type { Metadata } from 'next';
import { siteConfig } from '@/content/site';
import { SectionSkeleton } from '@/components/ui/SectionSkeleton';

const HowWeWork = dynamic(() => import('@/components/sections/HowWeWork').then(m => m.HowWeWork));
const TestimonialsTeaser = dynamic(() => import('@/components/sections/TestimonialsTeaser').then(m => m.TestimonialsTeaser));
const FarmGallery = dynamic(() => import('@/components/sections/FarmGallery').then(m => m.FarmGallery));

export const revalidate = 3600;

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
    'egg supplier Kenya',
  ],
};

// --- Streaming Wrappers ---

async function AsyncFarmGallery({ farmGalleryConfig }: { farmGalleryConfig?: HomeConfig['farmGallery'] }) {
  const photos = await getFarmPhotos();
  return <FarmGallery photos={photos} farmGalleryConfig={farmGalleryConfig} />;
}

async function AsyncTestimonials({ testimonialsPromise }: { testimonialsPromise: Promise<Testimonial[]> }) {
  const testimonials = await testimonialsPromise;
  return <TestimonialsTeaser testimonials={testimonials} />;
}

async function AsyncEducationHub({ articlesPromise }: { articlesPromise: Promise<EducationArticle[]> }) {
  const articles = await articlesPromise;
  return <EducationHubTeaser articles={articles} />;
}

export default async function Home() {
  // Core config needed for initial paint (Hero)
  const configPromise = getSiteConfig();
  const homeConfigPromise = getHomeConfig();
  
  // Secondary data — start fetching immediately but don't await at top level
  const testimonialsPromise = getTestimonials();
  const educationArticlesPromise = getEducationArticles();

  const [config, homeConfig] = await Promise.all([configPromise, homeConfigPromise]);
  const phone = config?.contacts?.phones?.[0];

  return (
    <PageWrapper>
      <Hero
        whatsapp={config?.contacts?.whatsapp}
        availability={config?.availability}
        heroConfig={homeConfig?.hero}
      />
      
      <ErrorBoundary>
        <FarmPulse
          whatsapp={config?.contacts?.whatsapp}
          deliveryZones={config?.deliveryZones}
          farmPulseConfig={homeConfig?.farmPulse}
        />
      </ErrorBoundary>

      <Suspense fallback={<SectionSkeleton />}>
        <AsyncFarmGallery farmGalleryConfig={homeConfig?.farmGallery} />
      </Suspense>

      <ErrorBoundary>
        <HowWeWork howWeWorkConfig={homeConfig?.howWeWork} />
      </ErrorBoundary>

      <ProductsTeaser />

      <Suspense fallback={<SectionSkeleton />}>
        <AsyncTestimonials testimonialsPromise={testimonialsPromise} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <AsyncEducationHub articlesPromise={educationArticlesPromise} />
      </Suspense>

      <ContactCTA
        whatsapp={config?.contacts?.whatsapp}
        phone={phone}
        contactCtaConfig={homeConfig?.contactCta}
      />
    </PageWrapper>
  );
}
