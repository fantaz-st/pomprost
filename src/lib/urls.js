import { i18n } from "@/settings/i18n";
import { routes } from "@/settings/routes";

const LOCALE_PREFIX = new RegExp(`^/(${i18n.locales.join("|")})(/|$)`);
const ABSOLUTE = /^([a-z]+:|#)/i;

// Polylang omits the prefix for WP's default language (en), the front end always has one.
export function wpUriToHref(uri, locale) {
  if (!uri) return `/${locale}`;
  if (ABSOLUTE.test(uri)) return uri;

  const path = uri.startsWith("/") ? uri : `/${uri}`;
  const href = LOCALE_PREFIX.test(path) ? path : `/${locale}${path}`;
  return href.length > 1 ? href.replace(/\/+$/, "") : href;
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
