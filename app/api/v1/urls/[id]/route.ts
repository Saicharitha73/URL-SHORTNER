import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);
  const url = store.getUrlById(id);
  if (!url) {
    return NextResponse.json(
      { status: 404, error: 'NOT_FOUND', message: 'Short URL not found' },
      { status: 404 }
    );
  }

  const host = request.headers.get('host') || 'localhost:3000';
  const protocol = request.headers.get('x-forwarded-proto') || 'http';

  return NextResponse.json({
    id: url.id,
    shortCode: url.shortCode,
    shortUrl: `${protocol}://${host}/${url.shortCode}`,
    originalUrl: url.originalUrl,
    title: url.title,
    createdAt: url.createdAt,
    expiresAt: url.expiresAt,
    isActive: url.isActive,
    clicks: url.clickCount,
    uniqueVisitors: url.uniqueVisitorCount,
    lastClickAt: url.lastClickAt
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);
  try {
    const body = await request.json();
    const updated = store.updateUrl(id, body);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json(
      { status: 404, error: 'NOT_FOUND', message: err.message },
      { status: 404 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);
  const success = store.deleteUrl(id);
  if (!success) {
    return NextResponse.json(
      { status: 404, error: 'NOT_FOUND', message: 'Short URL not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
