// ============================================
// CMS: Products Content
// ============================================
// Editors can update this file to modify product information
// All changes will reflect immediately on the site

import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'table-eggs',
    slug: 'table-eggs',
    name: 'Table Eggs',
    description: 'Fresh eggs, daily-collected, sold by carton and bulk case — ideal for home cooks and food businesses. Inspected and hygienically packed.',
    longDescription: `Our premium table eggs are collected fresh every morning from our carefully raised laying hens. Each egg undergoes quality inspection and is hygienically packed to ensure you receive only the best.

Whether you're a home cook looking for farm-fresh quality or a restaurant needing consistent supply, our table eggs deliver unmatched freshness and taste. The bright, rich yolks are a testament to the quality feed and care our hens receive daily.`,
    image: '/images/product_egg_carton.png',
    badge: '⭐ Primary Product',
    badgeType: 'gold',
    features: [
      'Available in 6, 12 & 30-egg cartons',
      'Bulk cases for commercial buyers',
      'Inspected & hygienically handled',
      'Daily collection ensures maximum freshness',
      'Rich, golden yolks with superior taste'
    ],
    pricing: {
      retail: 'KSh 450',
      wholesale: 'KSh 380',
      unit: 'per tray (30 eggs)'
    },
    ctaText: 'Order Eggs',
    ctaLink: '#order',
    order: 1,
    meta: {
      title: 'Fresh Table Eggs | N&N Poultry Palace',
      description: 'Daily-collected fresh table eggs delivered to your door. Available in retail and wholesale quantities.',
      keywords: ['fresh eggs', 'table eggs', 'farm eggs', 'organic eggs', 'Machakos eggs']
    }
  },
  {
    id: 'ex-layer-hens',
    slug: 'ex-layer-hens',
    name: 'Ex-Layer Hens',
    description: 'Healthy hens sold at end of laying cycle — suitable for meat use or rehoming. Inspected, well-fed, and available for bulk purchase or individual sale.',
    longDescription: `Our ex-layer hens are healthy, well-cared-for birds that have completed their prime laying cycle. These hens are perfect for those seeking quality poultry meat or looking to give hens a second home.

Each hen is veterinary-inspected, well-fed with nutritious grain, and raised in clean, spacious environments. Available for individual purchase or in bulk lots for businesses.`,
    image: '/images/product_hen.png',
    badge: '🐔 Live Poultry',
    badgeType: 'cream',
    features: [
      'Well-fed & veterinary-inspected',
      'Sold live for meat or rehoming',
      'Bulk lots available for businesses',
      'Raised in clean, spacious coops',
      'Humanely handled at every stage'
    ],
    pricing: {
      retail: 'KSh 350',
      wholesale: 'KSh 280',
      unit: 'per hen'
    },
    ctaText: 'Inquire Now',
    ctaLink: '#order',
    order: 2,
    meta: {
      title: 'Ex-Layer Hens | N&N Poultry Palace',
      description: 'Healthy ex-layer hens available for meat or rehoming. Bulk quantities available for businesses.',
      keywords: ['ex-layer hens', 'live poultry', 'chicken meat', 'poultry for sale', 'Machakos poultry']
    }
  },
  {
    id: 'poultry-manure',
    slug: 'poultry-manure',
    name: 'Poultry Manure',
    description: 'Bagged organic fertilizer — nutrient-rich for gardens, farms, and commercial agriculture. Available in bulk sacks for large-scale operations.',
    longDescription: `Our organic poultry manure is a powerful, natural fertilizer rich in nitrogen, phosphorus, and essential nutrients. Perfect for home gardens, commercial farms, and agricultural operations looking to improve soil health naturally.

The manure is properly composted to eliminate pathogens while retaining its nutrient value. Available in convenient 25kg and 50kg sacks, with bulk options for large-scale agricultural needs.`,
    image: '/images/product_manure.png',
    badge: '🌿 Organic',
    badgeType: 'cream',
    features: [
      'Rich in nitrogen & phosphorus',
      'Ideal for gardens & commercial farms',
      'Available in 25kg & 50kg bulk sacks',
      'Properly composted for safety',
      'Improves soil structure naturally'
    ],
    pricing: {
      retail: 'KSh 150',
      wholesale: 'KSh 100',
      unit: 'per 25kg sack'
    },
    ctaText: 'Inquire Now',
    ctaLink: '#order',
    order: 3,
    meta: {
      title: 'Organic Poultry Manure | N&N Poultry Palace',
      description: 'Nutrient-rich organic poultry manure fertilizer for gardens and farms. Bulk quantities available.',
      keywords: ['poultry manure', 'organic fertilizer', 'chicken manure', 'farm fertilizer', 'natural fertilizer']
    }
  }
];

// Helper function to get product by slug
export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

// Helper function to get featured product
export const getFeaturedProduct = (): Product => {
  return products[0];
};
