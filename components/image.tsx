"use client";

import { useNextSanityImage } from "next-sanity-image";
import { client } from "@/sanity/lib/client";
import NextImage from "next/image";
import type { ImageProps as NextImageProps } from "next/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface ImageProps
  extends Omit<NextImageProps, "src" | "width" | "height"> {
  image: SanityImageSource;
}

export function Image({ image, fill, ...props }: ImageProps) {
  const imageProps = useNextSanityImage(client, image);

  return (
    <NextImage
      {...imageProps}
      fill={fill}
      width={fill ? undefined : imageProps.width}
      height={fill ? undefined : imageProps.height}
      {...props}
    />
  );
}
