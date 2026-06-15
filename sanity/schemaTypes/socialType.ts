import { defineField, defineType } from "sanity";
import { ShareIcon } from "@sanity/icons";
import { NormalizingUrlInput } from "../components/normalizing-url-input";

export const socialType = defineType({
  name: "social",
  title: "Social",
  type: "object",
  icon: ShareIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      description:
        "Paste a website, email address, relative path, or anchor. The Studio will infer https:// or mailto: where possible.",
      components: { input: NormalizingUrlInput },
      validation: (rule) =>
        rule.required().uri({
          allowRelative: true,
          scheme: ["http", "https", "mailto"],
        }),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "url",
    },
    prepare(selection: { title?: string; subtitle?: string }) {
      const { title, subtitle } = selection;

      return {
        title: title ?? "Social",
        subtitle: subtitle ?? "No URL set",
        media: ShareIcon,
      };
    },
  },
});
