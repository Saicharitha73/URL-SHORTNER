'use client';

import { useState } from 'react';
import { 
  Server, Database, Activity, Cpu, HardDrive, ShieldCheck, 
  AlertTriangle, RefreshCw, Layers, CheckCircle2, Zap
} from 'lucide-react';

export default function AdminTelemetryPage() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">System Infrastructure Telemetry</h2>
          <p className="text-navy-300 text-xs mt-1">
            Real-time health monitoring of Redis, PostgreSQL, Kafka, and Spring Boot stateless pods.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="px-3.5 py-2 bg-navy-800 hover:bg-navy-700 text-navy-200 hover:text-white rounded-xl border border-navy-700 text-xs font-medium transition-colors flex items-center gap-2"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-brand-400 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh Health Checks
        </button>
      </div>

      {/* Cluster Overview Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Redis Cluster */}
        <div className="glass-panel p-5 rounded-2xl border border-navy-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Redis Cache
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Healthy</span>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-white font-mono">94.2% Hit Rate</p>
            <p className="text-xs text-navy-400 mt-0.5">Average Latency: <span className="text-emerald-400 font-mono">4.1 ms</span></p>
          </div>
          <div className="w-full bg-navy-950 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full" style={{ width: '94%' }} />
          </div>
        </div>

        {/* PostgreSQL */}
        <div className="glass-panel p-5 rounded-2xl border border-navy-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" /> PostgreSQL
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Primary + 2 Read</span>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-white font-mono">24 / 50 Pool</p>
            <p className="text-xs text-navy-400 mt-0.5">Active Connections: <span className="text-white font-mono">48%</span></p>
          </div>
          <div className="w-full bg-navy-950 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-400 h-full rounded-full" style={{ width: '48%' }} />
          </div>
        </div>

        {/* Kafka Events */}
        <div className="glass-panel p-5 rounded-2xl border border-navy-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" /> Kafka Pipeline
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">0 Consumer Lag</span>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-white font-mono">1,420 / sec</p>
            <p className="text-xs text-navy-400 mt-0.5">Event Processing Rate</p>
          </div>
          <div className="w-full bg-navy-950 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-400 h-full rounded-full" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Spring Pods */}
        <div className="glass-panel p-5 rounded-2xl border border-navy-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-brand-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5" /> Stateless Pods
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">3 / 3 Ready</span>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-white font-mono">12% CPU Avg</p>
            <p className="text-xs text-navy-400 mt-0.5">Memory: <span className="text-white font-mono">240MB / pod</span></p>
          </div>
          <div className="w-full bg-navy-950 h-1.5 rounded-full overflow-hidden">
            <div className="bg-brand-500 h-full rounded-full" style={{ width: '12%' }} />
          </div>
        </div>

      </div>

      {/* Pod Nodes Table */}
      <div className="glass-panel p-6 rounded-3xl border border-navy-800 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Server className="w-5 h-5 text-brand-400" />
          Kubernetes Pod Instances
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-950 text-navy-400 uppercase font-mono border-b border-navy-800">
              <tr>
                <th className="p-3.5">Pod Identifier</th>
                <th className="p-3.5 text-center">Node Location</th>
                <th className="p-3.5 text-center">CPU Load</th>
                <th className="p-3.5 text-center">RAM Usage</th>
                <th className="p-3.5 text-center">Restarts</th>
                <th className="p-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800/60 font-mono">
              {[
                { name: 'shortly-api-7d8b9c-x1a', node: 'us-east-1a', cpu: '11%', ram: '238 MB', restarts: 0 },
                { name: 'shortly-api-7d8b9c-y2b', node: 'us-east-1b', cpu: '14%', ram: '245 MB', restarts: 0 },
                { name: 'shortly-api-7d8b9c-z3c', node: 'us-east-1c', cpu: '10%', ram: '232 MB', restarts: 0 },
              ].map(pod => (
                <tr key={pod.name} className="hover:bg-navy-900/50 transition-colors">
                  <td className="p-3.5 text-white font-bold">{pod.name}</td>
                  <td className="p-3.5 text-center text-navy-300">{pod.node}</td>
                  <td className="p-3.5 text-center text-brand-400">{pod.cpu}</td>
                  <td className="p-3.5 text-center text-navy-300">{pod.ram}</td>
                  <td className="p-3.5 text-center text-emerald-400">{pod.restarts}</td>
                  <td className="p-3.5 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">
                      Running
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Abuse & Security Reports */}
      <div className="glass-panel p-6 rounded-3xl border border-navy-800 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-red-400" />
          Malicious Link Abuse Reports & Moderation
        </h3>

        <div className="divide-y divide-navy-800">
          {[
            { code: 'expired-test', reason: 'Phishing Flag', status: 'Disabled', date: '2026-08-01' },
            { code: 'spam-promo-x', reason: 'Unsolicited Spam', status: 'Blocked', date: '2026-07-28' },
          ].map(report => (
            <div key={report.code} className="py-3 flex items-center justify-between text-xs">
              <div>
                <span className="font-mono font-bold text-brand-400">short.ly/{report.code}</span>
                <span className="text-navy-400 block text-[11px]">Reason: {report.reason}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-navy-400 text-[11px]">{report.date}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                  {report.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
