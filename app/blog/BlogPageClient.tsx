'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { API_BASE } from '@/lib/api';
import { Loader2, Calendar, Tag, ArrowRight } from 'lucide-react';

interface BlogItem {
  _id: string;
  title: string;
  content: string;
  thumbnailUrl: string;
  category: string;
  createdAt: string;
}

const BlogPageClient = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/blogs`);
      if (!res.ok) {
        throw new Error('Failed to fetch articles');
      }
      const data = await res.json();
      setBlogs(data.data || data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-orange-600 font-bold uppercase tracking-widest text-sm">Our Journal</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2 mb-4">
            News &amp; Updates
          </h1>
          <p className="text-gray-600 text-lg">
            Stay updated with our latest social initiatives, events, and stories of hope and change from the ground.
          </p>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <Loader2 className="w-12 h-12 text-orange-600 animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Loading stories...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 font-bold text-lg mb-2">Unable to load news articles</p>
            <p className="text-gray-400 text-sm">{error}</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-md mx-auto">
            <p className="text-gray-500 font-medium text-lg">No news articles published yet.</p>
            <p className="text-gray-400 text-sm mt-1">Please check back soon for latest updates.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article 
                key={blog._id} 
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
              >
                {/* Thumbnail */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <img 
                    src={blog.thumbnailUrl || '/banner1.png'} 
                    alt={blog.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-orange-600/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                    <Tag size={12} />
                    {blog.category || 'General'}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center text-xs text-gray-400 mb-3 space-x-2">
                      <Calendar size={14} />
                      <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {blog.title}
                    </h2>

                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6">
                      {blog.content}
                    </p>
                  </div>

                  <Link 
                    href={`/blog/${blog._id}`} 
                    className="inline-flex items-center gap-2 text-orange-600 font-bold text-sm tracking-wider uppercase group-hover:translate-x-1 transition-transform"
                  >
                    Read Full Story
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default BlogPageClient;
