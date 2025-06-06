import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const textBlockType = defineType({
  name: "textBlock",
  title: "Text Block",
  type: "object",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Text Block",
        media: DocumentTextIcon,
      };
    },
  },
});
