'use client';

import { useState, useEffect } from 'react';
import { 
  Link2, Search, Filter, Plus, Copy, Check, QrCode, ExternalLink, 
  Trash2, Edit3, Calendar, Tag, RefreshCw, X, ShieldAlert, Sparkles 
} from 'lucide-react';
import QrModal from '@/components/QrModal';
import { UrlItem } from '@/lib/types';
import { validateUrl, validateCustomAlias } from '@/lib/base62';

export default function LinksManagementPage() {
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'expired'>('all');
  const [sortBy, setSortBy] = useState<'createdAt,desc' | 'clicks,desc' | 'createdAt,asc'>('createdAt,desc');

  // Modals & Actions
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedQr, setSelectedQr] = useState<UrlItem | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Form State
  const [originalUrl, setOriginalUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [title, setTitle] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/urls?filter=${statusFilter}&search=${encodeURIComponent(searchTerm)}&sort=${sortBy}`);
      const data = await res.json();
      setUrls(data.content || []);
    } catch (err) {
      console.error('Error fetching links', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [statusFilter, sortBy]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLinks();
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const urlCheck = validateUrl(originalUrl);
    if (!urlCheck.valid) {
      setFormError(urlCheck.error || 'Invalid URL');
      return;
    }

    if (customAlias) {
      const aliasCheck = validateCustomAlias(customAlias);
      if (!aliasCheck.valid) {
        setFormError(aliasCheck.error || 'Invalid Custom Alias');
        return;
      }
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/v1/urls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalUrl,
          customAlias: customAlias || undefined,
          title: title || undefined,
          expiresAt: expiresAt ? new Date(expiresAt).toISOString() : undefined
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setFormError(data.message || 'Failed to create short link');
        setSubmitting(false);
        return;
      }

      // Reset form & close modal
      setOriginalUrl('');
      setCustomAlias('');
      setTitle('');
      setExpiresAt('');
      setCreateModalOpen(false);
      fetchLinks();
    } catch (err: any) {
      setFormError('Network error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to soft delete this short link? Analytics history will be preserved.')) return;
    try {
      await fetch(`/api/v1/urls/${id}`, { method: 'DELETE' });
      fetchLinks();
    } catch (err) {
      console.error('Error deleting link', err);
    }
  };

  const handleCopy = (shortCode: string) => {
    const fullUrl = `${window.location.origin}/${shortCode}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedCode(shortCode);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Link Management</h2>
          <p className="text-navy-300 text-xs mt-1">
            Search, filter, edit, and organize all your short URLs.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-medium text-xs rounded-xl shadow-glow transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create New Link
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-navy-800 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-navy-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search code, title, or target URL..."
            className="w-full pl-9 pr-4 py-2 bg-navy-950 border border-navy-700 text-xs text-white placeholder-navy-500 rounded-xl focus:border-brand-500 outline-none"
          />
        </form>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          
          <div className="flex bg-navy-950 p-1 rounded-xl border border-navy-800 text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${statusFilter === 'all' ? 'bg-brand-500 text-white font-medium' : 'text-navy-400 hover:text-white'}`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${statusFilter === 'active' ? 'bg-brand-500 text-white font-medium' : 'text-navy-400 hover:text-white'}`}
            >
              Active
            </button>
            <button
              onClick={() => setStatusFilter('expired')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${statusFilter === 'expired' ? 'bg-brand-500 text-white font-medium' : 'text-navy-400 hover:text-white'}`}
            >
              Expired
            </button>
          </div>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="bg-navy-950 border border-navy-700 text-xs text-navy-200 px-3 py-2 rounded-xl outline-none"
          >
            <option value="createdAt,desc">Sort by Newest</option>
            <option value="clicks,desc">Sort by Clicks (High to Low)</option>
            <option value="createdAt,asc">Sort by Oldest</option>
          </select>

        </div>

      </div>

      {/* Main Table */}
      <div className="glass-panel rounded-3xl border border-navy-800 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-navy-400 flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin text-brand-400" />
            <span>Loading short links...</span>
          </div>
        ) : urls.length === 0 ? (
          <div className="p-12 text-center text-navy-400 space-y-3">
            <Link2 className="w-10 h-10 mx-auto text-navy-600" />
            <p className="text-base font-bold text-white">No short links found</p>
            <p className="text-xs text-navy-400">Try adjusting your search query or filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-navy-950 text-navy-400 uppercase font-mono border-b border-navy-800">
                <tr>
                  <th className="p-4">Short Code & Title</th>
                  <th className="p-4">Original Target URL</th>
                  <th className="p-4 text-center">Clicks</th>
                  <th className="p-4 text-center">Unique</th>
                  <th className="p-4 text-center">Expiration</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800/60">
                {urls.map(url => (
                  <tr key={url.id} className="hover:bg-navy-900/50 transition-colors">
                    
                    <td className="p-4 font-mono">
                      <div className="font-bold text-brand-400">short.ly/{url.shortCode}</div>
                      <div className="text-[11px] text-navy-300 font-sans font-medium mt-0.5">{url.title}</div>
                    </td>

                    <td className="p-4 text-navy-300 truncate max-w-xs font-mono text-[11px]">
                      {url.originalUrl}
                    </td>

                    <td className="p-4 text-center font-mono font-bold text-white">
                      {url.clickCount.toLocaleString()}
                    </td>

                    <td className="p-4 text-center font-mono text-emerald-400">
                      {url.uniqueVisitorCount.toLocaleString()}
                    </td>

                    <td className="p-4 text-center text-[11px] text-navy-400">
                      {url.expiresAt ? new Date(url.expiresAt).toLocaleDateString() : 'Never'}
                    </td>

                    <td className="p-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        url.isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {url.isActive ? 'Active' : 'Expired'}
                      </span>
                    </td>

                    <td className="p-4 text-right space-x-1">
                      <button
                        onClick={() => handleCopy(url.shortCode)}
                        className="p-2 text-navy-300 hover:text-white hover:bg-navy-800 rounded-lg transition-colors"
                        title="Copy Link"
                      >
                        {copiedCode === url.shortCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => setSelectedQr(url)}
                        className="p-2 text-navy-300 hover:text-white hover:bg-navy-800 rounded-lg transition-colors"
                        title="QR Code"
                      >
                        <QrCode className="w-3.5 h-3.5 text-amber-400" />
                      </button>

                      <a
                        href={`/${url.shortCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-navy-300 hover:text-white hover:bg-navy-800 rounded-lg transition-colors inline-block"
                        title="Test Redirect"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-brand-400" />
                      </a>

                      <button
                        onClick={() => handleDelete(url.id)}
                        className="p-2 text-navy-400 hover:text-red-400 hover:bg-navy-800 rounded-lg transition-colors"
                        title="Soft Delete"
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

      {/* Create Link Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-navy-900 border border-navy-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            
            <button
              onClick={() => setCreateModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-navy-400 hover:text-white rounded-full hover:bg-navy-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1">Create Short Link</h3>
            <p className="text-xs text-navy-400 mb-6">Convert long URLs into fast, trackable short links.</p>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-navy-300 mb-1">Original URL *</label>
                <input
                  type="url"
                  value={originalUrl}
                  onChange={e => setOriginalUrl(e.target.value)}
                  placeholder="https://example.com/long-page-path"
                  required
                  className="w-full px-3.5 py-2.5 bg-navy-950 border border-navy-700 text-xs text-white rounded-xl focus:border-brand-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-navy-300 mb-1">Custom Alias (Optional)</label>
                  <input
                    type="text"
                    value={customAlias}
                    onChange={e => setCustomAlias(e.target.value)}
                    placeholder="summer-promo"
                    className="w-full px-3.5 py-2.5 bg-navy-950 border border-navy-700 text-xs text-white rounded-xl focus:border-brand-500 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-navy-300 mb-1">Expiration Date</label>
                  <input
                    type="datetime-local"
                    value={expiresAt}
                    onChange={e => setExpiresAt(e.target.value)}
                    className="w-full px-3 py-2.5 bg-navy-950 border border-navy-700 text-xs text-white rounded-xl focus:border-brand-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-navy-300 mb-1">Title / Description</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Summer Promo Campaign"
                  className="w-full px-3.5 py-2.5 bg-navy-950 border border-navy-700 text-xs text-white rounded-xl focus:border-brand-500 outline-none"
                />
              </div>

              {formError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-navy-800">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 bg-navy-800 hover:bg-navy-700 text-navy-300 hover:text-white rounded-xl text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold shadow-glow flex items-center gap-1.5"
                >
                  {submitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  Create Link
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* QR Modal */}
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
