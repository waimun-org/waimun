import type { APIRoute, GetStaticPaths } from "astro";
import { createElement, type CSSProperties } from "react";
import { createRequire } from "node:module";
import { readFile } from "node:fs/promises";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { sanityFetch } from "@/lib/client";
import { urlFor } from "@/lib/image";
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

type OgImageProps = {
  title: string;
  description: string;
  imageUrl?: string;
};

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
      imageUrl: urlFor(event.image)
        .width(OG_WIDTH)
        .height(300)
        .fit("crop")
        .auto("format")
        .url(),
    } satisfies OgImageProps,
  }));

  return [...pageEntries, ...eventEntries];
};

const require = createRequire(import.meta.url);
const [regularFont, regularFontExt, boldFont, boldFontExt] = await Promise.all([
  readFile(
    require.resolve("@fontsource/inter/files/inter-latin-400-normal.woff"),
  ),
  readFile(
    require.resolve("@fontsource/inter/files/inter-latin-ext-400-normal.woff"),
  ),
  readFile(
    require.resolve("@fontsource/inter/files/inter-latin-700-normal.woff"),
  ),
  readFile(
    require.resolve("@fontsource/inter/files/inter-latin-ext-700-normal.woff"),
  ),
]);

const imageDataUrlCache = new Map<string, Promise<string>>();

function getImageDataUrl(url: string) {
  let cached = imageDataUrlCache.get(url);

  if (!cached) {
    cached = fetch(url).then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch OG image asset: ${response.status}`);
      }

      const contentType = response.headers.get("content-type") ?? "image/jpeg";
      const buffer = Buffer.from(await response.arrayBuffer());
      return `data:${contentType};base64,${buffer.toString("base64")}`;
    });
    imageDataUrlCache.set(url, cached);
  }

  return cached;
}

function renderTextBlock({
  title,
  description,
  titleSize = 72,
  descriptionSize = 30,
  maxWidth = "930px",
}: {
  title: string;
  description: string;
  titleSize?: number;
  descriptionSize?: number;
  maxWidth?: string;
}) {
  return createElement(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        maxWidth,
      },
    },
    createElement(
      "div",
      {
        style: {
          fontSize: titleSize,
          fontWeight: 700,
          lineHeight: 1.1,
        },
      },
      title,
    ),
    createElement(
      "div",
      {
        style: {
          color: ogColors.muted,
          fontSize: descriptionSize,
          lineHeight: 1.5,
          marginTop: 30,
        },
      },
      description,
    ),
  );
}

function renderLogo(logo: string) {
  return createElement("img", {
    src: logo,
    width: 64,
    height: 64,
    style: { objectFit: "contain" },
  });
}

function renderPageOg(props: OgImageProps, logo: string) {
  const container: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: ogColors.background,
    color: ogColors.foreground,
    padding: "84px 84px 84px",
    fontFamily: "Inter, Inter Ext",
  };

  return createElement(
    "div",
    { style: container },
    renderTextBlock(props),
    createElement(
      "div",
      {
        style: { display: "flex", justifyContent: "flex-end", width: "100%" },
      },
      renderLogo(logo),
    ),
  );
}

async function renderEventOg(props: OgImageProps, logo: string) {
  if (!props.imageUrl) return renderPageOg(props, logo);

  const eventImage = await getImageDataUrl(props.imageUrl);

  return createElement(
    "div",
    {
      style: {
        width: `${OG_WIDTH}px`,
        height: `${OG_HEIGHT}px`,
        display: "flex",
        flexDirection: "column",
        backgroundColor: ogColors.background,
        color: ogColors.foreground,
        fontFamily: "Inter, Inter Ext",
      },
    },
    createElement(
      "div",
      {
        style: {
          width: "100%",
          height: 300,
          display: "flex",
          overflow: "hidden",
        },
      },
      createElement("img", {
        src: eventImage,
        width: OG_WIDTH,
        height: 300,
        style: { objectFit: "cover" },
      }),
    ),
    createElement(
      "div",
      {
        style: {
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding: "64px 64px 64px",
        },
      },
      renderTextBlock({
        ...props,
        titleSize: 64,
        descriptionSize: 28,
        maxWidth: "840px",
      }),
      renderLogo(logo),
    ),
  );
}

export const GET: APIRoute<OgImageProps> = async ({ props }) => {
  const logo = await getLogoDataUrl();
  const image = props.imageUrl
    ? await renderEventOg(props, logo)
    : renderPageOg(props, logo);

  const svg = await satori(image, {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: [
      { name: "Inter", data: regularFont, weight: 400, style: "normal" },
      { name: "Inter Ext", data: regularFontExt, weight: 400, style: "normal" },
      { name: "Inter", data: boldFont, weight: 700, style: "normal" },
      { name: "Inter Ext", data: boldFontExt, weight: 700, style: "normal" },
    ],
  });
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
