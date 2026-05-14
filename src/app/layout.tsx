import type { Metadata } from 'next';
import '../styles/index.css';

import { Geist, Geist_Mono } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

import dynamic from 'next/dynamic';

const SmoothScroll = dynamic(() => import('@/components/layout/SmoothScroll').then(m => m.SmoothScroll));
const MouseSpotlightLoader = dynamic(() => import('@/components/layout/MouseSpotlightLoader').then(m => m.MouseSpotlightLoader));
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
import { siteConfig } from '@/content/site';
import { products } from '@/content/products';
import { getSiteConfig } from '@/sanity/lib/queries';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['monospace'],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: 'N&N Poultry Palace | Farm-Fresh Eggs & Poultry Products in Machakos',
    template: '%s | N&N Poultry Palace',
  },
  description:
    'Order farm-fresh table eggs, organic poultry manure, and ex-layer hens from N&N Poultry Palace in Machakos, Kenya. Daily delivery to Syokimau, Athi River, Mlolongo, and surrounding areas.',
  openGraph: {
    title: 'N&N Poultry Palace | Farm-Fresh Eggs in Machakos, Kenya',
    description:
      'Daily-collected eggs, organic manure, and quality hens. Trusted by families and businesses across Machakos County.',
    url: siteConfig.baseUrl,
    siteName: siteConfig.name,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'N&N Poultry Palace — fresh eggs and poultry products from Machakos, Kenya',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'N&N Poultry Palace | Farm-Fresh Eggs — Machakos, Kenya',
    description: 'Daily-collected eggs, organic poultry manure, and quality hens. WhatsApp ordering available.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'vUa7EMWvr_ovEu8omCw6mEFm1LufugqNds7WoggxJzw',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const sanityConfig = await getSiteConfig();

  const telephone = sanityConfig?.contacts?.phones?.[0] ?? siteConfig.contacts.phones[0];
  const email = sanityConfig?.contacts?.email ?? siteConfig.contacts.email;
  const whatsapp = sanityConfig?.contacts?.whatsapp ?? siteConfig.contacts.whatsapp;

  const socialLinks = Object.values(siteConfig.socialLinks).filter(Boolean);

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.baseUrl,
    logo: `${siteConfig.baseUrl}/nn-poultry-logo.png`,
    image: `${siteConfig.baseUrl}/og-image.png`,
    telephone,
    email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Machakos',
      addressRegion: 'Machakos County',
      addressCountry: 'KE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -1.5177,
      longitude: 37.2634,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'N&N Poultry Palace Products',
      itemListElement: products.map((p) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: `${p.title} ${p.titleAccent}`,
          description: p.description,
        },
      })),
    },
    areaServed: [
      { '@type': 'City', name: 'Machakos' },
      { '@type': 'City', name: 'Syokimau' },
      { '@type': 'City', name: 'Athi River' },
      { '@type': 'City', name: 'Mlolongo' },
      { '@type': 'City', name: 'Katoloni' },
      { '@type': 'City', name: 'Mwala' },
    ],
    ...(socialLinks.length > 0 ? { sameAs: socialLinks } : {}),
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
  };

  const productSchemas = products.map((p) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${p.title} ${p.titleAccent}`,
    description: p.fullDescription,
    image: `${siteConfig.baseUrl}${p.image}`,
    brand: { '@type': 'Brand', name: siteConfig.name },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: siteConfig.name },
      areaServed: 'Machakos County, Kenya',
    },
  }));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I order eggs from N&N Poultry Palace?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The easiest way is to send a WhatsApp message to +254113377623. Tell us what you need — 30pc trays of table eggs, poultry manure, or ex-layer hens — and we will confirm the price and next delivery slot within minutes.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which areas do you deliver to?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We deliver daily to Machakos Town, Syokimau, Athi River, Mlolongo, Katoloni, and Mwala. Contact us if you are in a nearby area — we may be able to arrange delivery.',
        },
      },
      {
        '@type': 'Question',
        name: 'How fresh are the eggs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our eggs are collected daily starting at 2 PM, inspected and packed by 5 PM, and delivered fresh to your doorstep within hours. We guarantee a maximum 24–48 hour farm-to-delivery window.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you sell in bulk for businesses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We supply restaurants, kiosks, bakeries, and wholesale distributors. Contact us via WhatsApp or our contact form to discuss bulk pricing and standing orders.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is poultry manure used for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our poultry manure is a fully organic fertilizer rich in nitrogen, phosphorus, and potassium. It is suitable for kitchen gardens, commercial farms, and all crop types. Available in 70kg bulk sacks.',
        },
      },
    ],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.baseUrl,
    logo: `${siteConfig.baseUrl}/nn-poultry-logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone,
      email,
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    ...(socialLinks.length > 0 ? { sameAs: socialLinks } : {}),
  };

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
<link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/nn-poultry-logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {productSchemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="antialiased overflow-x-hidden font-sans" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          <SmoothScroll>
            <MouseSpotlightLoader />
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
            <WhatsAppButton whatsapp={whatsapp} />
          </SmoothScroll>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
