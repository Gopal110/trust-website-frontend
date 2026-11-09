import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Default rule for all crawlers — allow public pages, block admin/login
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/admin/login', '/login'],
      },
      {
        // Explicit Googlebot rule for clarity
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/admin/login', '/login'],
      },
    ],
    sitemap: 'https://www.shri-shiv-charan-dharmarth-manav-seva-trust.com/sitemap.xml',

  };
}
