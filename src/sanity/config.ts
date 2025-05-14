import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { resolve } from "./presentation/resolve";

export default defineConfig({
  name: "default",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    presentationTool({
      previewUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
      resolve
    }),
    structureTool()
  ],
  basePath: "/studio"
});
