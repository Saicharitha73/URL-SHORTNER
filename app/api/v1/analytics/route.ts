import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const urlIdParam = searchParams.get('urlId');
  const urlId = urlIdParam ? parseInt(urlIdParam, 10) : undefined;

  const analytics = store.getAnalyticsForUrl(urlId);

  return NextResponse.json(analytics);
}
