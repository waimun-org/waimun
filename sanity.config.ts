"use client";

import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import schemaTypes from "@/sanity/schemaTypes";
import { structure } from "@/sanity/structure";
import { env } from "@/env.mjs";
import { resolve } from "@/sanity/presentation/resolve";

export default defineConfig({
  basePath: "/studio",
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  schema: {
    types: schemaTypes
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable"
        }
      },
      resolve
    })
  ]
});
