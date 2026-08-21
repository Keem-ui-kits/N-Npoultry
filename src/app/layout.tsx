import type { Metadata, Viewport } from "next";
import type React from "react";
import { Outfit, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { business, products as productsMap } from "@/lib/site-data";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#111111",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nnpoultrypalace.co.ke";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "N&N Poultry Palace — Fresh Eggs, Manure & Ex-Layer Hens in Machakos",
    template: "%s — N&N Poultry Palace",
  },
  description:
    "Fresh and Nutritious — your trusted source for farm-fresh eggs in Machakos. Collected at 2 PM, packed by 5 PM, on your doorstep before noon.",
  openGraph: {
    title: "N&N Poultry Palace | Farm-Fresh Eggs in Machakos, Kenya",
    description:
      "Daily-collected eggs, organic manure, and quality hens. Trusted by families and businesses across Machakos County.",
    url: siteUrl,
    siteName: business.name,
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "N&N Poultry Palace | Farm-Fresh Eggs - Machakos, Kenya",
    description:
      "Daily-collected eggs, organic poultry manure, and quality hens. WhatsApp ordering available.",
  },
  verification: {
    google: "vUa7EMWvr_ovEu8omCw6mEFm1LufugqNds7WoggxJzw",
  },
  icons: {
    icon: [
      { url: "/icon.png?v=4", type: "image/png" },
      { url: "/favicon.ico?v=4", type: "image/x-icon" },
    ],
    apple: [
      { url: "/apple-icon.png?v=4", type: "image/png" },
    ],
    shortcut: "/icon.png?v=4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.tagline,
    url: siteUrl,
    telephone: business.phones[0],
    email: business.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Machakos",
      addressRegion: "Machakos County",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -1.5177,
      longitude: 37.2634,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "N&N Poultry Palace Products",
      itemListElement: Object.values(productsMap).map((p) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: p.name,
          unitText: p.unit,
        },
      })),
    },
    areaServed: [
      { "@type": "City", name: "Machakos Town" },
      { "@type": "City", name: "Syokimau" },
      { "@type": "City", name: "Athi River" },
      { "@type": "City", name: "Mlolongo" },
      { "@type": "City", name: "Katoloni" },
      { "@type": "City", name: "Mwala" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "12:00",
      },
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: business.name,
    url: siteUrl,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: business.phones[0],
      email: business.email,
      contactType: "customer service",
      availableLanguage: "English",
    },
  };

  return (
    <html lang="en" className={`${outfit.variable} ${plexMono.variable} h-full antialiased`}>
      <head>
        <link rel="icon" type="image/png" sizes="512x512" href="/icon.png?v=4" />
        <link rel="shortcut icon" href="/icon.png?v=4" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png?v=4" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-dark font-display">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
