import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";

const CATEGORIES = ["The Chick Journey", "Growth & Care", "Product Excellence"];
const PRODUCT_SLUGS = ["table-eggs", "poultry-manure", "ex-layer-hens"];

export const educationArticle = defineType({
  name: "educationArticle",
  title: "Education Article",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "card", title: "Hub card" },
    { name: "full", title: "Full write-up" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "card",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "card",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fieldNote",
      title: "Field note label",
      type: "string",
      group: "card",
      description: 'e.g. "Field note 04"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "card",
      options: { list: CATEGORIES, layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      group: "card",
      rows: 3,
      description: "Shown on the hub grid card. Optional for smaller cards.",
    }),
    defineField({
      name: "image",
      title: "Card / hero image",
      type: "image",
      group: "card",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string", validation: (rule) => rule.required() })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "aspect",
      title: "Card image aspect ratio",
      type: "string",
      group: "card",
      options: { list: ["21/9", "16/9", "4/5", "3/2", "16/10"] },
      initialValue: "3/2",
    }),
    defineField({
      name: "span",
      title: "Hub grid span",
      type: "string",
      group: "card",
      options: {
        list: [
          { title: "Featured (full-bleed)", value: "featured" },
          { title: "Large — 7 of 12 cols", value: "md:col-span-7" },
          { title: "Medium — 5 of 12 cols", value: "md:col-span-5" },
          { title: "Small — 4 of 12 cols", value: "md:col-span-4" },
          { title: "Full row — 12 of 12 cols", value: "md:col-span-12" },
        ],
      },
      initialValue: "md:col-span-4",
    }),

    defineField({
      name: "full",
      title: "Full write-up",
      type: "object",
      group: "full",
      description: "Leave empty to show a 'full write-up coming soon' placeholder on the article page.",
      fields: [
        defineField({ name: "readTime", title: "Read time", type: "string", description: "e.g. 6 min read" }),
        defineField({ name: "dek", title: "Dek / subhead", type: "text", rows: 2 }),
        defineField({ name: "heroAlt", title: "Hero image alt text (article page)", type: "string" }),
        defineField({ name: "heroCaption", title: "Hero caption", type: "string" }),
        defineField({
          name: "factRail",
          title: "Fact rail",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "fact",
              fields: [
                defineField({ name: "label", type: "string" }),
                defineField({ name: "value", type: "string" }),
              ],
              preview: { select: { title: "label", subtitle: "value" } },
            }),
          ],
        }),
        defineField({
          name: "body",
          title: "Body",
          type: "array",
          of: [
            defineArrayMember({
              type: "block",
              styles: [
                { title: "Normal", value: "normal" },
                { title: "H2", value: "h2" },
              ],
              lists: [],
              marks: { decorators: [{ title: "Emphasis", value: "em" }, { title: "Strong", value: "strong" }] },
            }),
            defineArrayMember({ type: "pullQuote" }),
          ],
        }),
        defineField({ name: "farmerTip", title: "Farmer's tip", type: "text", rows: 3 }),
        defineField({
          name: "stats",
          title: "The numbers — stat band",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "stat",
              fields: [
                defineField({ name: "number", type: "string" }),
                defineField({ name: "label", type: "string" }),
              ],
              preview: { select: { title: "number", subtitle: "label" } },
            }),
          ],
          validation: (rule) => rule.max(3),
        }),
        defineField({
          name: "productCrossSell",
          title: "Product cross-sell",
          type: "object",
          fields: [
            defineField({
              name: "productSlug",
              title: "Product",
              type: "string",
              options: {
                list: PRODUCT_SLUGS.map((slug) => ({ title: slug, value: slug })),
              },
            }),
            defineField({ name: "body", title: "Copy", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "fieldNote", media: "image" },
  },
});
