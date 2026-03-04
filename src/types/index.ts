// ============================================
// N&N Poultry Palace - Type Definitions
// ============================================

// Product Types
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  image: string;
  badge: string;
  badgeType: 'gold' | 'cream' | 'dark';
  features: string[];
  pricing?: PricingInfo;
  ctaText: string;
  ctaLink: string;
  order: number;
  meta?: ProductMeta;
}

export interface PricingInfo {
  retail: string;
  wholesale: string;
  unit: string;
}

export interface ProductMeta {
  title: string;
  description: string;
  keywords: string[];
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
  verified: boolean;
  verifiedType: 'buyer' | 'wholesale';
  order: number;
}

// Educational Content Types
export interface EducationalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  author?: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  featured: boolean;
  order: number;
  meta?: ArticleMeta;
}

export interface ArticleMeta {
  title: string;
  description: string;
}

// Site Settings Types
export interface SiteSettings {
  brand: BrandSettings;
  contact: ContactSettings;
  business: BusinessSettings;
  seo: SEOSettings;
  social: SocialSettings;
}

export interface BrandSettings {
  name: string;
  tagline: string;
  logo: string;
  favicon?: string;
}

export interface ContactSettings {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  mapUrl?: string;
}

export interface BusinessSettings {
  hours: BusinessHours;
  deliveryAreas: string[];
  minimumOrder: string;
}

export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface SEOSettings {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl: string;
}

export interface SocialSettings {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  whatsapp?: string;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

// Trust Pillar Types
export interface TrustPillar {
  id: string;
  icon: string;
  title: string;
  description: string;
  order: number;
}

// Order Form Types
export interface OrderFormData {
  name: string;
  phone: string;
  email?: string;
  product: string;
  quantity: number;
  deliveryAddress: string;
  preferredDate?: string;
  orderType: 'retail' | 'wholesale';
  message?: string;
}

// Hero Content Types
export interface HeroContent {
  microHeadline: string;
  title: {
    line1: string;
    line2: string;
    line3: string;
  };
  description: string;
  primaryCta: {
    text: string;
    link: string;
  };
  secondaryCta: {
    text: string;
    link: string;
  };
  backgroundImage: string;
}

// Footer Content Types
export interface FooterContent {
  brand: {
    description: string;
  };
  quickLinks: NavItem[];
  legalLinks: NavItem[];
}
