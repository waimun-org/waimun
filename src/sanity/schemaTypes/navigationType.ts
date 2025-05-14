import { defineField, defineType } from "sanity";

export const navigationType = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
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
        },
      ],
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [{ type: "link" }],
      validation: (rule) => rule.required(),
    }),
  ],
});
