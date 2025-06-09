import { PortableText } from "next-sanity";
import { Image } from "@/components/image";
import type { SplitImage } from "@/sanity/types";
import { cn } from "@/utils/cn";

export type SplitImageProps = {
  block: SplitImage;
};

export function SplitImage({ block }: SplitImageProps) {
  return (
    <section className="container py-8 md:py-16">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-32">
        <div className="flex flex-col justify-center gap-4">
          <h2 className="text-2xl font-bold text-balance md:text-4xl">
            {block.title}
          </h2>

          {block.text && (
            <div className="prose max-w-none">
              <PortableText value={block.text} />
            </div>
          )}
        </div>

        <Image
          className={cn(
            "aspect-[4/3] rounded-lg object-cover",
            block.orientation === "imageLeft" && "md:order-first",
          )}
          image={block.image}
          sizes="(min-width: 768px) 50vw, 100vw"
          alt={block.image.alt}
          priority={block.image.priority}
        />
      </div>
    </section>
  );
}
