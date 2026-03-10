import { i18n } from "@/settings/i18n";

export function setLocalePref(locale) {
  try {
    localStorage.setItem(i18n.cookieName, locale);
  } catch {}
  document.cookie = `${i18n.cookieName}=${locale}; path=/; max-age=31536000`;
}