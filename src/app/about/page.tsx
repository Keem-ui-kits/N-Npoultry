import { PageWrapper } from '@/components/layout/PageWrapper';
import { About } from '@/components/sections/About';
import { Testimonials } from '@/components/sections/Testimonials';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
import { getAboutConfig, getTestimonials } from '@/sanity/lib/queries';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | N&N Poultry Palace',
  description: 'Learn about our vision and mission to be East Africa\'s leading provider of sustainable quality poultry products.',
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
