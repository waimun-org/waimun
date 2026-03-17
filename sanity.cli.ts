import "dotenv/config";
import { env } from "@/lib/env";
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  },
  typegen: {
    path: "./**/*.{ts,tsx,js,jsx}",
    schema: "./sanity/extract.json",
    generates: "./sanity/types.ts",
  },
});
