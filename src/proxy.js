import { NextResponse } from "next/server";
import { i18n } from "./settings/i18n";

// Redirects unprefixed URLs to /<locale>/..., using the visitor's saved locale when there is one.
export function proxy(req) {
  const { pathname, search } = req.nextUrl;
  const first = pathname.split("/").filter(Boolean)[0];

  if (i18n.locales.includes(first)) {
    return NextResponse.next();
  }

  const cookieLocale = req.cookies.get(i18n.cookieName)?.value;
  const locale = i18n.locales.includes(cookieLocale) ? cookieLocale : i18n.defaultLocale;

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  url.search = search;

  return NextResponse.redirect(url);
}

// Skips Next internals, API routes and anything with a file extension (sitemap.xml, robots.txt, images...).
export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
