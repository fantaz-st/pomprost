import classes from "./HomeNews.module.css";
import { Box, Container, Stack, Typography } from "@mui/material";
import PostCard from "@/components/PostCard/PostCard";
import NextButtonLink from "@/components/NextButtonLink/NextButtonLink";
import { newsHref } from "@/lib/urls";
import { getDictionary } from "@/i18n";

const HomeNews = ({ data, locale }) => {
  const t = getDictionary(locale).news;
  const posts = data?.posts?.nodes || [];

  return (
    <section className={classes.wrap}>
      <Container className={classes.container}>
        <Stack direction={{ xs: "column", md: "row" }} alignItems={{ xs: "flex-start", md: "flex-end" }} justifyContent="space-between" className={classes.top} data-aos="fade-up">
          <Box className={classes.heading}>
            <Typography variant="h2" className={classes.title}>
              {t.latest}
            </Typography>
          </Box>

          <NextButtonLink href={newsHref(locale)} variant="outlined" className={`${classes.ctaLink} ${classes.ctaBtn}`}>
            {t.all}
          </NextButtonLink>
        </Stack>

        {posts.length > 0 && (
          <div className={classes.list}>
            {posts.slice(0, 4).map((p) => (
              <div key={p.id || p.slug} className={classes.item} data-aos="fade-up" data-aos-delay="150">
                <PostCard slug={p.slug} title={p.title} date={p.date} excerpt={p.excerpt} locale={locale} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export default HomeNews;
