import { env } from "@/lib/env";
import { createClient, type QueryParams } from "next-sanity";

export const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
});

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  return client.fetch<T>(query, params, {
    cache: "force-cache",
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  });
}
