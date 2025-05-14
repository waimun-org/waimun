import { defineField, defineType } from "sanity";

export const textareaType = defineType({
  name: "textarea",
  title: "Textarea",
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
      name: "rows",
      title: "Rows",
      type: "number",
    }),
    defineField({
      name: "placeholder",
      title: "Placeholder",
      type: "string",
    }),
  ],
});
