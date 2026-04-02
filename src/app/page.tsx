import { PageWrapper } from '@/components/layout/PageWrapper';
import { Hero } from '@/components/sections/Hero';
import { ProductsTeaser } from '@/components/sections/ProductsTeaser';
import { HowWeWork } from '@/components/sections/HowWeWork';
import { TestimonialsTeaser } from '@/components/sections/TestimonialsTeaser';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';

export default function Home() {
  return (
    <PageWrapper>
      <Hero />
      <ErrorBoundary>
        <ProductsTeaser />
      </ErrorBoundary>
      <ErrorBoundary>
        <HowWeWork />
      </ErrorBoundary>
      <ErrorBoundary>
        <TestimonialsTeaser />
      </ErrorBoundary>
      <ContactCTA />
    </PageWrapper>
  );
}
