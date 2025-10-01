import { Hero } from "@/components/blocks/hero";
import { SplitImage } from "@/components/blocks/split-image";
import type { PageBuilder } from "@/sanity/types";
import { Prose } from "./blocks/prose";
import { Events } from "./blocks/events";
import { Team } from "./blocks/team";

export type PageBuilderProps = {
  content: PageBuilder;
};

type BlockWrapperProps = {
  children: React.ReactNode;
  isLast: boolean;
};

function BlockWrapper({ children, isLast }: BlockWrapperProps) {
  return <div className={isLast ? undefined : "border-b"}>{children}</div>;
}

const BLOCK_COMPONENTS = {
  hero: Hero,
  splitImage: SplitImage,
  prose: Prose,
  events: Events,
  team: Team,
} as const;

export function PageBuilder({ content }: PageBuilderProps) {
  return (
    <>
      {content.map((block, index) => {
        const Component = BLOCK_COMPONENTS[block._type] as React.ComponentType<{
          block: PageBuilder[number];
        }>;

        if (!Component) return null;

        return (
          <BlockWrapper key={block._key} isLast={index === content.length - 1}>
            <Component block={block} />
          </BlockWrapper>
        );
      })}
    </>
  );
}
