import type { NextConfig } from "next";

const config: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/script.js",
        destination: `${process.env.NEXT_PUBLIC_UMAMI_URL}/script.js`,
      },
      {
        source: "/api/send",
        destination: `${process.env.NEXT_PUBLIC_UMAMI_URL}/api/send`,
      },
    ];
  },
  experimental: {
    reactCompiler: true,
    inlineCss: true,
  },
};

export default config;
