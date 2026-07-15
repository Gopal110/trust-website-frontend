'use client';

import React, { useState, useEffect } from 'react';
import { API_BASE } from '@/lib/api';
import { Loader2 } from 'lucide-react';

interface GalleryItem {
  _id: string;
  title: string;
  imageUrl: string;
  category: string;
  type: string;
  createdAt: string;
}

const GalleryPage = () => {
  const [activeTab, setActiveTab] = useState('Photos');
  const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const categories = ['Photos', 'Videos', 'Events', 'Social Work'];

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/gallery`);
      if (!res.ok) {
        throw new Error('Failed to fetch gallery');
      }
      const data = await res.json();
      setGalleryData(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error('Gallery fetch error:', err);
      setError('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  const filteredGallery = galleryData.filter(item => item.category === activeTab);

  return (
    <div className="bg-white pb-24">
      {/* Header Section */}
      <section className="bg-orange-600 py-20 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-wider">गैलरी (Gallery)</h1>
        <p className="max-w-2xl mx-auto text-orange-100 font-medium px-4">संस्था के प्रमुख कार्यों और कार्यक्रमों की कुछ झलकियां।</p>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-16 gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                activeTab === cat 
                ? 'bg-orange-600 text-white shadow-xl scale-110' 
                : 'bg-gray-100 text-gray-600 hover:bg-orange-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-orange-600 mb-4" size={40} />
            <p className="text-gray-500 font-medium">Loading gallery...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <p className="text-red-600 font-semibold">{error}</p>
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && !error && filteredGallery.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGallery.map((item) => (
              <div key={item._id} className="group relative overflow-hidden rounded-3xl bg-gray-100 aspect-video shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Image */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Gallery+Image';
                  }}
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-orange-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-white p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">{item.title || 'Gallery Item'}</h3>
                  <p className="text-sm">श्री शिवचरण धर्मार्थ मानव सेवा ट्रस्ट</p>
                  <p className="text-xs mt-2 opacity-80">
                    {new Date(item.createdAt).toLocaleDateString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredGallery.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 font-medium mb-2">No images in {activeTab} category yet</p>
            <p className="text-gray-400 italic">More images and videos will be updated soon from the admin panel.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default GalleryPage;
