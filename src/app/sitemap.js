import site from "@/settings/site";
import { i18n } from "@/settings/i18n";
import { wpFetch } from "@/lib/wpFetch";
import { ALL_NEWS, ALL_PAGES } from "@/lib/queries";
import { wpLangFromLocale } from "@/lib/lang";
import { newsHref, wpUriToHref } from "@/lib/urls";

export const revalidate = 3600;

const abs = (href) => new URL(href, site.url).toString();

async function localeEntries(locale) {
  const lang = wpLangFromLocale(locale);
  const [pages, posts] = await Promise.all([wpFetch(ALL_PAGES, { lang, first: 200 }), wpFetch(ALL_NEWS, { lang, first: 100 })]);

  return [
    { url: abs(`/${locale}`), changeFrequency: "weekly", priority: 1 },
    { url: abs(newsHref(locale)), changeFrequency: "weekly", priority: 0.8 },
    ...(pages?.pages?.nodes || []).map((p) => ({ url: abs(wpUriToHref(p.uri)), lastModified: p.modified })),
    ...(posts?.posts?.nodes || []).map((p) => ({ url: abs(newsHref(locale, p.slug)), lastModified: p.date })),
  ];
}

export default async function sitemap() {
  return (await Promise.all(i18n.locales.map(localeEntries))).flat();
}
