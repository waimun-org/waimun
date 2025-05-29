import { Hero } from "@/components/blocks/hero";
import { SplitImage } from "@/components/blocks/split-image";
import type { PageBuilder } from "@/sanity/types";
import { Prose } from "./blocks/prose";
import { Events } from "./blocks/events";
import { cn } from "@/lib/utils";

export type PageBuilderProps = {
  content: PageBuilder;
};

export type BlockWrapperProps = {
  children: React.ReactNode;
  isLast: boolean;
};

function BlockWrapper({ children, isLast }: BlockWrapperProps) {
  return <div className={cn(!isLast && "border-b")}>{children}</div>;
}

const blockComponents = {
  hero: Hero,
  splitImage: SplitImage,
  prose: Prose,
  events: Events
} as const;

export function PageBuilder({ content }: PageBuilderProps) {
  return (
    <main>
      {content.map((block, index) => {
        const isLast = index === content.length - 1;
        const Component = blockComponents[block._type] as React.ComponentType<{
          block: PageBuilder[number];
        }>;

        return (
          <BlockWrapper key={block._key} isLast={isLast}>
            <Component block={block} />
          </BlockWrapper>
        );
      })}
    </main>
  );
}
