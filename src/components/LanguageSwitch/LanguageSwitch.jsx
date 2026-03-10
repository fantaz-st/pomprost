"use client";

import { FormControl, MenuItem, Select } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { i18n } from "@/settings/i18n";
import { setLocalePref } from "@/functions/setLocalePref";
import { translatePathname } from "@/functions/translatePathname";

const NEWS_SEG = { en: "news", hr: "novosti" };

function normalizeSlashEnd(path) {
  return String(path || "").replace(/\/+$/, "/");
}

function hrefFromWpUri(uri, nextLocale) {
  const clean = normalizeSlashEnd(uri);
  if (!clean || clean === "/") return null;
  const prefixed = clean.startsWith("/hr/") || clean.startsWith("/en/");
  return prefixed ? clean : `/${nextLocale}${clean}`;
}

async function postJson(url, body) {
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    return await r.json();
  } catch {
    return null;
  }
}

export default function LanguageSwitch({ locale, size = "small", fullWidth = false }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const currentValue = locale || i18n.defaultLocale;

  const detectKind = () => {
    const segs = (pathname || "/").split("/").filter(Boolean);
    const hasLocale = i18n.locales.includes(segs[0]);
    const currentLocale = hasLocale ? segs[0] : currentValue;
    const rest = hasLocale ? segs.slice(1) : segs;

    if (!rest.length) return { type: "home" };

    if (rest[0] === "news" || rest[0] === "novosti") {
      if (rest.length >= 2) return { type: "post", slug: rest[1] };
      return { type: "newsIndex" };
    }

    return { type: "page", path: `/${currentLocale}/${rest.join("/")}/` };
  };

  const pushWithQuery = (href) => {
    const query = sp?.toString();
    router.push(query ? `${href}?${query}` : href);
  };

  const handleChange = async (e) => {
    const nextLocale = String(e.target.value || "");
    if (!nextLocale || nextLocale === currentValue) return;

    setLocalePref(nextLocale);

    const kind = detectKind();

    if (kind.type === "post") {
      const r = await postJson("/api/resolve-translation", {
        type: "post",
        slug: kind.slug,
        toLocale: nextLocale,
      });

      if (r?.ok && r?.slug) {
        pushWithQuery(`/${nextLocale}/${NEWS_SEG[nextLocale]}/${r.slug}/`);
        return;
      }
    }

    if (kind.type === "page") {
      const r = await postJson("/api/resolve-translation", {
        type: "page",
        path: kind.path,
        toLocale: nextLocale,
      });

      if (r?.ok && r?.uri) {
        const href = hrefFromWpUri(r.uri, nextLocale);
        if (href) {
          pushWithQuery(href);
          return;
        }
      }
    }

    pushWithQuery(translatePathname(pathname, nextLocale));
  };

  return (
    <FormControl size={size} fullWidth={fullWidth}>
      <Select
        value={currentValue}
        onChange={handleChange}
        variant="outlined"
        MenuProps={{ disableScrollLock: true }}
        sx={{ height: size === "small" ? 34 : 40, borderRadius: "999px", minWidth: 86 }}
      >
        <MenuItem value="hr">HR</MenuItem>
        <MenuItem value="en">EN</MenuItem>
      </Select>
    </FormControl>
  );
}
