import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> | { shortCode: string } }
) {
  const resolvedParams = await params;
  const shortCode = resolvedParams.shortCode;

  // Return 404 for system assets / reserved words in catch-all route handler
  const reserved = ['api', 'dashboard', 'auth', 'favicon.ico', '_next', 'static', 'robots.txt'];
  if (reserved.includes(shortCode.toLowerCase())) {
    return new NextResponse(null, { status: 404 });
  }

  const userAgent = request.headers.get('user-agent') || undefined;
  const referrer = request.headers.get('referer') || undefined;

  const result = store.recordClick(shortCode, { userAgent, referrer });

  if (!result.url) {
    // 404 Not Found
    return new NextResponse(
      `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>404 - Short Link Not Found | Shortly</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-slate-900 text-white min-h-screen flex items-center justify-center p-4">
        <div class="max-w-md text-center bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl">
          <div class="w-16 h-16 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">404</div>
          <h1 class="text-2xl font-bold mb-2">Short Link Not Found</h1>
          <p class="text-slate-400 mb-6">The short link <code class="text-orange-400 bg-slate-900 px-2 py-1 rounded">short.ly/${shortCode}</code> does not exist or has been removed.</p>
          <a href="/" class="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2.5 rounded-xl transition-all">Return to Home</a>
        </div>
      </body>
      </html>`,
      {
        status: 404,
        headers: { 'content-type': 'text/html' }
      }
    );
  }

  if (result.expired) {
    // 410 Gone
    return new NextResponse(
      `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>410 - Link Expired | Shortly</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-slate-900 text-white min-h-screen flex items-center justify-center p-4">
        <div class="max-w-md text-center bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl">
          <div class="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">410</div>
          <h1 class="text-2xl font-bold mb-2">Link Expired</h1>
          <p class="text-slate-400 mb-6">The short link <code class="text-orange-400 bg-slate-900 px-2 py-1 rounded">${result.url.shortCode}</code> has reached its expiration date and is no longer active.</p>
          <a href="/" class="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2.5 rounded-xl transition-all">Create New Link</a>
        </div>
      </body>
      </html>`,
      {
        status: 410,
        headers: { 'content-type': 'text/html' }
      }
    );
  }

  // 302 Found Redirect
  const response = NextResponse.redirect(result.url.originalUrl, { status: 302 });
  response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  response.headers.set('X-Request-ID', `req_${Math.random().toString(36).substring(2, 10)}`);
  return response;
}
