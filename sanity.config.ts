"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import schemaTypes from "@/sanity/schemaTypes";
import { structure } from "@/sanity/structure";
import { colorInput } from "@sanity/color-input";

export default defineConfig({
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({ structure }),
    visionTool({
      defaultApiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
    }),
    colorInput(),
  ],
});
