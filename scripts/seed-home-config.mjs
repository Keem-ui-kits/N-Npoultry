/**
 * Seeds the homeConfig and siteConfig (deliveryZones) documents into Sanity.
 * Run with: node scripts/seed-home-config.mjs
 */
import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: join(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// ─── homeConfig ────────────────────────────────────────────────────────────────
const homeConfig = {
  _id: 'homeConfig',
  _type: 'homeConfig',
  hero: {
    headlinePre: 'Every egg,',
    headlineAccent: 'every day,',
    headlinePost: 'Done right.',
    subtext: 'Collected at 2 PM. Packed by 5 PM. On your doorstep before noon — straight from Machakos, Kenya.',
    locationBadge: 'Machakos Farm',
    slotNote: 'Slots fill by 10 AM daily',
    ctaPrimary: 'Order on WhatsApp',
    ctaSecondary: 'Explore',
  },
  farmPulse: {
    headingPre: "What's",
    headingAccent: 'Happening',
    headingPost: 'at the Farm',
    description: 'Every egg you order was laid here, graded here, and dispatched from here. No cold storage, no middlemen — just our farm in Machakos County.',
    card1Badge: 'Collected this morning',
    card1Title: "Today's batch — Collection starts at 2pm",
    card1Body: "Hens lay from dawn to slightly past midday. Collection and grading start from 2pm to 4pm. Previous day's collection is sold in the local market every day to retain quality and freshness.",
    card1Stat: '24–48hrs',
    card1StatLabel: 'Farm to delivery',
    card2Badge: 'Active',
    card2Title: 'We Deliver Across the Region',
    card2Body: 'From Machakos Town to Athi River and beyond — we run daily delivery routes so you get fresh product without travelling to the farm.',
    card3Badge: 'Our Standard',
    card3Title: 'Inspected Before It Leaves the Farm',
    card3Body: 'Every tray is checked for cracks, size consistency, and shell quality before packing. We reject anything that does not meet our standard — not you.',
    card4Badge: 'Always Open',
    card4Title: 'WhatsApp Is How Most Customers Order',
    card4Body: "No forms, no waiting. Send us a message with what you need and we'll confirm quantities and your next delivery slot — usually within minutes.",
    card4CtaLabel: 'Message us on WhatsApp',
  },
  howWeWork: {
    headlinePrimary: 'Order today.',
    headlineAccent: 'Delivered tomorrow.',
    description: "Send a WhatsApp message, get your price and slot confirmed in minutes, and receive your order the next morning. Most of Machakos County is on our daily route.",
    step1Title: 'Inquire',
    step1Description: 'Message us on WhatsApp with what you need — eggs, manure, or hens. We reply within minutes, not hours.',
    step2Title: 'Order',
    step2Description: 'We confirm your quantity, current price, and the next available delivery slot. Simple and transparent.',
    step3Title: 'Deliver',
    step3Description: 'Your order is packed fresh and dispatched on our daily route. We cover Machakos Town, Syokimau, Athi River, and beyond.',
    step4Title: 'Guarantee',
    step4Description: 'Every tray is shell-checked before it leaves the farm. If something is wrong when it arrives, we make it right.',
  },
  contactCta: {
    headlinePre: "Let's sort",
    headlineAccent: 'your first',
    headlinePost: 'order.',
    description: "Daily delivery to Machakos Town, Syokimau, Athi River, Mlolongo, and beyond. Message us your quantity — we'll confirm the price and slot within minutes.",
    ctaPrimary: 'Order on WhatsApp',
  },
  farmGallery: {
    badgeText: 'Inside N&N Poultry Palace',
    heading: 'The Farm,',
    headingAccent: 'Live.',
    description: 'Real photos from our Machakos operation — no filters, no stock imagery.',
  },
}

// ─── siteConfig delivery zones patch ──────────────────────────────────────────
const deliveryZones = ['Machakos Town', 'Syokimau', 'Athi River', 'Mlolongo', 'Katoloni', 'Mwala']

async function run() {
  // createOrReplace idempotent — safe to re-run
  console.log('Seeding homeConfig…')
  await client.createOrReplace(homeConfig)
  console.log('✓ homeConfig created/updated')

  console.log('Patching siteConfig with deliveryZones…')
  await client
    .patch('siteConfig')
    .setIfMissing({ deliveryZones })
    .commit()
    .catch(() => {
      // siteConfig may not exist yet — create a minimal one
      return client.createIfNotExists({
        _id: 'siteConfig',
        _type: 'siteConfig',
        deliveryZones,
      })
    })
  console.log('✓ siteConfig deliveryZones set')

  console.log('\nDone! Open your Sanity Studio to review and publish the documents.')
}

run().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
