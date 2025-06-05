import { defineField, defineType } from "sanity";
import { EditIcon } from "@sanity/icons";

export const inputType = defineType({
  name: "input",
  title: "Input",
  type: "object",
  icon: EditIcon,
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
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Text", value: "text" },
          { title: "Email", value: "email" },
          { title: "Tel", value: "tel" },
          { title: "Number", value: "number" }
        ]
      },
      initialValue: "text"
    }),
    defineField({
      name: "minLength",
      title: "Min Length",
      type: "number"
    }),
    defineField({
      name: "maxLength",
      title: "Max Length",
      type: "number"
    }),
    defineField({
      name: "pattern",
      title: "Pattern",
      type: "string"
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
      type: "type",
      required: "required"
    },
    prepare(selection: { label?: string; type?: string; required?: boolean }) {
      const { label, type, required } = selection;
      const typeLabel = type
        ? type.charAt(0).toUpperCase() + type.slice(1)
        : "Text";
      const requiredLabel = required ? " • Required" : "";

      return {
        title: label ?? "Input Field",
        subtitle: `${typeLabel}${requiredLabel}`,
        media: EditIcon
      };
    }
  }
});
