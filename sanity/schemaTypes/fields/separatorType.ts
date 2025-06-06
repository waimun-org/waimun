import { defineField, defineType } from "sanity";
import { RemoveIcon } from "@sanity/icons";

export const separatorType = defineType({
  name: "separator",
  title: "Separator",
  type: "object",
  icon: RemoveIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      initialValue: "Separator",
    }),
  ],
  preview: {
    select: {
      label: "label",
    },
    prepare(selection: { label?: string }) {
      const { label } = selection;

      return {
        title: label ?? "Separator",
        media: RemoveIcon,
      };
    },
  },
});
