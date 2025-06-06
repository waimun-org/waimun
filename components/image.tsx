"use client";

import { useNextSanityImage } from "next-sanity-image";
import { client } from "@/sanity/lib/client";
import NextImage, { getImageProps } from "next/image";
import type { ImageProps as NextImageProps } from "next/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { AvatarImage as AvatarImagePrimitive } from "@/components/ui/avatar";

export interface ImageProps
  extends Omit<NextImageProps, "src" | "width" | "height"> {
  image: SanityImageSource;
}

export function Image({ image, fill, ...props }: ImageProps) {
  const imageProps = useNextSanityImage(client, image);

  if (!imageProps) {
    return null;
  }

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

export function AvatarImage({ image, ...props }: ImageProps) {
  const sanityImageProps = useNextSanityImage(client, image);
  const { props: imageProps } = getImageProps({
    ...sanityImageProps,
    ...props,
  });

  return <AvatarImagePrimitive {...imageProps} />;
}
