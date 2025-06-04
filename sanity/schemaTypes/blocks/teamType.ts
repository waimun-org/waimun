import { defineType, defineField } from "sanity";

export const teamType = defineType({
  name: "team",
  title: "Team",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "members",
      title: "Team Members",
      type: "array",
      of: [{ type: "teamMember" }],
      validation: (rule) => rule.required()
    })
  ]
});
