import { defineField, defineType } from "sanity";

export const footerType = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [{ type: "link" }],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "socials",
      title: "Socials",
      type: "array",
      of: [{ type: "social" }],
      validation: (rule) => rule.required()
    })
  ]
});
