import type { Metadata } from 'next';
import GalleryPageClient from './GalleryPageClient';

export const metadata: Metadata = {
  title: 'Photo & Video Gallery | Shri Shivcharan Dharmarth Manav Sewa Trust',
  description: 'श्री शिवचरण धर्मार्थ मानव सेवा ट्रस्ट की सेवा गतिविधियों, गौ सेवा, अन्नदान एवं स्वास्थ्य शिविरों की तस्वीरें एवं वीडियो।',
  alternates: {
    canonical: 'https://www.shri-shiv-charan-dharmarth-manav-seva-trust.com/gallery',
  },
  openGraph: {
    title: 'Photo & Video Gallery | Shri Shivcharan Dharmarth Manav Sewa Trust',
    description: 'श्री शिवचरण धर्मार्थ मानव सेवा ट्रस्ट की सेवा गतिविधियों की तस्वीरें एवं वीडियो।',
    url: 'https://www.shri-shiv-charan-dharmarth-manav-seva-trust.com/gallery',
  },
};

export default function GalleryPage() {
  return <GalleryPageClient />;
}
