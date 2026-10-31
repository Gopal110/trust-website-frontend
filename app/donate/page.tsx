import type { Metadata } from 'next';
import DonatePageClient from './DonatePageClient';

export const metadata: Metadata = {
  title: 'Donate Now',
  description: 'श्री शिवचरण धर्मार्थ मानव सेवा ट्रस्ट को दान करें और गरीबों की सहायता, गौ सेवा एवं अन्नदान में अपना सहयोग दें। 100% पारदर्शी एवं सुरक्षित।',
  alternates: {
    canonical: 'https://www.shri-shiv-charan-dharmarth-manav-seva-trust.com/donate',
  },
  openGraph: {
    title: 'Donate Now | Shri Shivcharan Dharmarth Manav Sewa Trust',
    description: 'श्री शिवचरण धर्मार्थ मानव सेवा ट्रस्ट को दान करें और समाज सेवा में सहयोग दें।',
    url: 'https://www.shri-shiv-charan-dharmarth-manav-seva-trust.com/donate',
  },
};

export default function DonatePage() {
  return <DonatePageClient />;
}
