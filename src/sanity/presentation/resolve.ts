import {
  defineLocations,
  type PresentationPluginOptions,
} from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  mainDocuments: [
    {
      route: "/:slug",
      filter: `_type == "page" && slug.current == $slug`,
    },
    {
      route: "/events/:slug",
      filter: `_type == "event" && slug.current == $slug`,
    },
    {
      route: "/forms/:slug",
      filter: `_type == "form" && slug.current == $slug`,
    },
  ],
  locations: {
    page: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
      },
      resolve: (page) => ({
        locations: [
          {
            title: (page?.title as string) ?? "Untitled",
            href: `/${page?.slug}`,
          },
        ],
      }),
    }),
    event: defineLocations({
      select: {
        name: "name",
        slug: "slug.current",
      },
      resolve: (event) => ({
        locations: [
          {
            title: (event?.name as string) ?? "Untitled",
            href: `/events/${event?.slug}`,
          },
          {
            title: "Events",
            href: "/events",
          },
        ],
      }),
    }),
    form: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
      },
      resolve: (form) => ({
        locations: [
          {
            title: (form?.title as string) ?? "Untitled",
            href: `/forms/${form?.slug}`,
          },
        ],
      }),
    }),
  },
};
