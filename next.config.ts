import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/submap": ["./subwaymap.md"],
  },
  serverExternalPackages: ["@resvg/resvg-js"],
  /* config options here */
};

export default nextConfig;
