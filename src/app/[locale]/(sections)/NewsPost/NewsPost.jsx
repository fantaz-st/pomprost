import { wpFetch } from "@/lib/wpFetch";
import { POST_BY_SLUG } from "@/lib/queries";
import { notFound } from "next/navigation";
import { Box, Container, Typography } from "@mui/material";
import BlockRenderer from "@/components/BlockRenderer/BlockRenderer";
import Image from "next/image";
import classes from "./NewsPost.module.css";
import { wpLangFromLocale } from "@/lib/lang";

export const revalidate = 300;

export default async function NewsPost({ params, backHref, backLabel }) {
  const { slug, locale } = await params;

  const data = await wpFetch(POST_BY_SLUG, { slug, lang: wpLangFromLocale(locale) });
  const p = data?.posts?.nodes?.[0];
  if (!p) return notFound();

  const blocks = Array.isArray(p.blocks) ? p.blocks : typeof p.blocks === "string" ? JSON.parse(p.blocks) : [];

  return (
    <Container className={classes.container}>
      <div className={classes.top}>
        <a href={backHref} className={classes.back}>
          ← {backLabel}
        </a>

        {/* {p.date ? <div className={classes.date}>{fmtDate(p.date)}</div> : null} */}
      </div>

      <Typography variant="h2" className={classes.title} data-aos="fade-up">
        {p.title}
      </Typography>

      {p.featuredImage?.node?.sourceUrl ? (
        <Box className={classes.hero} data-aos="fade-up" data-aos-delay="150">
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

      <div className={classes.content} data-aos="fade-up" data-aos-delay={p.featuredImage ? "220" : "120"}>
        {blocks.map((block, i) => (
          <BlockRenderer block={block} key={block?.clientId || i} />
        ))}
      </div>
    </Container>
  );
}
