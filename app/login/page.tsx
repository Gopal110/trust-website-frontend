'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RedirectLoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
       <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mb-6"></div>
       <h1 className="text-xl font-bold text-gray-800 mb-2">Redirecting to Secure Portal...</h1>
       <p className="text-gray-500 text-sm">Please wait while we transfer you to the official Trust Admin login.</p>
    </div>
  );
};

export default RedirectLoginPage;
