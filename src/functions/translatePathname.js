import { i18n } from "@/settings/i18n";
import { routes } from "@/settings/routes";

function getKeyBySegment(locale, segment) {
  const map = routes[locale] || {};
  const keys = Object.keys(map);
  for (let i = 0; i < keys.length; i += 1) {
    const k = keys[i];
    if (map[k] === segment) return k;
  }
  return null;
}

export function translatePathname(pathname, toLocale) {
  const segs = (pathname || "/").split("/").filter(Boolean);
  const fromLocale = segs[0];

  const hasLocalePrefix = i18n.locales.includes(fromLocale);

  const rest = hasLocalePrefix ? segs.slice(1) : segs;
  const first = rest[0] || "";

  let nextFirst = first;

  if (first) {
    const key = hasLocalePrefix ? getKeyBySegment(fromLocale, first) : null;
    if (key && routes[toLocale]?.[key]) {
      nextFirst = routes[toLocale][key];
    }
  }

  const nextSegs = [toLocale, ...(nextFirst ? [nextFirst] : []), ...rest.slice(1)];
  return `/${nextSegs.join("/")}`;
}