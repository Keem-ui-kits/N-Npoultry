import { PageWrapper } from '@/components/layout/PageWrapper';
import { PageHeader } from '@/components/layout/PageHeader';
import { Contact } from '@/components/sections/Contact';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
import { getSiteConfig } from '@/sanity/lib/queries';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | N&N Poultry Palace',
  description: 'Get in touch with us for orders, planning, and logistics. Our team is ready to assist you.',
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
