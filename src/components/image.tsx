import * as React from "react";
import { urlFor } from "@/lib/image";
import { cn } from "@/utils/cn";
import type { SanityImageSource } from "@sanity/image-url";

const DEFAULT_WIDTHS = [320, 640, 960, 1280, 1600, 1920];
const DEFAULT_QUALITY = 80;

type ImageDimensions = {
  width: number;
  height: number;
};

type AssetInfo = ImageDimensions & {
  format: string;
};

export interface SanityImageProps extends Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "alt" | "src" | "srcSet"
> {
  image: SanityImageSource;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  widths?: number[];
}

function getAssetRef(image: SanityImageSource): string | undefined {
  if (!image || typeof image !== "object" || !("asset" in image)) {
    return undefined;
  }

  const asset = image.asset;

  if (!asset || typeof asset !== "object" || !("_ref" in asset)) {
    return undefined;
  }

  return typeof asset._ref === "string" ? asset._ref : undefined;
}

function getAssetInfo(image: SanityImageSource): AssetInfo | undefined {
  const ref = getAssetRef(image);
  const match = ref?.match(/^image-[^-]+-(\d+)x(\d+)-(\w+)$/);

  if (!match) {
    return undefined;
  }

  return {
    width: Number(match[1]),
    height: Number(match[2]),
    format: match[3],
  };
}

function getSrcWidths(widths: number[], dimensions?: ImageDimensions) {
  const sourceWidth = dimensions?.width;
  const constrainedWidths = sourceWidth
    ? widths.filter((width) => width <= sourceWidth)
    : widths;

  const selectedWidths =
    constrainedWidths.length > 0
      ? constrainedWidths
      : [sourceWidth ?? widths[0]];

  return Array.from(new Set(selectedWidths)).sort((a, b) => a - b);
}

function getImageUrl(image: SanityImageSource, width: number, quality: number) {
  return urlFor(image)
    .width(width)
    .fit("max")
    .auto("format")
    .quality(quality)
    .url();
}

export function Image({
  image,
  alt,
  fill,
  priority,
  className,
  style,
  sizes = "100vw",
  quality = DEFAULT_QUALITY,
  widths = DEFAULT_WIDTHS,
  ...props
}: SanityImageProps) {
  const assetInfo = getAssetInfo(image);
  const isSvg = assetInfo?.format === "svg";
  const srcWidths = getSrcWidths(widths, assetInfo);
  const largestWidth = srcWidths[srcWidths.length - 1];
  const src = isSvg
    ? urlFor(image).url()
    : getImageUrl(image, largestWidth, quality);
  const srcSet = isSvg
    ? undefined
    : srcWidths
        .map((width) => `${getImageUrl(image, width, quality)} ${width}w`)
        .join(", ");

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={!fill ? assetInfo?.width : undefined}
      height={!fill ? assetInfo?.height : undefined}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={className}
      style={
        fill
          ? { width: "100%", height: "100%", objectFit: "cover", ...style }
          : style
      }
      {...props}
    />
  );
}

export function AvatarImage({
  image,
  alt,
  className,
  ...props
}: SanityImageProps) {
  return (
    <Image
      image={image}
      alt={alt}
      widths={[80, 160]}
      sizes="80px"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}
