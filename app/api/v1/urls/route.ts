import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
import { validateUrl, validateCustomAlias, formatUrl } from '@/lib/base62';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '0', 10);
  const size = parseInt(searchParams.get('size') || '20', 10);
  const filter = searchParams.get('filter') || 'all'; // all | active | expired
  const search = (searchParams.get('search') || '').toLowerCase();
  const sort = searchParams.get('sort') || 'createdAt,desc';

  let urls = store.getUrls();

  // Filtering
  if (filter === 'active') {
    urls = urls.filter(u => u.isActive && (!u.expiresAt || new Date(u.expiresAt) > new Date()));
  } else if (filter === 'expired') {
    urls = urls.filter(u => !u.isActive || (u.expiresAt && new Date(u.expiresAt) <= new Date()));
  }

  // Searching
  if (search) {
    urls = urls.filter(u =>
      u.shortCode.toLowerCase().includes(search) ||
      u.originalUrl.toLowerCase().includes(search) ||
      u.title.toLowerCase().includes(search)
    );
  }

  // Sorting
  if (sort === 'clicks,desc') {
    urls.sort((a, b) => b.clickCount - a.clickCount);
  } else if (sort === 'clicks,asc') {
    urls.sort((a, b) => a.clickCount - b.clickCount);
  } else if (sort === 'createdAt,asc') {
    urls.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  } else {
    urls.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  // Pagination
  const totalElements = urls.length;
  const totalPages = Math.ceil(totalElements / size) || 1;
  const start = page * size;
  const paginatedContent = urls.slice(start, start + size);

  return NextResponse.json({
    content: paginatedContent,
    page,
    size,
    totalElements,
    totalPages
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { originalUrl, customAlias, title, expiresAt, utmParameters } = body;

    // Validate URL
    const urlCheck = validateUrl(originalUrl);
    if (!urlCheck.valid) {
      return NextResponse.json(
        {
          timestamp: new Date().toISOString(),
          status: 400,
          error: 'INVALID_URL',
          message: urlCheck.error,
          path: '/api/v1/urls'
        },
        { status: 400 }
      );
    }

    // Validate Alias if provided
    if (customAlias) {
      const aliasCheck = validateCustomAlias(customAlias);
      if (!aliasCheck.valid) {
        return NextResponse.json(
          {
            timestamp: new Date().toISOString(),
            status: 400,
            error: 'INVALID_ALIAS',
            message: aliasCheck.error,
            path: '/api/v1/urls'
          },
          { status: 400 }
        );
      }
    }

    const formattedOriginal = formatUrl(originalUrl);
    const newUrl = store.createUrl({
      originalUrl: formattedOriginal,
      customAlias: customAlias || undefined,
      title: title || undefined,
      expiresAt: expiresAt || null,
      utmParameters: utmParameters || undefined
    });

    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = request.headers.get('x-forwarded-proto') || 'http';

    return NextResponse.json(
      {
        id: newUrl.id,
        shortCode: newUrl.shortCode,
        shortUrl: `${protocol}://${host}/${newUrl.shortCode}`,
        originalUrl: newUrl.originalUrl,
        title: newUrl.title,
        expiresAt: newUrl.expiresAt,
        createdAt: newUrl.createdAt,
        isActive: newUrl.isActive,
        clicks: newUrl.clickCount
      },
      { status: 201 }
    );
  } catch (err: any) {
    const isConflict = err.message?.includes('already in use');
    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        status: isConflict ? 409 : 500,
        error: isConflict ? 'ALIAS_TAKEN' : 'INTERNAL_ERROR',
        message: err.message || 'An error occurred creating the short URL',
        path: '/api/v1/urls'
      },
      { status: isConflict ? 409 : 500 }
    );
  }
}
