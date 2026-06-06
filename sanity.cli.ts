import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "qs4butxl",
    dataset: "production",
  },
  studioHost: "waimun",
  typegen: {
    path: "./src/**/*.{ts,tsx,js,jsx}",
    schema: "./sanity/extract.json",
    generates: "./src/sanity/types.ts",
  },
  deployment: {
    appId: "yq2zo6ahm9nbf0qjvhnomcsy",
  },
});
