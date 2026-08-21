import { defineField, defineType } from "sanity";
import { CommentIcon } from "@sanity/icons/Comment";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "place",
      title: "Place",
      type: "string",
      description: "Delivery zone or location, e.g. Syokimau",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / business type",
      type: "string",
      description: "e.g. Restaurant owner, Household — optional",
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured (dominant quote)",
      type: "boolean",
      description: "Show as the large, single dominant quote rather than in the small grid.",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "place" },
  },
});
