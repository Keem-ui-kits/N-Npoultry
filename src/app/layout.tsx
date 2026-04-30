import type { Metadata } from 'next';
import '../styles/index.css';

import { Geist, Geist_Mono } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { MouseSpotlightLoader } from '@/components/layout/MouseSpotlightLoader';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
import { siteConfig } from '@/content/site';
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
  title: 'N&N Poultry Palace | Farm-Fresh Nutritious Eggs in Machakos',
  description:
    'Your trusted source for day-collected table eggs and organic poultry manure. Wholesome, responsibly produced products from our family-run farm in Machakos, Kenya.',
  openGraph: {
    title: 'N&N Poultry Palace | Farm-Fresh Nutritious Eggs',
    description:
      'Daily collected farm-fresh eggs and organic nutrients. Trusted quality from Machakos.',
    url: siteConfig.baseUrl,
    siteName: siteConfig.name,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'N&N Poultry Palace Logo',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'N&N Poultry Palace | Farm-Fresh Eggs',
    description: 'Quality poultry products straight from the farm.',
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
    areaServed: {
      '@type': 'State',
      name: 'Machakos County',
    },
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
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '00:00',
        closes: '00:00',
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
        <link rel="preload" as="image" href="/images/hero-bg.jpeg" fetchPriority="high" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/made-tommy/MadeTommy-Regular.woff2" crossOrigin="anonymous" />
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
