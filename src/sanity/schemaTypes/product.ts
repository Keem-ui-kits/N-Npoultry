import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Slug (URL ID)',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleAccent',
      title: 'Title Accent',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'text',
    }),
    defineField({
      name: 'features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'details',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'color',
      title: 'CSS Color (e.g. var(--brand-gold))',
      type: 'string',
    }),
    defineField({
      name: 'colorRgb',
      title: 'Color RGB (3 numbers: R, G, B)',
      type: 'array',
      of: [{ type: 'number' }],
      validation: (Rule) => Rule.max(3).min(3),
    }),
    defineField({
      name: 'gradient',
      title: 'Tailwind Gradient Classes',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'titleAccent', media: 'image' },
    prepare({ title, subtitle, media }: { title?: string; subtitle?: string; media?: unknown }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return { title: `${title ?? ''} ${subtitle ?? ''}`.trim(), media: media as any }
    },
  },
})
