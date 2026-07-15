'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE } from '@/lib/api';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-orange-500/20">
         <div className="bg-orange-600 p-10 text-center text-white">
            <h1 className="text-3xl font-extrabold mb-2 uppercase tracking-widest">Admin Login</h1>
            <p className="text-orange-100 text-sm font-medium italic">Shri Shivcharan Trust Portal</p>
         </div>
         
         <form onSubmit={handleLogin} className="p-10 space-y-6">
            {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100">{error}</div>}
            
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
               <input 
                 type="text" 
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
                 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none" 
                 placeholder="Enter username" 
                 required 
               />
            </div>
            
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
               <input 
                 type="password" 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none" 
                 placeholder="Enter password" 
                 required 
               />
            </div>

            <button type="submit" className="w-full btn-primary !rounded-xl text-lg flex items-center justify-center">
               Sign In
            </button>

            <div className="text-center">
               <span className="text-gray-400 text-xs">Forgot password? Contact trust administration.</span>
            </div>
         </form>
         
         <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">मानव सेवा, गौ सेवा और संस्कारों का संकल्प</p>
         </div>
      </div>
    </div>
  );
};

export default LoginPage;
