import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

const builder = createImageUrlBuilder({
  projectId: "qs4butxl",
  dataset: "production",
});

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};

export function getSanityImageAssetInfo(image: SanityImageSource) {
  const match = urlFor(image)
    .url()
    .match(/-(\d+)x(\d+)\.(\w+)(?:\?|$)/);

  if (!match) {
    return undefined;
  }

  return {
    width: Number(match[1]),
    height: Number(match[2]),
    format: match[3],
  };
}

export function downloadUrlFor(assetReference: string) {
  return `${urlFor(assetReference).url()}?dl=`;
}
