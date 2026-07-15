'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Search, 
  ChevronRight, 
  ChevronLeft,
  X,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MoreVertical,
  ChevronDown,
  List,
  LayoutGrid,
  Clock
} from 'lucide-react';
import { API_BASE } from '@/lib/api';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'image' | 'file' | 'toggle';
  options?: string[];
  placeholder?: string;
}

interface AdminModuleProps {
  title: string;
  description: string;
  fields: Field[];
  endpoint: string;
  icon: any;
}

const AdminModule = ({ title, description, fields, endpoint, icon: Icon }: AdminModuleProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = viewMode === 'table' ? 8 : 12;

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const resData = await res.json();
      if (res.ok) {
        // Handle cases where data is nested in 'data' field or direct array
        setData(Array.isArray(resData) ? resData : resData.data || []);
      }
    } catch (err) {
      showToast('Failed to load real data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem 
      ? `${API_BASE}${endpoint}/${editingItem._id || editingItem.id}` 
      : `${API_BASE}${endpoint}`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        showToast(`${title} ${editingItem ? 'updated' : 'created'} successfully!`, 'success');
        setIsModalOpen(false);
        fetchData();
      } else {
        const errorData = await res.json();
        showToast(errorData.message || 'Operation failed', 'error');
      }
    } catch (err) {
      showToast('Connection error', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: any) => {
    if (!confirm('Are you sure you want to delete this?')) return;
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE}${endpoint}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showToast('Item deleted successfully', 'success');
        fetchData();
      } else {
        showToast('Delete failed', 'error');
      }
    } catch (err) {
      showToast('Connection error', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter(item => {
    const matchesSearch = Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesFilter = activeFilter === 'All' || item.status === activeFilter || (activeFilter === 'Active' && item.status === 'Published');
    return matchesSearch && matchesFilter;
  });

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="animate-in fade-in duration-700">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                <Icon size={20} />
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">{title}</h1>
          </div>
          <p className="text-gray-500 font-medium tracking-tight ml-11">{description}</p>
        </div>
        <button 
          onClick={() => { setEditingItem(null); setFormData({}); setIsModalOpen(true); }}
          className="bg-orange-600 text-white px-8 py-4 rounded-[22px] font-black shadow-xl shadow-orange-600/20 hover:bg-orange-700 hover:-translate-y-1 transition-all flex items-center group"
        >
           <Plus size={20} className="mr-2 group-hover:rotate-90 transition-transform duration-500" />
           <span>Add New Entry</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-[35px] border border-gray-50 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center">
         <div className="relative flex-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <input 
              type="text" 
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-orange-500/10 placeholder:text-gray-300 outline-none transition-all"
            />
         </div>
         <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100 items-center">
            <div className="flex border-r border-gray-200 pr-2 mr-2 space-x-1">
               <button onClick={() => setViewMode('table')} title="List View" className={`p-2 rounded-xl transition-all ${viewMode === 'table' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                  <List size={18} />
               </button>
               <button onClick={() => setViewMode('grid')} title="Grid View" className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                  <LayoutGrid size={18} />
               </button>
            </div>
            {['All', 'Active', 'Archived'].map((f) => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-3 rounded-xl text-xs font-black transition-all ${activeFilter === f ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {f}
              </button>
            ))}
         </div>
      </div>

      {viewMode === 'table' ? (
         <div className="bg-white rounded-[45px] border border-gray-50 shadow-sm overflow-hidden mb-10 overflow-x-auto relative min-h-[400px]">
            {loading && (
               <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                  <Loader2 className="animate-spin text-orange-600" size={40} />
               </div>
            )}
            <table className="w-full text-left min-w-[800px]">
               <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <tr>
                     <th className="px-10 py-6">Identity / Details</th>
                     <th className="px-8 py-6 text-center">Current Status</th>
                     <th className="px-8 py-6 text-right">Activity Period</th>
                     <th className="px-10 py-6 text-right">Quick Management</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {paginatedData.map((item) => (
                     <tr 
                       key={item._id || item.id} 
                       onClick={() => { setEditingItem(item); setFormData(item); setIsModalOpen(true); }}
                       className="group hover:bg-orange-50/20 transition-all duration-300 cursor-pointer"
                     >
                        <td className="px-10 py-6">
                           <div className="flex items-center space-x-5">
                              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm flex-shrink-0 border-2 border-white group-hover:border-orange-200 transition-all">
                                 <img src={item.imageUrl || item.image || 'https://via.placeholder.com/150'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                              </div>
                              <div>
                                 <p className="text-sm font-black text-gray-900 mb-0.5 group-hover:text-orange-600 transition-colors uppercase tracking-tight">
                                   {item.title || item.name || item.fullName || 'Untitled Entry'}
                                 </p>
                                 <p className="text-[10px] font-bold text-gray-400 tracking-wide">ID: #{ (item._id || item.id || '').toString().slice(-6).toUpperCase() }</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-center">
                           <span className={`inline-block px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${item.status === 'Published' || item.status === 'Active' || item.status === 'Verified' ? 'bg-green-50 text-green-600 border border-green-100' : item.status === 'Archived' || item.status === 'Pending' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-gray-50 text-gray-400 border border-gray-100'}`}>
                              {item.status || 'Active'}
                           </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <p className="text-xs font-black text-gray-500 uppercase tracking-wider">
                             {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : (item.date || 'N/A')}
                           </p>
                           <p className="text-[9px] font-bold text-gray-400">System Record</p>
                        </td>
                        <td className="px-10 py-6 text-right capitalize">
                           <div className="flex items-center justify-end space-x-3">
                              <button 
                               onClick={(e) => { e.stopPropagation(); setEditingItem(item); setFormData(item); setIsModalOpen(true); }}
                               className="p-3 bg-gray-50 text-gray-400 hover:bg-orange-600 hover:text-white rounded-xl transition-all active:scale-90"
                              >
                                 <Pencil size={16} />
                              </button>
                              <button 
                               onClick={(e) => { e.stopPropagation(); handleDelete(item._id || item.id); }}
                               className="p-3 bg-gray-50 text-gray-400 hover:bg-red-600 hover:text-white rounded-xl transition-all active:scale-90"
                              >
                                 <Trash2 size={16} />
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      ) : (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12 animate-in fade-in duration-500">
            {paginatedData.map((item) => (
               <div 
                  key={item._id || item.id} 
                  onClick={() => { setEditingItem(item); setFormData(item); setIsModalOpen(true); }}
                  className="bg-white rounded-[40px] overflow-hidden border border-gray-50 shadow-sm hover:shadow-2xl hover:shadow-orange-600/5 transition-all duration-500 cursor-pointer group flex flex-col h-full"
               >
                  <div className="h-48 relative overflow-hidden bg-gray-50">
                     <img src={item.imageUrl || item.thumbnailUrl || item.image || 'https://via.placeholder.com/400x300?text=Preview'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                     <div className="absolute top-4 right-4">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl backdrop-blur-md ${item.status === 'Published' || item.status === 'Active' ? 'bg-green-500/90 text-white' : 'bg-gray-500/90 text-white'}`}>
                           {item.status}
                        </span>
                     </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col justify-between">
                     <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">ID: #{((item._id || item.id) || '').toString().slice(-6).toUpperCase()}</p>
                        <h4 className="text-lg font-black text-gray-900 group-hover:text-orange-600 transition-colors uppercase leading-tight mb-4 line-clamp-2">{item.title || item.name || item.fullName || 'Untitled Entry'}</h4>
                        <div className="flex items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                           <Clock size={12} className="mr-2 text-orange-600" /> {item.date ? item.date : item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'No Date'}
                        </div>
                     </div>
                     <div className="pt-6 mt-6 border-t border-gray-50 flex items-center justify-between">
                        <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Update Entry</span>
                        <button className="p-2 text-gray-300 hover:text-red-500 transition-colors" onClick={(e) => { e.stopPropagation(); handleDelete(item._id || item.id); }}>
                           <Trash2 size={16} />
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      )}

      {filteredData.length === 0 && !loading && (
        <div className="p-32 flex flex-col items-center justify-center text-center opacity-30">
           <AlertCircle size={60} className="mb-4" />
           <p className="text-xl font-black text-gray-900 uppercase">No Matches Found</p>
           <p className="text-sm font-bold text-gray-400">Adjust your search or add a new entry.</p>
        </div>
      )}

      {/* Pagination Footer */}
      <div className="p-8 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-6">
         <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Showing {paginatedData.length} of {filteredData.length} Entries</p>
         <div className="flex items-center space-x-2">
            <button 
             disabled={currentPage === 1}
             onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
             className="p-3 bg-gray-50 text-gray-400 hover:text-orange-600 disabled:opacity-30 rounded-xl transition-all"
            >
               <ChevronLeft size={20} />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button 
               key={i}
               onClick={() => setCurrentPage(i + 1)}
               className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${currentPage === i + 1 ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'bg-gray-50 text-gray-400 hover:text-gray-900'}`}
              >
                 {i + 1}
              </button>
            ))}
            <button 
             disabled={currentPage === totalPages}
             onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
             className="p-3 bg-gray-50 text-gray-400 hover:text-orange-600 disabled:opacity-30 rounded-xl transition-all"
            >
               <ChevronRight size={20} />
            </button>
         </div>
      </div>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
           <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-5 duration-300">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                 <div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">{editingItem ? 'Edit' : 'Create New'} {title}</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Trust Content Management</p>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-2xl flex items-center justify-center transition-all">
                    <X size={20} />
                 </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-10 space-y-8 max-h-[70vh] overflow-y-auto no-scrollbar">
                 {fields.map((field) => (
                   <div key={field.name}>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">{field.label}</label>
                      {field.type === 'textarea' ? (
                        <textarea 
                          placeholder={field.placeholder}
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all placeholder:text-gray-300 min-h-[120px]"
                          value={formData[field.name] || ''}
                          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        />
                      ) : field.type === 'select' ? (
                        <div className="relative group">
                          <select 
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all appearance-none"
                            value={formData[field.name] || ''}
                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                          >
                             <option value="">Select Category</option>
                             {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                          <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none group-hover:text-orange-600 transition-colors" />
                        </div>
                      ) : field.type === 'image' ? (
                         <div className="relative">
                            <label className="w-full h-48 border-4 border-dashed border-gray-100 rounded-[30px] flex flex-col items-center justify-center cursor-pointer hover:border-orange-200 hover:bg-orange-50/30 transition-all group overflow-hidden">
                               {formData[field.name] ? (
                                 <img src={formData[field.name]} className="w-full h-full object-cover" alt="" />
                               ) : (
                                  <>
                                    <div className="p-4 bg-gray-50 text-gray-300 rounded-2xl mb-4 group-hover:bg-white group-hover:text-orange-600 transition-all shadow-sm">
                                      <Upload size={24} />
                                    </div>
                                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest group-hover:text-orange-600 transition">Attach Digital Media</span>
                                  </>
                               )}
                               <input 
                                 type="file" 
                                 className="hidden" 
                                 onChange={async (e) => {
                                   const file = e.target.files?.[0];
                                   if (file) {
                                     const formDataUpload = new FormData();
                                     formDataUpload.append('file', file);
                                     const token = localStorage.getItem('adminToken');
                                       try {
                                        const res = await fetch(`${API_BASE}/api/upload`, {
                                          method: 'POST',
                                          headers: { 'Authorization': `Bearer ${token}` },
                                         body: formDataUpload
                                       });
                                       const data = await res.json();
                                       if (res.ok) {
                                         setFormData({ ...formData, [field.name]: data.url });
                                         showToast('Media uploaded successfully', 'success');
                                       } else {
                                         showToast(data.message || 'Upload failed', 'error');
                                       }
                                     } catch (err) {
                                       console.error('Upload Error:', err);
                                       showToast('Connection error during upload', 'error');
                                     }
                                   }
                                 }}
                               />
                            </label>
                            {formData[field.name] && (
                               <button 
                                onClick={() => setFormData({...formData, [field.name]: ''})}
                                className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-xl shadow-lg shadow-red-600/20 active:scale-90 transition-transform"
                               >
                                  <X size={14} />
                               </button>
                            )}
                         </div>
                      ) : (
                        <input 
                          type={field.type}
                          placeholder={field.placeholder}
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all placeholder:text-gray-300"
                          value={formData[field.name] || ''}
                          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        />
                      )}
                   </div>
                 ))}
                 
                 <div className="pt-8 flex items-center space-x-4">
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-4 bg-gray-50 text-gray-500 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-gray-100 transition-all"
                    >
                       Discard Changes
                    </button>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="flex-[2] py-4 bg-gray-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-orange-600 shadow-xl shadow-gray-900/10 hover:shadow-orange-600/20 transition-all flex items-center justify-center disabled:opacity-50"
                    >
                       {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : <CheckCircle2 className="mr-2" size={16} />}
                       {editingItem ? 'Finalize Edit' : 'Create Live Entry'}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {/* Custom Toast Notification */}
      {toast && (
         <div className={`fixed bottom-10 right-10 z-[100] p-6 lg:p-8 rounded-[35px] shadow-2xl flex items-center space-x-4 animate-in slide-in-from-right-10 duration-500 border-2 ${toast.type === 'success' ? 'bg-white border-green-500/20 text-green-600' : 'bg-white border-red-500/20 text-red-600'}`}>
            <div className={`p-4 rounded-2xl ${toast.type === 'success' ? 'bg-green-50' : 'bg-red-50'}`}>
               {toast.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
            </div>
            <div>
               <p className="font-black uppercase tracking-[0.15em] text-[10px] mb-1 opacity-50">System Response</p>
               <p className="font-bold text-sm text-gray-900">{toast.msg}</p>
            </div>
            <button onClick={() => setToast(null)} className="ml-6 text-gray-300 hover:text-gray-600">
               <X size={18} />
            </button>
         </div>
      )}
    </div>
  );
};

// Ready-to-use Configurations for separate pages
export const CMSFields: Record<string, Field[]> = {
  banners: [
    { name: 'title', label: 'Banner Title', type: 'text', placeholder: 'Impactful headline...' },
    { name: 'subtitle', label: 'Short Subtitle', type: 'text', placeholder: 'Supporting text...' },
    { name: 'ctaText', label: 'Button Label', type: 'text', placeholder: 'e.g. Donate Now' },
    { name: 'imageUrl', label: 'Background Image', type: 'image' }
  ],
  events: [
    { name: 'title', label: 'Event Name', type: 'text' },
    { name: 'date', label: 'Event Date', type: 'date' },
    { name: 'location', label: 'Location', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'imageUrl', label: 'Cover Poster', type: 'image' },
    { name: 'status', label: 'Status', type: 'select', options: ['Upcoming', 'Past', 'Campaign'] }
  ],
  gallery: [
    { name: 'title', label: 'Asset Title', type: 'text' },
    { name: 'category', label: 'Category', type: 'select', options: ['Photos', 'Videos', 'Events', 'Social Work'] },
    { name: 'imageUrl', label: 'Media File', type: 'image' }
  ],
  blogs: [
    { name: 'title', label: 'Article Headline', type: 'text' },
    { name: 'category', label: 'Tag', type: 'select', options: ['Announcement', 'Activity Report', 'Trust Update'] },
    { name: 'content', label: 'Full Story Content', type: 'textarea' },
    { name: 'thumbnailUrl', label: 'Feature Image', type: 'image' }
  ],
  trust: [
    { name: 'name', label: 'Trust Name', type: 'text' },
    { name: 'email', label: 'Official Email', type: 'text' },
    { name: 'phone', label: 'Phone Number', type: 'text' },
    { name: 'address', label: 'Physical Address', type: 'textarea' },
    { name: 'regNo', label: 'Registration No.', type: 'text' },
    { name: 'panNo', label: 'PAN Number', type: 'text' }
  ]
};

export default AdminModule;
