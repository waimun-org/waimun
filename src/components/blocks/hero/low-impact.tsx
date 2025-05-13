import { PortableText } from "next-sanity";
import type { HeroProps } from ".";
import { Button } from "@/components/button";

export function LowImpactHero({ title, text, buttons }: HeroProps) {
  return (
    <section className="border-b">
      <div className="container flex flex-col gap-8 py-8">
        {title && (
          <h1 className="text-2xl font-bold text-balance md:text-4xl">
            {title}
          </h1>
        )}

        {text && (
          <div className="prose prose-lg text-balance">
            <PortableText value={text} />
          </div>
        )}

        {buttons && (
          <div className="flex flex-wrap gap-4">
            {buttons.map((button) => (
              <Button key={button._key} button={button} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
