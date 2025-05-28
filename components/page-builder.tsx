import { Hero } from "@/components/blocks/hero";
import { SplitImage } from "@/components/blocks/split-image";
import type { PageBuilder } from "@/sanity/types";
import { Prose } from "./blocks/prose";
import { Events } from "./blocks/events";

export type PageBuilderProps = {
  content: PageBuilder;
};

export function PageBuilder({ content }: PageBuilderProps) {
  return (
    <main>
      {content.map((block) => {
        switch (block._type) {
          case "hero":
            return <Hero key={block._key} block={block} />;
          case "splitImage":
            return <SplitImage key={block._key} block={block} />;
          case "prose":
            return <Prose key={block._key} block={block} />;
          case "events":
            return <Events key={block._key} block={block} />;
          default:
            return null;
        }
      })}
    </main>
  );
}
