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
  async redirects() {
    return [
      // /blogs → /blog (content redirect, path-based, no host condition needed)
      {
        source: '/blogs',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blogs/:path*',
        destination: '/blog/:path*',
        permanent: true,
      },
      // apex domain → www (fallback for standalone/self-hosted mode; Vercel handles this via vercel.json)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'shri-shiv-charan-dharmarth-manav-seva-trust.com',
          },
        ],
        destination: 'https://www.shri-shiv-charan-dharmarth-manav-seva-trust.com/:path*',
        permanent: true,
      },
      // Old Vercel preview URL → official domain (fallback; Vercel handles this via vercel.json)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'client-dsvvv.vercel.app',
          },
        ],
        destination: 'https://www.shri-shiv-charan-dharmarth-manav-seva-trust.com/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      // Admin routes: noindex, nofollow — never index admin panel
      {
        source: '/admin/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
      // Login page: noindex
      {
        source: '/login',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      // All public pages: full indexing directives
      {
        source: '/((?!admin|login).*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
