import classes from "./HomeNews.module.css";
import { Box, Container, Stack, Typography, Button } from "@mui/material";
import Link from "next/link";
import PostCard from "@/components/PostCard/PostCard";

const HomeNews = ({ data, locale }) => {
  const newsBase = locale === "hr" ? "/hr/novosti" : "/en/news";
  const posts = data?.posts?.nodes || [];

  return (
    <section className={classes.wrap}>
      <Container className={classes.container}>
        <Stack direction={{ xs: "column", md: "row" }} alignItems={{ xs: "flex-start", md: "flex-end" }} justifyContent="space-between" className={classes.top} data-aos="fade-up">
          <Box className={classes.heading}>
            <Typography variant="h2" className={classes.title}>
              {locale === "hr" ? "Najnovije vijesti" : "Latest news"}
            </Typography>
          </Box>

          <Link href={newsBase} className={classes.ctaLink}>
            <Button component="span" variant="outlined" className={classes.ctaBtn}>
              {locale === "hr" ? "Sve novosti" : "All news"}
            </Button>
          </Link>
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
};

export default HomeNews;
