'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Zap, BarChart3, Tag, Calendar, Code2, Shield, Activity, Globe, 
  Layers, CheckCircle2, ArrowRight, ChevronDown, ChevronUp, Server, 
  Database, Cpu, Lock, Users, Sparkles
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_ANALYTICS_DATA = [
  { time: '00:00', clicks: 120 },
  { time: '04:00', clicks: 450 },
  { time: '08:00', clicks: 1890 },
  { time: '12:00', clicks: 3400 },
  { time: '16:00', clicks: 2980 },
  { time: '20:00', clicks: 1650 },
  { time: '23:59', clicks: 890 }
];

export default function LandingSections() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="space-y-24 pb-20">

      {/* 1. Trust Indicators / Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 glass-panel p-6 sm:p-8 rounded-3xl border border-navy-800 text-center">
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">&lt; 10 ms</p>
            <p className="text-xs font-mono text-brand-400 uppercase tracking-widest">Redis Latency</p>
          </div>
          <div className="space-y-1 border-l border-navy-800 pl-6">
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">99.9%</p>
            <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest">SLA Availability</p>
          </div>
          <div className="space-y-1 border-l border-navy-800 pl-6">
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">100K+</p>
            <p className="text-xs font-mono text-amber-400 uppercase tracking-widest">Requests / Sec</p>
          </div>
          <div className="space-y-1 border-l border-navy-800 pl-6">
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">24,891</p>
            <p className="text-xs font-mono text-blue-400 uppercase tracking-widest">Clicks Tracked</p>
          </div>
        </div>
      </section>

      {/* 2. Feature Cards Grid */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-400">
            Enterprise Feature Suite
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Everything You Need To Build & Track Links
          </h3>
          <p className="text-navy-300 text-base">
            Engineered for high performance with cache-aside Redis lookups, asynchronous Kafka analytics processing, and REST APIs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="glass-card p-8 rounded-3xl border border-navy-800 hover:border-brand-500/50 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center mb-6 group-hover:bg-brand-500 group-hover:text-white transition-colors">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Instant Short Links</h4>
            <p className="text-navy-300 text-sm leading-relaxed">
              Base62 encoded unique identifiers ensure sub-millisecond lookups and guarantees collision-free URL generation.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-8 rounded-3xl border border-navy-800 hover:border-brand-500/50 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Real-Time Analytics</h4>
            <p className="text-navy-300 text-sm leading-relaxed">
              Asynchronous event pipeline captures click timestamp, country, device type, browser, OS, and unique visitors without slowing down redirects.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-8 rounded-3xl border border-navy-800 hover:border-brand-500/50 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <Tag className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Custom Aliases</h4>
            <p className="text-navy-300 text-sm leading-relaxed">
              Create branded links like <code className="text-brand-300 font-mono">short.ly/summer-sale</code> with built-in reserved word protection and alias availability checks.
            </p>
          </div>

          {/* Card 4 */}
          <div className="glass-card p-8 rounded-3xl border border-navy-800 hover:border-brand-500/50 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <Calendar className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Expiration Rules</h4>
            <p className="text-navy-300 text-sm leading-relaxed">
              Set automated expiration dates for temporary campaigns. Automatically returns HTTP <code className="text-amber-400 font-mono">410 Gone</code> when expired.
            </p>
          </div>

          {/* Card 5 */}
          <div className="glass-card p-8 rounded-3xl border border-navy-800 hover:border-brand-500/50 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 group-hover:bg-purple-500 group-hover:text-white transition-colors">
              <Code2 className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Developer REST API</h4>
            <p className="text-navy-300 text-sm leading-relaxed">
              Full CRUD endpoints with JWT & API key authentication (<code className="text-purple-300 font-mono">sk_live_...</code>), OpenAPI documentation, and rate limiting.
            </p>
          </div>

          {/* Card 6 */}
          <div className="glass-card p-8 rounded-3xl border border-navy-800 hover:border-brand-500/50 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mb-6 group-hover:bg-red-500 group-hover:text-white transition-colors">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Security & Abuse Control</h4>
            <p className="text-navy-300 text-sm leading-relaxed">
              Protection against open redirects, malicious injection, brute-force attempts, and automated rate limiting using Redis sliding windows.
            </p>
          </div>

        </div>
      </section>

      {/* 3. How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-navy-800">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 mb-2">Simple 3-Step Journey</h2>
            <h3 className="text-3xl font-bold text-white">How Shortly Works</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="space-y-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center mx-auto text-xl font-bold font-mono">
                01
              </div>
              <h4 className="text-lg font-bold text-white">Paste Your Long URL</h4>
              <p className="text-navy-300 text-sm">
                Enter any HTTP/HTTPS URL, optionally add a custom alias, title, or expiration date.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto text-xl font-bold font-mono">
                02
              </div>
              <h4 className="text-lg font-bold text-white">Generate Short Link</h4>
              <p className="text-navy-300 text-sm">
                Backend validates protocol, persists to PostgreSQL source of truth, and caches in Redis.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto text-xl font-bold font-mono">
                03
              </div>
              <h4 className="text-lg font-bold text-white">Share & Track Clicks</h4>
              <p className="text-navy-300 text-sm">
                Visitors get redirected instantly while analytics workers log geographic, device, and referrer insights.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Real-time Analytics Preview */}
      <section id="analytics-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-navy-800 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy-800 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">Live Analytics Pipeline</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Campaign Click Telemetry</h3>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-navy-950 px-4 py-2 rounded-xl border border-navy-800 text-xs text-navy-300">
                Total Clicks: <span className="text-white font-bold font-mono">24,891</span>
              </div>
              <div className="bg-navy-950 px-4 py-2 rounded-xl border border-navy-800 text-xs text-navy-300">
                Unique Visitors: <span className="text-emerald-400 font-bold font-mono">9,821</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Chart Area */}
            <div className="lg:col-span-2 bg-navy-950/80 p-6 rounded-2xl border border-navy-800">
              <h4 className="text-sm font-bold text-navy-200 mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-brand-400" />
                24-Hour Redirect Throughput
              </h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_ANALYTICS_DATA}>
                    <defs>
                      <linearGradient id="clickGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#FF6B35" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '12px', color: '#FFF' }}
                    />
                    <Area type="monotone" dataKey="clicks" stroke="#FF6B35" strokeWidth={3} fillOpacity={1} fill="url(#clickGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Geo Breakdown */}
            <div className="bg-navy-950/80 p-6 rounded-2xl border border-navy-800 space-y-4">
              <h4 className="text-sm font-bold text-navy-200 flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400" />
                Geographic Distribution
              </h4>
              
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-navy-300 mb-1">
                    <span>🇮🇳 India</span>
                    <span className="font-mono text-white">15,182 (61%)</span>
                  </div>
                  <div className="w-full bg-navy-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-brand-500 h-full rounded-full" style={{ width: '61%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-navy-300 mb-1">
                    <span>🇺🇸 United States</span>
                    <span className="font-mono text-white">4,480 (18%)</span>
                  </div>
                  <div className="w-full bg-navy-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: '18%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-navy-300 mb-1">
                    <span>🇬🇧 United Kingdom</span>
                    <span className="font-mono text-white">2,240 (9%)</span>
                  </div>
                  <div className="w-full bg-navy-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: '9%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-navy-300 mb-1">
                    <span>🇨🇦 Canada</span>
                    <span className="font-mono text-white">1,245 (5%)</span>
                  </div>
                  <div className="w-full bg-navy-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-400 h-full rounded-full" style={{ width: '5%' }} />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-navy-800 text-center">
                <Link
                  href="/dashboard/analytics"
                  className="text-xs text-brand-400 hover:text-brand-300 font-medium inline-flex items-center gap-1"
                >
                  View Complete Analytics Dashboard <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Security & Architecture */}
      <section id="api" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400">
              Distributed System Architecture
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              Built For Scale, Speed, and Durability
            </h3>
            <p className="text-navy-300 text-sm leading-relaxed">
              Shortly separates responsibilities cleanly: PostgreSQL guarantees permanent data persistence, Redis provides low-latency redirect caching, stateless Spring Boot pods scale horizontally, and Kafka handles event tracking asynchronously.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 mt-0.5"><CheckCircle2 className="w-4 h-4" /></div>
                <div>
                  <h5 className="text-sm font-bold text-white">Cache-Aside Read Strategy</h5>
                  <p className="text-xs text-navy-400">Redirect requests hit Redis cache first (&lt;10ms), falling back to PostgreSQL read replicas on cache miss.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 mt-0.5"><CheckCircle2 className="w-4 h-4" /></div>
                <div>
                  <h5 className="text-sm font-bold text-white">Asynchronous Analytics Pipeline</h5>
                  <p className="text-xs text-navy-400">Non-blocking Kafka producers emit click events instantly without delaying the HTTP 302 redirect response.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 mt-0.5"><CheckCircle2 className="w-4 h-4" /></div>
                <div>
                  <h5 className="text-sm font-bold text-white">Stateless Instance Scaling</h5>
                  <p className="text-xs text-navy-400">Deploy multiple Spring Boot app pods behind Nginx/Cloud load balancers with seamless horizontal scaling.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/dashboard/api"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm rounded-xl transition-all shadow-glow"
              >
                <Code2 className="w-4 h-4" />
                Explore Developer API Sandbox
              </Link>
            </div>
          </div>

          {/* System Architecture Diagram Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-navy-700 bg-navy-950/90 font-mono text-xs text-navy-300">
            <div className="flex items-center justify-between border-b border-navy-800 pb-4 mb-4">
              <span className="text-white font-bold flex items-center gap-2">
                <Server className="w-4 h-4 text-brand-400" /> System Architecture Topology
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Active Cluster</span>
            </div>

            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-navy-900 border border-navy-800 text-center text-white">
                Client Browsers / Apps (HTTP GET /aB92xK)
              </div>
              <div className="text-center text-navy-500">↓</div>
              <div className="p-3 rounded-xl bg-navy-900 border border-navy-800 text-center text-amber-400">
                Nginx / Cloud Load Balancer
              </div>
              <div className="text-center text-navy-500">↓</div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded bg-navy-900 border border-navy-800 text-brand-400 text-[10px]">Spring Pod #1</div>
                <div className="p-2 rounded bg-navy-900 border border-navy-800 text-brand-400 text-[10px]">Spring Pod #2</div>
                <div className="p-2 rounded bg-navy-900 border border-navy-800 text-brand-400 text-[10px]">Spring Pod #3</div>
              </div>
              <div className="text-center text-navy-500">↓</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-center text-red-300">
                  <Database className="w-4 h-4 mx-auto mb-1 text-red-400" />
                  Redis Cache (&lt;10ms)
                </div>
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-center text-blue-300">
                  <Database className="w-4 h-4 mx-auto mb-1 text-blue-400" />
                  PostgreSQL Truth
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Pricing Tiers */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-400">Transparent Pricing</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Choose Your Scale</h3>
          <p className="text-navy-300 text-sm">Start free, upgrade as your link volume and campaign analytics grow.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Free Tier */}
          <div className="glass-card p-8 rounded-3xl border border-navy-800 flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white">Free Developer</h4>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$0</span>
                <span className="text-xs text-navy-400">/ forever</span>
              </div>
              <p className="text-xs text-navy-300">Ideal for personal projects & basic URL shortening.</p>
              <ul className="space-y-2.5 text-xs text-navy-300 pt-4 border-t border-navy-800">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Up to 50 links / month</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Basic click analytics</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 30-day analytics retention</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Standard short URL generation</li>
              </ul>
            </div>
            <Link
              href="/dashboard"
              className="w-full mt-8 py-3 px-4 bg-navy-800 hover:bg-navy-700 text-white font-medium text-xs rounded-xl text-center transition-colors"
            >
              Start Free
            </Link>
          </div>

          {/* Pro Tier (Featured) */}
          <div className="glass-panel p-8 rounded-3xl border-2 border-brand-500 relative flex flex-col justify-between shadow-glow">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Most Popular
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white">Pro Marketer</h4>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$29</span>
                <span className="text-xs text-navy-400">/ month</span>
              </div>
              <p className="text-xs text-navy-300">For growth marketers and creators needing deep telemetry.</p>
              <ul className="space-y-2.5 text-xs text-navy-300 pt-4 border-t border-navy-800">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-400" /> Unlimited short links</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-400" /> Real-time geographic & device maps</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-400" /> Custom aliases & expiration rules</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-400" /> 1-year analytics retention</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-400" /> REST API Key Access</li>
              </ul>
            </div>
            <Link
              href="/dashboard"
              className="w-full mt-8 py-3 px-4 bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white font-bold text-xs rounded-xl text-center transition-all shadow-glow"
            >
              Get Pro Access
            </Link>
          </div>

          {/* Business Tier */}
          <div className="glass-card p-8 rounded-3xl border border-navy-800 flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white">Enterprise Scale</h4>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$99</span>
                <span className="text-xs text-navy-400">/ month</span>
              </div>
              <p className="text-xs text-navy-300">Designed for high volume teams & API integration.</p>
              <ul className="space-y-2.5 text-xs text-navy-300 pt-4 border-t border-navy-800">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Everything in Pro</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> 100,000 requests / minute API rate limit</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Custom branded domains (go.company.com)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Multi-user team management</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Dedicated SLA & support</li>
              </ul>
            </div>
            <Link
              href="/dashboard"
              className="w-full mt-8 py-3 px-4 bg-navy-800 hover:bg-navy-700 text-white font-medium text-xs rounded-xl text-center transition-colors"
            >
              Contact Sales
            </Link>
          </div>

        </div>
      </section>

      {/* 7. FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'How does Shortly guarantee high performance redirects?',
              a: 'Shortly uses Redis as an in-memory key-value cache layer in front of PostgreSQL. When a visitor accesses a short URL, the request resolves in <10ms from Redis. On cache miss, it reads from PostgreSQL and caches the result with an active TTL.'
            },
            {
              q: 'Does click analytics slow down the redirect?',
              a: 'No! Click tracking events are published asynchronously to an event queue (Kafka) without waiting for analytics persistence. The HTTP 302 redirect is sent immediately to the visitor while background workers process the event.'
            },
            {
              q: 'What happens when a link reaches its expiration date?',
              a: 'When an expired link is requested, the system verifies the expiration metadata and returns an HTTP 410 Gone response code, letting visitors know the link is no longer valid.'
            },
            {
              q: 'Can I create links programmatically via API?',
              a: 'Yes! Shortly provides a comprehensive REST API. You can generate an API key (sk_live_...) in your dashboard and send POST /api/v1/urls requests directly.'
            }
          ].map((item, idx) => (
            <div key={idx} className="glass-panel rounded-2xl border border-navy-800 overflow-hidden">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left flex items-center justify-between text-white font-medium text-sm hover:text-brand-400 transition-colors"
              >
                <span>{item.q}</span>
                {openFaq === idx ? <ChevronUp className="w-4 h-4 text-brand-400" /> : <ChevronDown className="w-4 h-4 text-navy-400" />}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-navy-300 text-xs leading-relaxed border-t border-navy-800/60 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-navy-800 pt-12 text-xs text-navy-400">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h5 className="font-bold text-white mb-3">Shortly Platform</h5>
            <p className="text-navy-400 text-[11px] leading-relaxed">
              High-performance distributed URL shortener & analytics system.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-white mb-3">Product</h5>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white">How It Works</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-3">Developers</h5>
            <ul className="space-y-2">
              <li><Link href="/dashboard/api" className="hover:text-white">REST API</Link></li>
              <li><a href="#api" className="hover:text-white">Documentation</a></li>
              <li><Link href="/dashboard/admin" className="hover:text-white">System Metrics</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-3">System Status</h5>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              All Systems Operational (99.9%)
            </div>
          </div>
        </div>

        <div className="border-t border-navy-800/60 py-6 text-center text-navy-500 text-[11px]">
          © {new Date().getFullYear()} Shortly Inc. Built with Next.js, Redis & PostgreSQL. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
