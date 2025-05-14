import { PortableText, stegaClean } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SplitImage } from "@/sanity/types";
import { cn } from "@/lib/utils";

export type SplitImageProps = {
  block: SplitImage;
};

export function SplitImage({ block }: SplitImageProps) {
  return (
    <section className="container py-32">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-4">
          <h2 className="text-2xl font-bold md:text-4xl">{block.title}</h2>

          <div className="prose">
            <PortableText value={block.text} />
          </div>
        </div>

        <Image
          className={cn(
            "aspect-[4/3] rounded-lg object-cover",
            stegaClean(block.orientation) === "imageLeft" && "md:order-first"
          )}
          src={urlFor(block.image).width(800).height(600).url()}
          width={800}
          height={600}
          alt={block.image.alt ?? ""}
        />
      </div>
    </section>
  );
}
