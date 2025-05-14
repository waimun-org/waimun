import { env } from "@/env.mjs";
import createImageUrlBuilder from "@sanity/image-url";
import { type SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = createImageUrlBuilder({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
});

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};
