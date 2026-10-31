import type { Metadata } from 'next';
import EventsPageClient from './EventsPageClient';

export const metadata: Metadata = {
  title: 'Events & Campaigns',
  description: 'श्री शिवचरण धर्मार्थ मानव सेवा ट्रस्ट द्वारा आयोजित आगामी एवं पूर्व सामाजिक सेवा कार्यक्रम, स्वास्थ्य शिविर और धार्मिक अनुष्ठान।',
  alternates: {
    canonical: 'https://www.shri-shiv-charan-dharmarth-manav-seva-trust.com/events',
  },
  openGraph: {
    title: 'Events & Campaigns | Shri Shivcharan Dharmarth Manav Sewa Trust',
    description: 'श्री शिवचरण धर्मार्थ मानव सेवा ट्रस्ट के आगामी एवं पूर्व सामाजिक कार्यक्रम।',
    url: 'https://www.shri-shiv-charan-dharmarth-manav-seva-trust.com/events',
  },
};

export default function EventsPage() {
  return <EventsPageClient />;
}
