import { defineField, defineType } from "sanity";
import { ChevronDownIcon } from "@sanity/icons";

export const selectType = defineType({
  name: "select",
  title: "Select",
  type: "object",
  icon: ChevronDownIcon,
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
      name: "placeholder",
      title: "Placeholder",
      type: "string"
    }),
    defineField({
      name: "required",
      title: "Required",
      type: "boolean",
      initialValue: true
    }),
    defineField({
      name: "options",
      title: "Options",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "defaultValue",
      title: "Default Value",
      type: "string",
      initialValue: ""
    })
  ],
  preview: {
    select: {
      label: "label",
      options: "options",
      required: "required"
    },
    prepare(selection: {
      label?: string;
      options?: string[];
      required?: boolean;
    }) {
      const { label, options, required } = selection;
      const optionCount = Array.isArray(options) ? options.length : 0;
      const requiredLabel = required ? " • Required" : "";

      return {
        title: label ?? "Select Field",
        subtitle: `${optionCount} option${optionCount !== 1 ? "s" : ""}${requiredLabel}`,
        media: ChevronDownIcon
      };
    }
  }
});
