'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Save, 
  MapPin, 
  FileText, 
  Info,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { API_BASE } from '@/lib/api';

const TrustInfoPage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [recordId, setRecordId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    registrationNumber: '',
    panNumber: '',
    info80G: '',
    info12A: '',
    address: '',
    email: '',
    phone: ''
  });

  const fetchTrustInfo = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE}/api/trust-info`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        // Assume first record is the trust info
        const info = Array.isArray(data) ? data[0] : data.data ? data.data[0] : data;
        if (info) {
          if (info._id) setRecordId(info._id);
          setFormData({
            registrationNumber: info.registrationNumber || '',
            panNumber: info.panNumber || '',
            info80G: info.info80G || '',
            info12A: info.info12A || '',
            address: info.address || '',
            email: info.email || '',
            phone: Array.isArray(info.phone) ? info.phone[0] : info.phone || ''
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrustInfo();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem('adminToken');
    try {
      const url = recordId ? `${API_BASE}/api/trust-info/${recordId}` : `${API_BASE}/api/trust-info`;
      const method = recordId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const data = await res.json();
        if (!recordId && data._id) {
          setRecordId(data._id);
        }
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      {loading ? (
        <div className="min-h-[60vh] flex items-center justify-center">
           <Loader2 size={40} className="animate-spin text-orange-600" />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Trust Documentation</h1>
              <p className="text-gray-500 font-medium tracking-tight">Update legal details, registration numbers, and 80G/12A information.</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
             {/* Left Column: Legal Info */}
             <div className="lg:col-span-8 bg-white p-10 rounded-[45px] border border-gray-50 shadow-sm space-y-8">
                <div className="flex items-center space-x-3 mb-4">
                   <div className="p-2 bg-orange-100 text-orange-600 rounded-xl">
                      <ShieldCheck size={20} />
                   </div>
                   <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Legal Identifiers</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Registration No.</label>
                      <input 
                        type="text" 
                        value={formData.registrationNumber}
                        onChange={(e) => setFormData({...formData, registrationNumber: e.target.value})}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all placeholder:text-gray-300"
                      />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">PAN Number</label>
                      <input 
                        type="text" 
                        value={formData.panNumber}
                        onChange={(e) => setFormData({...formData, panNumber: e.target.value})}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all placeholder:text-gray-300"
                      />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">80G Certificate Ref.</label>
                      <input 
                        type="text" 
                        value={formData.info80G}
                        onChange={(e) => setFormData({...formData, info80G: e.target.value})}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all placeholder:text-gray-300"
                      />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">12A Reference No.</label>
                      <input 
                        type="text" 
                        value={formData.info12A}
                        onChange={(e) => setFormData({...formData, info12A: e.target.value})}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all placeholder:text-gray-300"
                      />
                   </div>
                </div>

                <div className="pt-6 border-t border-gray-50">
                   <div className="flex items-center space-x-3 mb-6">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                         <MapPin size={20} />
                      </div>
                      <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Public Reach</h3>
                   </div>
                   <div className="space-y-6">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Registered Address</label>
                         <textarea 
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all placeholder:text-gray-300 min-h-[100px]"
                         />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Official Email</label>
                            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all" />
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Trust Helpline</label>
                            <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all" />
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Right Column: Guidance */}
             <div className="lg:col-span-4 space-y-8">
                <div className="bg-gray-900 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600 opacity-20 blur-[60px]"></div>
                   <h4 className="text-lg font-bold mb-4 flex items-center">
                      <Info size={18} className="mr-3 text-orange-600" />
                      Important Note
                   </h4>
                   <p className="text-sm text-gray-400 leading-relaxed mb-8">
                      The documentation stored here is displayed on the **Donation** and **Transparency** pages. 
                      Please ensure all registration numbers match your physical certificates.
                   </p>
                   <button 
                      type="submit"
                      disabled={saving}
                      className="w-full py-4 bg-orange-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-orange-600/20 hover:bg-orange-700 hover:-translate-y-1 transition-all flex items-center justify-center disabled:opacity-50"
                   >
                      {saving ? <Loader2 size={16} className="animate-spin mr-2" /> : saved ? <CheckCircle2 size={16} className="mr-2" /> : <Save size={16} className="mr-2" />}
                      {saving ? 'Processing...' : saved ? 'Successfully Saved' : 'Commit Changes'}
                   </button>
                </div>

                <div className="bg-white p-8 rounded-[40px] border border-gray-50 shadow-sm">
                   <div className="flex items-center space-x-3 mb-6">
                      <div className="p-2 bg-purple-100 text-purple-600 rounded-xl">
                         <FileText size={20} />
                      </div>
                      <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Global Footer Sync</h4>
                   </div>
                   <p className="text-xs text-gray-500 leading-relaxed italic">
                      Address and contact details are automatically synchronized with the website footer and contact page.
                   </p>
                </div>
             </div>
          </form>
        </>
      )}
    </div>
  );
};

export default TrustInfoPage;
