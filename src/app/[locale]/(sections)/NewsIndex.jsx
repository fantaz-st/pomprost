import { wpFetch } from "@/lib/wpFetch";
import { ALL_NEWS } from "@/lib/queries";
import { Box, Container, Typography } from "@mui/material";
import { notFound } from "next/navigation";
import NewsGrid from "./components/NewsGrid/NewsGrid";
import { wpLangFromLocale } from "@/lib/lang";
import { newsHref } from "@/lib/urls";
import { routes } from "@/settings/routes";
import { i18n } from "@/settings/i18n";

const titles = { hr: "Novosti", en: "News" };

// /hr/news and /en/novosti would otherwise render duplicates of the real index.
const matchesLocale = (locale, segment) => routes[locale]?.news === segment;

export async function generateNewsIndexMetadata(params, segment) {
  const { locale } = await params;
  if (!matchesLocale(locale, segment)) return {};

  return {
    title: titles[locale] || titles.hr,
    alternates: {
      canonical: newsHref(locale),
      languages: Object.fromEntries(i18n.locales.map((l) => [l, newsHref(l)])),
    },
  };
}

export default async function NewsIndex({ params, segment }) {
  const { locale } = await params;
  if (!matchesLocale(locale, segment)) notFound();

  const data = await wpFetch(ALL_NEWS, {
    first: 24,
    after: null,
    search: null,
    category: null,
    tag: null,
    year: null,
    month: null,
    order: "DESC",
    lang: wpLangFromLocale(locale),
  });

  const posts = data?.posts?.nodes || [];

  return (
    <Box component="section" sx={{ pt: `calc(var(--header-h, 72px) + 48px)`, pb: { xs: 8, md: 10 } }}>
      <Container>
        <Typography variant="h2" component="h1" sx={{ mb: { xs: 2, md: 3 } }}>
          {titles[locale] || titles.hr}
        </Typography>
        <NewsGrid posts={posts} locale={locale} />
      </Container>
    </Box>
  );
}
