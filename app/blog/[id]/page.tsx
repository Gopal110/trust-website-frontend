'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { API_BASE } from '@/lib/api';
import { Loader2, Calendar, Tag, ArrowLeft, Heart } from 'lucide-react';

interface BlogItem {
  _id: string;
  title: string;
  content: string;
  thumbnailUrl: string;
  category: string;
  createdAt: string;
}

const BlogDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [blog, setBlog] = useState<BlogItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchBlogDetails();
    }
  }, [id]);

  const fetchBlogDetails = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/blogs/${id}`);
      if (!res.ok) {
        throw new Error('Article not found');
      }
      const data = await res.json();
      setBlog(data);
    } catch (err) {
      console.error('Error fetching blog details:', err);
      setError('Article could not be loaded. It may have been deleted or moved.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white pb-24">
      {/* Premium Header */}
      <section className="bg-orange-600 py-16 text-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => router.back()} 
            className="inline-flex items-center space-x-2 text-orange-100 hover:text-white transition font-bold mb-6 text-sm"
          >
            <ArrowLeft size={16} />
            <span>Go Back</span>
          </button>
          
          {blog && (
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mt-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
              {blog.title}
            </h1>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {loading && (
          <div className="bg-white rounded-3xl p-20 shadow-xl border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="animate-spin text-orange-600 mb-4" size={40} />
            <p className="text-gray-500 font-medium">Loading post...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-white rounded-3xl p-16 shadow-xl border border-gray-100 text-center min-h-[300px] flex flex-col items-center justify-center">
            <p className="text-red-600 font-semibold text-lg mb-6">{error}</p>
            <Link href="/blog" className="btn-primary">
              Return to News
            </Link>
          </div>
        )}

        {blog && !loading && (
          <article className="bg-white rounded-[32px] overflow-hidden shadow-2xl border border-gray-100 p-8 md:p-12 animate-in fade-in zoom-in-95 duration-500">
            {/* Metadata Badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-8">
              <span className="bg-orange-50 text-orange-600 px-4 py-2 rounded-full flex items-center space-x-1.5 border border-orange-100">
                <Tag size={12} />
                <span>{blog.category || 'Trust Update'}</span>
              </span>
              <span className="flex items-center space-x-1.5 text-gray-400">
                <Calendar size={14} className="text-orange-600" />
                <span>
                  {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </span>
            </div>

            {/* Main Image */}
            {blog.thumbnailUrl && (
              <div className="w-full aspect-[21/9] max-h-[450px] bg-gray-50 rounded-2xl overflow-hidden shadow-md mb-10 border border-gray-100">
                <img 
                  src={blog.thumbnailUrl} 
                  alt={blog.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose max-w-none text-gray-700 text-base md:text-lg leading-relaxed space-y-6">
              {blog.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && <p key={index} className="indent-4 md:indent-0">{paragraph}</p>
              ))}
            </div>

            {/* Signoff Trust branding */}
            <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-600/20">
                  <Heart size={24} fill="currentColor" />
                </div>
                <div>
                  <p className="text-sm font-black text-gray-900 tracking-tight uppercase leading-none">श्री शिवचरण ट्रस्ट</p>
                  <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mt-1">Sewa Hi Dharm, Manavta Hi Karm</p>
                </div>
              </div>
              <Link href="/donate" className="btn-primary !py-3 !px-6 text-sm">
                Support Our Mission
              </Link>
            </div>
          </article>
        )}
      </div>
    </div>
  );
};

export default BlogDetailsPage;
