import { createClient, type QueryParams } from "@sanity/client";

export const client = createClient({
  projectId: "qs4butxl",
  dataset: "production",
  apiVersion: "2025-05-11",
  useCdn: false,
});

export async function sanityFetch<T>({
  query,
  params = {},
}: {
  query: string;
  params?: QueryParams;
}): Promise<T> {
  return client.fetch<T>(query, params);
}
