import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

const builder = createImageUrlBuilder({
  projectId: "qs4butxl",
  dataset: "production",
});

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};

function getSanityImageAssetReference(image: SanityImageSource) {
  if (!image || typeof image !== "object" || !("asset" in image)) {
    return undefined;
  }

  const asset = image.asset;

  if (!asset || typeof asset !== "object" || !("_ref" in asset)) {
    return undefined;
  }

  return typeof asset._ref === "string" ? asset._ref : undefined;
}

export function getSanityImageAssetInfo(image: SanityImageSource) {
  const reference = getSanityImageAssetReference(image);
  const match = reference?.match(/^image-[^-]+-(\d+)x(\d+)-(\w+)$/);

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
