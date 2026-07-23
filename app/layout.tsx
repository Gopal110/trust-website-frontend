import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "../components/ConditionalLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Shri Shivcharan Dharmarth Manav Sewa Trust | मानव सेवा, गौ सेवा",
  description: "श्री शिवचरण धर्मार्थ मानव सेवा ट्रस्ट एक समर्पित सामाजिक संस्था है, जो मानवता की सेवा एवं समाज कल्याण हेतु निरंतर कार्यरत है।",
  keywords: "NGO, Trust, Manav Seva, Gau Seva, Charity, Social Work, India, Mathura, Goverdhan",
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
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="font-sans bg-gray-50 text-gray-900">
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
