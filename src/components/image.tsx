import * as React from "react";
import { urlFor } from "@/lib/image";
import { cn } from "@/utils/cn";
import type { SanityImageSource } from "@sanity/image-url";

export interface SanityImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  image: SanityImageSource;
  alt: string;
  fill?: boolean;
  priority?: boolean;
}

export function Image({ image, alt, fill, priority, className, style, ...props }: SanityImageProps) {
  const src = urlFor(image).auto("format").url();

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={className}
      style={fill ? { width: "100%", height: "100%", objectFit: "cover", ...style } : style}
      {...props}
    />
  );
}

export function AvatarImage({ image, alt, className, ...props }: SanityImageProps) {
  const src = urlFor(image).auto("format").url();

  return (
    <img
      src={src}
      alt={alt}
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}
