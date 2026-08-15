const BASE62_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const RESERVED_WORDS = new Set([
  'api', 'admin', 'login', 'register', 'dashboard', 'health', 'metrics',
  'docs', 'swagger', 'static', 'assets', 'public', 'private', 'internal',
  'system', 'auth', 'settings', 'profile', 'analytics', 'links', 'pricing'
]);

export function encodeBase62(num: number): string {
  if (num === 0) return BASE62_CHARS[0];
  let result = '';
  let n = Math.abs(num);
  while (n > 0) {
    result = BASE62_CHARS[n % 62] + result;
    n = Math.floor(n / 62);
  }
  return result;
}

export function generateShortCode(idSeed?: number): string {
  const seed = idSeed ?? (Date.now() % 1000000000) + Math.floor(Math.random() * 10000);
  let code = encodeBase62(seed);
  // Ensure short code is at least 6 characters
  while (code.length < 6) {
    const randChar = BASE62_CHARS[Math.floor(Math.random() * 62)];
    code = randChar + code;
  }
  return code.slice(0, 7);
}

export function validateCustomAlias(alias: string): { valid: boolean; error?: string } {
  if (!alias) return { valid: true };
  if (alias.length < 3 || alias.length > 30) {
    return { valid: false, error: 'Custom alias must be between 3 and 30 characters' };
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(alias)) {
    return { valid: false, error: 'Custom alias can only contain letters, numbers, hyphens, and underscores' };
  }
  if (RESERVED_WORDS.has(alias.toLowerCase())) {
    return { valid: false, error: `The custom alias '${alias}' is a reserved system keyword` };
  }
  return { valid: true };
}

export function validateUrl(urlStr: string): { valid: boolean; error?: string } {
  if (!urlStr || !urlStr.trim()) {
    return { valid: false, error: 'URL cannot be empty' };
  }
  if (urlStr.length > 2048) {
    return { valid: false, error: 'URL exceeds maximum length of 2048 characters' };
  }
  const lower = urlStr.trim().toLowerCase();
  if (lower.startsWith('javascript:') || lower.startsWith('file:') || lower.startsWith('data:') || lower.startsWith('mailto:')) {
    return { valid: false, error: 'Unsupported or unsafe URL protocol' };
  }
  try {
    const formatted = urlStr.startsWith('http://') || urlStr.startsWith('https://') ? urlStr : `https://${urlStr}`;
    const parsed = new URL(formatted);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return { valid: false, error: 'URL must start with http:// or https://' };
    }
    if (!parsed.hostname || !parsed.hostname.includes('.')) {
      return { valid: false, error: 'URL must contain a valid domain name' };
    }
    return { valid: true };
  } catch {
    return { valid: false, error: 'The provided URL is syntactically invalid' };
  }
}

export function formatUrl(urlStr: string): string {
  const trimmed = urlStr.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
}
