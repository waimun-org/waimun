import { defineField, defineType } from "sanity";

export const inputType = defineType({
  name: "input",
  title: "Input",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "placeholder",
      title: "Placeholder",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "required",
      title: "Required",
      type: "boolean",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Text", value: "text" },
          { title: "Email", value: "email" },
          { title: "Tel", value: "tel" },
          { title: "Number", value: "number" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "minLength",
      title: "Min Length",
      type: "number",
    }),
    defineField({
      name: "maxLength",
      title: "Max Length",
      type: "number",
    }),
    defineField({
      name: "pattern",
      title: "Pattern",
      type: "string",
    }),
    defineField({
      name: "defaultValue",
      title: "Default Value",
      type: "string",
    }),
  ],
});
