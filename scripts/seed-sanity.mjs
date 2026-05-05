/**
 * Sanity seed script — run with:
 *   SANITY_WRITE_TOKEN=<token> node scripts/seed-sanity.mjs
 *
 * Get a write token from: https://sanity.io/manage/project/ik167lhg/api
 * → Tokens → Add API token → Editor
 *
 * Note: images must be uploaded manually via Sanity Studio.
 * This script seeds all text/number content.
 */

import { createClient } from '@sanity/client'

const PROJECT_ID = 'ik167lhg'
const DATASET = 'production'
const API_VERSION = '2026-04-11'
const TOKEN = process.env.SANITY_WRITE_TOKEN

if (!TOKEN) {
  console.error('❌  Set SANITY_WRITE_TOKEN before running this script.')
  console.error('    Get a token: https://sanity.io/manage/project/ik167lhg/api')
  process.exit(1)
}

const client = createClient({ projectId: PROJECT_ID, dataset: DATASET, apiVersion: API_VERSION, token: TOKEN, useCdn: false })

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------
async function upsert(doc) {
  const existing = await client.fetch(`*[_id == $id][0]._id`, { id: doc._id })
  if (existing) {
    console.log(`  ⏭  already exists: ${doc._id}`)
    return
  }
  await client.create(doc)
  console.log(`  ✅  created: ${doc._id}`)
}

// ---------------------------------------------------------------------------
// products
// ---------------------------------------------------------------------------
const products = [
  {
    _id: 'product-table-eggs',
    _type: 'product',
    id: { _type: 'slug', current: 'table-eggs' },
    title: 'Table',
    titleAccent: 'Eggs',
    description: 'Fresh eggs, collected from the farm, delivered the same day. Table eggs: sold by 30pc trays — ideal for home cooks and food businesses. Inspected and hygienically packed.',
    fullDescription: 'Our table eggs are our most popular product. Collected daily from our layer hens, each egg undergoes careful inspection for shell integrity and size consistency. We maintain a high-frequency delivery schedule to ensure you receive your eggs within 24–48 hours of laying.',
    features: [
      'Daily collection for maximum freshness',
      'Sizes: Mixed Grade (Large & Medium)',
      'Hygienically handled and packed',
      'Ideal for households, bakeries, and kiosks',
    ],
    details: ['Available in 30pc egg trays', 'Bulk cases for commercial buyers'],
    color: 'var(--brand-gold)',
    colorRgb: [236, 204, 116],
    gradient: 'from-brand-gold to-brand-orange',
  },
  {
    _id: 'product-poultry-manure',
    _type: 'product',
    id: { _type: 'slug', current: 'poultry-manure' },
    title: 'Poultry',
    titleAccent: 'Manure',
    description: 'Bagged organic fertilizer — nutrient-rich for gardens, farms, and commercial agriculture. Available in bulk sacks for large-scale operations.',
    fullDescription: "Our organic poultry manure is a potent source of nitrogen, phosphorus, and potassium. It's the right sustainable choice for soil enrichment, improving crop yields and soil structure in both small gardens and large agricultural projects.",
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
    color: 'var(--brand-sage)',
    colorRgb: [122, 158, 126],
    gradient: 'from-[#7a9e7e] to-[#4a7c59]',
  },
  {
    _id: 'product-ex-layer-hens',
    _type: 'product',
    id: { _type: 'slug', current: 'ex-layer-hens' },
    title: 'Ex-Layer',
    titleAccent: 'Hens',
    description: 'Healthy hens sold at end of laying cycle — suitable for meat use or re-homing. Raised with care, fed nutritious feed, and housed in clean, well-ventilated environments.',
    fullDescription: 'Our ex-layer hens are offered at the end of their peak laying cycle. These birds are healthy, well-fed, and have been under regular veterinary supervision. They are an affordable and high-quality source of lean poultry meat, favored for traditional recipes and soup bases.',
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
    color: 'var(--brand-terracotta)',
    colorRgb: [192, 97, 59],
    gradient: 'from-[#c0613b] to-[#a04525]',
  },
]

// ---------------------------------------------------------------------------
// testimonials
// ---------------------------------------------------------------------------
const testimonials = [
  {
    _id: 'testimonial-wanjiru',
    _type: 'testimonial',
    name: 'Wanjiru M.',
    location: 'Syokimau',
    rating: 5,
    text: "I've been buying from N&N for over eight months and the eggs are consistently fresh. Living in Syokimau, it's great to have such high-quality eggs delivered right to my door. The yolks are bright and rich — you can really taste the difference!",
  },
  {
    _id: 'testimonial-chef-kamau',
    _type: 'testimonial',
    name: 'Chef Kamau J.',
    company: 'Restaurant Owner',
    location: 'Machakos Town',
    rating: 5,
    text: 'We switched our restaurant supply in Machakos Town to N&N six months ago. Their wholesale pricing is fair, invoicing is professional, and I have never had a rejected batch. Highly recommended for any local food business.',
  },
  {
    _id: 'testimonial-amina',
    _type: 'testimonial',
    name: 'Amina S.',
    company: 'Breakfast Kiosk Owner',
    location: 'Athi River',
    rating: 4.5,
    text: "I run a small breakfast kiosk in Athi River and N&N's eggs have been a game-changer. WhatsApp ordering is super convenient, and they even remind me before I run low. This is the kind of supplier every small business needs.",
  },
  {
    _id: 'testimonial-david',
    _type: 'testimonial',
    name: 'David K.',
    company: 'Wholesale Distributor',
    location: 'Mlolongo',
    rating: 5,
    text: 'Supply chain reliability is everything in my business. N&N Poultry Palace delivers on time, every time. The quality of their eggs is top-tier, and the feedback from my retail partners has been overwhelmingly positive.',
  },
  {
    _id: 'testimonial-sarah',
    _type: 'testimonial',
    name: 'Sarah L.',
    location: 'Katoloni',
    rating: 4.5,
    text: "I started using their poultry manure for my kitchen garden last season and the results are incredible. It's rich, well-composted, and significantly improved my soil health. Plus, it's great to support a local farm that cares about sustainability!",
  },
]

// ---------------------------------------------------------------------------
// education articles
// ---------------------------------------------------------------------------
const educationArticles = [
  {
    _id: 'edu-day-one-chicks',
    _type: 'educationArticle',
    id: { _type: 'slug', current: 'day-one-chicks' },
    title: 'Welcoming One-Day-Old Chicks',
    category: 'the-chick-journey',
    excerpt: "The critical first 24 hours of a chick's life on the farm.",
    authorNote: "At N&N, we receive our day-old chicks from a trusted hatchery in Nairobi. The moment they arrive — usually before 7am — we're already in the brooding house, heaters on, water lines flushed and ready. Those first few hours set the tone for everything.",
    farmerTip: 'From experience, we always keep a backup heat source on hand for the first week. One power cut on a cold Machakos night is all it takes to lose an entire batch.',
    content: [
      'The journey of our high-quality table eggs begins with healthy, vigorous one-day-old chicks. When they arrive at our farm, the first 24 hours are critical for their long-term health and productivity.',
      'We prepare specialized brooding houses with precise temperature controls (around 32-35°C) because young chicks cannot regulate their own body temperature. The lighting is kept bright to help them easily locate water and feed.',
      'Providing immediate access to clean, electrolyte-infused water and high-quality starter feed ensures they recover from any transport stress and begin healthy growth immediately.',
    ],
  },
  {
    _id: 'edu-chicks-feeding',
    _type: 'educationArticle',
    id: { _type: 'slug', current: 'chicks-feeding' },
    title: 'The Science of Chick Feeding',
    category: 'the-chick-journey',
    excerpt: 'Building a strong skeletal and immune system through nutrition.',
    authorNote: "At N&N, we buy our starter crumble from a supplier whose composition we've verified ourselves — not just taken the bag's word for it. We've tried cheaper alternatives and seen the difference in shell quality six months later.",
    farmerTip: "We weigh a random sample of birds twice a week during the starter phase. If they're running light by week three, we know something is off with the feed or water intake — not the birds.",
    content: [
      'Nutrition in the early weeks is the foundation of a productive layer hen. Our chicks are fed a specially formulated starter crumble, which is rich in protein (around 20-22%) and fortified with essential vitamins and minerals.',
      'Calcium and phosphorus ratios are carefully monitored to promote strong skeletal development, which is vital for birds that will eventually produce strong-shelled eggs.',
      "Our feeding lines are designed for easy access, and we monitor consumption daily. Consistent, proper feeding during this phase directly correlates to the flock's uniformity and future peak egg production.",
    ],
  },
  {
    _id: 'edu-growth-to-hen',
    _type: 'educationArticle',
    id: { _type: 'slug', current: 'growth-to-hen' },
    title: 'From Pullet to Layer Hen',
    category: 'growth-and-care',
    excerpt: 'The transition phase where young pullets develop into productive adults.',
    authorNote: "At N&N, the transition from grower to layer house is something we handle over a week, not overnight. We move small groups at a time so the birds settle without stress. Rushed transitions show up in your production numbers — you feel it immediately.",
    farmerTip: "We always do our first light stimulation at exactly 17 weeks — not before. Too early and you trigger premature laying in birds whose bodies aren't ready, which hurts shell quality for the whole cycle.",
    content: [
      'As chicks grow into pullets (young hens), their nutritional and environmental needs change. The temperature is gradually reduced to ambient levels, and they are transitioned to a grower feed which supports steady, healthy growth without premature fattening.',
      'This period involves strict veterinary oversight, including a comprehensive vaccination schedule to protect them from common poultry diseases. We believe preventative care is the most ethical and sustainable approach to farming.',
      'By the time they reach 16-18 weeks of age, they are ready to be transferred to the layer house, fully equipped to begin their productive cycle.',
    ],
  },
  {
    _id: 'edu-care-and-welfare',
    _type: 'educationArticle',
    id: { _type: 'slug', current: 'care-and-welfare' },
    title: 'Flock Care and Daily Operations',
    category: 'growth-and-care',
    excerpt: 'Daily routines to ensure animal welfare and optimal farm conditions.',
    authorNote: "At N&N, the first thing we do each morning — before checking phones, before breakfast — is walk the flock. You learn to read a bird. A hen sitting apart from the group, a dip in drinking, feathers that look off. These small signals are what keep a flock healthy.",
    farmerTip: 'We keep a daily farm log in a simple notebook. If mortality spikes two days in a row, we know immediately — not after a week. Early detection is the difference between treating three birds and treating three hundred.',
    content: [
      "Our daily operations are guided by our core value of Integrity and doing what is right. Our experienced farmhands conduct multiple walk-throughs daily to monitor the flock's behavior, health, and comfort.",
      'Ventilation is constantly adjusted to ensure optimal air quality, and the barns are kept clean and dry. We use automated systems to monitor water consumption and house temperature, ensuring the environment remains stress-free.',
      'Happy, healthy birds are productive birds. We maintain low stocking densities to allow for natural behaviors, resulting in better overall welfare and superior egg production.',
    ],
  },
  {
    _id: 'edu-layer-hens-production',
    _type: 'educationArticle',
    id: { _type: 'slug', current: 'layer-hens-production' },
    title: 'Peak Production: The Layer Phase',
    category: 'product-excellence',
    excerpt: 'Managing hens during their most productive laying cycle.',
    authorNote: 'At N&N, we collect eggs three times a day during peak production — morning, midday, and late afternoon. That frequency is what keeps our eggs clean and uncracked. One collection a day is not enough for a high-producing flock.',
    farmerTip: "We judge the health of a laying cycle by the floor eggs, not just the nests. If we start finding more eggs on the floor than usual, it's the flock's way of telling us the nest boxes need attention or the lighting schedule is off.",
    content: [
      'During the layer phase, the diet is switched to a high-calcium layer mash to support daily egg production. The timing and duration of lighting in the barns are closely managed to simulate natural daylight and maintain consistent laying cycles.',
      'Eggs are collected gently and frequently throughout the day to ensure they remain clean and fresh. At this stage, our commitment to "Fresh and Nutritious" is realized in every egg laid.',
      'We continually monitor feed-to-egg conversion rates and eggshell quality, making minor nutritional adjustments as needed to keep the flock at peak performance.',
    ],
  },
  {
    _id: 'edu-poultry-manure-benefits',
    _type: 'educationArticle',
    id: { _type: 'slug', current: 'poultry-manure-benefits' },
    title: 'Sustainable Farming with Organic Manure',
    category: 'product-excellence',
    excerpt: 'How our high-quality organic manure supports regenerative agriculture.',
    authorNote: "At N&N, the manure comes out of our barns and goes into the sacks — nothing added, nothing treated with chemicals. We let it dry naturally in the Machakos sun, which concentrates the nutrients and eliminates most pathogens. The smell tells you when it's ready.",
    farmerTip: "We always advise customers to mix our manure into the soil a week before planting, not the same day. Give the soil microbes time to activate it — you'll see a visible difference in early plant growth.",
    content: [
      'At N&N Poultry Palace, we believe in a circular agricultural economy. Our organic poultry manure is a potent source of essential nutrients—nitrogen, phosphorus, and potassium (NPK)—which are vital for healthy plant growth and soil restoration.',
      'Unlike synthetic fertilizers, poultry manure improves soil structure by adding organic matter, which enhances water retention and supports beneficial soil microorganisms. This leads to long-term soil health and more resilient crop yields.',
      'Whether you are a small-scale gardener or a large-scale farmer, our carefully managed and naturally aged manure provides an eco-friendly alternative that helps reduce the chemical footprint on our land while delivering superior nutritional value to crops.',
    ],
  },
  {
    _id: 'edu-enhanced-biosecurity',
    _type: 'educationArticle',
    id: { _type: 'slug', current: 'enhanced-biosecurity' },
    title: 'Controlled Access for Enhanced Biosecurity',
    category: 'growth-and-care',
    excerpt: 'Safeguarding our flocks through strict access control and biosecurity measures.',
    authorNote: "At N&N, we don't allow casual visitors into the barns — even family. We know it sounds strict, but one disease outbreak can wipe out months of work. Our rule is simple: if you're coming into a barn, you change footwear and wash your hands. No exceptions.",
    farmerTip: "The most common disease entry point we've seen isn't visitors — it's new equipment. We always disinfect any second-hand feeders, drinkers, or crates before they touch the floor of our barns.",
    content: [
      'Biosecurity is our first line of defense against poultry diseases. We implement strict controlled access to all our barns to prevent the introduction of pathogens from outside sources.',
      'Visitors and farm workers must adhere to rigorous sanitation protocols, including the use of footbaths and farm-specific clothing, ensuring that the environment remains sterile and safe for our birds.',
      'By controlling who and what enters the facility, we maintain a healthy flock, reducing the need for medical interventions and guaranteeing the highest quality produce for our customers.',
    ],
  },
]

// ---------------------------------------------------------------------------
// siteConfig singleton
// ---------------------------------------------------------------------------
const siteConfig = {
  _id: 'siteConfig',
  _type: 'siteConfig',
  baseUrl: 'https://nnpoultrypalace.co.ke',
  contacts: {
    phones: ['+254 712 345 678', '+254 798 765 432'],
    email: 'orders@nnpoultrypalace.co.ke',
    address: 'N&N Poultry Palace, Machakos County, Kenya',
    whatsapp: '254712345678',
  },
  businessHours: {
    weekdays: 'Mon–Fri: 7:00 AM – 6:00 PM',
    saturday: 'Sat: 7:00 AM – 2:00 PM',
  },
  socialLinks: {
    facebook: null,
    twitter: null,
    instagram: null,
  },
  companyInfo: {
    vision: 'To be the most trusted poultry farm in Machakos County, known for quality, reliability, and ethical farming.',
    mission: 'To provide fresh, nutritious farm produce to households and businesses across Machakos and beyond, through honest farming practices and dependable service.',
    values: ['Integrity', 'Freshness', 'Reliability', 'Sustainability', 'Community'],
  },
  availability: {
    tableEggs: 120,
    manure: 40,
    exLayerHens: 200,
    lastUpdated: new Date().toISOString(),
    note: null,
  },
}

// ---------------------------------------------------------------------------
// aboutConfig singleton
// ---------------------------------------------------------------------------
const aboutConfig = {
  _id: 'aboutConfig',
  _type: 'aboutConfig',
  rootsParagraph1: "N&N Poultry Palace started as a small family operation in the hills of Machakos County. What began with a single brooding house and a few hundred day-old chicks has grown into one of the area's most trusted commercial layer farms — but the values have never changed.",
  rootsParagraph2: "We farm because we believe in feeding people well. Every tray of eggs that leaves our gate, every sack of manure we bag up, every hen we raise — it's done with care, consistency, and respect for the land. We don't cut corners because our customers trust us not to.",
  rootsQuote: "We farm because we believe in feeding people well.",
}

// ---------------------------------------------------------------------------
// founderConfig singleton
// ---------------------------------------------------------------------------
const founderConfig = {
  _id: 'founderConfig',
  _type: 'founderConfig',
  founderName: 'Nelson Mutua',
  founderRole: 'Founder & Farm Manager',
  yearsOnFarm: 8,
  founderQuote: "Farming is not just about production — it's about building something your community can count on.",
  founderStory: [
    "I started N&N in 2017 with a single brooding house and a lot of uncertainty. I'd spent years watching other farmers struggle with inconsistent markets and unreliable suppliers, and I knew there had to be a better way.",
    "The name N&N comes from my family — my wife Naomi and I built this together from the ground up. The first year was hard. We lost batches, we made mistakes, we learned. But we never compromised on the quality of what we sent out.",
    "Today, when a kiosk owner in Athi River tells me our eggs are the only ones her customers ask for by name — that's what it's all about. That trust is everything we've worked for.",
  ],
}

// ---------------------------------------------------------------------------
// run
// ---------------------------------------------------------------------------
async function main() {
  console.log('\n🌱  Seeding Sanity — project:', PROJECT_ID, '/', DATASET)

  console.log('\n📦  Products')
  for (const doc of products) await upsert(doc)

  console.log('\n💬  Testimonials')
  for (const doc of testimonials) await upsert(doc)

  console.log('\n📚  Education Articles')
  for (const doc of educationArticles) await upsert(doc)

  console.log('\n⚙️   Site Config')
  await upsert(siteConfig)

  console.log('\n🌿  About Config')
  await upsert(aboutConfig)

  console.log('\n👤  Founder Config')
  await upsert(founderConfig)

  console.log('\n✅  Seeding complete!')
  console.log('\n📸  Still needed (upload via Sanity Studio):')
  console.log('    • Product images (table-eggs.png, manure-bags.png, ex-layer-hen.png)')
  console.log('    • Education article images')
  console.log('    • Hero background image (siteConfig → heroImage)')
  console.log('    • Founder photo (founderConfig → founderPhoto)')
  console.log('    • About page image (aboutConfig → rootsImage)')
  console.log('    • Farm gallery photos (farmPhoto documents)')
}

main().catch((err) => { console.error(err); process.exit(1) })
