import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        // Cloudinary CDN — all uploaded media
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        // Placeholder images used in dev/design
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
};

export default nextConfig;
