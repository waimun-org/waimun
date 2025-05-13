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
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [{ type: "link" }],
    }),
  ],
});
