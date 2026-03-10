import Link from "next/link";
import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import classes from "./TextHero.module.css";

const content = {
  en: {
    kicker: "University of Split institutional project",
    title: "PomProST",
    subtitle: "Improvement of Maritime Traffic Sustainability in Split-Dalmatia County",
    text: "A research project focused on safer, greener and more efficient maritime traffic through digitalisation, environmental monitoring and evidence-based decision support.",
    primaryCta: {
      href: "/en/about-project",
      label: "About project",
    },
    secondaryCta: {
      href: "/en/project-activities",
      label: "Project activities",
    },
    meta: {
      duration: "1 Oct 2025 — 30 Sep 2029",
      budget: "€210,000",
      tags: ["Safety", "Digitalisation", "Environment", "Sustainability"],
    },
  },
  hr: {
    kicker: "Institucionalni projekt Sveučilišta u Splitu",
    title: "PomProST",
    subtitle: "Unaprjeđenje održivosti pomorskog prometa u Splitsko-dalmatinskoj županiji",
    text: "Istraživački projekt usmjeren na sigurniji, održiviji i učinkovitiji pomorski promet kroz digitalizaciju, praćenje okoliša i potporu donošenju odluka.",
    primaryCta: {
      href: "/hr/o-projektu",
      label: "O projektu",
    },
    secondaryCta: {
      href: "/hr/projektne-aktivnosti",
      label: "Projektne aktivnosti",
    },
    meta: {
      duration: "1. 10. 2025. — 30. 9. 2029.",
      budget: "210.000 €",
      tags: ["Sigurnost", "Digitalizacija", "Okoliš", "Održivost"],
    },
  },
};

export default function TextHero({ locale = "hr" }) {
  const t = content[locale] || content.hr;

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
              <Link href={t.primaryCta.href} className={classes.buttonLink}>
                <Button variant="contained" color="primary">
                  {t.primaryCta.label}
                </Button>
              </Link>

              <Link href={t.secondaryCta.href} className={classes.buttonLink}>
                <Button variant="outlined" color="primary">
                  {t.secondaryCta.label}
                </Button>
              </Link>
            </Stack>
          </div>

          <Box className={classes.metaCard}>
            <div className={classes.metaItem}>
              <span className={classes.metaLabel}>{locale === "hr" ? "Trajanje" : "Duration"}</span>
              <span className={classes.metaValue}>{t.meta.duration}</span>
            </div>

            <div className={classes.metaItem}>
              <span className={classes.metaLabel}>{locale === "hr" ? "Vrijednost" : "Budget"}</span>
              <span className={classes.metaValue}>{t.meta.budget}</span>
            </div>

            <div className={classes.metaItem}>
              <span className={classes.metaLabel}>{locale === "hr" ? "Fokus" : "Focus"}</span>
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
