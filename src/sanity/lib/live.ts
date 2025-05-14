import { defineLive } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { env } from "@/env.mjs";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: env.SANITY_API_READ_TOKEN,
  browserToken: env.SANITY_API_READ_TOKEN
});
