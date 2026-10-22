import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import NextButtonLink from "@/components/NextButtonLink/NextButtonLink";
import { getDictionary } from "@/i18n";
import classes from "./TextHero.module.css";

export default function TextHero({ locale = "hr" }) {
  const t = getDictionary(locale).hero;

  return (
    <section className={classes.hero}>
      <div className={classes.bg}>
        <div className={classes.glowA} />
        <div className={classes.glowB} />
        <div className={classes.grid} />
        <div className={classes.arcOne} />
        <div className={classes.arcTwo} />
      </div>

      <Container className={classes.container}>
        <div className={classes.layout}>
          <div className={classes.main}>
            <Typography component="p" className={classes.kicker}>
              {t.kicker}
            </Typography>

            <Typography variant="h1" className={classes.title}>
              {t.title}
            </Typography>

            <Typography component="h2" className={classes.subtitle}>
              {t.subtitle}
            </Typography>

            <Typography component="p" className={classes.text}>
              {t.text}
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} className={classes.actions}>
              <NextButtonLink href={t.cta.href} variant="contained" color="primary">
                {t.cta.label}
              </NextButtonLink>
            </Stack>
          </div>

          <Box className={classes.metaCard}>
            <div className={classes.metaItem}>
              <span className={classes.metaLabel}>{t.meta.durationLabel}</span>
              <span className={classes.metaValue}>{t.meta.duration}</span>
            </div>

            <div className={classes.metaItem}>
              <span className={classes.metaLabel}>{t.meta.budgetLabel}</span>
              <span className={classes.metaValue}>{t.meta.budget}</span>
            </div>

            <div className={classes.metaItem}>
              <span className={classes.metaLabel}>{t.meta.focusLabel}</span>
              <div className={classes.chips}>
                {t.meta.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" />
                ))}
              </div>
            </div>
          </Box>
        </div>
      </Container>
    </section>
  );
}
