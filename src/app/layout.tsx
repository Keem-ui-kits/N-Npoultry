import type { Metadata } from 'next';
import '../styles/index.css';

import dynamic from 'next/dynamic';
import { SmoothScroll } from '@/components/layout/SmoothScroll';

const MouseSpotlight = dynamic(() => import('@/components/layout/MouseSpotlight'), { ssr: false });


import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
import { siteConfig } from '@/content/site';

import { Geist, Geist_Mono } from 'next/font/google';

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
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["monospace"],
  adjustFontFallback: true,
});

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.baseUrl,
  telephone: siteConfig.contacts.phones[0],
  email: siteConfig.contacts.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Machakos',
    addressCountry: 'KE',
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
  priceRange: 'KES',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Preload hero image at highest priority — browser fetches before any JS/CSS */}
        <link rel="preload" as="image" href="/images/hero-bg.jpeg" fetchPriority="high" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/made-tommy/MadeTommy-Regular.woff2" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
            <MouseSpotlight />
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
            <WhatsAppButton />
          </SmoothScroll>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
