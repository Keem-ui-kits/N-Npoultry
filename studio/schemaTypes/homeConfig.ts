import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homeConfig',
  title: 'Home Page Content',
  type: 'document',
  fields: [
    // HERO
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'headlinePre', title: 'Headline - before accent', type: 'string' }),
        defineField({ name: 'headlineAccent', title: 'Headline - gradient/accent words', type: 'string' }),
        defineField({ name: 'headlinePost', title: 'Headline - after accent', type: 'string' }),
        defineField({ name: 'subtext', title: 'Sub-headline paragraph', type: 'text', rows: 3 }),
        defineField({ name: 'locationBadge', title: 'Location badge text', type: 'string' }),
        defineField({ name: 'slotNote', title: 'Slot note (shown below CTAs)', type: 'string' }),
        defineField({ name: 'ctaPrimary', title: 'Primary CTA label', type: 'string' }),
        defineField({ name: 'ctaSecondary', title: 'Secondary CTA label', type: 'string' }),
      ],
    }),

    // FARM PULSE
    defineField({
      name: 'farmPulse',
      title: 'Farm Pulse Section',
      type: 'object',
      fields: [
        defineField({ name: 'headingPre', title: 'Heading - before accent', type: 'string' }),
        defineField({ name: 'headingAccent', title: 'Heading - accent/gradient word', type: 'string' }),
        defineField({ name: 'headingPost', title: 'Heading - after accent', type: 'string' }),
        defineField({ name: 'description', title: 'Section description', type: 'text', rows: 2 }),
        defineField({ name: 'card1Badge', title: 'Card 1 - Badge label', type: 'string' }),
        defineField({ name: 'card1Title', title: 'Card 1 - Title', type: 'string' }),
        defineField({ name: 'card1Body', title: 'Card 1 - Body text', type: 'text', rows: 3 }),
        defineField({ name: 'card1Stat', title: 'Card 1 - Stat', type: 'string' }),
        defineField({ name: 'card1StatLabel', title: 'Card 1 - Stat label', type: 'string' }),
        defineField({ name: 'card2Badge', title: 'Card 2 - Badge label', type: 'string' }),
        defineField({ name: 'card2Title', title: 'Card 2 - Title', type: 'string' }),
        defineField({ name: 'card2Body', title: 'Card 2 - Body text', type: 'text', rows: 3 }),
        defineField({ name: 'card3Badge', title: 'Card 3 - Badge label', type: 'string' }),
        defineField({ name: 'card3Title', title: 'Card 3 - Title', type: 'string' }),
        defineField({ name: 'card3Body', title: 'Card 3 - Body text', type: 'text', rows: 3 }),
        defineField({ name: 'card4Badge', title: 'Card 4 - Badge label', type: 'string' }),
        defineField({ name: 'card4Title', title: 'Card 4 - Title', type: 'string' }),
        defineField({ name: 'card4Body', title: 'Card 4 - Body text', type: 'text', rows: 3 }),
        defineField({ name: 'card4CtaLabel', title: 'Card 4 - CTA button label', type: 'string' }),
      ],
    }),

    // HOW WE WORK
    defineField({
      name: 'howWeWork',
      title: 'How We Work Section',
      type: 'object',
      fields: [
        defineField({ name: 'headlinePrimary', title: 'Headline line 1', type: 'string' }),
        defineField({ name: 'headlineAccent', title: 'Headline line 2', type: 'string' }),
        defineField({ name: 'description', title: 'Description paragraph', type: 'text', rows: 3 }),
        defineField({ name: 'step1Title', title: 'Step 1 - Title', type: 'string' }),
        defineField({ name: 'step1Description', title: 'Step 1 - Description', type: 'text', rows: 2 }),
        defineField({ name: 'step2Title', title: 'Step 2 - Title', type: 'string' }),
        defineField({ name: 'step2Description', title: 'Step 2 - Description', type: 'text', rows: 2 }),
        defineField({ name: 'step3Title', title: 'Step 3 - Title', type: 'string' }),
        defineField({ name: 'step3Description', title: 'Step 3 - Description', type: 'text', rows: 2 }),
        defineField({ name: 'step4Title', title: 'Step 4 - Title', type: 'string' }),
        defineField({ name: 'step4Description', title: 'Step 4 - Description', type: 'text', rows: 2 }),
      ],
    }),

    // CONTACT CTA
    defineField({
      name: 'contactCta',
      title: 'Contact CTA Section',
      type: 'object',
      fields: [
        defineField({ name: 'headlinePre', title: 'Headline - before accent', type: 'string' }),
        defineField({ name: 'headlineAccent', title: 'Headline - gradient/accent', type: 'string' }),
        defineField({ name: 'headlinePost', title: 'Headline - after accent', type: 'string' }),
        defineField({ name: 'description', title: 'Description paragraph', type: 'text', rows: 3 }),
        defineField({ name: 'ctaPrimary', title: 'Primary CTA label', type: 'string' }),
      ],
    }),

    // FARM GALLERY
    defineField({
      name: 'farmGallery',
      title: 'Farm Gallery Section',
      type: 'object',
      fields: [
        defineField({ name: 'badgeText', title: 'Badge text', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading - main text', type: 'string' }),
        defineField({ name: 'headingAccent', title: 'Heading - accent/gradient word', type: 'string' }),
        defineField({ name: 'description', title: 'Caption text', type: 'text', rows: 3 }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page Content' };
    },
  },
});
