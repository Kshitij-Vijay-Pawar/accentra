import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/accentra", // Updated with your GitHub repo name
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js Image Optimization
  },
};

export default nextConfig;
