import type { Metadata } from 'next';
import VolunteerPageClient from './VolunteerPageClient';

export const metadata: Metadata = {
  title: 'Join as Volunteer | Shri Shivcharan Dharmarth Manav Sewa Trust',
  description: 'श्री शिवचरण धर्मार्थ मानव सेवा ट्रस्ट से स्वयंसेवक (Volunteer) के रूप में जुड़ें और मानव सेवा, गौ सेवा एवं समाज कल्याण में अपना योगदान दें।',
  alternates: {
    canonical: 'https://www.shri-shiv-charan-dharmarth-manav-seva-trust.com/volunteer',
  },
  openGraph: {
    title: 'Join as Volunteer | Shri Shivcharan Dharmarth Manav Sewa Trust',
    description: 'श्री शिवचरण धर्मार्थ मानव सेवा ट्रस्ट से स्वयंसेवक के रूप में जुड़ें और समाज कल्याण में अपना योगदान दें।',
    url: 'https://www.shri-shiv-charan-dharmarth-manav-seva-trust.com/volunteer',
  },
};

export default function VolunteerPage() {
  return <VolunteerPageClient />;
}
