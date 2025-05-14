import { PortableText } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/button";
import type { HeroProps } from ".";
import Image from "next/image";

export function HighImpactHero({ block }: HeroProps) {
  return (
    <section className="relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-8 text-center text-white">
        <h1 className="text-4xl font-bold text-balance md:text-6xl">
          {block.title}
        </h1>

        <div className="prose prose-lg md:prose-2xl prose-invert mx-auto text-center text-balance">
          <PortableText value={block.text} />
        </div>

        {block.buttons && (
          <div className="flex flex-wrap gap-4">
            {block.buttons.map((button) => (
              <Button key={button._key} button={button} />
            ))}
          </div>
        )}
      </div>

      {block.backgroundImage && (
        <Image
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
          src={urlFor(block.backgroundImage).width(1920).height(1080).url()}
          width={1920}
          height={1080}
          priority
          alt={block.backgroundImage.alt ?? ""}
        />
      )}
    </section>
  );
}
