import { notFound } from "next/navigation";
import { Box, Container, Typography } from "@mui/material";
import BlockRenderer from "@/components/BlockRenderer/BlockRenderer";
import { SetAlternates } from "@/components/LanguageSwitch/Alternates";
import Image from "next/image";
import classes from "./NewsPost.module.css";
import { getPostBySlug, parseBlocks, stripHtml } from "@/lib/content";
import { buildAlternates, metadataLanguages, newsHref } from "@/lib/urls";
import { routes } from "@/settings/routes";
import { fmtDate } from "@/functions/date";
import { getDictionary } from "@/i18n";

const postAlternates = (p, locale) => buildAlternates(locale, newsHref(locale, p.slug), p.translations, (t, lang) => newsHref(lang, t.slug));

export async function generateNewsPostMetadata(params, segment) {
  const { slug, locale } = await params;
  if (routes[locale]?.news !== segment) return {};

  const p = await getPostBySlug(slug, locale);
  if (!p) return {};

  const description = stripHtml(p.excerpt) || undefined;
  const image = p.featuredImage?.node;

  return {
    title: p.title,
    description,
    alternates: { canonical: newsHref(locale, p.slug), languages: metadataLanguages(postAlternates(p, locale)) },
    openGraph: {
      type: "article",
      title: p.title,
      description,
      publishedTime: p.date,
      modifiedTime: p.modified,
      images: image?.sourceUrl ? [{ url: image.sourceUrl, alt: image.altText || p.title }] : undefined,
    },
  };
}

export default async function NewsPost({ params, segment }) {
  const { slug, locale } = await params;
  // /hr/news/... and /en/novosti/... would otherwise render duplicates of the real post.
  if (routes[locale]?.news !== segment) notFound();

  const p = await getPostBySlug(slug, locale);
  if (!p) notFound();

  const blocks = parseBlocks(p.blocks);

  return (
    <Container className={classes.container}>
      <SetAlternates alternates={postAlternates(p, locale)} />

      <div className={classes.top}>
        <a href={newsHref(locale)} className={classes.back}>
          ← {getDictionary(locale).news.title}
        </a>
      </div>

      <Typography variant="h2" component="h1" className={classes.title} mb={3}>
        {p.title}
      </Typography>
      {p.date ? (
        <div className={classes.date}>
          {fmtDate(p.date, locale)}
        </div>
      ) : null}

      {p.featuredImage?.node?.sourceUrl ? (
        <Box className={classes.hero}>
          <Image
            src={p.featuredImage.node.sourceUrl}
            alt={p.featuredImage.node.altText || p.title}
            fill
            sizes="(min-width: 1200px) 1100px, 92vw"
            className={classes.heroImg}
            priority
          />
        </Box>
      ) : null}

      <div className={classes.content}>
        {blocks.map((block, i) => (
          <BlockRenderer block={block} locale={locale} key={block?.clientId || i} />
        ))}
      </div>
    </Container>
  );
}
