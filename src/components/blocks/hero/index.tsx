import type { Hero } from "@/sanity/types";
import { LowImpactHero } from "./low-impact";
import { HighImpactHero } from "./high-impact";

export type HeroProps = {
  hero: Hero;
};

export function Hero({ hero }: HeroProps) {
  switch (hero.intent) {
    case "high-impact":
      return <HighImpactHero hero={hero} />;
    case "low-impact":
      return <LowImpactHero hero={hero} />;
  }
}
