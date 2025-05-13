import { PortableText } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { type PAGE_QUERYResult } from "@/sanity/types";

export type SplitImageProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "splitImage" }
>;

export function SplitImage({ title, text, image }: SplitImageProps) {
  return (
    <section className="container py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-4">
          {title ? (
            <h2 className="text-2xl font-bold md:text-4xl">{title}</h2>
          ) : null}

          <div className="prose">
            {text ? <PortableText value={text} /> : null}
          </div>
        </div>

        {image && (
          <Image
            className="aspect-[4/3] rounded-lg object-cover"
            src={urlFor(image).width(800).height(600).url()}
            width={800}
            height={600}
            alt={image.alt ?? ""}
          />
        )}
      </div>
    </section>
  );
}
