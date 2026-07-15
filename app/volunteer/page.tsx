'use client';

import React, { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { API_BASE } from '@/lib/api';

const VolunteerPage = () => {
  const skills = [
    'Event Management', 'Social Media Support', 
    'Fundraising', 'Medical Support', 'Food Distribution', 
    'गौ सेवा', 'Tree Plantation', 'Disaster Relief Work', 'Administration / Office Work',
    'गोबर खाद वितरण', 'Herbal Agriculture', 'दूध एवं छाछ वितरण', 'धार्मिक अनुष्ठान सेवा'
  ];

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    age: '',
    address: '',
    city: '',
    occupation: '',
    availability: 'Part Time'
  });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/volunteers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, interests: selectedSkills })
      });
      if (res.ok) {
        setSuccess(true);
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
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-wider">स्वयंसेवक बनें (Join as Volunteer)</h1>
        <p className="max-w-3xl mx-auto text-orange-100 font-medium px-4">
          समाज सेवा के इस paavan kaarye mein aapka swagat hai. Shri Shivcharan Dharmarth Manav Seva Trust ke saath judkar aap sakatmak badlav ka hissa banein.
        </p>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Why Join Us? */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100 shadow-sm transition hover:shadow-md">
               <h2 className="text-2xl font-bold mb-6 text-orange-600 border-b border-orange-200 pb-2">हमें क्यों चुनें? (Why Join Us?)</h2>
               <ul className="space-y-6">
                  <li className="flex items-start">
                    <span className="bg-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1 text-xs">✓</span>
                    <div>
                      <p className="font-bold text-gray-800">समाज सेवा का अवसर</p>
                      <p className="text-xs text-gray-500 italic">Get a chance to serve the community</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1 text-xs">✓</span>
                    <div>
                      <p className="font-bold text-gray-800">जरूरतमंदों की मदद</p>
                      <p className="text-xs text-gray-500 italic">Help those in real need</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1 text-xs">✓</span>
                    <div>
                      <p className="font-bold text-gray-800">अनुभव और सीखने का मौका</p>
                      <p className="text-xs text-gray-500 italic">Gain valuable experience</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1 text-xs">✓</span>
                    <div>
                      <p className="font-bold text-gray-800">सकारात्मक बदलाव का हिस्सा बनें</p>
                      <p className="text-xs text-gray-500 italic">Be part of positive change</p>
                    </div>
                  </li>
               </ul>
            </div>

            <div className="bg-gray-900 p-8 rounded-3xl text-white">
               <h3 className="text-xl font-bold mb-4 text-orange-500">Contact Details</h3>
               <p className="text-sm text-gray-400 mb-6">If you have questions, reach out to us:</p>
                <div className="space-y-4 text-sm">
                  <p className="flex items-center"><span className="mr-3">📞</span> 9719415506, 8433278964, 7668473135</p>
                  <p className="flex items-center"><span className="mr-3">✉️</span> sscdms.trust@gmail.com</p>
                </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="lg:col-span-2 bg-gray-50 p-10 rounded-3xl border border-gray-200">
             {success ? (
                <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                     <CheckCircle size={48} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
                  <p className="text-gray-500 mb-8 lowercase tracking-tight">dhanyawad! hamari team jald hi aap se sampark karegi.</p>
                  <button 
                    onClick={() => setSuccess(false)}
                    className="btn-primary"
                  >
                    Go Back
                  </button>
               </div>
             ) : (
               <>
                <h2 className="text-2xl font-bold mb-8 text-gray-800">Volunteer Registration Form</h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Enter full name" required />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number</label>
                        <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Enter mobile" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Enter email" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Age</label>
                        <input type="number" name="age" value={formData.age} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Enter age" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Enter address" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Enter city" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Occupation</label>
                      <input type="text" name="occupation" value={formData.occupation} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Your profession" />
                    </div>

                    {/* Skills Section */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-4">अपनी रुचि और कौशल चुनें (Skills & Interests):</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-inner">
                        {skills.map((skill, index) => (
                          <label key={index} className="flex items-center space-x-3 text-sm text-gray-600 cursor-pointer hover:text-orange-600 transition">
                            <input 
                              type="checkbox" 
                              checked={selectedSkills.includes(skill)}
                              onChange={() => handleSkillToggle(skill)}
                              className="form-checkbox h-4 w-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500" 
                            />
                            <span>{skill}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Availability */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-4">Availability:</label>
                      <div className="flex space-x-8">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input type="radio" name="availability" value="Full Time" checked={formData.availability === 'Full Time'} onChange={handleInputChange} className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500" />
                          <span className="text-sm font-medium text-gray-700">Full Time</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input type="radio" name="availability" value="Part Time" checked={formData.availability === 'Part Time'} onChange={handleInputChange} className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500" />
                          <span className="text-sm font-medium text-gray-700">Part Time</span>
                        </label>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full btn-primary !rounded-xl text-lg uppercase tracking-widest disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                      <span>{loading ? 'Submitting...' : 'आज ही जुड़ें (Join Today)'}</span>
                      {!loading && <ArrowRight size={20} />}
                    </button>
                </form>
               </>
             )}
          </div>

        </div>
      </section>
    </div>
  );
};

export default VolunteerPage;
