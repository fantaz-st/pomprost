import { notFound, redirect } from "next/navigation";
import { Box, Container, Typography } from "@mui/material";
import BlockRenderer from "@/components/BlockRenderer/BlockRenderer";
import { SetAlternates } from "@/components/LanguageSwitch/Alternates";
import Image from "next/image";
import Link from "next/link";
import classes from "./page.module.css";
import { fmtDate } from "@/functions/date";
import { getPageByPath, getPostBySlug, parseBlocks } from "@/lib/content";
import { buildAlternates, metadataLanguages, newsHref, wpUriToHref } from "@/lib/urls";
import { getDictionary } from "@/i18n";

import HomeIcon from "@mui/icons-material/Home";

const safeDecode = (s) => {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
};

async function loadPage(params) {
  const { slug, locale } = await params;
  const segments = Array.isArray(slug) ? slug : [slug].filter(Boolean);
  const page = await getPageByPath(`/${segments.join("/")}/`);
  if (!page) return { locale, segments, page: null };

  // WP resolves loose paths (/o-projektu/, or an hr slug under /en/), so compare against the canonical URL.
  const pageLocale = page.language?.slug?.toLowerCase() || locale;
  const canonical = wpUriToHref(page.uri);
  const requested = `/${locale}/${segments.join("/")}`;
  const alternates = buildAlternates(pageLocale, canonical, page.translations, (t) => wpUriToHref(t.uri));

  return { locale, page, canonical, isCanonical: safeDecode(canonical) === safeDecode(requested), alternates };
}

export async function generateMetadata({ params }) {
  const { page, canonical, alternates } = await loadPage(params);
  if (!page) return {};

  const image = page.featuredImage?.node;
  return {
    title: page.title,
    alternates: { canonical, languages: metadataLanguages(alternates) },
    openGraph: {
      title: page.title,
      modifiedTime: page.modified,
      images: image?.sourceUrl ? [{ url: image.sourceUrl, alt: image.altText || page.title }] : undefined,
    },
  };
}

export default async function WpPage({ params }) {
  const { locale, segments, page, canonical, isCanonical, alternates } = await loadPage(params);

  if (!page) {
    // WP links posts as /hr/<slug>/ (no news segment), e.g. when an editor links one from content.
    const post = segments.length === 1 ? await getPostBySlug(segments[0], locale) : null;
    if (post) redirect(newsHref(locale, post.slug));
    notFound();
  }
  if (!isCanonical) redirect(canonical);

  const t = getDictionary(locale).page;
  const blocks = parseBlocks(page.blocks);

  const ancestors = page.ancestors?.nodes || [];
  const children = page.children?.nodes || [];
  const hasHero = !!page.featuredImage?.node?.sourceUrl;

  return (
    <Box component="article" className={classes.article}>
      <SetAlternates alternates={alternates} />

      <Container className={classes.container}>
        <header className={classes.header}>
          <nav className={classes.breadcrumbs} aria-label={t.breadcrumb}>
            <Link href={`/${locale}`} className={classes.crumb} aria-label={t.home}>
              <HomeIcon />
            </Link>

            {ancestors
              .slice()
              .reverse()
              .map((a) => (
                <span key={a.id} className={classes.crumbRow}>
                  <span className={classes.sep}>/</span>
                  <Link href={wpUriToHref(a.uri)} className={classes.crumb}>
                    {a.title}
                  </Link>
                </span>
              ))}

            <span className={classes.crumbRow}>
              <span className={classes.sep}>/</span>
              <span className={classes.crumbCurrent}>{page.title}</span>
            </span>
          </nav>

          <Typography variant="h2" component="h1" className={classes.title}>
            {page.title}
          </Typography>

          {page.modified ? (
            <div className={classes.meta}>
              <span className={classes.metaText}>
                {t.updated} {fmtDate(page.modified, locale)}
              </span>
            </div>
          ) : null}
        </header>

        {hasHero ? (
          <div className={classes.heroMedia}>
            <Image
              src={page.featuredImage.node.sourceUrl}
              alt={page.featuredImage.node.altText || page.title}
              fill
              priority
              sizes="(min-width: 1200px) 1100px, 92vw"
              className={classes.heroImage}
            />
          </div>
        ) : null}

        <div className={classes.content}>
          {blocks.map((block, i) => (
            <BlockRenderer block={block} locale={locale} key={block?.clientId || i} />
          ))}
        </div>

        {children.length ? (
          <section className={classes.subpages} data-aos="fade-up">
            <Typography variant="h6" component="h2" className={classes.subpagesTitle}>
              {t.subpages}
            </Typography>

            <div className={classes.subpagesGrid}>
              {children.map((c) => (
                <Link key={c.id} href={wpUriToHref(c.uri)} className={classes.subpageCard}>
                  <span className={classes.subpageLabel}>{c.title}</span>
                  <span className={classes.subpageArrow}>→</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </Box>
  );
}
