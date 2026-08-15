'use client';

import { QRCodeSVG } from 'qrcode.react';
import { X, Download, Copy, Check, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface QrModalProps {
  url: string;
  shortCode: string;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function QrModal({ url, shortCode, title, isOpen, onClose }: QrModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const svgElement = document.getElementById('shortly-qr-code');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = 400;
      canvas.height = 400;
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 400, 400);
        ctx.drawImage(img, 20, 20, 360, 360);
      }
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `shortly-${shortCode}-qr.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-navy-800 border border-navy-700 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-navy-400 hover:text-white rounded-full bg-navy-900/50 hover:bg-navy-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-white mb-1">QR Code Generator</h3>
          <p className="text-xs text-navy-400 font-mono truncate px-4">{title || `short.ly/${shortCode}`}</p>
        </div>

        {/* QR Code Container */}
        <div className="bg-white p-6 rounded-2xl flex justify-center items-center shadow-inner mb-6 mx-auto w-fit">
          <QRCodeSVG
            id="shortly-qr-code"
            value={url}
            size={200}
            level="H"
            includeMargin={true}
            fgColor="#0F172A"
          />
        </div>

        <div className="bg-navy-900 p-3 rounded-xl border border-navy-700/80 flex items-center justify-between gap-2 mb-6">
          <span className="text-xs font-mono text-brand-400 truncate">{url}</span>
          <button
            onClick={handleCopy}
            className="p-1.5 text-navy-300 hover:text-white hover:bg-navy-800 rounded-lg transition-colors flex-shrink-0"
            title="Copy URL"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-medium py-2.5 px-4 rounded-xl text-sm transition-all shadow-glow"
          >
            <Download className="w-4 h-4" />
            Download PNG
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-navy-700 hover:bg-navy-600 text-white font-medium py-2.5 px-4 rounded-xl text-sm transition-all border border-navy-600"
          >
            <ExternalLink className="w-4 h-4" />
            Test Redirect
          </a>
        </div>
      </div>
    </div>
  );
}
