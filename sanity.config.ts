"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import schemaTypes from "./sanity/schemaTypes/index";
import { structure } from "./sanity/desk-structure";
import { colorInput } from "@sanity/color-input";

export default defineConfig({
  basePath: "/studio",
  projectId: "qs4butxl",
  dataset: "production",
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({ structure }),
    visionTool({
      defaultApiVersion: "2025-05-11",
    }),
    colorInput(),
  ],
});
