import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    dangerouslyAllowSVG: true,
  },
  turbopack: {
    root: "d:/Sree-Jewellery/sree-3d",
  },
};

export default nextConfig;
