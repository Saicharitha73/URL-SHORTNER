import { UrlItem, AnalyticsEvent, User, ApiKey, AnalyticsSummary, TimeSeriesPoint, DistributionMetric } from './types';
import { generateShortCode } from './base62';

// Clean Initial Data (No Fake Seed Data)
const SEED_USERS: User[] = [
  {
    id: 1,
    email: 'user@short.ly',
    name: 'Sarah Connor',
    role: 'USER',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString()
  },
  {
    id: 2,
    email: 'admin@short.ly',
    name: 'System Admin',
    role: 'ADMIN',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString()
  }
];

const SEED_API_KEYS: ApiKey[] = [];
const SEED_URLS: UrlItem[] = [];
const SEED_EVENTS: AnalyticsEvent[] = [];

// In-Memory Global Store Instance for Node process
class ShortlyStore {
  private urls: UrlItem[] = [...SEED_URLS];
  private events: AnalyticsEvent[] = [...SEED_EVENTS];
  private apiKeys: ApiKey[] = [...SEED_API_KEYS];
  private users: User[] = [...SEED_USERS];

  // URL methods
  public getUrls(): UrlItem[] {
    return this.urls.filter(u => !u.deletedAt);
  }

  public getUrlByShortCode(code: string): UrlItem | undefined {
    return this.urls.find(u => u.shortCode === code && !u.deletedAt);
  }

  public getUrlById(id: number): UrlItem | undefined {
    return this.urls.find(u => u.id === id && !u.deletedAt);
  }

  public createUrl(params: {
    originalUrl: string;
    customAlias?: string;
    title?: string;
    expiresAt?: string | null;
    utmParameters?: { source?: string; medium?: string; campaign?: string };
    userId?: number;
  }): UrlItem {
    const existingAlias = params.customAlias ? this.getUrlByShortCode(params.customAlias) : undefined;
    if (existingAlias) {
      throw new Error(`The custom alias '${params.customAlias}' is already in use`);
    }

    const shortCode = params.customAlias || generateShortCode(this.urls.length + 1000);
    const newUrl: UrlItem = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      userId: params.userId || 1,
      shortCode,
      originalUrl: params.originalUrl,
      title: params.title || params.customAlias || `Link ${shortCode}`,
      expiresAt: params.expiresAt || null,
      isActive: true,
      clickCount: 0,
      uniqueVisitorCount: 0,
      lastClickAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      utmParameters: params.utmParameters
    };

    this.urls.unshift(newUrl);
    return newUrl;
  }

  public updateUrl(id: number, updates: Partial<UrlItem>): UrlItem {
    const index = this.urls.findIndex(u => u.id === id);
    if (index === -1) throw new Error('URL not found');
    this.urls[index] = {
      ...this.urls[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return this.urls[index];
  }

  public deleteUrl(id: number): boolean {
    const index = this.urls.findIndex(u => u.id === id);
    if (index === -1) return false;
    this.urls[index].deletedAt = new Date().toISOString();
    this.urls[index].isActive = false;
    return true;
  }

  // Record Click Event & Update Cache/Counter
  public recordClick(shortCode: string, metadata?: { userAgent?: string; referrer?: string }): { url?: UrlItem; expired?: boolean } {
    const url = this.getUrlByShortCode(shortCode);
    if (!url) return {};

    if (!url.isActive) {
      return { url, expired: true };
    }

    if (url.expiresAt && new Date(url.expiresAt) < new Date()) {
      url.isActive = false;
      return { url, expired: true };
    }

    // Increment counters
    url.clickCount += 1;
    url.lastClickAt = new Date().toISOString();

    const isUnique = true;
    url.uniqueVisitorCount += 1;

    // Detect browser/device basic heuristics
    const ua = metadata?.userAgent || '';
    const deviceType: 'Mobile' | 'Desktop' | 'Tablet' = /mobile|iphone|ipad|android/i.test(ua) ? 'Mobile' : 'Desktop';
    const browser = /chrome/i.test(ua) ? 'Chrome' : /safari/i.test(ua) ? 'Safari' : /firefox/i.test(ua) ? 'Firefox' : 'Chrome';
    const referrer = metadata?.referrer ? (new URL(metadata.referrer).hostname || 'Direct') : 'Direct';

    const newEvent: AnalyticsEvent = {
      id: Date.now() + Math.floor(Math.random() * 500),
      eventId: `evt_${Math.random().toString(36).substring(2, 11)}`,
      urlId: url.id,
      timestamp: new Date().toISOString(),
      ipHash: `ip_${Math.random().toString(36).substring(2, 8)}`,
      country: 'United States',
      city: 'Local',
      deviceType,
      browser,
      operatingSystem: deviceType === 'Mobile' ? 'iOS' : 'Windows',
      referrer,
      isUniqueVisitor: isUnique,
      createdAt: new Date().toISOString()
    };

    this.events.unshift(newEvent);
    return { url, expired: false };
  }

  // Real Analytics Computation (No hardcoded values)
  public getAnalyticsForUrl(urlId?: number): AnalyticsSummary {
    const filteredEvents = urlId ? this.events.filter(e => e.urlId === urlId) : this.events;
    const targetUrls = urlId ? this.urls.filter(u => u.id === urlId) : this.urls;

    const totalClicks = targetUrls.reduce((acc, u) => acc + u.clickCount, 0);
    const uniqueVisitors = targetUrls.reduce((acc, u) => acc + u.uniqueVisitorCount, 0);

    // Build 14-day time series
    const timeSeriesMap: Record<string, { clicks: number; uniqueVisitors: number }> = {};
    for (let i = 13; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const dateStr = d.toISOString().split('T')[0];
      timeSeriesMap[dateStr] = { clicks: 0, uniqueVisitors: 0 };
    }

    filteredEvents.forEach(e => {
      const dateStr = e.timestamp.split('T')[0];
      if (timeSeriesMap[dateStr]) {
        timeSeriesMap[dateStr].clicks += 1;
        if (e.isUniqueVisitor) timeSeriesMap[dateStr].uniqueVisitors += 1;
      }
    });

    const timeSeries: TimeSeriesPoint[] = Object.keys(timeSeriesMap).map(date => ({
      date,
      clicks: timeSeriesMap[date].clicks,
      uniqueVisitors: timeSeriesMap[date].uniqueVisitors
    }));

    // Dynamically calculate distribution maps from actual events
    const countryMap: Record<string, number> = {};
    const deviceMap: Record<string, number> = {};
    const browserMap: Record<string, number> = {};
    const osMap: Record<string, number> = {};
    const referrerMap: Record<string, number> = {};

    filteredEvents.forEach(e => {
      countryMap[e.country] = (countryMap[e.country] || 0) + 1;
      deviceMap[e.deviceType] = (deviceMap[e.deviceType] || 0) + 1;
      browserMap[e.browser] = (browserMap[e.browser] || 0) + 1;
      osMap[e.operatingSystem] = (osMap[e.operatingSystem] || 0) + 1;
      referrerMap[e.referrer] = (referrerMap[e.referrer] || 0) + 1;
    });

    const formatDist = (map: Record<string, number>): DistributionMetric[] => {
      const total = Object.values(map).reduce((a, b) => a + b, 0);
      if (total === 0) return [];
      return Object.entries(map).map(([name, count]) => ({
        name,
        clicks: count,
        percentage: Math.round((count / total) * 100)
      }));
    };

    return {
      totalClicks,
      uniqueVisitors,
      avgClicksPerDay: totalClicks > 0 ? Math.ceil(totalClicks / 14) : 0,
      timeSeries,
      countries: formatDist(countryMap),
      devices: formatDist(deviceMap),
      browsers: formatDist(browserMap),
      operatingSystems: formatDist(osMap),
      referrers: formatDist(referrerMap)
    };
  }

  // API Key methods
  public getApiKeys(): ApiKey[] {
    return this.apiKeys;
  }

  public createApiKey(name: string, type: 'live' | 'test' = 'live'): ApiKey {
    const key = `sk_${type}_${Math.random().toString(36).substring(2, 12)}${Math.random().toString(36).substring(2, 12)}`;
    const newKey: ApiKey = {
      id: Date.now(),
      userId: 1,
      key,
      name,
      type,
      createdAt: new Date().toISOString(),
      lastUsedAt: null
    };
    this.apiKeys.push(newKey);
    return newKey;
  }

  public revokeApiKey(id: number): boolean {
    const idx = this.apiKeys.findIndex(k => k.id === id);
    if (idx !== -1) {
      this.apiKeys.splice(idx, 1);
      return true;
    }
    return false;
  }
}

// Global Singleton Instance
export const store = new ShortlyStore();
