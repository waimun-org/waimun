// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "waimun",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws"
    };
  },
  async run() {
    const airtableToken = new sst.Secret("AirtableToken");
    const stripeSecretKey = new sst.Secret("StripeSecretKey");
    const stripeWebhookSecret = new sst.Secret("StripeWebhookSecret");

    const sanityProjectId = "qs4butxl";
    const sanityDataset = $dev ? "development" : "production";
    const sanityApiVersion = "2025-05-11";

    const stripePublishableKey = $dev
      ? "pk_test_51RIOGmDnJnjuO1lDCEzsnnQP23uNuadXJfKU7DQGTKFzfakJ9tHXZuDfZHoo3bL6f7tOKFAs0FmN1aUEdZp9f9wZ00aiHNxtWm"
      : "pk_live_51RIOGmDnJnjuO1lDrx4uWau6nOX6B9s14zwD6bK3644w2hyxBXehQrDE0RGCOTwfeSw4onwtSVXdkxbDZkHQWG8E006f91EYMX";

    new sst.aws.Nextjs("MyWeb", {
      domain: {
        name: "waimun.org",
        dns: sst.cloudflare.dns()
      },
      link: [airtableToken, stripeSecretKey, stripeWebhookSecret],
      environment: {
        NEXT_PUBLIC_SANITY_PROJECT_ID: sanityProjectId,
        NEXT_PUBLIC_SANITY_DATASET: sanityDataset,
        NEXT_PUBLIC_SANITY_API_VERSION: sanityApiVersion,
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: stripePublishableKey,
        NODE_ENV: $app.stage === "production" ? "production" : "development"
      }
    });
  }
});
