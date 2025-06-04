import { PortableText } from "next-sanity";
import { Button } from "@/components/button";
import type { HeroProps } from ".";
import { Image } from "@/components/image";

export function HighImpactHero({ block }: HeroProps) {
  return (
    <section className="relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden">
      {block.backgroundImage && (
        <Image
          image={block.backgroundImage}
          className="pointer-events-none absolute inset-0 -z-10 object-cover"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          alt=""
        />
      )}

      {block.backgroundColor && (
        <div
          className="absolute inset-0 -z-20"
          style={{ backgroundColor: block.backgroundColor.hex }}
        />
      )}

      <div className="container flex flex-col items-center justify-center gap-8 text-white">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="max-w-2xl text-4xl font-bold text-balance md:text-6xl">
            {block.title}
          </h1>

          {block.text && (
            <div className="prose prose-lg md:prose-2xl prose-invert mx-auto text-center text-balance">
              <PortableText value={block.text} />
            </div>
          )}
        </div>

        {block.buttons && (
          <div className="flex flex-wrap gap-4">
            {block.buttons.map((button) => (
              <Button key={button._key} button={button} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
