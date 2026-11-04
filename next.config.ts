import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The app is served at sejalagarwal.ca/ux-laws. Next adds this prefix to every page link and asset.
  basePath: "/ux-laws",
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
