import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  turbopack: { root: process.cwd() },
  experimental: {
    cssChunking: { type: "graph", requestCost: 1000, weightDistribution: 0 },
  },
};

export default nextConfig;
