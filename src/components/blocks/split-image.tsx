import { PortableText } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SplitImage } from "@/sanity/types";

export type SplitImageProps = {
  splitImage: SplitImage;
};

export function SplitImage({ splitImage }: SplitImageProps) {
  return (
    <section className="container py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-4">
          <h2 className="text-2xl font-bold md:text-4xl">{splitImage.title}</h2>

          <div className="prose">
            <PortableText value={splitImage.text} />
          </div>
        </div>

        <Image
          className="aspect-[4/3] rounded-lg object-cover"
          src={urlFor(splitImage.image).width(800).height(600).url()}
          width={800}
          height={600}
          alt={splitImage.image.alt ?? ""}
        />
      </div>
    </section>
  );
}
