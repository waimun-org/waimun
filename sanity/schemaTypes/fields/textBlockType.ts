import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const textBlockType = defineType({
  name: "textBlock",
  title: "Text Block",
  type: "object",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      initialValue: "Text Block",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      label: "label",
    },
    prepare(selection: { label?: string }) {
      const { label } = selection;

      return {
        title: label ?? "Text Block",
        media: DocumentTextIcon,
      };
    },
  },
});
