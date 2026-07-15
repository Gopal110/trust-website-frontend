'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  Clock, 
  MoreVertical, 
  Info, 
  ShieldCheck, 
  X,
  FileText
} from 'lucide-react';
import { API_BASE } from '@/lib/api';

const AdminDonations = () => {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<any>(null);

  const fetchDonations = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE}/api/donations`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setDonations(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const verifyDonation = async (id: string) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE}/api/donations/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status: 'Verified' })
      });
      if (res.ok) {
        fetchDonations();
        setDetailModalOpen(false);
      } else {
        alert('Failed to verify donation.');
      }
    } catch (err) {
      console.error(err);
      alert('Error verifying donation.');
    }
  };

  const downloadReceipt = (donation: any) => {
    const receiptText = `
=========================================
      SHRI SHIVCHARAN CHARITABLE TRUST
=========================================
Receipt Date: ${new Date(donation.createdAt).toLocaleDateString()}
Receipt Number: REC-${donation._id.slice(-6).toUpperCase()}
Donor Name: ${donation.donorName}
Donated Amount: INR ${donation.amount}
Purpose of Donation: ${donation.cause || 'General Charity'}
Payment Method: ${donation.paymentMethod}
Transaction Status: ${donation.status}
-----------------------------------------
Thank you for your generous contribution.
Your support helps us keep serving humanity.
=========================================
`;
    const element = document.createElement("a");
    const file = new Blob([receiptText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Receipt_${donation._id.slice(-6).toUpperCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["ID,Donor,Amount,Date,Method,Status"].join(",") + "\n"
      + donations.map(d => `${d._id},${d.donorName},${d.amount},${d.createdAt},${d.paymentMethod},${d.status}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "shivcharan_trust_donations.csv");
    document.body.appendChild(link);
    link.click();
  };

  const filteredDonations = donations.filter(d => {
    const donorName = d.donorName || '';
    const id = d._id || '';
    const matchesSearch = donorName.toLowerCase().includes(searchTerm.toLowerCase()) || id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || d.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Donation Management</h1>
          <p className="text-gray-500 font-medium tracking-tight">Manage and issue receipts for trust contributors.</p>
        </div>
        
        <div className="mt-6 md:mt-0 flex items-center space-x-3 bg-orange-50/50 p-4 rounded-3xl border border-orange-100">
          <div className="p-2 bg-orange-600 rounded-xl text-white shadow-lg shadow-orange-600/20">
             <ShieldCheck size={24} />
          </div>
          <div>
             <p className="text-[10px] font-black uppercase text-orange-600 tracking-widest leading-none mb-1">Receipt Policy</p>
             <p className="text-xs font-bold text-gray-700">Issue receipts for <span className="text-orange-600 font-black">EXACT</span> received amounts only.</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[35px] border border-gray-50 shadow-sm mb-10 flex flex-col md:flex-row items-center gap-6">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-orange-600 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by Donor Name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-gray-300"
          />
        </div>
        
        <div className="flex space-x-3">
          <div className="relative group">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-5 pr-12 py-4 bg-gray-50 text-gray-700 font-bold text-xs uppercase tracking-widest rounded-2xl border-none outline-none focus:ring-4 focus:ring-orange-500/10 appearance-none transition-all hover:bg-white border border-transparent hover:border-orange-100 min-w-[140px]"
            >
               <option value="All">All Status</option>
               <option value="Verified">Verified</option>
               <option value="Pending">Pending</option>
            </select>
            <Filter size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-orange-600 pointer-events-none" />
          </div>

          <button 
            onClick={handleExport}
            className="flex items-center space-x-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-gray-900/10 active:scale-95"
          >
            <Download size={18} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[45px] border border-gray-50 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Donor</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount (₹)</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Method</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredDonations.map((donation) => (
              <tr 
                key={donation._id} 
                onClick={() => { setSelectedDonation(donation); setDetailModalOpen(true); }}
                className="group hover:bg-orange-50/50 transition-all duration-300 cursor-pointer"
              >
                <td className="px-10 py-6">
                  <p className="font-black text-gray-900 uppercase tracking-tight group-hover:text-orange-600 transition-colors uppercase">{donation.donorName}</p>
                  <p className="text-[10px] font-bold text-gray-400 mt-0.5 tracking-widest leading-none">{donation._id}</p>
                </td>
                <td className="px-8 py-6 font-black text-orange-600 text-lg italic tracking-tight">₹{(Number(donation.amount) || 0).toLocaleString()}</td>
                <td className="px-8 py-6 text-xs font-black text-gray-500 uppercase tracking-widest italic">{new Date(donation.createdAt).toLocaleDateString()}</td>
                <td className="px-8 py-6">
                  <span className="px-3 py-1 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-gray-100">{donation.paymentMethod}</span>
                </td>
                <td className="px-8 py-6 text-center">
                  <div className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${donation.status === 'Verified' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-orange-50 text-orange-600 border border-orange-100'}`}>
                    {donation.status === 'Verified' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                    <span>{donation.status}</span>
                  </div>
                </td>
                <td className="px-10 py-6 text-right">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedDonation(donation); setDetailModalOpen(true); }}
                    className="p-3 bg-gray-50 text-gray-400 hover:bg-orange-600 hover:text-white rounded-xl transition-all shadow-sm active:scale-95 group/btn"
                  >
                    <FileText size={18} className="group-hover/btn:scale-110 transition-transform" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredDonations.length === 0 && (
           <div className="py-20 flex flex-col items-center justify-center text-center opacity-30 italic">
              <Info size={40} className="mb-4 text-orange-600" />
              <p className="text-xl font-black text-gray-900 uppercase tracking-widest">No Matches Found</p>
           </div>
        )}
      </div>

      {/* Donation Detail Modal */}
      {isDetailModalOpen && selectedDonation && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setDetailModalOpen(false)}></div>
           <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl relative z-10 overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-300">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                 <div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-none mb-1">Transaction Insight</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ref: {selectedDonation._id}</p>
                 </div>
                 <button onClick={() => setDetailModalOpen(false)} className="w-12 h-12 bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-2xl flex items-center justify-center transition-all">
                    <X size={20} />
                 </button>
              </div>
              
              <div className="p-10 space-y-8">
                 <div className="grid grid-cols-2 gap-8">
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Donor Details</p>
                       <p className="text-sm font-black text-gray-900 mb-1 uppercase tracking-tight">{selectedDonation.donorName}</p>
                       <p className="text-xs font-bold text-gray-600">{selectedDonation.phone}</p>
                       <p className="text-xs font-bold text-gray-600 truncate">{selectedDonation.address}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Contribution</p>
                       <p className="text-3xl font-black text-orange-600 italic">₹{(Number(selectedDonation.amount) || 0).toLocaleString()}</p>
                       <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Via {selectedDonation.paymentMethod}</p>
                    </div>
                 </div>

                 <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Current Status</p>
                        <p className={`text-xs font-black uppercase ${selectedDonation.status === 'Verified' ? 'text-green-600' : 'text-orange-600'}`}>{selectedDonation.status}</p>
                    </div>
                    {selectedDonation.status === 'Pending' && (
                        <button 
                          onClick={() => verifyDonation(selectedDonation._id)}
                          className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-green-700 transition"
                        >
                          Verify & Issue
                        </button>
                    )}
                 </div>

                 <div className="pt-6 border-t border-gray-50 flex items-center space-x-4">
                    <button 
                      onClick={() => downloadReceipt(selectedDonation)}
                      className="flex-1 py-4 bg-gray-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-orange-600 transition-all flex items-center justify-center"
                    >
                       <Download size={16} className="mr-2" /> Download Receipt
                    </button>
                    <button className="p-4 bg-gray-50 text-gray-400 hover:text-orange-600 rounded-2xl transition shadow-sm">
                       <MoreVertical size={20} />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDonations;
