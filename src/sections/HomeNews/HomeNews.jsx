import classes from "./HomeNews.module.css";
import { Box, Container, Stack, Typography, Button, Grid } from "@mui/material";
import Link from "next/link";
import PostCard from "@/components/PostCard/PostCard";
import site from "@/settings/site";

const HomeNews = ({ data, locale }) => {
  const newsBase = locale === "hr" ? "/hr/novosti" : "/en/news";
  const posts = data?.posts?.nodes || [];
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1, 4);

  return (
    <section className={classes.wrap}>
      <Container className={classes.container}>
        <Stack direction={{ xs: "column", md: "row" }} alignItems={{ xs: "flex-start", md: "flex-end" }} justifyContent="space-between" className={classes.top} data-aos="fade-up">
          <Box className={classes.heading}>
            <Typography variant="h2" className={classes.title}>
              {locale === "hr" ? "Najnovije vijesti" : "Latest news"}
            </Typography>

            {/* <Typography color="text.secondary" className={classes.subtitle}>
              {locale === "hr" ? `Friške vijesti sa ${site.name} projekta` : `Fresh updates from the ${site.name} project`}
            </Typography> */}
          </Box>

          <Link href={newsBase} className={classes.ctaLink}>
            <Button component="span" variant="outlined" className={classes.ctaBtn}>
              {locale === "hr" ? "Sve novosti" : "All news"}
            </Button>
          </Link>
        </Stack>

        {featuredPost && (
          <div className={classes.featured} data-aos="fade-up" data-aos-delay="150">
            <PostCard slug={featuredPost.slug} title={featuredPost.title} date={featuredPost.date} excerpt={featuredPost.excerpt} locale={locale} featured />
          </div>
        )}

        {otherPosts.length > 0 && (
          <Grid container spacing={{ xs: 2, md: 3 }} className={classes.grid} data-aos="fade-up" data-aos-delay="250">
            {otherPosts.map((p) => (
              <Grid key={p.id || p.slug} size={{ xs: 12, md: 4 }} className={classes.gridItem}>
                <PostCard slug={p.slug} title={p.title} date={p.date} excerpt={p.excerpt} locale={locale} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </section>
  );
};

export default HomeNews;
