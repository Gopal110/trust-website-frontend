'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE } from '@/lib/api';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  Phone,
  KeyRound,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Heart
} from 'lucide-react';
import Image from 'next/image';

const LoginPage = () => {
  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  // Forgot Password Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState<1 | 2 | 3>(1); // 1: Enter Username & Phone, 2: Enter OTP, 3: Set New Password
  const [forgotUsername, setForgotUsername] = useState('');
  const [forgotPhone, setForgotPhone] = useState('7668473135');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [resetSessionToken, setResetSessionToken] = useState('');
  const [cooldown, setCooldown] = useState(0);

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. LOGIN HANDLER
  // ─────────────────────────────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          password
        })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid Credentials');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Connection error. Please check your network or try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. FORGOT PASSWORD - STEP 1: REQUEST OTP
  // ─────────────────────────────────────────────────────────────────────────────
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    setForgotLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/users/forgot-password/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: forgotUsername.trim(),
          mobile: forgotPhone.trim()
        })
      });

      const data = await res.json();
      if (res.ok) {
        setForgotSuccess(data.message);
        setForgotStep(2);
        startCooldown(60);
      } else {
        setForgotError(data.message || 'Failed to send OTP.');
      }
    } catch (err) {
      setForgotError('Connection error. Could not connect to authentication server.');
    } finally {
      setForgotLoading(false);
    }
  };

  const startCooldown = (seconds: number) => {
    setCooldown(seconds);
    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. FORGOT PASSWORD - STEP 2: VERIFY OTP
  // ─────────────────────────────────────────────────────────────────────────────
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    setForgotLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/users/forgot-password/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: forgotUsername.trim(),
          otp: otp.trim()
        })
      });

      const data = await res.json();
      if (res.ok) {
        setResetSessionToken(data.resetSessionToken);
        setForgotSuccess('OTP verified successfully! Please enter your new password.');
        setForgotStep(3);
      } else {
        setForgotError(data.message || 'Invalid or expired OTP');
      }
    } catch (err) {
      setForgotError('Connection error verifying OTP.');
    } finally {
      setForgotLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. FORGOT PASSWORD - STEP 3: RESET PASSWORD
  // ─────────────────────────────────────────────────────────────────────────────
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');

    if (newPassword.length < 6) {
      setForgotError('New password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setForgotError('Passwords do not match');
      return;
    }

    setForgotLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/users/forgot-password/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: forgotUsername.trim(),
          resetSessionToken,
          newPassword
        })
      });

      const data = await res.json();
      if (res.ok) {
        setForgotSuccess('Password reset successfully! Redirecting to login...');
        setTimeout(() => {
          setShowForgotModal(false);
          setForgotStep(1);
          setOtp('');
          setNewPassword('');
          setConfirmPassword('');
          setForgotError('');
          setForgotSuccess('');
          setPassword('');
        }, 2000);
      } else {
        setForgotError(data.message || 'Failed to reset password');
      }
    } catch (err) {
      setForgotError('Connection error resetting password.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-md w-full bg-white rounded-[32px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 relative z-10 border border-white/20">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-8 sm:p-10 text-center text-white relative overflow-hidden">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl mx-auto mb-4 flex items-center justify-center border border-white/20 shadow-inner">
            <ShieldCheck size={36} className="text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider mb-1">
            Admin Portal
          </h1>
          <p className="text-orange-100 text-xs sm:text-sm font-medium tracking-wide">
            Shri Shivcharan Dharmarth Trust
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="p-8 sm:p-10 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-2xl text-xs sm:text-sm font-semibold border border-red-200 flex items-start space-x-3 animate-in fade-in">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Username Field */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <User size={18} />
              </div>
              <input
                id="admin-username-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 rounded-2xl border border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none text-gray-900 text-sm font-medium transition-all"
                placeholder="Enter admin username"
                required
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => {
                  setForgotUsername(username || 'GOPAL_DIXIT');
                  setShowForgotModal(true);
                  setForgotStep(1);
                  setForgotError('');
                  setForgotSuccess('');
                }}
                className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Lock size={18} />
              </div>
              <input
                id="admin-password-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-3.5 bg-gray-50 rounded-2xl border border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none text-gray-900 text-sm font-medium transition-all"
                placeholder="Enter password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            id="admin-login-button"
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-5 text-center border-t border-gray-100 flex items-center justify-center space-x-2 text-xs font-semibold text-gray-500">
          <Heart size={14} className="text-orange-600" fill="currentColor" />
          <span>मानव सेवा, गौ सेवा और संस्कारों का संकल्प</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          FORGOT PASSWORD MODAL (MOBILE OTP FLOW)
         ───────────────────────────────────────────────────────────────────────────── */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-6 text-white text-center">
              <h2 className="text-xl font-bold uppercase tracking-wider flex items-center justify-center space-x-2">
                <KeyRound size={20} />
                <span>Reset Admin Password</span>
              </h2>
              <p className="text-orange-100 text-xs mt-1">
                {forgotStep === 1 && 'Step 1: Mobile Verification'}
                {forgotStep === 2 && 'Step 2: Enter 6-Digit OTP'}
                {forgotStep === 3 && 'Step 3: Create New Password'}
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              {forgotError && (
                <div className="bg-red-50 text-red-700 p-3.5 rounded-xl text-xs font-medium border border-red-200 flex items-start space-x-2">
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5 text-red-600" />
                  <span>{forgotError}</span>
                </div>
              )}

              {forgotSuccess && (
                <div className="bg-emerald-50 text-emerald-800 p-3.5 rounded-xl text-xs font-medium border border-emerald-200 flex items-start space-x-2">
                  <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5 text-emerald-600" />
                  <span>{forgotSuccess}</span>
                </div>
              )}

              {/* STEP 1: Enter Username & Phone */}
              {forgotStep === 1 && (
                <form onSubmit={handleRequestOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Admin Username
                    </label>
                    <input
                      type="text"
                      value={forgotUsername}
                      onChange={(e) => setForgotUsername(e.target.value)}
                      placeholder="e.g. GOPAL_DIXIT"
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:border-orange-500 outline-none text-sm font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Registered Mobile Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <Phone size={16} />
                      </div>
                      <input
                        type="tel"
                        value={forgotPhone}
                        onChange={(e) => setForgotPhone(e.target.value)}
                        placeholder="10-digit mobile number"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:border-orange-500 outline-none text-sm font-medium"
                        required
                        maxLength={10}
                      />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">
                      OTP will be sent to the authorized admin mobile number.
                    </p>
                  </div>

                  <div className="flex space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(false)}
                      className="flex-1 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-xl text-sm transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={forgotLoading}
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl text-sm transition flex items-center justify-center space-x-2 disabled:opacity-60"
                    >
                      {forgotLoading ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          <span>Sending OTP...</span>
                        </>
                      ) : (
                        <span>Send OTP</span>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: Enter OTP */}
              {forgotStep === 2 && (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Enter 6-Digit OTP
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="• • • • • •"
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:border-orange-500 outline-none text-center text-xl font-mono font-bold tracking-widest text-gray-900"
                      required
                      maxLength={6}
                      autoFocus
                    />
                    <p className="text-[11px] text-gray-500 mt-1.5 text-center">
                      OTP is valid for 5 minutes.
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <button
                      type="button"
                      onClick={() => setForgotStep(1)}
                      className="text-gray-500 hover:text-gray-700 flex items-center space-x-1"
                    >
                      <ArrowLeft size={14} />
                      <span>Change Mobile</span>
                    </button>

                    {cooldown > 0 ? (
                      <span className="text-gray-400 font-medium">Resend OTP in {cooldown}s</span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleRequestOtp}
                        className="text-orange-600 font-bold hover:underline"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>

                  <div className="flex space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(false)}
                      className="flex-1 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-xl text-sm transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={forgotLoading || otp.length < 6}
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl text-sm transition flex items-center justify-center space-x-2 disabled:opacity-60"
                    >
                      {forgotLoading ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <span>Verify OTP</span>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: Reset Password */}
              {forgotStep === 3 && (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:border-orange-500 outline-none text-sm font-medium"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Confirm New Password
                    </label>
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:border-orange-500 outline-none text-sm font-medium"
                      required
                    />
                  </div>

                  <div className="flex space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(false)}
                      className="flex-1 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-xl text-sm transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={forgotLoading}
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl text-sm transition flex items-center justify-center space-x-2 disabled:opacity-60"
                    >
                      {forgotLoading ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          <span>Updating...</span>
                        </>
                      ) : (
                        <span>Update Password</span>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
