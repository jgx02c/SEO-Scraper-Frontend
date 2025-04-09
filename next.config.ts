import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  eslint: {
    // Disabling ESLint for the entire project
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;