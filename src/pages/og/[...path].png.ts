import type { APIRoute, GetStaticPaths } from "astro";
import { createElement, type CSSProperties } from "react";
import { createRequire } from "node:module";
import { readFile } from "node:fs/promises";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { sanityFetch } from "@/lib/client";
import { EVENTS_QUERY, PAGE_QUERY, PAGES_SLUGS_QUERY } from "@/lib/queries";
import { getLogoDataUrl, OG_HEIGHT, OG_WIDTH, ogColors } from "@/lib/og";
import {
  getDescription,
  getPageDescription,
  getPageTitle,
  portableTextToPlainText,
} from "@/lib/seo";
import type {
  EVENTS_QUERY_RESULT,
  PAGES_SLUGS_QUERY_RESULT,
  PAGE_QUERY_RESULT,
} from "@/sanity/types";

type OgImageProps = { title: string; description: string };

export const getStaticPaths: GetStaticPaths = async () => {
  const [pages, events] = await Promise.all([
    sanityFetch<PAGES_SLUGS_QUERY_RESULT>({ query: PAGES_SLUGS_QUERY }),
    sanityFetch<EVENTS_QUERY_RESULT>({ query: EVENTS_QUERY }),
  ]);
  const pageEntries = await Promise.all(
    pages.map(async ({ slug }) => {
      const page = await sanityFetch<PAGE_QUERY_RESULT>({
        query: PAGE_QUERY,
        params: { slug },
      });
      if (!page) throw new Error(`Page not found for OG image: ${slug}`);

      return {
        params: { path: slug === "home" ? "index" : slug },
        props: {
          title: getPageTitle(page.content, page.title),
          description: getPageDescription(page.content),
        } satisfies OgImageProps,
      };
    }),
  );
  const eventEntries = events.map((event) => ({
    params: { path: `events/${event.slug.current}` },
    props: {
      title: event.name,
      description: getDescription(portableTextToPlainText(event.description)),
    } satisfies OgImageProps,
  }));

  return [...pageEntries, ...eventEntries];
};

const require = createRequire(import.meta.url);
const [regularFont, boldFont] = await Promise.all([
  readFile(
    require.resolve("@fontsource/inter/files/inter-latin-400-normal.woff"),
  ),
  readFile(
    require.resolve("@fontsource/inter/files/inter-latin-700-normal.woff"),
  ),
]);

export const GET: APIRoute<OgImageProps> = async ({ props }) => {
  const logo = await getLogoDataUrl();
  const container: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: ogColors.background,
    color: ogColors.foreground,
    padding: "76px 84px 84px",
    fontFamily: "Inter",
  };

  const svg = await satori(
    createElement(
      "div",
      { style: container },
      createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            maxWidth: "980px",
          },
        },
        createElement(
          "div",
          {
            style: {
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.1,
            },
          },
          props.title,
        ),
        createElement(
          "div",
          {
            style: {
              color: ogColors.muted,
              fontSize: 30,
              lineHeight: 1.5,
              marginTop: 30,
              maxWidth: "930px",
            },
          },
          props.description,
        ),
      ),
      createElement(
        "div",
        {
          style: { display: "flex", justifyContent: "flex-end", width: "100%" },
        },
        createElement("img", {
          src: logo,
          width: 64,
          height: 64,
          style: { objectFit: "contain" },
        }),
      ),
    ),
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts: [
        { name: "Inter", data: regularFont, weight: 400, style: "normal" },
        { name: "Inter", data: boldFont, weight: 700, style: "normal" },
      ],
    },
  );
  const png = new Resvg(svg, {
    fitTo: { mode: "width", value: OG_WIDTH },
  })
    .render()
    .asPng();
  const body = png.buffer.slice(
    png.byteOffset,
    png.byteOffset + png.byteLength,
  ) as ArrayBuffer;

  return new Response(body, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
