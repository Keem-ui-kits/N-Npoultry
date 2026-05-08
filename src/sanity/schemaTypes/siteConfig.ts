import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteConfig',
  title: 'Site Configuration',
  type: 'document',
  // Singleton — only one document should exist
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'baseUrl',
      title: 'Base URL',
      type: 'url',
    }),
    defineField({
      name: 'contacts',
      type: 'object',
      fields: [
        defineField({ name: 'phones', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'email', type: 'string' }),
        defineField({ name: 'address', type: 'string' }),
        defineField({ name: 'whatsapp', type: 'string', title: 'WhatsApp Number (country code + number)' }),
      ],
    }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'object',
      fields: [
        defineField({ name: 'weekdays', type: 'string', title: 'Weekdays (e.g. Mon–Fri: 8:00 AM – 5:00 PM)' }),
        defineField({ name: 'saturday', type: 'string', title: 'Saturday hours' }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
        defineField({ name: 'twitter', title: 'Twitter / X URL', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
      ],
    }),
    defineField({
      name: 'companyInfo',
      title: 'Company Info',
      type: 'object',
      fields: [
        defineField({ name: 'vision', type: 'text' }),
        defineField({ name: 'mission', type: 'text' }),
        defineField({ name: 'values', type: 'array', of: [{ type: 'text' }] }),
      ],
    }),
    defineField({
      name: 'deliveryZones',
      title: 'Delivery Zones',
      description: 'Areas covered by daily delivery routes (shown on the home page)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'availability',
      title: 'Current Stock Availability',
      description: 'Update weekly to show live stock on the website',
      type: 'object',
      fields: [
        defineField({ name: 'tableEggs', title: 'Egg Trays Available (number)', type: 'number' }),
        defineField({ name: 'manure', title: 'Manure Sacks Available (number)', type: 'number' }),
        defineField({ name: 'exLayerHens', title: 'Ex-Layer Hens Available (number)', type: 'number' }),
        defineField({ name: 'lastUpdated', title: 'Last Updated', type: 'datetime' }),
        defineField({ name: 'note', title: 'Availability Note (e.g. "Only 4 trays left for afternoon dispatch")', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'baseUrl' },
    prepare({ title }: { title?: string }) {
      return { title: title ?? 'Site Configuration' }
    },
  },
})
