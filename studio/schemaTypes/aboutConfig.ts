import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'aboutConfig',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'rootsImage',
      title: 'Our Roots - Farm Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'rootsParagraph1',
      title: 'Our Roots - Opening Paragraph',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'rootsParagraph2',
      title: 'Our Roots - Middle Paragraph',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'rootsQuote',
      title: 'Our Roots - Pull Quote',
      type: 'text',
      rows: 2,
    }),
  ],
});
