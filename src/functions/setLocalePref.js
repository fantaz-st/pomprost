import { i18n } from "@/settings/i18n";

// Read by the proxy to pick a locale for unprefixed URLs.
export function setLocalePref(locale) {
  document.cookie = `${i18n.cookieName}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}
