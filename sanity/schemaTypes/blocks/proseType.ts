import { defineField, defineType } from "sanity";

export const proseType = defineType({
  name: "prose",
  title: "Prose",
  type: "object",
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required()
    })
  ]
});
