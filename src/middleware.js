import { NextResponse } from "next/server";
import { i18n } from "./settings/i18n";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req) {
  const { pathname, search } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (i18n.locales.includes(first)) {
    return NextResponse.next();
  }

  const cookieLocale = req.cookies.get(i18n.cookieName)?.value;
  const locale = i18n.locales.includes(cookieLocale) ? cookieLocale : i18n.defaultLocale;

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  url.search = search;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};