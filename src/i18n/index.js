import { i18n } from "@/settings/i18n";
import hr from "./hr";
import en from "./en";

const dictionaries = { hr, en };

export function getDictionary(locale) {
  return dictionaries[locale] || dictionaries[i18n.defaultLocale];
}

// For not-found/error boundaries, which don't receive route params.
export function localeFromPathname(pathname) {
  const first = (pathname || "").split("/").filter(Boolean)[0];
  return i18n.locales.includes(first) ? first : i18n.defaultLocale;
}
