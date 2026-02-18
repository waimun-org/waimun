import { env } from "@/lib/env";
import { createImageUrlBuilder } from "@sanity/image-url";
import { type SanityImageSource } from "@sanity/image-url";

const builder = createImageUrlBuilder({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
});

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};
