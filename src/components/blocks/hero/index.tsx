import type { Hero } from "@/sanity/types";
import { LowImpactHero } from "./low-impact";
import { HighImpactHero } from "./high-impact";
import { stegaClean } from "@sanity/client/stega";

export type HeroProps = {
  block: Hero;
};

export function Hero({ block }: HeroProps) {
  switch (stegaClean(block.intent)) {
    case "high-impact":
      return <HighImpactHero block={block} />;
    case "low-impact":
      return <LowImpactHero block={block} />;
  }
}
