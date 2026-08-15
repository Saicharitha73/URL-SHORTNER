'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Link2, BarChart3, Key, ShieldCheck, Settings, 
  Plus, LogOut, Sparkles, Menu, X, ExternalLink, Activity
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Links', href: '/dashboard/links', icon: Link2 },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'API Keys', href: '/dashboard/api', icon: Key },
    { name: 'System Metrics', href: '/dashboard/admin', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-navy-50 flex">

      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 glass-panel border-r border-navy-800 bg-navy-900/90 p-4 fixed top-0 bottom-0 left-0 z-40">
        
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 px-2 py-4 mb-6 border-b border-navy-800/80">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-400 p-0.5 shadow-glow">
            <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
              <Link2 className="w-4 h-4 text-brand-400" />
            </div>
          </div>
          <div>
            <span className="font-bold text-lg text-white tracking-tight">Shortly</span>
            <span className="block text-[10px] text-navy-400 font-mono">Console v1.0</span>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="space-y-1.5 flex-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-brand-500 text-white shadow-glow'
                    : 'text-navy-300 hover:text-white hover:bg-navy-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="pt-4 border-t border-navy-800 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-navy-800 border border-navy-700 flex items-center justify-center font-bold text-xs text-amber-400">
              SC
            </div>
            <div className="truncate flex-1">
              <p className="text-xs font-bold text-white truncate">Sarah Connor</p>
              <p className="text-[10px] text-navy-400 font-mono truncate">user@short.ly</p>
            </div>
          </div>

          <Link
            href="/"
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-navy-400 hover:text-white hover:bg-navy-800 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Return to Home
          </Link>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="glass-panel border-b border-navy-800 bg-navy-900/80 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-navy-400 hover:text-white rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-white tracking-tight">
              {navItems.find(i => i.href === pathname)?.name || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden sm:flex items-center gap-1.5 text-xs text-navy-300 hover:text-white px-3 py-1.5 rounded-lg border border-navy-800 bg-navy-950 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-brand-400" />
              Public Landing Page
            </Link>

            <Link
              href="/dashboard/links"
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-500 hover:bg-brand-600 text-white font-medium text-xs rounded-xl shadow-glow transition-all"
            >
              <Plus className="w-4 h-4" />
              Create Link
            </Link>
          </div>

        </header>

        {/* Page Children */}
        <main className="flex-1 p-4 sm:p-8 space-y-6">
          {children}
        </main>

      </div>

    </div>
  );
}
