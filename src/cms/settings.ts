// ============================================
// CMS: Site Settings
// ============================================
// Global site configuration - update these values to change
// site-wide information like contact details, business hours, etc.

import type { SiteSettings, NavItem, TrustPillar, HeroContent, FooterContent } from '@/types';

export const siteSettings: SiteSettings = {
  brand: {
    name: 'N&N Poultry Palace',
    tagline: 'Fresh And Nutritious',
    logo: '/images/logo.png',
    favicon: '/favicon.ico'
  },

  contact: {
    phone: '+254 700 000 000',
    whatsapp: '254700000000',
    email: 'orders@nnpoultrypalace.co.ke',
    address: 'Machakos, Kenya',
    mapUrl: 'https://maps.google.com/?q=Machakos+Kenya'
  },

  business: {
    hours: {
      monday: '6:00 AM – 6:00 PM',
      tuesday: '6:00 AM – 6:00 PM',
      wednesday: '6:00 AM – 6:00 PM',
      thursday: '6:00 AM – 6:00 PM',
      friday: '6:00 AM – 6:00 PM',
      saturday: '6:00 AM – 4:00 PM',
      sunday: 'By appointment'
    },
    deliveryAreas: ['Machakos', 'Nairobi', 'Athi River', 'Kitengela', 'Mlolongo'],
    minimumOrder: 'KSh 500'
  },

  seo: {
    title: 'N&N Poultry Palace | Fresh Table Eggs in Machakos',
    description: 'Daily-collected fresh table eggs, ex-layer hens & poultry manure. Delivered to homes & businesses across Machakos. Order now or get a wholesale quote.',
    keywords: [
      'fresh table eggs Machakos',
      'buy eggs Kenya',
      'wholesale eggs',
      'ex-layer hens',
      'poultry manure',
      'N&N Poultry Palace',
      'organic fertilizer',
      'farm fresh eggs'
    ],
    ogImage: '/images/og-image.jpg',
    canonicalUrl: 'https://www.nnpoultrypalace.co.ke'
  },

  social: {
    facebook: 'https://facebook.com/nnpoultrypalace',
    instagram: 'https://instagram.com/nnpoultrypalace',
    twitter: 'https://twitter.com/nnpoultrypalace',
    whatsapp: 'https://wa.me/254700000000'
  }
};

// Navigation Items
export const mainNavigation: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Products', href: '#products' },
  { label: 'About', href: '#why-nn' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Order', href: '#order' }
];

export const mobileNavigation: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Products', href: '#products' },
  { label: 'About', href: '#why-nn' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Order', href: '#order' }
];

export const footerNavigation: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Products', href: '#products' },
  { label: 'About Us', href: '#why-nn' },
  { label: 'Order Now', href: '#order' },
  { label: 'Testimonials', href: '#testimonials' }
];

export const legalNavigation: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Sitemap', href: '/sitemap' }
];

// Hero Content
export const heroContent: HeroContent = {
  microHeadline: 'Daily-collected & Nutrient-rich',
  title: {
    line1: 'Farm-Fresh',
    line2: 'Nutritious',
    line3: 'Eggs'
  },
  description: 'Collected at dawn, delivered by day. Experience the premium quality of farm-fresh eggs, hygienically handled from our Machakos farm to your table.',
  primaryCta: {
    text: '🛒 Order Fresh Eggs',
    link: '#order'
  },
  secondaryCta: {
    text: '📋 Wholesale Quote',
    link: '#order'
  },
  backgroundImage: '/images/hero_eggs_basket.png'
};

// Trust Pillars
export const trustPillars: TrustPillar[] = [
  {
    id: 'farm-fresh',
    icon: '🌅',
    title: 'Farm-Fresh Daily',
    description: 'Eggs collected each morning and delivered the same day. Freshness you can taste in every bite.',
    order: 1
  },
  {
    id: 'hygiene',
    icon: '🛡️',
    title: 'Strict Hygiene & Traceability',
    description: 'Full chain of custody from coop to carton. Candled, graded, and packed in a clean facility every day.',
    order: 2
  },
  {
    id: 'delivery',
    icon: '🚚',
    title: 'Fast Local Delivery & Bulk Fulfillment',
    description: 'Same-day delivery for retail orders and scheduled bulk runs for wholesale partners — reliable, every time.',
    order: 3
  }
];

// Footer Content
export const footerContent: FooterContent = {
  brand: {
    description: 'A family-run poultry supplier in Machakos. We collect fresh eggs daily and deliver to homes and businesses. We also supply ex-layer hens and organic poultry manure.'
  },
  quickLinks: footerNavigation,
  legalLinks: legalNavigation
};

// Testimonials
export const testimonials = [
  {
    id: 'testimonial-1',
    name: 'Wanjiru M.',
    role: 'Home Cook',
    location: 'Syokimau',
    quote: "I've been buying from N&N for over eight months and the eggs are consistently fresh. Living in Syokimau, it's great to have such high-quality eggs delivered right to my door. The yolks are bright and rich — you can really taste the difference!",
    rating: 5,
    verified: true,
    verifiedType: 'buyer' as const,
    order: 1
  },
  {
    id: 'testimonial-2',
    name: 'Chef Kamau J.',
    role: 'Restaurant Owner',
    location: 'Machakos Town',
    quote: "We switched our restaurant supply in Machakos Town to N&N six months ago. Their wholesale pricing is fair, invoicing is professional, and I have never had a rejected batch. Reliable and easy to work with — highly recommended for any local food business.",
    rating: 5,
    verified: true,
    verifiedType: 'wholesale' as const,
    order: 2
  },
  {
    id: 'testimonial-3',
    name: 'Amina S.',
    role: 'Breakfast Kiosk Owner',
    location: 'Athi River',
    quote: "I run a small breakfast kiosk in Athi River and N&N's 30-egg trays have been a game-changer. Freshness every morning, WhatsApp ordering is super convenient, and they even remind me before I run low. This is the kind of supplier every small business needs.",
    rating: 5,
    verified: true,
    verifiedType: 'buyer' as const,
    order: 3
  }
];

// Structured Data for SEO
export const structuredData = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  "name": "N&N Poultry Palace Limited",
  "description": "Family-run poultry supplier in Machakos. Daily-collected fresh table eggs, ex-layer hens, and organic poultry manure for homes and businesses.",
  "url": "https://www.nnpoultrypalace.co.ke/",
  "telephone": "+254700000000",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Machakos",
    "addressCountry": "KE"
  },
  "openingHours": "Mo-Sa 06:00-18:00",
  "servesCuisine": "Poultry Products",
  "hasMap": "https://maps.google.com/?q=Machakos+Kenya",
  "sameAs": [
    "https://wa.me/254700000000"
  ]
};
