import { defineField, defineType } from "sanity";

export const checkboxType = defineType({
  name: "checkbox",
  title: "Checkbox",
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
      name: "required",
      title: "Required",
      type: "boolean",
    }),
    defineField({
      name: "defaultValue",
      title: "Default Value",
      type: "string",
    }),
  ],
});
