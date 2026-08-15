'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Link2, Sparkles, Menu, X, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-navy-800/60 bg-navy-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-amber-400 p-0.5 shadow-glow group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                <Link2 className="w-5 h-5 text-brand-500 group-hover:rotate-45 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-navy-100 to-brand-300">
                Shortly
              </span>
              <span className="text-[10px] text-navy-400 font-mono tracking-widest uppercase -mt-1">
                Distributed v1.0
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-navy-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#analytics-preview" className="hover:text-white transition-colors">Analytics</a>
            <a href="#api" className="hover:text-white transition-colors">Developer API</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-navy-200 hover:text-white px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-4 h-4 text-brand-400" />
              Dashboard
            </Link>

            <Link
              href="/auth/login"
              className="text-sm font-medium text-navy-300 hover:text-white px-3.5 py-2 rounded-lg transition-colors"
            >
              Sign In
            </Link>

            <Link
              href="/dashboard"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-white rounded-xl group bg-gradient-to-br from-brand-500 to-amber-500 group-hover:from-brand-500 group-hover:to-amber-500 hover:shadow-glow transition-all"
            >
              <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-navy-950 rounded-[10px] group-hover:bg-opacity-0 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400 group-hover:text-white" />
                Get Started Free
              </span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-navy-300 hover:text-white hover:bg-navy-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-navy-800 px-4 pt-2 pb-6 space-y-3">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-navy-200 hover:text-white hover:bg-navy-800"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-navy-200 hover:text-white hover:bg-navy-800"
          >
            How It Works
          </a>
          <a
            href="#analytics-preview"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-navy-200 hover:text-white hover:bg-navy-800"
          >
            Analytics Preview
          </a>
          <a
            href="#api"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-navy-200 hover:text-white hover:bg-navy-800"
          >
            Developer API
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-navy-200 hover:text-white hover:bg-navy-800"
          >
            Pricing
          </a>

          <div className="pt-4 border-t border-navy-800 flex flex-col gap-2">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-xl bg-navy-800 text-white font-medium hover:bg-navy-700 flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-brand-400" />
              Open Dashboard
            </Link>
            <Link
              href="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-xl bg-brand-500 text-white font-medium hover:bg-brand-600 shadow-glow"
            >
              Sign In / Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
