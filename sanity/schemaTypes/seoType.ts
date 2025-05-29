import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Meta Title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "description",
      title: "Meta Description",
      type: "text",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string"
        })
      ]
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      initialValue: false,
      validation: (rule) => rule.required()
    })
  ]
});
