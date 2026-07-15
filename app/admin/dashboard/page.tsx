'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Heart, 
  Users, 
  Mail, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Activity,
  CheckCircle2,
  RefreshCw,
  X
} from 'lucide-react';
import { API_BASE } from '@/lib/api';

const DashboardPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState<any>(null);
  const [timeframe, setTimeframe] = useState('Monthly');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activities, setActivities] = useState<any[]>([]);
  const [isLogsOpen, setIsLogsOpen] = useState(false);

  const systemLogs = [
    { time: '16:04:22', status: 'OK', msg: 'API GET /api/donations successful' },
    { time: '16:02:10', status: 'WARN', msg: 'Late response from MailServer' },
    { time: '15:58:45', status: 'OK', msg: 'New admin session started' },
    { time: '15:55:12', status: 'OK', msg: 'Database connection optimized' },
    { time: '15:50:01', status: 'ERROR', msg: 'Unauthorized attempt on /admin/settings' },
  ];

  const chartData: Record<string, number[]> = {
    'Monthly': [60, 45, 80, 55, 90, 70, 100, 85, 45, 65, 80, 95],
    'Yearly': [40, 70, 30, 90, 60, 80, 50, 100, 70, 40, 90, 60]
  };

  const fetchDashboardData = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const [statsRes, activitiesRes] = await Promise.all([
        fetch(`${API_BASE}/api/dashboard/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_BASE}/api/dashboard/activities`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (statsRes.ok && activitiesRes.ok) {
        const statsJson = await statsRes.json();
        const activitiesJson = await activitiesRes.json();
        
        setStatsData(statsJson);
        // Transform activities to match the UI format
        setActivities(activitiesJson.map((a: any, index: number) => ({
          id: a.id,
          type: a.type,
          name: a.name,
          time: new Date(a.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          icon: a.type === 'Donation' ? <Heart size={14} /> : a.type === 'Volunteer' ? <Users size={14} /> : <Mail size={14} />,
          color: a.type === 'Donation' ? 'bg-orange-100 text-orange-600' : a.type === 'Volunteer' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
        })));
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const stats = [
    { label: 'Total Donations', value: statsData ? `₹${statsData.donations.amount.toLocaleString()}` : '...', change: '+12.5%', icon: <Heart fill="currentColor" />, color: 'from-[#FB923C] to-[#EA580C]', trend: 'up' },
    { label: 'Active Volunteers', value: statsData ? statsData.volunteers : '...', change: '+5.2%', icon: <Users fill="currentColor" />, color: 'from-[#0EA5E9] to-[#0284C7]', trend: 'up' },
    { label: 'Inquiries', value: statsData ? statsData.messages : '...', change: '-2.4%', icon: <Mail fill="currentColor" />, color: 'from-[#8B5CF6] to-[#7C3AED]', trend: 'down' },
    { label: 'Events Held', value: statsData ? statsData.events : '...', change: '+8.1%', icon: <Calendar fill="currentColor" />, color: 'from-[#10B981] to-[#059669]', trend: 'up' },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchDashboardData().then(() => setIsRefreshing(false));
  };

  const clearActivities = () => {
    setActivities([]);
  };

  const removeActivity = (id: number) => {
    setActivities(activities.filter(a => a.id !== id));
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Message */}
      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
            नमस्ते, <span className="text-orange-600">Admin!</span>
          </h1>
          <p className="text-gray-500 font-medium">Welcome back to the Shiva Trust Management portal.</p>
        </div>
        <div className="flex items-center space-x-4">
           {/* System Online Button */}
           <button 
            onClick={() => alert('Server Status: Connected\nDatabase: Online\nSync: Active')}
            className="group bg-white px-5 py-3 rounded-2xl shadow-sm border border-orange-100 flex items-center space-x-3 hover:border-orange-600 transition-all"
           >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse group-hover:scale-125 transition-transform"></div>
              <span className="text-xs font-black uppercase text-gray-400 group-hover:text-gray-800 tracking-widest transition-colors">System Online</span>
           </button>
           
           {/* Full Analytics */}
           <button 
            onClick={() => router.push('/admin/donations')}
            className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center space-x-2 hover:bg-black transition-all shadow-xl shadow-black/10 active:scale-95"
           >
              <Activity size={18} />
              <span>Full Analytics</span>
           </button>
        </div>
      </div>
      
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-8 rounded-[38px] border border-gray-50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:shadow-orange-600/5 transition-all duration-500 group relative overflow-hidden">
             <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-[0.03] rounded-bl-full group-hover:scale-110 transition-transform duration-700`}></div>
             
             <div className="flex justify-between items-start mb-8">
                <div className={`p-4 bg-gradient-to-br ${stat.color} text-white rounded-2xl shadow-lg shadow-orange-600/10`}>
                   {stat.icon}
                </div>
                <div className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                   {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                   <span>{stat.change}</span>
                </div>
             </div>
             
             <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.15em] mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-gray-900">{stat.value}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Main Chart Section */}
         <div className="lg:col-span-8 bg-white p-10 rounded-[45px] border border-gray-50 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between mb-12">
               <div>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">Donation Impact</h3>
                  <p className="text-gray-400 text-sm font-medium">{timeframe === 'Monthly' ? 'Monthly' : 'Annual'} contribution trajectory in 2026</p>
               </div>
               <div className="flex items-center bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                  <button 
                    onClick={() => setTimeframe('Monthly')}
                    className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${timeframe === 'Monthly' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    Monthly
                  </button>
                  <button 
                    onClick={() => setTimeframe('Yearly')}
                    className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${timeframe === 'Yearly' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    Yearly
                  </button>
               </div>
            </div>
            
            {/* Dynamic Chart Bars */}
            <div className="h-[300px] w-full flex items-end justify-between px-4 pb-4">
              {chartData[timeframe].map((h: number, i: number) => (
                <div key={i} className="group/bar relative flex flex-col items-center flex-1 mx-1 lg:mx-2">
                   <div 
                    className={`w-full max-w-[40px] rounded-t-xl transition-all duration-700 relative cursor-pointer group-hover/bar:shadow-lg group-hover/bar:shadow-orange-600/20 ${i === 6 ? 'bg-orange-600' : 'bg-orange-100 hover:bg-orange-300'}`}
                    style={{ height: `${h * 2.5}px` }}
                   >
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-10 bg-gray-900 text-white text-[10px] font-black px-2 py-1 rounded-full whitespace-nowrap opacity-0 group-hover/bar:opacity-100 transition-opacity z-10 shadow-xl">
                        ₹{(h * 500).toLocaleString()}
                     </div>
                   </div>
                   <span className="mt-4 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                     {timeframe === 'Monthly' ? ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i] : `Q${Math.floor(i/3)+1}`}
                   </span>
                </div>
              ))}
            </div>

            <div className="absolute bottom-4 right-10 flex items-center space-x-4 opacity-50 grayscale hover:grayscale-0 transition pointer-events-none">
               <TrendingUp size={16} />
               <p className="text-[10px] font-black uppercase tracking-widest">Steady growth across all verticals</p>
            </div>
         </div>

         {/* Quick Actions & Activity */}
         <div className="lg:col-span-4 space-y-8">
            {/* Quick Commands - Functional */}
            <div className="bg-gray-900 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600 opacity-20 blur-[60px] group-hover:blur-[40px] transition-all"></div>
               <h3 className="text-xl font-bold mb-8 flex items-center">
                  <span className="p-2 bg-orange-600 rounded-xl mr-3"><Plus size={18} /></span>
                  Quick Commands
               </h3>
               <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'New Event', link: '/admin/events', color: 'bg-white/10' },
                    { label: 'Add Image', link: '/admin/gallery', color: 'bg-white/10' },
                    { label: 'Write Blog', link: '/admin/blog', color: 'bg-white/10' },
                    { label: 'Settings', link: '/admin/trust-info', color: 'bg-orange-600' }
                  ].map((btn, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => router.push(btn.link)}
                      className={`${btn.color} p-4 rounded-2xl flex flex-col items-center justify-center text-center hover:scale-105 active:scale-95 transition-all group/btn`}
                    >
                       <span className="text-[10px] uppercase font-black tracking-widest leading-none mb-1 opacity-80 group-hover/btn:opacity-100">{btn.label}</span>
                       <ArrowUpRight size={14} className="opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
                    </button>
                  ))}
               </div>
            </div>

            {/* Recent Pulse - Functional with Clear and Delete */}
            <div className="bg-white p-8 rounded-[40px] border border-gray-50 shadow-sm relative overflow-hidden">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-gray-900">Recent Pulse</h3>
                  {activities.length > 0 && (
                    <button 
                      onClick={clearActivities}
                      className="text-xs font-black text-orange-600 hover:text-orange-700 transition active:underline"
                    >
                      Clear
                    </button>
                  )}
               </div>
               
               <div className="space-y-6 min-h-[180px]">
                  {activities.length > 0 ? (
                    activities.map((act) => (
                      <div key={act.id} className="flex items-center justify-between group cursor-pointer animate-in fade-in slide-in-from-right-4">
                             <div 
                              onClick={() => {
                                 const path = act.type === 'Donation' ? '/admin/donations' : act.type === 'Volunteer' ? '/admin/volunteers' : '/admin/contacts';
                                 router.push(path);
                              }}
                              className="flex items-center space-x-4 flex-1"
                             >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${act.color}`}>
                                    {act.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">{act.name}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{act.type} • {act.time}</p>
                                </div>
                             </div>
                             
                             <div className="flex items-center space-x-2">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); removeActivity(act.id); }}
                                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-300 hover:text-red-500 transition-all"
                                >
                                   <X size={14} />
                                </button>
                                <button 
                                  onClick={() => {
                                      const path = act.type === 'Donation' ? '/admin/donations' : act.type === 'Volunteer' ? '/admin/volunteers' : '/admin/contacts';
                                      router.push(path);
                                  }}
                                  className="p-1"
                                >
                                  <ChevronRight size={14} className="text-gray-200 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                                </button>
                             </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full pt-4 opacity-30 italic">
                       <CheckCircle2 size={40} className="mb-4 text-green-500" />
                       <p className="text-sm font-bold text-gray-400">All clear for now!</p>
                    </div>
                  )}
               </div>
               
               <button 
                onClick={() => setIsLogsOpen(true)}
                className="w-full mt-10 py-4 bg-gray-50 text-gray-400 hover:text-gray-900 font-bold text-xs uppercase tracking-[0.2em] rounded-2xl transition-all border border-gray-100 flex items-center justify-center group"
               >
                  <span>LIVE SYSTEM LOGS</span>
                  <ExternalLink size={14} className="ml-2 group-hover:scale-110 transition-transform" />
               </button>
            </div>
         </div>
      </div>

      {/* Live Logs Modal */}
      {isLogsOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsLogsOpen(false)}></div>
           <div className="bg-gray-900 w-full max-w-4xl rounded-[40px] shadow-2xl relative z-10 overflow-hidden border border-gray-800 animate-in zoom-in-95 duration-300">
              <div className="p-8 border-b border-gray-800 flex justify-between items-center bg-gray-950">
                 <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h3 className="text-white font-black uppercase tracking-[0.2em] text-xs ml-4">System Console / Live Status</h3>
                 </div>
                 <button onClick={() => setIsLogsOpen(false)} className="text-gray-500 hover:text-white transition">
                    <X size={24} />
                 </button>
              </div>
              <div className="p-10 font-mono text-sm space-y-4 overflow-y-auto max-h-[60vh] bg-black/50">
                 {systemLogs.map((log, i) => (
                    <div key={i} className="flex space-x-6 border-b border-gray-800/50 pb-4">
                       <span className="text-gray-600 shrink-0">[{log.time}]</span>
                       <span className={`font-bold w-16 shrink-0 ${log.status === 'OK' ? 'text-green-500' : log.status === 'WARN' ? 'text-yellow-500' : 'text-red-500'}`}>
                          {log.status}
                       </span>
                       <span className="text-gray-400">{log.msg}</span>
                    </div>
                 ))}
                 <div className="pt-4 flex items-center text-orange-600 animate-pulse">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2"></div>
                    <span>Listening for events...</span>
                 </div>
              </div>
              <div className="p-6 bg-gray-950 text-center">
                 <button onClick={() => setIsLogsOpen(false)} className="text-gray-500 hover:text-gray-300 text-xs font-bold uppercase tracking-widest transition">Close System Monitor</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
