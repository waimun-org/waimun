import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const proseType = defineType({
  name: "prose",
  title: "Prose",
  type: "object",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required()
    })
  ],
  preview: {
    prepare() {
      return {
        title: "Prose",
        media: DocumentTextIcon
      };
    }
  }
});
