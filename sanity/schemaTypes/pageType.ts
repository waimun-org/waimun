import { defineField, defineType } from "sanity";
import {
  DocumentIcon,
  LinkIcon,
  SearchIcon,
  ComponentIcon,
} from "@sanity/icons";

export const pageType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "content",
      title: "Content",
      icon: ComponentIcon,
      default: true,
    },
    {
      name: "settings",
      title: "Settings",
      icon: LinkIcon,
    },
    {
      name: "seo",
      title: "SEO",
      icon: SearchIcon,
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
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "pageBuilder",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
    },
    prepare(selection: { title?: string; slug?: string }) {
      const { title, slug } = selection;
      return {
        title: title ?? "Untitled Page",
        subtitle: slug ? `/${slug}` : "No URL set",
        media: DocumentIcon,
      };
    },
  },
  orderings: [
    {
      title: "Title A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
    {
      title: "Title Z-A",
      name: "titleDesc",
      by: [{ field: "title", direction: "desc" }],
    },
    {
      title: "Last Updated",
      name: "updatedDesc",
      by: [{ field: "_updatedAt", direction: "desc" }],
    },
  ],
});
