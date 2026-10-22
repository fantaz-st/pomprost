import { Container, Typography } from "@mui/material";
import NextButtonLink from "@/components/NextButtonLink/NextButtonLink";
import { getDictionary } from "@/i18n";
import classes from "./HomeWorkPackages.module.css";

export default function HomeWorkPackages({ locale = "hr" }) {
  const t = getDictionary(locale).workPackages;

  return (
    <section className={classes.wrap}>
      <Container className={classes.container}>
        <Typography variant="h2">{t.title}</Typography>

        <div className={classes.grid}>
          {t.packages.map((title, i) => (
            <div key={title} className={classes.card}>
              <span className={classes.number}>{(i + 1).toString().padStart(2, "0")}</span>
              <Typography variant="h5" component="h3">
                {title}
              </Typography>
            </div>
          ))}
        </div>
        <NextButtonLink href={t.cta.href} variant="outlined" className={`${classes.ctaLink} ${classes.cta}`}>
          {t.cta.label}
        </NextButtonLink>
      </Container>
    </section>
  );
}
