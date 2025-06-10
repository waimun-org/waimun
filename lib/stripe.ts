import Stripe from "stripe";
import { env } from "@/lib/env";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export function isStripeProduction() {
  return env.STRIPE_SECRET_KEY.startsWith("sk_live_");
}
