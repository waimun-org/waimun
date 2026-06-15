import { defineArrayMember, defineField, defineType } from "sanity";
import {
  CalendarIcon,
  DocumentTextIcon,
  ImageIcon,
  LinkIcon,
  SearchIcon,
} from "@sanity/icons";
import { TrimmingPortableTextInput } from "../components/trimming-portable-text-input";

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  icon: CalendarIcon,
  groups: [
    {
      name: "content",
      title: "Content",
      icon: DocumentTextIcon,
      default: true,
    },
    {
      name: "actions",
      title: "Actions",
      icon: LinkIcon,
    },
    {
      name: "media",
      title: "Media",
      icon: ImageIcon,
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
      name: "name",
      title: "Name",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
      components: { input: TrimmingPortableTextInput },
      group: "content",
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      group: "content",
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      group: "content",
    }),
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "price",
      group: "content",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      group: "media",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          validation: (rule) => rule.required(),
        },
      ],
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [defineArrayMember({ type: "button" })],
      group: "actions",
    }),
    defineField({
      name: "details",
      title: "Details",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
      components: { input: TrimmingPortableTextInput },
      group: "content",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: {
        source: "name",
        maxLength: 96,
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "venue",
      date: "date",
    },
    prepare(selection: { title?: string; subtitle?: string; date?: string }) {
      const { title, subtitle, date } = selection;
      const formattedDate = date ? new Date(date).toLocaleDateString() : null;

      return {
        title: title ?? "Untitled Event",
        subtitle:
          formattedDate && subtitle
            ? `${formattedDate} • ${subtitle}`
            : (formattedDate ?? subtitle ?? "No date or venue set"),
        media: CalendarIcon,
      };
    },
  },
  orderings: [
    {
      title: "Event Date (Newest First)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Event Date (Oldest First)",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
    {
      title: "Event Name A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
});
