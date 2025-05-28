import { PortableText } from "next-sanity";
import type { HeroProps } from ".";
import { Button } from "@/components/button";

export function LowImpactHero({ block }: HeroProps) {
  return (
    <section className="border-b">
      <div className="container flex flex-col gap-8 py-8">
        <h1 className="text-2xl font-bold text-balance md:text-4xl">
          {block.title}
        </h1>

        <div className="prose prose-lg text-balance">
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
    </section>
  );
}
