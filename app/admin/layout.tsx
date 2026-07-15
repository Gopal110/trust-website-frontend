'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Calendar, 
  FileText, 
  Settings, 
  Heart, 
  Users, 
  Mail, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  ChevronRight
} from 'lucide-react';

import AdminGuard from '@/components/AdminGuard';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const router = useRouter();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const notifications = [
    { title: 'New Donation', desc: 'Alok G. donated ₹5,100', time: '2 mins ago', href: '/admin/donations' },
    { title: 'Volunteer Signup', desc: 'Zoya K. joined from Mathura', time: '14 mins ago', href: '/admin/volunteers' },
    { title: 'Message Recieved', desc: 'Suresh P. sent a query', time: '1 hour ago', href: '/admin/contacts' },
  ];

  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Banners', href: '/admin/banners', icon: <ImageIcon size={20} /> },
    { label: 'Donations', href: '/admin/donations', icon: <Heart size={20} /> },
    { label: 'Events', href: '/admin/events', icon: <Calendar size={20} /> },
    { label: 'Gallery', href: '/admin/gallery', icon: <ImageIcon size={20} /> },
    { label: 'News / Blog', href: '/admin/blog', icon: <FileText size={20} /> },
    { label: 'Volunteers', href: '/admin/volunteers', icon: <Users size={20} /> },
    { label: 'Messages', href: '/admin/contacts', icon: <Mail size={20} /> },
    { label: 'Settings', href: '/admin/trust-info', icon: <Settings size={20} /> },
  ];

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#FDFCFB] flex">
        {/* Premium Sidebar */}
        <aside 
          className={`${
            isSidebarOpen ? 'w-72' : 'w-24'
          } bg-white border-r border-orange-50 transition-all duration-500 flex flex-col fixed inset-y-0 z-50 shadow-[20px_0_40px_-15px_rgba(251,146,60,0.05)]`}
        >
          <div className="h-24 flex items-center px-8 border-b border-gray-50">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-600/20">
                  <Heart size={24} fill="currentColor" />
                </div>
                {isSidebarOpen && (
                  <div className="animate-in fade-in slide-in-from-left-2 transition-all">
                    <p className="text-sm font-black text-gray-900 tracking-tight uppercase leading-none">Shivcharan</p>
                    <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mt-1">Admin Portal</p>
                  </div>
                )}
            </div>
          </div>
          
          <nav className="flex-1 mt-8 px-4 space-y-2 overflow-y-auto no-scrollbar">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`flex items-center p-4 rounded-2xl transition-all duration-300 group ${
                    isActive 
                      ? 'bg-orange-600 text-white shadow-xl shadow-orange-600/20' 
                      : 'text-gray-400 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                >
                  <span className={`${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>{item.icon}</span>
                  {isSidebarOpen && (
                    <span className={`ml-4 font-bold text-sm tracking-tight ${isActive ? 'text-white' : 'text-gray-600'}`}>
                      {item.label}
                    </span>
                  )}
                  {isActive && isSidebarOpen && (
                    <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-6 border-t border-gray-50">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center p-4 text-red-400 hover:bg-red-50 rounded-2xl transition-all duration-300 group text-left"
            >
              <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
              {isSidebarOpen && <span className="ml-4 font-bold text-sm">Logout</span>}
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className={`flex-1 transition-all duration-500 ${isSidebarOpen ? 'ml-72' : 'ml-24'}`}>
          {/* Modern Top Header */}
          <header className="h-24 sticky top-0 bg-white/80 backdrop-blur-md z-40 px-10 flex items-center justify-between border-b border-gray-50">
            <div className="flex items-center flex-1">
              <button 
                onClick={() => setSidebarOpen(!isSidebarOpen)} 
                className="p-3 bg-gray-50 hover:bg-orange-50 text-gray-400 hover:text-orange-600 rounded-xl transition-all"
              >
                  {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              
              <div className="ml-8 relative hidden md:block w-96 max-w-full">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input 
                    type="text" 
                    placeholder="Universal Search..." 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-orange-500/10 placeholder:text-gray-300 outline-none transition-all"
                  />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="relative">
                  <button 
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className={`relative p-3 rounded-xl transition-all ${isNotificationsOpen ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'bg-gray-50 text-gray-400 hover:text-orange-600'}`}
                  >
                    <Bell size={20} />
                    {!isNotificationsOpen && <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-orange-600 rounded-full border-2 border-white"></span>}
                  </button>

                  {isNotificationsOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)}></div>
                      <div className="absolute right-0 mt-4 w-80 bg-white rounded-[32px] shadow-2xl border border-gray-50 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Alert Center</h3>
                            <span className="bg-orange-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">New</span>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                            {notifications.map((n, i) => (
                              <div 
                                key={i} 
                                onClick={() => {
                                  router.push(n.href);
                                  setIsNotificationsOpen(false);
                                }}
                                className="p-5 border-b border-gray-50 hover:bg-orange-50/50 transition cursor-pointer group active:bg-orange-100"
                              >
                                <div className="flex justify-between items-start mb-1">
                                    <p className="text-sm font-bold text-gray-800 group-hover:text-orange-600 transition">{n.title}</p>
                                    <ChevronRight size={12} className="text-gray-200 group-hover:text-orange-300 group-hover:translate-x-1 transition-all" />
                                </div>
                                <p className="text-xs text-gray-500 line-clamp-1">{n.desc}</p>
                                <p className="text-[10px] text-gray-300 font-bold mt-2 uppercase tracking-widest">{n.time}</p>
                              </div>
                            ))}
                        </div>
                        <button className="w-full py-4 text-xs font-black text-orange-600 uppercase tracking-widest hover:bg-orange-50 transition">View All Activity</button>
                      </div>
                    </>
                  )}
              </div>
              
              <div className="h-10 w-[1px] bg-gray-100"></div>
              
              <div className="flex items-center space-x-3 cursor-pointer group">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-black text-gray-900 leading-none">Admin Official</p>
                    <p className="text-[10px] font-bold text-orange-500 uppercase mt-1">Trustee Access</p>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-2xl p-1.5 border-2 border-orange-100 group-hover:border-orange-600 transition-all duration-300 overflow-hidden relative">
                    <Image 
                      src="/logo.png" 
                      alt="Admin" 
                      fill 
                      className="object-contain p-1"
                    />
                  </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-10 max-w-[1600px] mx-auto min-h-[calc(100vh-96px)]">
            {children}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
};

export default AdminLayout;
