import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'educationArticle',
  title: 'Education Article',
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
      name: 'category',
      type: 'string',
      options: {
        list: [
          { title: 'The Chick Journey', value: 'the-chick-journey' },
          { title: 'Growth & Care', value: 'growth-and-care' },
          { title: 'Product Excellence', value: 'product-excellence' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
    }),
    defineField({
      name: 'content',
      title: 'Content (one item per paragraph)',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'authorNote',
      title: 'Farm Note (shown as a callout at the top)',
      description: 'Write as "At N&N, we..." — first person, farm-specific',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'farmerTip',
      title: 'Farmer\'s Practical Tip',
      description: 'One practical tip in first person, e.g. "From experience, we always..."',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
})
