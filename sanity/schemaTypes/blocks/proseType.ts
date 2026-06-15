import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";
import { TrimmingPortableTextInput } from "../../components/trimming-portable-text-input";

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
      of: [defineArrayMember({ type: "block" })],
      components: { input: TrimmingPortableTextInput },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Prose",
        media: DocumentTextIcon,
      };
    },
  },
});
