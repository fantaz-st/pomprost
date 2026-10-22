import { i18n } from "@/settings/i18n";
import { routes } from "@/settings/routes";
import site from "@/settings/site";

const LOCALE_PREFIX = new RegExp(`^/(${i18n.locales.join("|")})(/|$)`);
const NON_PAGE = /^([a-z][a-z0-9+.-]*:|#|\/\/)/i; // absolute URLs, mailto:, tel:, anchors
const WP_ASSET = /^\/(wp-content|wp-admin|wp-includes|wp-json)\//;

// Polylang omits the prefix for WP's default language (en); the front end always has one.
export function wpUriToHref(uri) {
  if (!uri) return `/${i18n.defaultLocale}`;
  if (NON_PAGE.test(uri)) return uri;

  const path = uri.startsWith("/") ? uri : `/${uri}`;
  const href = LOCALE_PREFIX.test(path) ? path : `/${i18n.wpDefaultLocale}${path}`;
  return href.length > 1 ? href.replace(/\/+$/, "") : href;
}

// Maps any href found in WP content to what the front end should link to:
// CMS page URLs and bare WP paths become locale-prefixed front-end paths, everything else is left alone.
export function contentHref(href) {
  // Only root-relative paths and http(s) URLs can point at WP; anchors, mailto:, tel: etc. pass through.
  if (!href || !/^(\/(?!\/)|https?:\/\/)/i.test(href)) return href;

  let url;
  try {
    url = new URL(href, `https://${site.cmsHosts[0]}`);
  } catch {
    return href;
  }

  if (!site.cmsHosts.includes(url.hostname)) return href;
  if (WP_ASSET.test(url.pathname)) return url.href;
  return `${wpUriToHref(url.pathname)}${url.search}${url.hash}`;
}

export function newsHref(locale, slug) {
  const base = `/${locale}/${routes[locale]?.news || routes[i18n.defaultLocale].news}`;
  return slug ? `${base}/${slug}` : base;
}

// { hr: href | null, en: href | null } for the current node and its WP translations.
export function buildAlternates(locale, selfHref, translations = [], toHref) {
  const alternates = Object.fromEntries(i18n.locales.map((l) => [l, null]));
  alternates[locale] = selfHref;

  for (const t of translations || []) {
    const lang = t?.language?.slug?.toLowerCase();
    if (lang && lang in alternates) alternates[lang] = toHref(t, lang);
  }

  return alternates;
}

// Metadata `alternates.languages` only takes locales that actually have a translation.
export function metadataLanguages(alternates) {
  return Object.fromEntries(Object.entries(alternates).filter(([, href]) => href));
}
