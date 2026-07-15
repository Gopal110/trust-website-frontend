import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-extrabold mb-6 text-orange-500 uppercase tracking-tight">Shri Shivcharan Dharmarth <br /> Manav Sewa Trust</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              श्री शिवचरण धर्मार्थ मानव सेवा ट्रस्ट एक समर्पित सामाजिक संस्था है, जो मानवता की सेवा एवं समाज कल्याण हेतु निरंतर कार्यरत है। सेवा ही धर्म, मानवता ही कर्म।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-orange-500 transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-orange-500 transition">About Us</Link></li>
              <li><Link href="/services" className="hover:text-orange-500 transition">Our Work</Link></li>
              <li><Link href="/gallery" className="hover:text-orange-500 transition">Gallery</Link></li>
              <li><Link href="/events" className="hover:text-orange-500 transition">Events</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Get Support</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/volunteer" className="hover:text-orange-500 transition">Join as Volunteer</Link></li>
              <li><Link href="/donate" className="hover:text-orange-500 transition">Donate Now</Link></li>
              <li><Link href="/contact" className="hover:text-orange-500 transition">Contact Us</Link></li>
              <li><Link href="/blog" className="hover:text-orange-500 transition">Latest News</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">📍</span>
                gopalbhavan,lokmani vihar colony ,Goverdhan(Mathura)
              </li>
              <li className="flex items-center">
                <span className="text-orange-500 mr-2">📞</span>
                9719415506, 8433278964, 7668473135
              </li>
              <li className="flex items-center">
                <span className="text-orange-500 mr-2">✉️</span>
                sscdms.trust@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Shri Shivcharan Dharmarth Manav Sewa Trust. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
