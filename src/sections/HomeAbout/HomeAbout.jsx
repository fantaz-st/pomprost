import { Container, Typography } from "@mui/material";
import NextButtonLink from "@/components/NextButtonLink/NextButtonLink";
import { getDictionary } from "@/i18n";
import classes from "./HomeAbout.module.css";

export default function HomeAbout({ locale = "hr" }) {
  const t = getDictionary(locale).about;

  return (
    <section className={classes.wrap}>
      <Container className={classes.container}>
        <Typography variant="h2" className={classes.title}>
          {t.title}
        </Typography>

        <div className={classes.text}>
          {t.paragraphs.map((p) => (
            <Typography key={p} variant="body1" color="text.secondary" mb={2}>
              {p}
            </Typography>
          ))}
        </div>

        <NextButtonLink href={t.cta.href} variant="outlined" className={`${classes.ctaLink} ${classes.cta}`}>
          {t.cta.label}
        </NextButtonLink>
      </Container>
    </section>
  );
}
