import { defineField, defineType } from "sanity";
import { CheckmarkIcon } from "@sanity/icons";

export const checkboxType = defineType({
  name: "checkbox",
  title: "Checkbox",
  type: "object",
  icon: CheckmarkIcon,
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
      type: "boolean",
      initialValue: false
    }),
    defineField({
      name: "defaultValue",
      title: "Default Value",
      type: "boolean",
      initialValue: false
    })
  ],
  preview: {
    select: {
      label: "label",
      required: "required",
      defaultValue: "defaultValue"
    },
    prepare(selection: {
      label?: string;
      required?: boolean;
      defaultValue?: boolean;
    }) {
      const { label, required, defaultValue } = selection;
      const requiredLabel = required ? " • Required" : "";
      const defaultLabel = defaultValue ? " • Default: checked" : "";

      return {
        title: label ?? "Checkbox Field",
        subtitle: `Checkbox${requiredLabel}${defaultLabel}`,
        media: CheckmarkIcon
      };
    }
  }
});
