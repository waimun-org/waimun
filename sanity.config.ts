"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import schemaTypes from "./sanity/schemaTypes/index";
import { structure } from "./sanity/structure";
import { colorInput } from "@sanity/color-input";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || process.env.PUBLIC_SANITY_DATASET;
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || process.env.PUBLIC_SANITY_API_VERSION;

export default defineConfig({
  basePath: "/studio",
  projectId: projectId!,
  dataset: dataset!,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({ structure }),
    visionTool({
      defaultApiVersion: apiVersion!,
    }),
    colorInput(),
  ],
});
