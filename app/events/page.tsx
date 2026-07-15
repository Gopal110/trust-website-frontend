'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { API_BASE } from '@/lib/api';
import { Loader2, Calendar, MapPin, ArrowRight } from 'lucide-react';

interface EventItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  status: 'Upcoming' | 'Past' | 'Campaign';
}

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Past'>('Upcoming');
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/events`);
      if (!res.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Could not load events at this time.');
    } finally {
      setLoading(false);
    }
  };

  // Filter events based on active tab
  const filteredEvents = events.filter(event => {
    if (activeTab === 'Upcoming') {
      return event.status === 'Upcoming' || event.status === 'Campaign';
    } else {
      return event.status === 'Past';
    }
  });

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const day = d.getDate();
    const month = d.toLocaleString('en-IN', { month: 'short' });
    return { day, month };
  };

  return (
    <div className="bg-white pb-24">
      {/* Header Section */}
      <section className="bg-orange-600 py-20 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-wider">कार्यक्रम (Events)</h1>
        <p className="max-w-2xl mx-auto text-orange-100 font-medium px-4">संस्था के प्रमुख आगामी और पिछले कार्यक्रमों की जानकारी।</p>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Buttons */}
        <div className="flex justify-center mb-16">
          <div className="bg-gray-100 p-1.5 rounded-2xl flex border border-gray-200">
            {['Upcoming', 'Past'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'Upcoming' | 'Past')}
                className={`px-10 py-3 rounded-xl font-bold transition-all duration-300 text-sm ${
                  activeTab === tab ? 'bg-white text-orange-600 shadow-md scale-105' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab} Events
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-orange-600 mb-4" size={40} />
            <p className="text-gray-500 font-medium">Loading events...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center max-w-lg mx-auto">
            <p className="text-red-600 font-semibold">{error}</p>
          </div>
        )}

        {!loading && !error && filteredEvents.length === 0 && (
          <div className="text-center py-20 text-gray-400 font-medium italic">
            No {activeTab.toLowerCase()} events found in the database.
          </div>
        )}

        {!loading && !error && filteredEvents.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredEvents.map((event) => {
              const { day, month } = formatDate(event.date);
              return (
                <div key={event._id} className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col md:flex-row transition hover:-translate-y-2 duration-300 group">
                   {/* Date Badge Banner */}
                   <div className="md:w-1/3 bg-orange-50 flex flex-col items-center justify-center p-8 text-center border-b md:border-b-0 md:border-r border-orange-100 relative min-h-[160px]">
                      <span className="text-orange-600 text-[10px] font-black uppercase tracking-widest mb-2">{event.status}</span>
                      <div className="text-4xl font-extrabold text-gray-800">{day}</div>
                      <div className="text-gray-500 font-medium uppercase tracking-wider">{month}</div>
                   </div>
                   {/* Description Block */}
                   <div className="p-8 flex-1 flex flex-col justify-between">
                      <div>
                         <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-1">{event.title}</h3>
                         {event.location && (
                           <div className="flex items-center text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                             <MapPin size={12} className="mr-1.5 text-orange-600" />
                             <span>{event.location}</span>
                           </div>
                         )}
                         <p className="text-gray-600 leading-relaxed mb-6 line-clamp-2">{event.description}</p>
                      </div>
                      <Link 
                        href={`/events/${event._id}`}
                        className="text-orange-600 font-bold text-sm uppercase tracking-wider hover:text-orange-700 transition flex items-center group-hover:translate-x-1 duration-300"
                      >
                        View Details <ArrowRight size={16} className="ml-2" />
                      </Link>
                   </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default EventsPage;
