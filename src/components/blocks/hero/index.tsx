import { type PAGE_QUERYResult } from "@/sanity/types";
import { LowImpactHero } from "./low-impact";
import { HighImpactHero } from "./high-impact";

export type HeroProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "hero" }
>;

export function Hero(hero: HeroProps) {
  switch (hero.intent) {
    case "high-impact":
      return <HighImpactHero {...hero} />;
    case "low-impact":
      return <LowImpactHero {...hero} />;
  }
}
