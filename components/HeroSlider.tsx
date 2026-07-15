'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { API_BASE } from '@/lib/api';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BannerItem {
  _id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  link?: string;
  active?: boolean;
}

const HeroSlider = () => {
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/banners`);
        if (res.ok) {
          const data = await res.json();
          const activeBanners = (Array.isArray(data) ? data : data.data || []).filter(
            (b: BannerItem) => b.active !== false
          );
          setBanners(activeBanners);
        }
      } catch (err) {
        console.error('Error fetching banners:', err);
      }
    };
    fetchBanners();
  }, []);

  // Default fallback banner
  const slides = banners.length > 0 ? banners : [
    {
      _id: 'default',
      title: 'मानव सेवा, गौ सेवा और संस्कारों का संकल्प',
      subtitle: '"हमारा उद्देश्य जरूरतमंद लोगों की सहायता, शिक्षा, और भारतीय संस्कृति का संरक्षण करना है।"',
      imageUrl: '/banner1.png',
      link: '/donate'
    }
  ];

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative h-[85vh] w-full overflow-hidden bg-gray-900">
      {/* Abstract Background Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 to-transparent"></div>
      
      {/* Slides Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image */}
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "linear" }}
            src={currentSlide.imageUrl} 
            alt={currentSlide.title} 
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/banner1.png';
            }}
          />

          {/* Content */}
          <div className="relative z-20 h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="max-w-2xl"
            >
              <span className="inline-block bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase mb-4 shadow-lg">
                Sewa Hi Dharm, Manavta Hi Karm
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                {currentSlide.title}
              </h1>
              {currentSlide.subtitle && (
                <p className="text-xl text-gray-200 mb-10 leading-relaxed italic">
                  {currentSlide.subtitle}
                </p>
              )}
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href={currentSlide.link || "/donate"} className="btn-primary flex items-center justify-center">
                  Donate Now
                  <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
                <Link href="/volunteer" className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full transition hover:bg-gray-100 flex items-center justify-center border-2 border-transparent">
                  Join as Volunteer
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows (only if multiple slides) */}
      {slides.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-black/30 hover:bg-orange-600 text-white rounded-full transition-all focus:outline-none"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-black/30 hover:bg-orange-600 text-white rounded-full transition-all focus:outline-none"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === idx ? 'bg-orange-600 w-8' : 'bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSlider;
