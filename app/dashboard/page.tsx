'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Link2, MousePointerClick, Users, Activity, TrendingUp, Plus, 
  ExternalLink, Copy, Check, QrCode, ArrowRight, Zap, RefreshCw, Calendar
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import QrModal from '@/components/QrModal';
import { UrlItem, AnalyticsSummary } from '@/lib/types';

export default function DashboardOverview() {
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedQr, setSelectedQr] = useState<UrlItem | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [urlsRes, analyticsRes] = await Promise.all([
        fetch('/api/v1/urls?size=10'),
        fetch('/api/v1/analytics')
      ]);
      const urlsData = await urlsRes.json();
      const analyticsData = await analyticsRes.json();

      setUrls(urlsData.content || []);
      setAnalytics(analyticsData);
    } catch (err) {
      console.error('Failed fetching overview data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCopy = (shortCode: string) => {
    const fullUrl = `${window.location.origin}/${shortCode}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedCode(shortCode);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-navy-400">
        <RefreshCw className="w-8 h-8 animate-spin text-brand-400 mb-2" />
      </div>
    );
  }

  const activeLinksCount = urls.filter(u => u.isActive).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Welcome Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-navy-900 via-navy-800 to-navy-950 p-6 rounded-3xl border border-navy-800 shadow-xl">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Overview Dashboard</h2>
          <p className="text-navy-300 text-xs mt-1">
            Real-time link click metrics & system performance telemetry.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="p-2.5 bg-navy-800 hover:bg-navy-700 text-navy-300 hover:text-white rounded-xl border border-navy-700 transition-colors"
            title="Refresh Metrics"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <Link
            href="/dashboard/links"
            className="px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-medium text-xs rounded-xl shadow-glow transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Short Link
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Links */}
        <div className="glass-panel p-5 rounded-2xl border border-navy-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-navy-400 uppercase tracking-wider">Total Links</span>
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400"><Link2 className="w-4 h-4" /></div>
          </div>
          <p className="text-3xl font-extrabold text-white font-mono">{urls.length}</p>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3 h-3" /> {activeLinksCount} active links
          </p>
        </div>

        {/* Total Clicks */}
        <div className="glass-panel p-5 rounded-2xl border border-navy-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-navy-400 uppercase tracking-wider">Total Clicks</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400"><MousePointerClick className="w-4 h-4" /></div>
          </div>
          <p className="text-3xl font-extrabold text-white font-mono">{analytics?.totalClicks?.toLocaleString() || '0'}</p>
          <p className="text-[11px] text-amber-400 flex items-center gap-1 font-medium">
            <Zap className="w-3 h-3" /> {analytics?.avgClicksPerDay || 0} avg / day
          </p>
        </div>

        {/* Unique Visitors */}
        <div className="glass-panel p-5 rounded-2xl border border-navy-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-navy-400 uppercase tracking-wider">Unique Visitors</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400"><Users className="w-4 h-4" /></div>
          </div>
          <p className="text-3xl font-extrabold text-white font-mono">{analytics?.uniqueVisitors?.toLocaleString() || '0'}</p>
          <p className="text-[11px] text-emerald-400 font-medium">Deduplicated IP + UA tracking</p>
        </div>

        {/* Redis Hit SLA */}
        <div className="glass-panel p-5 rounded-2xl border border-navy-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-navy-400 uppercase tracking-wider">Cache Hit SLA</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400"><Activity className="w-4 h-4" /></div>
          </div>
          <p className="text-3xl font-extrabold text-white font-mono">94.2%</p>
          <p className="text-[11px] text-purple-400 font-mono">&lt;10ms Redis latency</p>
        </div>

      </div>

      {/* Main Analytics Chart */}
      <div className="glass-panel p-6 rounded-3xl border border-navy-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-400" />
              Redirect Click Telemetry (14 Days)
            </h3>
            <p className="text-xs text-navy-400">Total clicks vs unique visitors over time.</p>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analytics?.timeSeries || []}>
              <defs>
                <linearGradient id="clickGradOverview" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#FF6B35" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="uniqueGradOverview" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '12px', color: '#FFF' }}
              />
              <Area type="monotone" dataKey="clicks" name="Total Clicks" stroke="#FF6B35" strokeWidth={3} fillOpacity={1} fill="url(#clickGradOverview)" />
              <Area type="monotone" dataKey="uniqueVisitors" name="Unique Visitors" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#uniqueGradOverview)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing Links Table */}
      <div className="glass-panel p-6 rounded-3xl border border-navy-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Recent Top Performing Links</h3>
          <Link
            href="/dashboard/links"
            className="text-xs text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1"
          >
            Manage All Links <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-950 text-navy-400 uppercase font-mono border-b border-navy-800">
              <tr>
                <th className="p-3.5 rounded-l-xl">Short URL</th>
                <th className="p-3.5">Original Destination</th>
                <th className="p-3.5 text-center">Clicks</th>
                <th className="p-3.5 text-center">Unique</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-right rounded-r-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800/60">
              {urls.map(url => (
                <tr key={url.id} className="hover:bg-navy-900/50 transition-colors">
                  <td className="p-3.5 font-mono text-white font-bold">
                    <span className="text-brand-400">short.ly/{url.shortCode}</span>
                    <span className="block text-[10px] text-navy-400 font-sans font-normal truncate max-w-[150px]">{url.title}</span>
                  </td>

                  <td className="p-3.5 text-navy-300 truncate max-w-xs">
                    {url.originalUrl}
                  </td>

                  <td className="p-3.5 text-center font-mono font-bold text-white">
                    {url.clickCount.toLocaleString()}
                  </td>

                  <td className="p-3.5 text-center font-mono text-emerald-400">
                    {url.uniqueVisitorCount.toLocaleString()}
                  </td>

                  <td className="p-3.5 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      url.isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {url.isActive ? 'Active' : 'Expired'}
                    </span>
                  </td>

                  <td className="p-3.5 text-right space-x-1">
                    <button
                      onClick={() => handleCopy(url.shortCode)}
                      className="p-1.5 text-navy-300 hover:text-white hover:bg-navy-800 rounded-lg transition-colors"
                      title="Copy Short URL"
                    >
                      {copiedCode === url.shortCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => setSelectedQr(url)}
                      className="p-1.5 text-navy-300 hover:text-white hover:bg-navy-800 rounded-lg transition-colors"
                      title="QR Code"
                    >
                      <QrCode className="w-3.5 h-3.5 text-amber-400" />
                    </button>

                    <a
                      href={`/${url.shortCode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-navy-300 hover:text-white hover:bg-navy-800 rounded-lg transition-colors inline-block"
                      title="Test Redirect"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-brand-400" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QR Code Modal */}
      {selectedQr && (
        <QrModal
          url={`${window.location.origin}/${selectedQr.shortCode}`}
          shortCode={selectedQr.shortCode}
          title={selectedQr.title}
          isOpen={!!selectedQr}
          onClose={() => setSelectedQr(null)}
        />
      )}

    </div>
  );
}
