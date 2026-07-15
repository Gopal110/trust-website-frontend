'use client';

import React, { useState } from 'react';
import { Copy, CheckCircle, QrCode, CreditCard, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { API_BASE } from '@/lib/api';

const DonatePage = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>('');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const presets = ['501', '1100', '2100', '5100', '11000'];
  const causes = [
    'सामान्य दान (General Donation)',
    'गरीबों की मदद (Helping Needy)',
    'स्वास्थ्य शिविर (Health Camps)',
    'गौ सेवा (Cow Protection)',
    'भोजन वितरण (Food Donation)',
    'वृक्षारोपण (Tree Plantation)',
    'गोबर खाद वितरण (Manure Distribution)',
    'Herbal Agriculture (जैविक कृषि)',
    'दूध एवं छाछ वितरण (Milk Distribution)',
    'धार्मिक अनुष्ठान सेवा (Spiritual Services)'
  ];

  const [cause, setCause] = useState(causes[0]);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/donations/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorName: name,
          mobile,
          amount,
          cause,
          transactionId,
          address
        })
      });
      if (res.ok) {
        setSuccess(true);
        setName('');
        setMobile('');
        setAmount('');
        setTransactionId('');
        setAddress('');
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
      {/* Premium Header */}
      <section className="bg-gray-900 pt-32 pb-24 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute top-10 left-10 w-64 h-64 bg-orange-500 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-10 right-10 w-64 h-64 bg-orange-600 rounded-full blur-[100px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-orange-600/20 text-orange-500 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-orange-600/30">
             <Heart size={14} />
             <span>आपका दान, किसी का जीवन</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
            दान करें <span className="text-orange-600">(Donate Now)</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed">
            "सेवा ही परमो धर्मः" - आपके द्वारा दिया गया दान समाज के वंचित वर्गों के स्वास्थ्य, पोषण (दूध-छाछ वितरण), जैविक कृषि और आध्यात्मिक कार्यों में सहायक होता है।
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Payment Methods - Left Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-2xl relative overflow-hidden group">
               <div className="flex items-center justify-between mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                     <span className="mr-3 text-orange-600"><CreditCard /></span>
                     Bank Details
                  </h2>
                  <div className="text-[10px] font-black uppercase text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 italic">Verified Account</div>
               </div>

               <div className="space-y-6">
                  {[
                    { label: 'Account Name', value: 'Shri Shivcharan Dharmarth Manav Sewa Trust', sub: '' },
                    { label: 'Bank Name', value: 'SBI', sub: '(State Bank of India)' },
                    { label: 'Account Number', value: '43792674434', sub: '', copiable: true },
                    { label: 'IFSC Code', value: 'SBIN0010313', sub: '', copiable: true },
                    { label: 'Branch', value: 'GOVERDHAN', sub: '' }
                  ].map((item, idx) => (
                    <div key={idx} className="group/item">
                       <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                       <div className="flex items-center justify-between">
                          <p className={`font-bold text-gray-800 ${item.label.includes('Account Number') ? 'text-orange-600 text-lg' : 'text-md'}`}>
                             {item.value} <span className="text-[10px] text-gray-400 font-normal">{item.sub}</span>
                          </p>
                          {item.copiable && (
                            <button 
                              onClick={() => copyToClipboard(item.value, item.label)}
                              className="text-gray-400 hover:text-orange-600 transition p-2 bg-gray-50 rounded-lg group-hover/item:scale-110"
                            >
                               {copied === item.label ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} />}
                            </button>
                          )}
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-orange-50 p-10 rounded-[40px] border-2 border-dashed border-orange-200 text-center relative overflow-hidden group">
               <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-8 text-orange-600 flex items-center justify-center">
                     <span className="mr-3"><QrCode /></span>
                     Scan to Pay (UPI)
                  </h2>
                  <div className="bg-white w-56 h-56 mx-auto mb-8 flex items-center justify-center rounded-[30px] shadow-2xl p-4 border-8 border-gray-50 relative group-hover:scale-105 transition-transform duration-500">
                     {/* Replace with actual QR image */}
                     <div className="w-full h-full bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 font-bold text-xs uppercase text-center p-6 border-2 border-dashed border-gray-200">
                        TRUST <br /> UPI QR CODE <br /> COMING SOON
                     </div>
                  </div>
                  <div className="flex justify-center space-x-6">
                     <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo.png" alt="UPI" className="h-4 grayscale hover:grayscale-0 transition opacity-50" />
                     <img src="https://upload.wikimedia.org/wikipedia/commons/c/c4/PhonePe_Logo.png" alt="PhonePe" className="h-4 grayscale hover:grayscale-0 transition opacity-50" />
                  </div>
               </div>
            </div>
          </div>

          {/* Donation Form - Right Side */}
          <div className="lg:col-span-7 bg-gray-50 p-12 rounded-[50px] border border-gray-200 shadow-sm">
             {success ? (
               <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                     <CheckCircle size={48} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Submission Successful!</h2>
                  <p className="text-gray-500 mb-8 lowercase tracking-tight">thank you for your contribution. we will verify the transaction and issue your receipt soon.</p>
                  <button 
                    onClick={() => setSuccess(false)}
                    className="btn-primary"
                  >
                    Submit Another Entry
                  </button>
               </div>
             ) : (
               <>
                <div className="mb-12">
                   <h2 className="text-3xl font-black text-gray-900 mb-4">Donation Receipt Details</h2>
                   <div className="bg-orange-600/5 border-l-4 border-orange-600 p-4 mb-6">
                      <p className="text-orange-900 font-bold text-sm">पूर्ण पारदर्शिता संकल्प (Trust Policy):</p>
                      <p className="text-orange-800 text-xs italic">"फाउंडेशन की नीति के अनुसार, आपके द्वारा दी गई दान राशि (₹) की ही रसीद काटी जाएगी। रसीद में कोई भी हेर-फेर नहीं किया जाता है।"</p>
                   </div>
                   <p className="text-gray-500 font-medium">Please fill the form after making a payment so we can issue your exact receipt.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                   {/* Amount Selection */}
                   <div>
                      <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-widest">Select Amount (₹)</label>
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                         {presets.map((p) => (
                           <button
                             key={p}
                             type="button"
                             onClick={() => setAmount(p)}
                             className={`py-3 rounded-2xl font-bold transition-all border ${amount === p ? 'bg-orange-600 text-white border-orange-600 shadow-xl shadow-orange-600/20' : 'bg-white text-gray-600 border-gray-200 hover:border-orange-600 hover:text-orange-600'}`}
                           >
                              ₹{p}
                           </button>
                         ))}
                      </div>
                      <input 
                       type="number" 
                       value={amount}
                       onChange={(e) => setAmount(e.target.value)}
                       className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all font-bold text-lg" 
                       placeholder="Enter Custom Amount (₹)" 
                       required 
                      />
                   </div>

                   {/* Donation Type / Cause */}
                   <div className="space-y-2">
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-2">Donation For (किस कार्य के लिए दान)</label>
                      <select 
                       value={cause}
                       onChange={(e) => setCause(e.target.value)}
                       className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:border-orange-500 focus:bg-white bg-white appearance-none transition-all font-bold text-gray-800 cursor-pointer shadow-sm"
                      >
                         {causes.map((c, i) => (
                           <option key={i} value={c}>{c}</option>
                         ))}
                      </select>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-2">Donor Name</label>
                         <input 
                          type="text" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:border-orange-500 focus:bg-white bg-gray-100/50 transition-all font-medium" 
                          placeholder="Full Name" 
                          required 
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-2">Mobile Number</label>
                         <input 
                          type="tel" 
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:border-orange-500 focus:bg-white bg-gray-100/50 transition-all font-medium" 
                          placeholder="Enter mobile" 
                          required 
                         />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-2">Transaction ID (Optional)</label>
                      <input 
                        type="text" 
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:border-orange-500 focus:bg-white bg-gray-100/50 transition-all font-medium" 
                        placeholder="Enter Ref. No from GPay/PhonePe" 
                      />
                   </div>

                   <div className="space-y-2">
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-2">Your Address</label>
                      <textarea 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:border-orange-500 focus:bg-white bg-gray-100/50 transition-all font-medium h-32 resize-none" 
                        placeholder="For receipt courier (if required)"
                      ></textarea>
                   </div>

                   <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-orange-600 text-white font-black py-5 rounded-[20px] shadow-2xl shadow-orange-600/30 hover:bg-orange-700 transition-all transform hover:-translate-y-1 flex items-center justify-center group text-lg tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                      {loading ? 'Submitting...' : 'Submit Donation Entry'}
                      {!loading && <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />}
                   </button>

                   <div className="flex items-center justify-center space-x-8 pt-6 opacity-60 grayscale hover:grayscale-0 transition pointer-events-none">
                      <div className="flex items-center space-x-2"><ShieldCheck size={16} /> <span className="text-[10px] font-bold uppercase">Secure Portal</span></div>
                      <div className="flex items-center space-x-2"><Heart size={16} /> <span className="text-[10px] font-bold uppercase">100% Charity</span></div>
                   </div>
                </form>
               </>
             )}
          </div>

        </div>
      </section>

      {/* Trust Badge Section */}
      <section className="bg-gray-50 py-16">
         <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 text-center md:text-left">
            <div className="flex items-center space-x-6">
               <div className="w-20 h-20 bg-orange-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-orange-600/20">
                  <ShieldCheck size={40} />
               </div>
               <div>
                  <h3 className="text-2xl font-black text-gray-900 italic lowercase tracking-tight">verified NGO status</h3>
                  <p className="text-gray-500 font-medium">80G & 12A Certified for Tax Benefits</p>
               </div>
            </div>
            <div className="bg-white p-6 px-10 rounded-2xl border border-gray-200 flex flex-wrap justify-center gap-8">
                <div className="text-center">
                   <p className="text-xl font-black text-orange-600">PAN NO.</p>
                   <p className="text-xs font-bold text-gray-400">Available on Request</p>
                </div>
                <div className="text-center">
                   <p className="text-xl font-black text-orange-600">80G</p>
                   <p className="text-xs font-bold text-gray-400">Approved</p>
                </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default DonatePage;
