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

const BlogPage = () => {
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
      setBlogs(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Could not load news articles at this time.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white pb-24">
      {/* Header Section */}
      <section className="bg-orange-600 py-20 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-wider">समाचार एवं गतिविधियां (Blog & News)</h1>
        <p className="max-w-2xl mx-auto text-orange-100 font-medium px-4">लेटेस्ट अपडेट्स और ट्रस्ट की सामाजिक गतिविधियों की जानकारी।</p>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-orange-600 mb-4" size={40} />
            <p className="text-gray-500 font-medium">Loading articles...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center max-w-lg mx-auto">
            <p className="text-red-600 font-semibold">{error}</p>
          </div>
        )}

        {!loading && !error && blogs.length === 0 && (
          <div className="text-center py-20 text-gray-500 font-medium italic">
            No articles published yet. Check back soon for updates from the trust.
          </div>
        )}

        {!loading && !error && blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {blogs.map((blog) => (
              <div key={blog._id} className="flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
                {/* Thumbnail */}
                <div className="h-56 bg-orange-50 relative overflow-hidden">
                  {blog.thumbnailUrl ? (
                    <img 
                      src={blog.thumbnailUrl} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-orange-200">
                      <svg className="h-20 w-20" fill="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-orange-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center space-x-1 shadow-sm">
                    <Tag size={10} />
                    <span>{blog.category || 'Trust Update'}</span>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <div className="text-gray-400 text-xs font-bold uppercase tracking-tighter mb-3 flex items-center">
                    <Calendar size={12} className="mr-1.5 text-orange-600" />
                    {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-1 line-clamp-3">
                    {blog.content}
                  </p>
                  <Link href={`/blog/${blog._id}`} className="text-orange-600 font-bold text-xs uppercase tracking-widest hover:text-orange-700 transition flex items-center group-hover:translate-x-1 duration-300">
                    Read Post <ArrowRight size={14} className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogPage;
