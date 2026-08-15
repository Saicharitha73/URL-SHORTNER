import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shortly — Scalable Distributed URL Shortener & Analytics Platform',
  description: 'Transform long URLs into fast, trackable short links. Enterprise-grade reliability with Redis caching, PostgreSQL durability, and real-time click analytics.',
  keywords: ['URL Shortener', 'Link Management', 'Click Analytics', 'Distributed Systems', 'Shortly'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-navy-900 text-navy-50 min-h-screen antialiased selection:bg-brand-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
