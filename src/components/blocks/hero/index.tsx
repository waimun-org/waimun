import type { Hero as HeroType } from "@/sanity/types";
import { LowImpactHero } from "./low-impact";
import { HighImpactHero } from "./high-impact";

export type HeroProps = {
  block: HeroType;
};

export function Hero({ block }: HeroProps) {
  switch (block.intent) {
    case "high-impact":
      return <HighImpactHero block={block} />;
    case "low-impact":
      return <LowImpactHero block={block} />;
  }
}
