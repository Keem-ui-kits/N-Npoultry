import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'founderConfig',
  title: 'Founder Story',
  type: 'document',
  fields: [
    defineField({
      name: 'founderName',
      title: 'Founder Name',
      type: 'string',
    }),
    defineField({
      name: 'founderRole',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'yearsOnFarm',
      title: 'Years Farming',
      type: 'number',
    }),
    defineField({
      name: 'founderPhoto',
      title: 'Founder Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'founderQuote',
      title: 'Founder Quote',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'founderStory',
      title: 'Founder Story',
      type: 'array',
      of: [{ type: 'text' }],
    }),
  ],
  preview: {
    select: { title: 'founderName', subtitle: 'founderRole', media: 'founderPhoto' },
    prepare({ title, subtitle, media }: { title?: string; subtitle?: string; media?: Record<string, unknown> }) {
      return { title: title ?? 'Founder Story', subtitle, media: media as string | undefined };
    },
  },
});
