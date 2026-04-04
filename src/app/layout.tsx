import type { Metadata } from 'next';
import '../styles/index.css';

import MouseSpotlight from '@/components/layout/MouseSpotlight';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import BottomBlur from '@/components/layout/BottomBlur';
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
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
            <BottomBlur />
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
