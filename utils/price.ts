import type { Price as SanityPrice } from "@/sanity/types";

export type Price =
  | {
      unitAmount: number;
      currency: string;
    }
  | SanityPrice;

export function formatPrice(price: Price) {
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: price.currency,
  }).format(price.unitAmount / 100);
}
