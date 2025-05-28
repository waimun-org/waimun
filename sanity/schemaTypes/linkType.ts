import { defineField, defineType } from "sanity";

export const linkType = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (rule) =>
        rule.required().uri({
          allowRelative: true,
          scheme: ["http", "https", "mailto", "tel"]
        })
    })
  ]
});
