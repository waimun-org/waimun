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

    const SANITY_PROJECT_ID = "qs4butxl";
    const SANITY_DATASET = "production";
    const SANITY_API_VERSION = "2025-05-11";

    new sst.aws.Nextjs("MyWeb", {
      domain: {
        name: "waimun.org",
        dns: sst.cloudflare.dns()
      },
      link: [airtableToken],
      environment: {
        NEXT_PUBLIC_SANITY_PROJECT_ID: SANITY_PROJECT_ID,
        NEXT_PUBLIC_SANITY_DATASET: SANITY_DATASET,
        NEXT_PUBLIC_SANITY_API_VERSION: SANITY_API_VERSION,
        NODE_ENV: $app.stage === "production" ? "production" : "development"
      }
    });
  }
});
