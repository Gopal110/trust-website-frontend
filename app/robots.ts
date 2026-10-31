import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/login'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/login'],
      },
    ],
    sitemap: 'https://www.shri-shiv-charan-dharmarth-manav-seva-trust.com/sitemap.xml',
  };
}
