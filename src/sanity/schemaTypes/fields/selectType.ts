import { defineField, defineType } from "sanity";

export const selectType = defineType({
  name: "select",
  title: "Select",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "placeholder",
      title: "Placeholder",
      type: "string",
    }),
    defineField({
      name: "required",
      title: "Required",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "options",
      title: "Options",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "defaultValue",
      title: "Default Value",
      type: "string",
      initialValue: "",
    }),
  ],
});
