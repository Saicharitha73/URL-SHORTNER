'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Link2, Sparkles, Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('user@short.ly');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 600);
  };

  const handleQuickFillUser = () => {
    setEmail('user@short.ly');
    setPassword('password123');
  };

  const handleQuickFillAdmin = () => {
    setEmail('admin@short.ly');
    setPassword('admin1234');
  };

  return (
    <div className="min-h-screen bg-navy-950 text-navy-50 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-brand-500/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-navy-700 max-w-md w-full shadow-2xl relative z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-400 p-0.5 shadow-glow">
              <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                <Link2 className="w-5 h-5 text-brand-400" />
              </div>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">Shortly</span>
          </Link>

          <h2 className="text-xl font-bold text-white">Sign In To Shortly Console</h2>
          <p className="text-xs text-navy-300">Access link management dashboard, click telemetry & API keys.</p>
        </div>

        {/* Quick Fill Demo Banner */}
        <div className="p-3 bg-navy-950 border border-navy-800 rounded-2xl text-xs space-y-2">
          <div className="flex items-center justify-between text-navy-400">
            <span className="font-bold text-white flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Demo Quick Credentials
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">Instant Access</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleQuickFillUser}
              className="px-2.5 py-1.5 bg-navy-900 hover:bg-navy-800 border border-navy-700 rounded-xl text-[11px] text-navy-200 text-left truncate flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5 text-brand-400" />
              Regular User
            </button>

            <button
              type="button"
              onClick={handleQuickFillAdmin}
              className="px-2.5 py-1.5 bg-navy-900 hover:bg-navy-800 border border-navy-700 rounded-xl text-[11px] text-navy-200 text-left truncate flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              System Admin
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-navy-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-navy-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-4 py-2.5 bg-navy-950 border border-navy-700 text-xs text-white rounded-xl focus:border-brand-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-navy-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-navy-400 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-4 py-2.5 bg-navy-950 border border-navy-700 text-xs text-white rounded-xl focus:border-brand-500 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-glow flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="text-center text-xs text-navy-400 pt-2 border-t border-navy-800">
          Don&apos;t have an account?{' '}
          <Link href="/dashboard" className="text-brand-400 font-bold hover:underline">
            Go directly to Dashboard
          </Link>
        </div>

      </div>

    </div>
  );
}
