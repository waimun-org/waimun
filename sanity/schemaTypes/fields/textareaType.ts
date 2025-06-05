import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const textareaType = defineType({
  name: "textarea",
  title: "Textarea",
  type: "object",
  icon: DocumentTextIcon,
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
      required: "required"
    },
    prepare(selection: { label?: string; required?: boolean }) {
      const { label, required } = selection;
      const requiredLabel = required ? " • Required" : "";

      return {
        title: label ?? "Textarea Field",
        subtitle: `Textarea${requiredLabel}`,
        media: DocumentTextIcon
      };
    }
  }
});
