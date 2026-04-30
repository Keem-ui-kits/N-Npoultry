import { PageWrapper } from '@/components/layout/PageWrapper';
import { About } from '@/components/sections/About';
import { Testimonials } from '@/components/sections/Testimonials';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
import { getAboutConfig, getTestimonials } from '@/sanity/lib/queries';
import type { Metadata } from 'next';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: 'About Us | N&N Poultry Palace',
  description: "Learn about our vision and mission to be East Africa's leading provider of sustainable quality poultry products.",
  alternates: { canonical: `${siteConfig.baseUrl}/about` },
  openGraph: {
    title: 'About Us | N&N Poultry Palace',
    description: "East Africa's trusted family-run poultry farm — rooted in Machakos, committed to excellence.",
    url: `${siteConfig.baseUrl}/about`,
    siteName: siteConfig.name,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'N&N Poultry Palace' }],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About N&N Poultry Palace',
    description: "East Africa's trusted family-run poultry farm.",
    images: ['/og-image.png'],
  },
};

export default async function AboutPage() {
  const [testimonials, aboutConfig] = await Promise.all([
    getTestimonials(),
    getAboutConfig(),
  ]);

  return (
    <PageWrapper>
      <ErrorBoundary>
        <About aboutConfig={aboutConfig} />
      </ErrorBoundary>
      <ErrorBoundary>
        <Testimonials testimonials={testimonials} />
      </ErrorBoundary>
    </PageWrapper>
  );
}
