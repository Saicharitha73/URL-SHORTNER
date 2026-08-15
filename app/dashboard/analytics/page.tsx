'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart3, Globe, Smartphone, Compass, RefreshCw, Calendar, 
  Activity, ArrowUpRight, ShieldCheck, Users, Eye
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';
import { AnalyticsSummary } from '@/lib/types';

const COLORS = ['#FF6B35', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/analytics');
      const data = await res.json();
      setAnalytics(data);
    } catch (err) {
      console.error('Error fetching analytics', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeframe]);

  if (loading || !analytics) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-navy-400">
        <RefreshCw className="w-8 h-8 animate-spin text-brand-400 mb-2" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Click Telemetry & Analytics</h2>
          <p className="text-navy-300 text-xs mt-1">
            Asynchronous event processing via Kafka worker consumers.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-navy-950 p-1 rounded-xl border border-navy-800 text-xs">
          <button
            onClick={() => setTimeframe('7d')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${timeframe === '7d' ? 'bg-brand-500 text-white font-medium' : 'text-navy-400 hover:text-white'}`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setTimeframe('30d')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${timeframe === '30d' ? 'bg-brand-500 text-white font-medium' : 'text-navy-400 hover:text-white'}`}
          >
            Last 30 Days
          </button>
          <button
            onClick={() => setTimeframe('90d')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${timeframe === '90d' ? 'bg-brand-500 text-white font-medium' : 'text-navy-400 hover:text-white'}`}
          >
            Last 90 Days
          </button>
        </div>
      </div>

      {/* Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-navy-800 space-y-1">
          <span className="text-xs font-mono text-navy-400 uppercase tracking-wider">Total Click Volume</span>
          <p className="text-4xl font-extrabold text-white font-mono">{analytics.totalClicks.toLocaleString()}</p>
          <p className="text-xs text-emerald-400 font-medium">Asynchronously logged & aggregated</p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-navy-800 space-y-1">
          <span className="text-xs font-mono text-navy-400 uppercase tracking-wider">Unique Visitors</span>
          <p className="text-4xl font-extrabold text-emerald-400 font-mono">{analytics.uniqueVisitors.toLocaleString()}</p>
          <p className="text-xs text-navy-400">IP + UserAgent deduplicated hash</p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-navy-800 space-y-1">
          <span className="text-xs font-mono text-navy-400 uppercase tracking-wider">Daily Average</span>
          <p className="text-4xl font-extrabold text-amber-400 font-mono">{analytics.avgClicksPerDay.toLocaleString()}</p>
          <p className="text-xs text-navy-400">Average redirects per 24 hours</p>
        </div>
      </div>

      {/* Time Series Area Chart */}
      <div className="glass-panel p-6 rounded-3xl border border-navy-800 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-400" />
          Click Throughput Trend
        </h3>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analytics.timeSeries}>
              <defs>
                <linearGradient id="analyticsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#FF6B35" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '12px', color: '#FFF' }}
              />
              <Area type="monotone" dataKey="clicks" name="Total Clicks" stroke="#FF6B35" strokeWidth={3} fillOpacity={1} fill="url(#analyticsGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Breakdown Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Geographic Country Distribution */}
        <div className="glass-panel p-6 rounded-3xl border border-navy-800 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-amber-400" />
            Geographic Country Breakdown
          </h3>

          <div className="space-y-3.5 pt-2">
            {analytics.countries.map((c, i) => (
              <div key={c.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium">{c.name}</span>
                  <span className="font-mono text-navy-300">{c.clicks.toLocaleString()} ({c.percentage}%)</span>
                </div>
                <div className="w-full bg-navy-950 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${c.percentage}%`, backgroundColor: COLORS[i % COLORS.length] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown Pie Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-navy-800 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-emerald-400" />
            Device Type Breakdown
          </h3>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.devices}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="clicks"
                >
                  {analytics.devices.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '12px', color: '#FFF' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-navy-800">
            {analytics.devices.map((d, i) => (
              <div key={d.name}>
                <span className="block font-bold text-white">{d.name}</span>
                <span className="text-[11px] text-navy-400 font-mono">{d.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Referrer Sources */}
        <div className="glass-panel p-6 rounded-3xl border border-navy-800 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-blue-400" />
            Top Referrer Sources
          </h3>

          <div className="divide-y divide-navy-800">
            {analytics.referrers.map(r => (
              <div key={r.name} className="py-3 flex items-center justify-between text-xs">
                <span className="text-white font-medium">{r.name}</span>
                <div className="flex items-center gap-4 font-mono">
                  <span className="text-navy-300">{r.clicks.toLocaleString()} clicks</span>
                  <span className="text-brand-400 font-bold w-10 text-right">{r.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Browsers & OS */}
        <div className="glass-panel p-6 rounded-3xl border border-navy-800 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            Browser Telemetry
          </h3>

          <div className="divide-y divide-navy-800">
            {analytics.browsers.map(b => (
              <div key={b.name} className="py-3 flex items-center justify-between text-xs">
                <span className="text-white font-medium">{b.name}</span>
                <div className="flex items-center gap-4 font-mono">
                  <span className="text-navy-300">{b.clicks.toLocaleString()} clicks</span>
                  <span className="text-purple-400 font-bold w-10 text-right">{b.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
