'use client';

import { useState, useEffect } from 'react';
import { 
  Key, Plus, Copy, Check, Trash2, Code2, Terminal, Play, 
  RefreshCw, CheckCircle2, ShieldCheck, Layers 
} from 'lucide-react';
import { ApiKey } from '@/lib/types';

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);

  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyType, setNewKeyType] = useState<'live' | 'test'>('live');
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [copiedKeyId, setCopiedKeyId] = useState<number | null>(null);

  // Playground state
  const [testUrl, setTestUrl] = useState('https://example.com/products/summer-sale?id=123');
  const [testAlias, setTestAlias] = useState('api-test-link');
  const [playgroundResponse, setPlaygroundResponse] = useState<string | null>(null);
  const [playgroundStatus, setPlaygroundStatus] = useState<number | null>(null);
  const [testing, setTesting] = useState(false);
  const [activeTab, setActiveTab] = useState<'curl' | 'js' | 'java'>('curl');

  const fetchKeys = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/keys');
      const data = await res.json();
      setKeys(data);
    } catch (err) {
      console.error('Error fetching API keys', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    try {
      await fetch('/api/v1/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName, type: newKeyType })
      });
      setNewKeyName('');
      setCreateModalOpen(false);
      fetchKeys();
    } catch (err) {
      console.error('Error creating key', err);
    }
  };

  const handleRevokeKey = async (id: number) => {
    if (!confirm('Are you sure you want to revoke this API key? Applications using it will lose access.')) return;
    try {
      await fetch(`/api/v1/keys?id=${id}`, { method: 'DELETE' });
      fetchKeys();
    } catch (err) {
      console.error('Error revoking key', err);
    }
  };

  const handleCopyKey = (id: number, keyStr: string) => {
    navigator.clipboard.writeText(keyStr);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleTestApiCall = async () => {
    setTesting(true);
    setPlaygroundResponse(null);
    setPlaygroundStatus(null);

    try {
      const res = await fetch('/api/v1/urls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalUrl: testUrl,
          customAlias: testAlias || undefined
        })
      });

      const data = await res.json();
      setPlaygroundStatus(res.status);
      setPlaygroundResponse(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setPlaygroundStatus(500);
      setPlaygroundResponse(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setTesting(false);
    }
  };

  const getCurlSnippet = () => `curl -X POST https://short.ly/api/v1/urls \\
  -H "Authorization: Bearer sk_live_9a8b7c6d5e4f3a2b1c0d" \\
  -H "Content-Type: application/json" \\
  -d '{
    "originalUrl": "${testUrl}",
    "customAlias": "${testAlias}"
  }'`;

  const getJsSnippet = () => `const response = await fetch('https://short.ly/api/v1/urls', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_live_9a8b7c6d5e4f3a2b1c0d',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    originalUrl: '${testUrl}',
    customAlias: '${testAlias}'
  })
});
const data = await response.json();`;

  const getJavaSnippet = () => `HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://short.ly/api/v1/urls"))
    .header("Authorization", "Bearer sk_live_9a8b7c6d5e4f3a2b1c0d")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString("""
        {
          "originalUrl": "${testUrl}",
          "customAlias": "${testAlias}"
        }
        """))
    .build();`;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Developer API & Sandbox</h2>
          <p className="text-navy-300 text-xs mt-1">
            Generate production API keys and test REST endpoints programmatically.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-medium text-xs rounded-xl shadow-glow transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Generate New API Key
        </button>
      </div>

      {/* API Keys Table */}
      <div className="glass-panel rounded-3xl border border-navy-800 p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Key className="w-5 h-5 text-amber-400" />
          Active Secret API Keys
        </h3>

        {loading ? (
          <div className="p-8 text-center text-navy-400 flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin text-brand-400" />
            <span>Loading keys...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-navy-950 text-navy-400 uppercase font-mono border-b border-navy-800">
                <tr>
                  <th className="p-3.5">Key Name</th>
                  <th className="p-3.5">API Key Token</th>
                  <th className="p-3.5 text-center">Type</th>
                  <th className="p-3.5">Created At</th>
                  <th className="p-3.5">Last Used</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800/60">
                {keys.map(k => (
                  <tr key={k.id} className="hover:bg-navy-900/50 transition-colors">
                    <td className="p-3.5 font-bold text-white">{k.name}</td>
                    <td className="p-3.5 font-mono text-brand-400">{k.key}</td>
                    <td className="p-3.5 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        k.type === 'live' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {k.type}
                      </span>
                    </td>
                    <td className="p-3.5 text-navy-400">{new Date(k.createdAt).toLocaleDateString()}</td>
                    <td className="p-3.5 text-navy-400">{k.lastUsedAt ? new Date(k.lastUsedAt).toLocaleTimeString() : 'Never'}</td>
                    <td className="p-3.5 text-right space-x-1">
                      <button
                        onClick={() => handleCopyKey(k.id, k.key)}
                        className="p-1.5 text-navy-300 hover:text-white hover:bg-navy-800 rounded-lg transition-colors"
                        title="Copy Key"
                      >
                        {copiedKeyId === k.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => handleRevokeKey(k.id)}
                        className="p-1.5 text-navy-400 hover:text-red-400 hover:bg-navy-800 rounded-lg transition-colors"
                        title="Revoke Key"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Interactive API Sandbox */}
      <div className="glass-panel p-6 rounded-3xl border border-navy-800 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-purple-400" />
            Interactive API Endpoint Tester
          </h3>
          <p className="text-xs text-navy-400">Test <code className="text-brand-400 font-mono">POST /api/v1/urls</code> directly in your browser sandbox.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Controls */}
          <div className="space-y-4 bg-navy-950 p-5 rounded-2xl border border-navy-800">
            <div>
              <label className="block text-xs font-mono text-navy-300 mb-1">Target URL (originalUrl)</label>
              <input
                type="url"
                value={testUrl}
                onChange={e => setTestUrl(e.target.value)}
                className="w-full px-3 py-2 bg-navy-900 border border-navy-700 text-xs text-white rounded-xl focus:border-brand-500 outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-navy-300 mb-1">Custom Alias (customAlias)</label>
              <input
                type="text"
                value={testAlias}
                onChange={e => setTestAlias(e.target.value)}
                className="w-full px-3 py-2 bg-navy-900 border border-navy-700 text-xs text-white rounded-xl focus:border-brand-500 outline-none font-mono"
              />
            </div>

            <button
              onClick={handleTestApiCall}
              disabled={testing}
              className="w-full py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-glow flex items-center justify-center gap-2 transition-all"
            >
              {testing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-white" />}
              Execute API Request
            </button>

            {/* Code Snippets */}
            <div className="pt-4 border-t border-navy-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-navy-400 font-mono">SDK Code Generators</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('curl')}
                    className={`px-2 py-0.5 rounded text-[10px] ${activeTab === 'curl' ? 'bg-brand-500 text-white font-bold' : 'text-navy-400'}`}
                  >
                    cURL
                  </button>
                  <button
                    onClick={() => setActiveTab('js')}
                    className={`px-2 py-0.5 rounded text-[10px] ${activeTab === 'js' ? 'bg-brand-500 text-white font-bold' : 'text-navy-400'}`}
                  >
                    Node.js
                  </button>
                  <button
                    onClick={() => setActiveTab('java')}
                    className={`px-2 py-0.5 rounded text-[10px] ${activeTab === 'java' ? 'bg-brand-500 text-white font-bold' : 'text-navy-400'}`}
                  >
                    Java
                  </button>
                </div>
              </div>

              <pre className="p-3 bg-navy-900 rounded-xl text-[11px] font-mono text-navy-300 overflow-x-auto border border-navy-800">
                {activeTab === 'curl' && getCurlSnippet()}
                {activeTab === 'js' && getJsSnippet()}
                {activeTab === 'java' && getJavaSnippet()}
              </pre>
            </div>
          </div>

          {/* Response Inspector */}
          <div className="space-y-2 bg-navy-950 p-5 rounded-2xl border border-navy-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-navy-800 pb-2">
                <span className="text-xs font-mono font-bold text-white">Live Response Payload</span>
                {playgroundStatus && (
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                    playgroundStatus < 300 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    HTTP {playgroundStatus}
                  </span>
                )}
              </div>

              <pre className="p-4 bg-navy-900 rounded-xl text-[11px] font-mono text-emerald-400 overflow-x-auto min-h-[220px] border border-navy-800">
                {playgroundResponse || '// Click "Execute API Request" to view live JSON response...'}
              </pre>
            </div>

            <div className="text-[10px] text-navy-500 font-mono text-center pt-2">
              Headers: Content-Type: application/json • Authorization: Bearer sk_live_...
            </div>
          </div>

        </div>
      </div>

      {/* Generate Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-navy-900 border border-navy-700 rounded-3xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-3">Generate API Key</h3>
            
            <form onSubmit={handleCreateKey} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-navy-300 mb-1">Key Name</label>
                <input
                  type="text"
                  value={newKeyName}
                  onChange={e => setNewKeyName(e.target.value)}
                  placeholder="e.g. Marketing Automation"
                  required
                  className="w-full px-3 py-2 bg-navy-950 border border-navy-700 text-xs text-white rounded-xl focus:border-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-navy-300 mb-1">Key Environment</label>
                <select
                  value={newKeyType}
                  onChange={e => setNewKeyType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-navy-950 border border-navy-700 text-xs text-white rounded-xl focus:border-brand-500 outline-none"
                >
                  <option value="live">Live Production (sk_live_...)</option>
                  <option value="test">Test Sandbox (sk_test_...)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-3 py-1.5 bg-navy-800 text-navy-300 rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-brand-500 text-white rounded-lg text-xs font-bold shadow-glow"
                >
                  Generate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
