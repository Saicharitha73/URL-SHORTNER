'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Link2, Sparkles, Copy, Check, QrCode, ArrowRight, Settings2, Calendar, Tag, ShieldCheck, Zap, AlertCircle, RefreshCw } from 'lucide-react';
import QrModal from './QrModal';
import { validateUrl, validateCustomAlias } from '@/lib/base62';

export default function HeroShortener() {
  const [urlInput, setUrlInput] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [createdResult, setCreatedResult] = useState<{
    shortCode: string;
    shortUrl: string;
    originalUrl: string;
    title: string;
    expiresAt: string | null;
  } | null>(null);

  const [copied, setCopied] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [testCount, setTestCount] = useState(0);

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // URL Validation
    const urlCheck = validateUrl(urlInput);
    if (!urlCheck.valid) {
      setErrorMessage(urlCheck.error || 'Please enter a valid URL');
      return;
    }

    // Alias Validation
    if (customAlias) {
      const aliasCheck = validateCustomAlias(customAlias);
      if (!aliasCheck.valid) {
        setErrorMessage(aliasCheck.error || 'Invalid custom alias');
        return;
      }
    }

    setLoading(true);

    try {
      const res = await fetch('/api/v1/urls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalUrl: urlInput,
          customAlias: customAlias || undefined,
          title: linkTitle || undefined,
          expiresAt: expirationDate ? new Date(expirationDate).toISOString() : undefined
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || 'Failed to generate short URL');
        setLoading(false);
        return;
      }

      setCreatedResult({
        shortCode: data.shortCode,
        shortUrl: data.shortUrl,
        originalUrl: data.originalUrl,
        title: data.title,
        expiresAt: data.expiresAt
      });

      // Confetti burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err: any) {
      setErrorMessage('Network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!createdResult) return;
    navigator.clipboard.writeText(createdResult.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTestRedirect = () => {
    if (!createdResult) return;
    setTestCount(prev => prev + 1);
    window.open(`/${createdResult.shortCode}`, '_blank');
  };

  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/90 border border-brand-500/30 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-6 shadow-glow">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>v1.0 Distributed Redis Engine</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
          Turn Long Links Into{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 via-amber-400 to-brand-500">
            Smart Short Links
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-navy-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Create fast, memorable short URLs and understand exactly how people interact with them. Enterprise durability powered by PostgreSQL & Redis caching.
        </p>

        {/* Shortener Widget Container */}
        <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-navy-700/80 shadow-2xl text-left transition-all">
          <form onSubmit={handleShorten} className="space-y-4">
            
            {/* Primary Input Bar */}
            <div className="relative flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Link2 className="h-5 w-5 text-navy-400" />
                </div>
                <input
                  type="url"
                  value={urlInput}
                  onChange={e => setUrlInput(e.target.value)}
                  placeholder="Paste your long URL here (e.g. https://example.com/products/summer-sale)..."
                  required
                  className="w-full pl-11 pr-10 py-4 bg-navy-950/90 border border-navy-700 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-white placeholder-navy-500 rounded-2xl text-base outline-none transition-all"
                />
                {urlInput && (
                  <button
                    type="button"
                    onClick={() => setUrlInput('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-navy-500 hover:text-white"
                  >
                    ×
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white font-bold rounded-2xl text-base shadow-glow flex items-center justify-center gap-2 transition-all flex-shrink-0 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Shortening...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 text-amber-200 fill-amber-200" />
                    Shorten URL
                  </>
                )}
              </button>
            </div>

            {/* Toggle Advanced Options */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs text-navy-400 hover:text-brand-400 font-medium flex items-center gap-1.5 transition-colors"
              >
                <Settings2 className="w-3.5 h-3.5" />
                {showAdvanced ? 'Hide Advanced Options' : 'Custom Alias & Expiration Rules'}
              </button>

              <div className="flex items-center gap-4 text-xs text-navy-400">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Secure</span>
                <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-400" /> &lt;50ms Latency</span>
              </div>
            </div>

            {/* Advanced Drawer */}
            {showAdvanced && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-navy-800/80 animate-fadeIn">
                <div>
                  <label className="block text-xs font-medium text-navy-300 mb-1.5 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-brand-400" /> Custom Alias (Optional)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-navy-500 font-mono">short.ly/</span>
                    <input
                      type="text"
                      value={customAlias}
                      onChange={e => setCustomAlias(e.target.value)}
                      placeholder="summer-sale"
                      className="w-full pl-16 pr-3 py-2 bg-navy-950 border border-navy-700 text-xs text-white rounded-xl focus:border-brand-500 outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-navy-300 mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" /> Expiration Date
                  </label>
                  <input
                    type="datetime-local"
                    value={expirationDate}
                    onChange={e => setExpirationDate(e.target.value)}
                    className="w-full px-3 py-2 bg-navy-950 border border-navy-700 text-xs text-white rounded-xl focus:border-brand-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-navy-300 mb-1.5 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Link Title
                  </label>
                  <input
                    type="text"
                    value={linkTitle}
                    onChange={e => setLinkTitle(e.target.value)}
                    placeholder="Campaign Title"
                    className="w-full px-3 py-2 bg-navy-950 border border-navy-700 text-xs text-white rounded-xl focus:border-brand-500 outline-none"
                  />
                </div>
              </div>
            )}

          </form>

          {/* Error Notice */}
          {errorMessage && (
            <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Result Showcase Card */}
          {createdResult && (
            <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-950 border border-brand-500/40 shadow-glow animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                <div className="space-y-1 max-w-lg">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Short Link Created
                    </span>
                    {createdResult.expiresAt && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400">
                        Expires: {new Date(createdResult.expiresAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-bold text-white tracking-wide font-mono">
                    {createdResult.shortUrl}
                  </h4>
                  <p className="text-xs text-navy-400 truncate max-w-md">
                    Destination: {createdResult.originalUrl}
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleCopy}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition-all shadow-glow"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>

                  <button
                    onClick={() => setQrModalOpen(true)}
                    className="px-3.5 py-2.5 bg-navy-800 hover:bg-navy-700 text-navy-200 hover:text-white rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 border border-navy-700 transition-colors"
                    title="QR Code"
                  >
                    <QrCode className="w-4 h-4 text-amber-400" />
                    QR
                  </button>

                  <button
                    onClick={handleTestRedirect}
                    className="px-3.5 py-2.5 bg-navy-800 hover:bg-navy-700 text-navy-200 hover:text-white rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 border border-navy-700 transition-colors"
                    title="Test Redirect in New Tab"
                  >
                    <ArrowRight className="w-4 h-4 text-brand-400" />
                    Test ({testCount})
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>

      {/* QR Code Modal */}
      {createdResult && (
        <QrModal
          url={createdResult.shortUrl}
          shortCode={createdResult.shortCode}
          title={createdResult.title}
          isOpen={qrModalOpen}
          onClose={() => setQrModalOpen(false)}
        />
      )}
    </section>
  );
}
