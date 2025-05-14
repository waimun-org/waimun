import { PortableText } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/button";
import type { HeroProps } from ".";
import Image from "next/image";

export function HighImpactHero({ hero }: HeroProps) {
  return (
    <section className="relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-8 text-center text-white">
        {hero.title && (
          <h1 className="text-4xl font-bold text-balance md:text-6xl">
            {hero.title}
          </h1>
        )}

        {hero.text && (
          <div className="prose prose-lg md:prose-2xl prose-invert mx-auto text-center text-balance">
            <PortableText value={hero.text} />
          </div>
        )}

        {hero.buttons && (
          <div className="flex flex-wrap gap-4">
            {hero.buttons.map((button) => (
              <Button key={button._key} button={button} />
            ))}
          </div>
        )}
      </div>

      {hero.backgroundImage && (
        <Image
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
          src={urlFor(hero.backgroundImage).width(1920).height(1080).url()}
          width={1920}
          height={1080}
          priority
          alt={hero.backgroundImage.alt ?? ""}
        />
      )}
    </section>
  );
}
