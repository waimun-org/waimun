import { defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons";

export const buttonType = defineType({
  name: "button",
  title: "Button",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "link",
      title: "Link",
      type: "link",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Primary (Default)", value: "default" },
          { title: "Secondary", value: "secondary" },
          { title: "Destructive", value: "destructive" },
          { title: "Outline", value: "outline" },
          { title: "Ghost", value: "ghost" },
        ],
        layout: "dropdown",
      },
      initialValue: "default",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      options: {
        list: [
          { title: "Small", value: "sm" },
          { title: "Medium (Default)", value: "default" },
          { title: "Large", value: "lg" },
        ],
        layout: "radio",
      },
      initialValue: "default",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      text: "link.text",
      url: "link.url",
      variant: "variant",
      size: "size",
    },
    prepare(selection: {
      text?: string;
      url?: string;
      variant?: string;
      size?: string;
    }) {
      const { text, url, variant, size } = selection;
      const style =
        variant === "default"
          ? "Primary"
          : variant
            ? variant.charAt(0).toUpperCase() + variant.slice(1)
            : "Unknown";
      const sizeLabel =
        size === "default" ? "Medium" : size ? size.toUpperCase() : "Unknown";

      return {
        title: text ?? "Button",
        subtitle: `${style} • ${sizeLabel} • ${url ?? "No URL"}`,
        media: LinkIcon,
      };
    },
  },
});
