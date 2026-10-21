import { cache } from "react";
import { wpFetch } from "./wpFetch";
import { PAGE_BY_PATH, POST_BY_SLUG } from "./queries";
import { wpLangFromLocale } from "./lang";

// wpFetch is a POST, which Next does not memoize, so page + generateMetadata would query WP twice.
export const getPageByPath = cache(async (path) => {
  const data = await wpFetch(PAGE_BY_PATH, { path });
  return data?.page || null;
});

export const getPostBySlug = cache(async (slug, locale) => {
  const data = await wpFetch(POST_BY_SLUG, { slug, lang: wpLangFromLocale(locale) });
  return data?.posts?.nodes?.[0] || null;
});

export function parseBlocks(blocks) {
  if (Array.isArray(blocks)) return blocks;
  if (typeof blocks !== "string") return [];
  try {
    const parsed = JSON.parse(blocks);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export const stripHtml = (html = "") =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/&hellip;|\[&hellip;\]/g, "...")
    .replace(/&nbsp;/g, " ")
    .trim();
