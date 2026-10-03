export type SiteLocale = 'en' | 'bm';

const translatedRoutes = new Set([
  '/',
  '/services/',
  '/services/automation/',
  '/services/ecommerce/',
]);

export function localizeHref(href: string, locale: SiteLocale): string {
  if (locale === 'en' || !href.startsWith('/')) return href;

  const hashIndex = href.indexOf('#');
  const path = hashIndex === -1 ? href : href.slice(0, hashIndex);
  const suffix = hashIndex === -1 ? '' : href.slice(hashIndex);
  const normalizedPath = path === '' ? '/' : path.endsWith('/') ? path : `${path}/`;

  return `/bm${normalizedPath === '/' ? '/' : normalizedPath}${suffix}`;
}

export function localeSwitchHref(pathname: string, target: SiteLocale): string {
  const isBmPath = pathname === '/bm' || pathname.startsWith('/bm/');
  const englishPath = isBmPath ? pathname.replace(/^\/bm(?=\/|$)/, '') || '/' : pathname;
  const normalizedPath = englishPath === '/' ? '/' : englishPath.endsWith('/') ? englishPath : `${englishPath}/`;

  if (target === 'bm') {
    return translatedRoutes.has(normalizedPath) ? `/bm${normalizedPath === '/' ? '/' : normalizedPath}` : '/bm/';
  }

  return translatedRoutes.has(normalizedPath) ? normalizedPath : '/';
}

export const isBmLocale = (locale: SiteLocale) => locale === 'bm';
