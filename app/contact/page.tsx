import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'श्री शिवचरण धर्मार्थ मानव सेवा ट्रस्ट से संपर्क करें। पता: गोवर्धन, मथुरा (उ.प्र.), फोन: 7668473135। सेवा और सहयोग के लिए सदैव तत्पर।',
  alternates: {
    canonical: 'https://shri-shiv-charan-dharmarth-manav-seva-trust.com/contact',
  },
  openGraph: {
    title: 'Contact Us | Shri Shivcharan Dharmarth Manav Sewa Trust',
    description: 'श्री शिवचरण धर्मार्थ मानव सेवा ट्रस्ट से संपर्क करें। फोन: 7668473135।',
    url: 'https://shri-shiv-charan-dharmarth-manav-seva-trust.com/contact',
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
