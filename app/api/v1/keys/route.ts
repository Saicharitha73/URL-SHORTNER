import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET() {
  const keys = store.getApiKeys();
  return NextResponse.json(keys);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, type } = body;
    if (!name || !name.trim()) {
      return NextResponse.json(
        { status: 400, error: 'BAD_REQUEST', message: 'API key name is required' },
        { status: 400 }
      );
    }

    const newKey = store.createApiKey(name.trim(), type === 'test' ? 'test' : 'live');
    return NextResponse.json(newKey, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { status: 500, error: 'SERVER_ERROR', message: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get('id') || '0', 10);
  if (!id) {
    return NextResponse.json(
      { status: 400, error: 'BAD_REQUEST', message: 'Key ID parameter required' },
      { status: 400 }
    );
  }

  const success = store.revokeApiKey(id);
  if (!success) {
    return NextResponse.json(
      { status: 404, error: 'NOT_FOUND', message: 'API key not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
