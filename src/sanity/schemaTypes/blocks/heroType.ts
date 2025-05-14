import { defineArrayMember, defineType } from "sanity";

export const heroType = defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "intent",
      title: "Intent",
      type: "string",
      options: {
        list: [
          { title: "High Impact", value: "high-impact" },
          { title: "Low Impact", value: "low-impact" },
        ],
      },
      validation: (rule) => rule.required(),
    },
    {
      name: "text",
      title: "Text",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    },
    {
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [defineArrayMember({ type: "button" })],
    },
    {
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
      validation: (rule) => rule.required(),
    },
  ],
});
