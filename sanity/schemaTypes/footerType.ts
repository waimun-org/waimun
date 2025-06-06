import { defineArrayMember, defineField, defineType } from "sanity";
import { ComponentIcon, LinkIcon, ShareIcon } from "@sanity/icons";

export const footerType = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  icon: ComponentIcon,
  groups: [
    {
      name: "content",
      title: "Content",
      icon: ComponentIcon,
      default: true,
    },
    {
      name: "navigation",
      title: "Links",
      icon: LinkIcon,
    },
    {
      name: "social",
      title: "Social",
      icon: ShareIcon,
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [defineArrayMember({ type: "link" })],
      group: "navigation",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "socials",
      title: "Socials",
      type: "array",
      of: [defineArrayMember({ type: "social" })],
      group: "social",
    }),
  ],
  preview: {
    select: {
      title: "title",
      linkCount: "links",
      socialCount: "socials",
    },
    prepare(selection: {
      title?: string;
      linkCount?: unknown[];
      socialCount?: unknown[];
    }) {
      const { title, linkCount, socialCount } = selection;
      const links = Array.isArray(linkCount) ? linkCount.length : 0;
      const socials = Array.isArray(socialCount) ? socialCount.length : 0;

      return {
        title: title ?? "Footer",
        subtitle: `${links} link${links !== 1 ? "s" : ""} • ${socials} social${socials !== 1 ? "s" : ""}`,
        media: ComponentIcon,
      };
    },
  },
});
