export interface UtmParameters {
  source?: string;
  medium?: string;
  campaign?: string;
}

export interface UrlItem {
  id: number;
  userId: number;
  shortCode: string;
  originalUrl: string;
  title: string;
  campaignId?: number;
  expiresAt: string | null;
  isActive: boolean;
  clickCount: number;
  uniqueVisitorCount: number;
  lastClickAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  utmParameters?: UtmParameters;
}

export interface ParsedUserAgent {
  deviceType: 'Mobile' | 'Desktop' | 'Tablet' | 'Other';
  browser: string;
  operatingSystem: string;
}

export interface AnalyticsEvent {
  id: number;
  eventId: string;
  urlId: number;
  timestamp: string;
  ipHash: string;
  country: string;
  city: string;
  deviceType: 'Mobile' | 'Desktop' | 'Tablet' | 'Other';
  browser: string;
  operatingSystem: string;
  referrer: string;
  isUniqueVisitor: boolean;
  createdAt: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  lastLoginAt: string;
}

export interface ApiKey {
  id: number;
  userId: number;
  key: string;
  name: string;
  type: 'live' | 'test';
  createdAt: string;
  lastUsedAt: string | null;
}

export interface Campaign {
  id: number;
  userId: number;
  name: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  createdAt: string;
}

export interface TimeSeriesPoint {
  date: string;
  clicks: number;
  uniqueVisitors: number;
}

export interface DistributionMetric {
  name: string;
  code?: string;
  clicks: number;
  percentage: number;
}

export interface AnalyticsSummary {
  totalClicks: number;
  uniqueVisitors: number;
  avgClicksPerDay: number;
  timeSeries: TimeSeriesPoint[];
  countries: DistributionMetric[];
  devices: DistributionMetric[];
  browsers: DistributionMetric[];
  operatingSystems: DistributionMetric[];
  referrers: DistributionMetric[];
}
