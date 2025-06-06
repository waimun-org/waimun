import { defineArrayMember, defineType, defineField } from "sanity";
import {
  RocketIcon,
  DocumentTextIcon,
  LinkIcon,
  ImageIcon,
} from "@sanity/icons";

export const heroType = defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  icon: RocketIcon,
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
      name: "design",
      title: "Design",
      icon: ImageIcon,
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "intent",
      title: "Impact",
      type: "string",
      group: "design",
      options: {
        list: [
          { title: "High Impact", value: "high-impact" },
          { title: "Low Impact", value: "low-impact" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "array",
      of: [{ type: "block" }],
      group: "content",
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [defineArrayMember({ type: "button" })],
      group: "actions",
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      group: "design",
      options: {
        hotspot: true,
      },
      hidden: ({ parent }: { parent?: { intent?: string } }) =>
        parent?.intent !== "high-impact",
    }),
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "color",
      group: "design",
      options: {
        disableAlpha: true,
      },
      hidden: ({ parent }: { parent?: { intent?: string } }) =>
        parent?.intent !== "high-impact",
    }),
  ],
  preview: {
    select: {
      title: "title",
      intent: "intent",
      hasImage: "backgroundImage",
      hasColor: "backgroundColor",
    },
    prepare(selection: {
      title?: string;
      intent?: string;
      hasImage?: unknown;
      hasColor?: unknown;
    }) {
      const { title, intent, hasImage, hasColor } = selection;
      const impact = intent === "high-impact" ? "High Impact" : "Low Impact";
      const visual = hasImage ? " • Image" : hasColor ? " • Color" : "";

      return {
        title: title ?? "Hero Section",
        subtitle: `${impact}${visual}`,
        media: RocketIcon,
      };
    },
  },
});
