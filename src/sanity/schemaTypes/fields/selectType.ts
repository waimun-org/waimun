import { defineField, defineType } from "sanity";

export const selectType = defineType({
  name: "select",
  title: "Select",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "required",
      title: "Required",
      type: "boolean",
    }),
    defineField({
      name: "options",
      title: "Options",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "defaultValue",
      title: "Default Value",
      type: "string",
    }),
  ],
});
