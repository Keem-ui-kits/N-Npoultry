import type { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 'table-eggs',
    title: 'Table',
    titleAccent: 'Eggs',
    description:
      'Fresh eggs, collected from the farm, delivered the same day. Table eggs: sold by 30pc trays — ideal for home cooks and food businesses. Inspected and hygienically packed.',
    fullDescription:
      'Our table eggs are our most popular product. Collected daily from our layer hens, each egg undergoes careful inspection for shell integrity and size consistency. We maintain a high-frequency delivery schedule to ensure you receive your eggs within 24–48 hours of laying.',
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
    bestFor: ['Households', 'Bakeries & restaurants', 'Kiosks & resellers'],
    popular: true,
    objections: [
      { q: 'Do you deliver on weekends?', a: 'We deliver Mon–Sat. Saturday slots fill quickly — message early.' },
      { q: 'What if an egg breaks in transit?', a: 'At time of delivery, any breakage is replaced to ensure quality and value.' },
      { q: 'Can I order less than a tray?', a: 'Our minimum is one 30pc tray. For smaller quantities, ask us — we may have loose stock.' },
    ],
  },
  {
    id: 'poultry-manure',
    title: 'Poultry',
    titleAccent: 'Manure',
    description:
      'Bagged organic fertilizer — nutrient-rich for gardens, farms, and commercial agriculture. Available in bulk sacks for large-scale operations.',
    fullDescription:
      "Our organic poultry manure is a potent source of nitrogen, phosphorus, and potassium. It's the right sustainable choice for soil enrichment, improving crop yields and soil structure in both small gardens and large agricultural projects.",
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
    color: 'var(--brand-sage)',
    colorRgb: [122, 158, 126],
    gradient: 'from-[#7a9e7e] to-[#4a7c59]',
    bestFor: ['Kitchen gardeners', 'Commercial farmers', 'Smallholder farms'],
    objections: [
      { q: 'Is it ready to use straight away?', a: 'Yes — our manure is naturally dried and can be applied directly to soil.' },
      { q: 'Can I get a smaller amount than 70kg?', a: 'The standard sack is 70kg. Contact us for arrangements on smaller quantities.' },
      { q: 'How do I apply it to my garden?', a: 'Mix into soil before planting or apply as a top dressing. 1 sack covers roughly 50–80 sq metres.' },
    ],
  },
  {
    id: 'ex-layer-hens',
    title: 'Ex-Layer',
    titleAccent: 'Hens',
    description:
      'Healthy hens sold at end of laying cycle — suitable for meat use or re-homing. Raised with care, fed nutritious feed, and housed in clean, well-ventilated environments.',
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
    color: 'var(--brand-terracotta)',
    colorRgb: [192, 97, 59],
    gradient: 'from-[#c0613b] to-[#a04525]',
    bestFor: ['Bulk buyers', 'Restaurants & caterers', 'Traditional cooking'],
    objections: [
      { q: 'What age are the hens?', a: 'Typically 72–80 weeks — end of their laying cycle and in good health.' },
      { q: 'Do you deliver live hens?', a: 'We primarily sell at the farm. Speak to us about bulk delivery logistics.' },
      { q: 'Are they vaccinated?', a: 'Yes — all our birds go through a full vaccination programme under vet supervision.' },
    ],
  },
];
