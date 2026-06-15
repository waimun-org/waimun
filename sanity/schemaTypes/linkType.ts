import { defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons";
import { NormalizingUrlInput } from "../components/normalizing-url-input";

export const linkType = defineType({
  name: "link",
  title: "Link",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "text",
      title: "Text",
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
  ],
  preview: {
    select: {
      title: "text",
      subtitle: "url",
    },
    prepare(selection: { title?: string; subtitle?: string }) {
      const { title, subtitle } = selection;

      return {
        title: title ?? "Link",
        subtitle: subtitle ?? "No URL set",
        media: LinkIcon,
      };
    },
  },
});
