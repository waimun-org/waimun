import { Hero } from "@/components/blocks/hero";
import { SplitImage } from "@/components/blocks/split-image";
import { type PAGE_QUERYResult } from "@/sanity/types";
import { Prose } from "./blocks/prose";

export type PageBuilderProps = {
  content: NonNullable<PAGE_QUERYResult>["content"];
};

export function PageBuilder({ content }: PageBuilderProps) {
  if (!Array.isArray(content)) {
    return null;
  }

  return (
    <main>
      {content.map((block) => {
        switch (block._type) {
          case "hero":
            return <Hero key={block._key} {...block} />;
          case "splitImage":
            return <SplitImage key={block._key} {...block} />;
          case "prose":
            return <Prose key={block._key} {...block} />;
          default:
            return null;
        }
      })}
    </main>
  );
}
