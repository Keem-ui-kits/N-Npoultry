import { defineField, defineType } from 'sanity'

export const homeConfigType = defineType({
  name: 'homeConfig',
  title: 'Home Page Content',
  type: 'document',
  fields: [
    // ─── HERO ──────────────────────────────────────────────
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'headlinePre', title: 'Headline — before accent', type: 'string', description: 'e.g. "Every egg,"' }),
        defineField({ name: 'headlineAccent', title: 'Headline — gradient/accent words', type: 'string', description: 'e.g. "every day,"' }),
        defineField({ name: 'headlinePost', title: 'Headline — after accent', type: 'string', description: 'e.g. "Done right."' }),
        defineField({ name: 'subtext', title: 'Sub-headline paragraph', type: 'text', rows: 3, description: 'Delivery-time copy below the headline' }),
        defineField({ name: 'locationBadge', title: 'Location badge text', type: 'string', description: 'e.g. "Machakos Farm"' }),
        defineField({ name: 'slotNote', title: 'Slot note (shown below CTAs)', type: 'string', description: 'e.g. "Slots fill by 10 AM daily"' }),
        defineField({ name: 'ctaPrimary', title: 'Primary CTA label', type: 'string', description: 'e.g. "Order on WhatsApp"' }),
        defineField({ name: 'ctaSecondary', title: 'Secondary CTA label', type: 'string', description: 'e.g. "Explore"' }),
      ],
    }),

    // ─── FARM PULSE ────────────────────────────────────────
    defineField({
      name: 'farmPulse',
      title: 'Farm Pulse Section',
      type: 'object',
      fields: [
        defineField({ name: 'headingPre', title: 'Heading — before accent', type: 'string', description: 'e.g. "What\'s"' }),
        defineField({ name: 'headingAccent', title: 'Heading — accent/gradient word', type: 'string', description: 'e.g. "Happening"' }),
        defineField({ name: 'headingPost', title: 'Heading — after accent', type: 'string', description: 'e.g. "at the Farm"' }),
        defineField({ name: 'description', title: 'Section description', type: 'text', rows: 2 }),
        defineField({ name: 'card1Badge', title: 'Card 1 — Badge label', type: 'string' }),
        defineField({ name: 'card1Title', title: 'Card 1 — Title', type: 'string' }),
        defineField({ name: 'card1Body', title: 'Card 1 — Body text', type: 'text', rows: 3 }),
        defineField({ name: 'card1Stat', title: 'Card 1 — Stat (e.g. "24–48hrs")', type: 'string' }),
        defineField({ name: 'card1StatLabel', title: 'Card 1 — Stat label', type: 'string' }),
        defineField({ name: 'card2Badge', title: 'Card 2 — Badge label', type: 'string' }),
        defineField({ name: 'card2Title', title: 'Card 2 — Title', type: 'string' }),
        defineField({ name: 'card2Body', title: 'Card 2 — Body text', type: 'text', rows: 3 }),
        defineField({ name: 'card3Badge', title: 'Card 3 — Badge label', type: 'string' }),
        defineField({ name: 'card3Title', title: 'Card 3 — Title', type: 'string' }),
        defineField({ name: 'card3Body', title: 'Card 3 — Body text', type: 'text', rows: 3 }),
        defineField({ name: 'card4Badge', title: 'Card 4 — Badge label', type: 'string' }),
        defineField({ name: 'card4Title', title: 'Card 4 — Title', type: 'string' }),
        defineField({ name: 'card4Body', title: 'Card 4 — Body text', type: 'text', rows: 3 }),
        defineField({ name: 'card4CtaLabel', title: 'Card 4 — CTA button label', type: 'string' }),
      ],
    }),

    // ─── HOW WE WORK ────────────────────────────────────────
    defineField({
      name: 'howWeWork',
      title: 'How We Work Section',
      type: 'object',
      fields: [
        defineField({ name: 'headlinePrimary', title: 'Headline line 1', type: 'string', description: 'e.g. "Order today."' }),
        defineField({ name: 'headlineAccent', title: 'Headline line 2 (gradient)', type: 'string', description: 'e.g. "Delivered tomorrow."' }),
        defineField({ name: 'description', title: 'Description paragraph', type: 'text', rows: 3 }),
        defineField({ name: 'step1Title', title: 'Step 1 — Title', type: 'string' }),
        defineField({ name: 'step1Description', title: 'Step 1 — Description', type: 'text', rows: 2 }),
        defineField({ name: 'step2Title', title: 'Step 2 — Title', type: 'string' }),
        defineField({ name: 'step2Description', title: 'Step 2 — Description', type: 'text', rows: 2 }),
        defineField({ name: 'step3Title', title: 'Step 3 — Title', type: 'string' }),
        defineField({ name: 'step3Description', title: 'Step 3 — Description', type: 'text', rows: 2 }),
        defineField({ name: 'step4Title', title: 'Step 4 — Title', type: 'string' }),
        defineField({ name: 'step4Description', title: 'Step 4 — Description', type: 'text', rows: 2 }),
      ],
    }),

    // ─── CONTACT CTA ─────────────────────────────────────────
    defineField({
      name: 'contactCta',
      title: 'Contact CTA Section',
      type: 'object',
      fields: [
        defineField({ name: 'headlinePre', title: 'Headline — before accent', type: 'string', description: 'e.g. "Let\'s sort"' }),
        defineField({ name: 'headlineAccent', title: 'Headline — gradient/accent', type: 'string', description: 'e.g. "your first"' }),
        defineField({ name: 'headlinePost', title: 'Headline — after accent', type: 'string', description: 'e.g. "order."' }),
        defineField({ name: 'description', title: 'Description paragraph', type: 'text', rows: 3 }),
        defineField({ name: 'ctaPrimary', title: 'Primary CTA label', type: 'string' }),
      ],
    }),

    // ─── FARM GALLERY ───────────────────────────────────────
    defineField({
      name: 'farmGallery',
      title: 'Farm Gallery Section',
      type: 'object',
      fields: [
        defineField({ name: 'badgeText', title: 'Badge text', type: 'string', description: 'e.g. "Inside N&N Poultry Palace"' }),
        defineField({ name: 'heading', title: 'Heading — main text', type: 'string', description: 'e.g. "The Farm,"' }),
        defineField({ name: 'headingAccent', title: 'Heading — accent/gradient word', type: 'string', description: 'e.g. "Live."' }),
        defineField({ name: 'description', title: 'Caption text (right side)', type: 'text', rows: 3, description: 'e.g. "What you see is what you get. These are real moments from our farm in Machakos—no filters, no stock photos, just honest hard work."' }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page Content' }
    },
  },
})
