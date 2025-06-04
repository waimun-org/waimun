import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text"
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
          type: "string",
          validation: (rule) => rule.required()
        })
      ]
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines?",
      type: "boolean",
      initialValue: false,
      validation: (rule) => rule.required()
    })
  ]
});
