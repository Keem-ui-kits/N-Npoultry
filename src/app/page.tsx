import { PageWrapper } from '@/components/layout/PageWrapper';
import { Hero } from '@/components/sections/Hero';
import { ProductsTeaser } from '@/components/sections/ProductsTeaser';
import { HowWeWork } from '@/components/sections/HowWeWork';
import { TestimonialsTeaser } from '@/components/sections/TestimonialsTeaser';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
import { siteConfig } from '@/content/site';
import { testimonials } from '@/content/testimonials';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': siteConfig.baseUrl,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.baseUrl,
    telephone: siteConfig.contacts.phones[0],
    email: siteConfig.contacts.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Machakos-Wote Road',
      addressLocality: 'Machakos',
      addressRegion: 'Machakos County',
      addressCountry: 'KE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-1.5177',
      longitude: '37.2634',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '12:00',
      },
    ],
    priceRange: '$$',
    image: `${siteConfig.baseUrl}/og-image.png`,
    review: testimonials.map((t) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: t.name },
      reviewBody: t.text,
      reviewRating: { '@type': 'Rating', ratingValue: '5' },
    })),
  };

  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
