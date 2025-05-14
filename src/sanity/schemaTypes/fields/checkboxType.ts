import { defineField, defineType } from "sanity";

export const checkboxType = defineType({
  name: "checkbox",
  title: "Checkbox",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string"
    }),
    defineField({
      name: "required",
      title: "Required",
      description: "Whether the checkbox must be checked",
      type: "boolean",
      initialValue: false
    }),
    defineField({
      name: "defaultValue",
      title: "Default Value",
      description: "Whether the checkbox should be checked by default",
      type: "boolean",
      initialValue: false
    })
  ]
});
