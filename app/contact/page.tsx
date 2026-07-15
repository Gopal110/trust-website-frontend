'use client';

import React, { useState } from 'react';
import { CheckCircle, Send } from 'lucide-react';
import { API_BASE } from '@/lib/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', mobile: '', email: '', subject: '', message: '' });
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white pb-24">
      {/* Header Section */}
      <section className="bg-orange-600 py-20 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-wider">संपर्क करें (Contact Us)</h1>
        <p className="max-w-2xl mx-auto text-orange-100 font-medium">हम आपकी सहायता के लिए सदैव तत्पर हैं।</p>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Head Office</h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mr-6 flex-shrink-0">
                   <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                   <h3 className="text-lg font-bold text-gray-800 mb-1">Address</h3>
                   <p className="text-gray-600">gopalbhavan,lokmani vihar colony ,Goverdhan(Mathura)</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mr-6 flex-shrink-0">
                   <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                   <h3 className="text-lg font-bold text-gray-800 mb-1">Phone Number</h3>
                   <p className="text-gray-600">9719415506, 8433278964, 7668473135</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mr-6 flex-shrink-0">
                   <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                   <h3 className="text-lg font-bold text-gray-800 mb-1">Email Address</h3>
                   <p className="text-gray-600">sscdms.trust@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="mt-12 rounded-3xl overflow-hidden border-4 border-white shadow-2xl h-80 bg-gray-100 relative">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113524.49479326!2d77.387127!3d27.465054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3972629b35a7b0eb%3A0x6b7768407873832c!2sGoverdhan%2C%20Uttar%20Pradesh%20281502!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 loading="lazy"
               ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-10 rounded-3xl border border-gray-200">
             {success ? (
                <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                     <CheckCircle size={48} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Sent!</h2>
                  <p className="text-gray-500 mb-8 lowercase tracking-tight">dhanyawad! hamari team jald hi aap se sampark karegi.</p>
                  <button 
                    onClick={() => setSuccess(false)}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
               </div>
             ) : (
                <>
                  <h2 className="text-2xl font-bold mb-8 text-gray-800">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Enter name" required />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number</label>
                          <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Enter mobile" required />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                          <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Enter email" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                        <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Message subject" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                        <textarea name="message" value={formData.message} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none h-40" placeholder="How can we help you?" required></textarea>
                      </div>
                      <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full btn-primary !rounded-xl text-lg uppercase tracking-widest flex items-center justify-center space-x-2 disabled:opacity-50"
                      >
                         <span>{loading ? 'Sending...' : 'Send Message'}</span>
                         {!loading && <Send size={20} />}
                      </button>
                      <p className="text-center text-sm text-gray-500 italic mt-4">हम जल्द से जल्द आपसे संपर्क करेंगे।</p>
                  </form>
                </>
             )}
          </div>

        </div>
      </section>
    </div>
  );
};

export default ContactPage;
