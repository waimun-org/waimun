import "dotenv/config";
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.PUBLIC_SANITY_DATASET,
  },
  studioHost: "waimun",
  typegen: {
    path: "./**/*.{ts,tsx,js,jsx}",
    schema: "./sanity/extract.json",
    generates: "./sanity/types.ts",
  },
  deployment: {
    appId: 'yq2zo6ahm9nbf0qjvhnomcsy',
  },
});
