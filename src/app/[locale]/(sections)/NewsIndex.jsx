import { wpFetch } from "@/lib/wpFetch";
import { ALL_NEWS } from "@/lib/queries";
import { Box, Container, Stack, Typography } from "@mui/material";
import { notFound } from "next/navigation";
import NewsGrid from "./components/NewsGrid/NewsGrid";
import NextButtonLink from "@/components/NextButtonLink/NextButtonLink";
import { wpLangFromLocale } from "@/lib/lang";
import { newsHref } from "@/lib/urls";
import { routes } from "@/settings/routes";
import { i18n } from "@/settings/i18n";
import { getDictionary } from "@/i18n";

const PAGE_SIZE = 24;

// /hr/news and /en/novosti would otherwise render duplicates of the real index.
const matchesLocale = (locale, segment) => routes[locale]?.news === segment;

export async function generateNewsIndexMetadata(params, searchParams, segment) {
  const { locale } = await params;
  if (!matchesLocale(locale, segment)) return {};
  const { after } = await searchParams;

  return {
    title: getDictionary(locale).news.title,
    alternates: {
      canonical: newsHref(locale),
      languages: Object.fromEntries(i18n.locales.map((l) => [l, newsHref(l)])),
    },
    // Cursor pages are reachable for visitors and crawlers, but only the first page should be indexed.
    ...(after ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function NewsIndex({ params, searchParams, segment }) {
  const { locale } = await params;
  if (!matchesLocale(locale, segment)) notFound();

  const { after } = await searchParams;
  const cursor = typeof after === "string" && after ? after : null;
  const t = getDictionary(locale).news;

  const data = await wpFetch(ALL_NEWS, {
    first: PAGE_SIZE,
    after: cursor,
    order: "DESC",
    lang: wpLangFromLocale(locale),
  });

  const posts = data?.posts?.nodes || [];
  const pageInfo = data?.posts?.pageInfo;
  if (cursor && !posts.length) notFound();

  return (
    <Box component="section" sx={{ pt: `calc(var(--header-h, 72px) + 48px)`, pb: { xs: 8, md: 10 } }}>
      <Container>
        <Typography variant="h2" component="h1" sx={{ mb: { xs: 2, md: 3 } }}>
          {t.title}
        </Typography>

        {posts.length ? (
          <NewsGrid posts={posts} locale={locale} />
        ) : (
          <Typography variant="body1" color="text.secondary">
            {t.empty}
          </Typography>
        )}

        {cursor || pageInfo?.hasNextPage ? (
          <Stack component="nav" direction="row" spacing={1.5} justifyContent="center" sx={{ mt: { xs: 4, md: 6 } }}>
            {cursor ? (
              <NextButtonLink href={newsHref(locale)} variant="outlined">
                ← {t.newer}
              </NextButtonLink>
            ) : null}
            {pageInfo?.hasNextPage ? (
              <NextButtonLink href={`${newsHref(locale)}?after=${encodeURIComponent(pageInfo.endCursor)}`} variant="outlined">
                {t.older} →
              </NextButtonLink>
            ) : null}
          </Stack>
        ) : null}
      </Container>
    </Box>
  );
}
