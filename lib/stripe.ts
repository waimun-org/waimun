import Stripe from "stripe";

const apiKey = process.env.STRIPE_SECRET_KEY!;
export const stripe = new Stripe(apiKey);

export function isStripeProduction() {
  return apiKey.startsWith("sk_live_");
}
