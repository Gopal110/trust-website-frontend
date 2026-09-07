import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "../components/ConditionalLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  metadataBase: new URL("https://client-dsvvv.vercel.app"),
  title: {
    default: "Shri Shivcharan Dharmarth Manav Sewa Trust | मानव सेवा, गौ सेवा",
    template: "%s | Shri Shivcharan Dharmarth Manav Sewa Trust",
  },
  description: "श्री शिवचरण धर्मार्थ मानव सेवा ट्रस्ट एक समर्पित सामाजिक संस्था है, जो मानवता की सेवा एवं समाज कल्याण हेतु निरंतर कार्यरत है।",
  keywords: ["NGO", "Trust", "Manav Seva", "Gau Seva", "Charity", "Social Work", "India", "Mathura", "Goverdhan"],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://client-dsvvv.vercel.app",
  },
  openGraph: {
    title: "Shri Shivcharan Dharmarth Manav Sewa Trust | मानव सेवा, गौ सेवा",
    description: "श्री शिवचरण धर्मार्थ मानव सेवा ट्रस्ट एक समर्पित सामाजिक संस्था है, जो मानवता की सेवा एवं समाज कल्याण हेतु निरंतर कार्यरत है।",
    url: "https://client-dsvvv.vercel.app",
    siteName: "Shri Shivcharan Dharmarth Manav Sewa Trust",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Shri Shivcharan Dharmarth Manav Sewa Trust Logo",
      },
    ],
    locale: "hi_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shri Shivcharan Dharmarth Manav Sewa Trust",
    description: "श्री शिवचरण धर्मार्थ मानव सेवा ट्रस्ट एक समर्पित सामाजिक संस्था है, जो मानवता की सेवा एवं समाज कल्याण हेतु निरंतर कार्यरत है।",
    images: ["/logo.png"],
  },
  other: {
    "Content-Security-Policy": "upgrade-insecure-requests",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="font-sans bg-gray-50 text-gray-900">
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
