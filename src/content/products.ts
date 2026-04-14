import type { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 'table-eggs',
    title: 'Table',
    titleAccent: 'Eggs',
    description:
      'Fresh eggs, collected from the farm, delivered the same day. Table eggs: sold by 30pc trays — ideal for home cooks and food businesses. Inspected and hygienically packed.',
    fullDescription:
      'Our table eggs are the cornerstone of N&N Poultry Palace. Collected daily from our layer hens, each egg undergoes careful inspection for shell integrity and size consistency. We maintain a high-frequency delivery schedule to ensure you receive your eggs within 24–48 hours of laying.',
    features: [
      'Daily collection for maximum freshness',
      'Sizes: Mixed Grade (Large & Medium)',
      'Hygienically handled and packed',
      'Ideal for households, bakeries, and kiosks',
    ],
    details: ['Available in 30pc egg trays', 'Bulk cases for commercial buyers'],
    image: '/table-eggs.png',
    color: 'var(--brand-gold)',
    colorRgb: [236, 204, 116],
    gradient: 'from-brand-gold to-brand-orange',
  },
  {
    id: 'poultry-manure',
    title: 'Poultry',
    titleAccent: 'Manure',
    description:
      'Bagged organic fertilizer — nutrient-rich for gardens, farms, and commercial agriculture. Available in bulk sacks for large-scale operations.',
    fullDescription:
      "N&N Poultry Palace provides high-quality organic manure, a potent source of nitrogen, phosphorus, and potassium. It's the perfect sustainable choice for soil enrichment, improving crop yields and soil structure in both small gardens and large agricultural projects.",
    features: [
      'Highly concentrated nutrient content',
      'Fully organic and sustainable',
      'Suitable for all types of crops and soils',
      'Available for pickup or delivery in bulk',
    ],
    details: [
      'Rich in nitrogen & phosphorus',
      'Ideal for gardens & commercial farms',
      'Available in 70kg bulk sacks and FH truck',
    ],
    image: '/manure-bags.png',
    color: 'var(--product-green)',
    colorRgb: [74, 222, 128],
    gradient: 'from-[#4ade80] to-[#059669]',
  },
  {
    id: 'ex-layer-hens',
    title: 'Ex-Layer',
    titleAccent: 'Hens',
    description:
      'Healthy hens sold at end of laying cycle — suitable for meat use or re-homing. Our hens are raised with care, fed nutritious feed, and housed in clean, well-ventilated environments.',
    fullDescription:
      'Our ex-layer hens are offered at the end of their peak laying cycle. These birds are healthy, well-fed, and have been under regular veterinary supervision. They are an affordable and high-quality source of lean poultry meat, favored for traditional recipes and soup bases.',
    features: [
      'Regularly vaccinated and vet-inspected',
      'Raised on premium, balanced feed',
      'Tougher meat ideal for slow-cooked traditional dishes',
      'Available for live purchase at the farm',
    ],
    details: [
      'Well-fed & veterinary-inspected',
      'Sold live for meat or rehoming',
      'Bulk lots available for businesses',
    ],
    image: '/ex-layer-hen.png',
    color: 'var(--product-red)',
    colorRgb: [239, 68, 68],
    gradient: 'from-[#ef4444] to-[#e11d48]',
  },
];
