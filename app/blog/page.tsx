import type { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'News & Updates',
  description: 'श्री शिवचरण धर्मार्थ मानव सेवा ट्रस्ट की ताज़ा खबरें, सामाजिक सेवा गतिविधियां, स्वास्थ्य शिविर एवं समाचार।',
  alternates: {
    canonical: 'https://www.shri-shiv-charan-dharmarth-manav-seva-trust.com/blog',
  },
  openGraph: {
    title: 'News & Updates | Shri Shivcharan Dharmarth Manav Sewa Trust',
    description: 'श्री शिवचरण धर्मार्थ मानव सेवा ट्रस्ट की ताज़ा खबरें एवं सामाजिक सेवा गतिविधियां।',
    url: 'https://shri-shiv-charan-dharmarth-manav-seva-trust.com/blog',
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
