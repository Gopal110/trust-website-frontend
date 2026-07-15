'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Mail, 
  Phone, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  X,
  Calendar,
  Clock,
  Send,
  User,
  MoreVertical,
  Filter
} from 'lucide-react';
import { API_BASE } from '@/lib/api';

const AdminContacts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMsg, setActiveMsg] = useState<any>(null);

  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE}/api/contacts`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setMessages(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const deleteMsg = async (id: string) => {
    if(!confirm('Are you sure you want to delete this inquiry?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE}/api/contacts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchContacts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const markReplied = async (id: string) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE}/api/contacts/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status: 'Resolved' })
      });
      if (res.ok) {
        fetchContacts();
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = messages.filter(msg => {
    const name = msg.name || '';
    const email = msg.email || '';
    const message = msg.message || '';
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || 
                         (filter === 'New' && msg.status === 'New') || 
                         (filter === 'Replied' && msg.status === 'Resolved');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Contact Inquiries</h1>
          <p className="text-gray-500 font-medium tracking-tight">Manage and respond to messages from trust visitors.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[35px] border border-gray-50 shadow-sm mb-10 flex flex-col md:flex-row items-center gap-6">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-orange-600 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search messages or senders..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-gray-300"
          />
        </div>
        
        <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
          {['All', 'New', 'Replied'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-8 py-3 rounded-xl text-xs font-black transition-all ${filter === f ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[45px] border border-gray-50 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <th className="px-10 py-6">Status</th>
              <th className="px-8 py-6">Sender Details</th>
              <th className="px-8 py-6">Message Preview</th>
              <th className="px-10 py-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((msg) => (
              <tr 
                key={msg._id} 
                onClick={() => { setActiveMsg(msg); setIsModalOpen(true); }}
                className={`group hover:bg-orange-50/50 transition-all duration-300 cursor-pointer ${msg.status === 'New' ? 'bg-white' : 'bg-gray-50/20'}`}
              >
                <td className="px-10 py-6">
                  <div className={`w-3 h-3 rounded-full ${msg.status === 'New' ? 'bg-orange-600 animate-pulse ring-4 ring-orange-100' : 'bg-green-500 ring-4 ring-green-100'}`}></div>
                </td>
                <td className="px-8 py-6">
                  <p className="font-black text-gray-900 group-hover:text-orange-600 transition-colors uppercase tracking-tight">{msg.name}</p>
                  <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest leading-none">{msg.email}</p>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[9px] font-black uppercase tracking-widest rounded-lg">{msg.subject || 'General'}</span>
                    <p className="text-xs font-black text-gray-300 uppercase tracking-widest flex items-center italic"><Clock size={10} className="mr-1" /> {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}</p>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-1 italic group-hover:text-gray-800 transition-colors">"{msg.message}"</p>
                </td>
                <td className="px-10 py-6 text-right">
                  <div className="flex items-center justify-end space-x-3">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActiveMsg(msg); setIsModalOpen(true); }}
                      className="p-3 bg-gray-50 text-gray-400 hover:bg-orange-600 hover:text-white rounded-xl transition-all shadow-sm active:scale-90"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteMsg(msg._id); }}
                      className="p-3 bg-gray-50 text-gray-400 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm active:scale-90"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filtered.length === 0 && (
           <div className="py-24 text-center opacity-30">
              <Mail size={50} className="mx-auto mb-4 text-orange-600" />
              <p className="text-xl font-black text-gray-900 uppercase tracking-widest">Inbox Clean</p>
           </div>
        )}
      </div>

      {/* Message View Modal */}
      {isModalOpen && activeMsg && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
           <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl relative z-10 overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-300">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                 <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-600/20">
                       {activeMsg.name.charAt(0)}
                    </div>
                    <div>
                       <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-none mb-1 uppercase">{activeMsg.name}</h3>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ref No: MSG-{(activeMsg._id || '').toString().slice(-6).toUpperCase()}</p>
                    </div>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-2xl flex items-center justify-center transition-all">
                    <X size={20} />
                 </button>
              </div>
              
              <div className="p-10 space-y-10">
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <div className="flex items-center text-gray-500">
                          <Mail size={16} className="mr-3 text-orange-600" />
                          <span className="text-sm font-bold">{activeMsg.email}</span>
                       </div>
                       <div className="flex items-center text-gray-500">
                          <Phone size={16} className="mr-3 text-orange-600" />
                          <span className="text-sm font-bold">{activeMsg.phone}</span>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Sent On</p>
                       <p className="text-xs font-black text-gray-900 uppercase tracking-widest">{activeMsg.createdAt ? new Date(activeMsg.createdAt).toLocaleDateString() : ''}</p>
                       <p className="text-[10px] font-bold text-gray-400 mt-1 italic">{activeMsg.createdAt ? new Date(activeMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</p>
                    </div>
                 </div>

                 <div className="bg-gray-50 p-8 rounded-[35px] border border-gray-100 relative shadow-inner">
                    <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-4 absolute -top-3 left-8 bg-white px-4 py-1.5 rounded-full border border-orange-100">Visitor Message</p>
                    <p className="text-gray-700 leading-relaxed font-medium italic">"{activeMsg.message}"</p>
                 </div>

                 <div className="pt-8 border-t border-gray-50 flex items-center space-x-4">
                    <button 
                      onClick={() => markReplied(activeMsg._id)} 
                      className="flex-1 py-4 bg-orange-600 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-orange-700 transition-all flex items-center justify-center shadow-xl shadow-orange-600/10"
                    >
                       <CheckCircle2 size={16} className="mr-2" /> Mark as Replied
                    </button>
                    <button className="flex-1 py-4 bg-gray-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-black transition-all flex items-center justify-center">
                       <Send size={16} className="mr-2" /> Quick Response
                    </button>
                    <button className="w-16 h-16 flex flex-col items-center justify-center bg-gray-50 text-gray-400 hover:text-gray-800 rounded-2xl transition shadow-sm active:scale-95">
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

export default AdminContacts;
