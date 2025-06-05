import { defineArrayMember, defineField, defineType } from "sanity";
import { ComponentIcon, ImageIcon, LinkIcon, ShareIcon } from "@sanity/icons";

export const headerType = defineType({
  name: "header",
  title: "Header",
  type: "document",
  icon: ComponentIcon,
  groups: [
    {
      name: "branding",
      title: "Branding",
      icon: ImageIcon,
      default: true
    },
    {
      name: "navigation",
      title: "Navigation",
      icon: LinkIcon
    },
    {
      name: "social",
      title: "Social",
      icon: ShareIcon
    }
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "branding",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "branding",
      options: {
        hotspot: true
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required()
        })
      ],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [defineArrayMember({ type: "link" })],
      group: "navigation",
      validation: (rule) => rule.required().min(1)
    }),
    defineField({
      name: "socials",
      title: "Socials",
      type: "array",
      of: [defineArrayMember({ type: "social" })],
      group: "social"
    })
  ],
  preview: {
    select: {
      title: "title",
      linkCount: "links"
    },
    prepare(selection: { title?: string; linkCount?: unknown[] }) {
      const { title, linkCount } = selection;
      const count = Array.isArray(linkCount) ? linkCount.length : 0;

      return {
        title: title ?? "Header",
        subtitle: `${count} navigation link${count !== 1 ? "s" : ""}`,
        media: ComponentIcon
      };
    }
  }
});
