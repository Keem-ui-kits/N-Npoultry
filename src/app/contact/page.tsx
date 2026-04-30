import { PageWrapper } from '@/components/layout/PageWrapper';
import { PageHeader } from '@/components/layout/PageHeader';
import { Contact } from '@/components/sections/Contact';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
import { getSiteConfig } from '@/sanity/lib/queries';
import type { Metadata } from 'next';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact Us | N&N Poultry Palace',
  description: 'Get in touch with us for orders, planning, and logistics. Our team is ready to assist you.',
  alternates: { canonical: `${siteConfig.baseUrl}/contact` },
  openGraph: {
    title: 'Contact Us | N&N Poultry Palace',
    description: 'Daily deliveries in Machakos and surrounding areas. Reach out to start your palace experience.',
    url: `${siteConfig.baseUrl}/contact`,
    siteName: siteConfig.name,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'N&N Poultry Palace' }],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact N&N Poultry Palace',
    description: 'Get in touch for orders and deliveries.',
    images: ['/og-image.png'],
  },
};

export default async function ContactPage() {
  const siteConfig = await getSiteConfig();
  return (
    <PageWrapper>
      <PageHeader
        title="Contact"
        accent="Us"
        subtitle="Daily deliveries in Machakos and surrounding areas. Reach out to start your palace experience."
      />
      <ErrorBoundary>
        <Contact contactInfo={siteConfig} />
      </ErrorBoundary>
    </PageWrapper>
  );
}
