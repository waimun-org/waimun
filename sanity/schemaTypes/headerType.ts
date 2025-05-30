import { defineField, defineType } from "sanity";

export const headerType = defineType({
  name: "header",
  title: "Header",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          validation: (rule) => rule.required()
        }
      ],
      options: {
        hotspot: true
      },
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
