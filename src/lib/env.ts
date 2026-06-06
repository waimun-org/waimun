import { z } from "zod";

const envSchema = z.object({
  PUBLIC_SANITY_PROJECT_ID: z.string(),
  PUBLIC_SANITY_DATASET: z.string(),
  PUBLIC_SANITY_API_VERSION: z.string(),
  PUBLIC_SITE_URL: z.url(),
});

function getEnv() {
  const parsed = envSchema.safeParse({
    PUBLIC_SANITY_PROJECT_ID: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
    PUBLIC_SANITY_DATASET: import.meta.env.PUBLIC_SANITY_DATASET,
    PUBLIC_SANITY_API_VERSION: import.meta.env.PUBLIC_SANITY_API_VERSION,
    PUBLIC_SITE_URL: import.meta.env.PUBLIC_SITE_URL,
  });

  if (!parsed.success) {
    console.error(
      "Invalid environment variables:",
      z.flattenError(parsed.error).fieldErrors,
    );
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
}

export const env = getEnv();
