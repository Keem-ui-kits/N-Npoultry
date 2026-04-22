import { PageWrapper } from '@/components/layout/PageWrapper';
import { Hero } from '@/components/sections/Hero';
import { getSiteConfig } from '@/sanity/lib/queries';
import { ProductsTeaser } from '@/components/sections/ProductsTeaser';
import { HowWeWork } from '@/components/sections/HowWeWork';
import { TestimonialsTeaser } from '@/components/sections/TestimonialsTeaser';
import { EducationHubTeaser } from '@/components/sections/EducationHubTeaser';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';

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
