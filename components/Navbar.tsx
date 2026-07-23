'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link 
      href={href} 
      className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <Link href="/" className="flex items-center">
               <div className="relative w-14 h-14">
                 <Image 
                   src="/logo.png" 
                   alt="Trust Logo" 
                   fill
                   className="object-contain"
                   priority
                 />
               </div>
               <div className="ml-3">
                 <h1 className="text-lg font-extrabold leading-tight text-gray-900 hidden md:block">Shri Shivcharan Dharmarth <br /> Manav Sewa Trust</h1>
                 <p className="text-[10px] text-orange-600 hidden md:block font-bold uppercase tracking-wider">Manav Seva, Gau Seva</p>
               </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-8 items-center">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About Us</NavLink>
            <NavLink href="/services">Our Work</NavLink>
            <NavLink href="/gallery">Gallery</NavLink>
            <NavLink href="/events">Events</NavLink>
            <NavLink href="/blog">News</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <Link 
              href="/donate" 
              className="bg-orange-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-orange-700 transition transform hover:scale-105"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-orange-600 focus:outline-none"
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden flex flex-col bg-white border-t border-gray-100 py-4 px-4 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-4">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About Us</NavLink>
          <NavLink href="/services">Our Work</NavLink>
          <NavLink href="/gallery">Gallery</NavLink>
          <NavLink href="/events">Events</NavLink>
          <NavLink href="/blog">News</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <Link 
            href="/donate" 
            className="block w-full text-center bg-orange-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-orange-700"
            onClick={() => setIsOpen(false)}
          >
            Donate Now
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
