import { Button, Container, Typography } from "@mui/material";
import classes from "./HomeWorkPackages.module.css";
import Link from "next/link";

const copy = {
  hr: {
    title: "Radni paketi",
    packages: [
      "Istraživačka infrastruktura",
      "Sigurnost i digitalizacija",
      "Okolišna održivost",
      "Društveno-ekonomska održivost",
      "Pomorska pismenost",
      "Institucionalni kapacitet",
    ],
    cta: "Više o radnim paketima",
    href: "/radni-paketi",
  },

  en: {
    title: "Work Packages",
    packages: [
      "Research Infrastructure",
      "Safety and Digitalisation",
      "Environmental Sustainability",
      "Socio-Economic Sustainability",
      "Maritime Literacy",
      "Institutional Capacity",
    ],
    cta: "Learn more about work packages",
    href: "/work-packages",
  },
};

export default function HomeWorkPackages({ locale = "hr" }) {
  const t = copy[locale] || copy.hr;

  return (
    <section className={classes.wrap}>
      <Container className={classes.container}>
        <Typography variant="h2">{t.title}</Typography>

        <div className={classes.grid}>
          {t.packages.map((title, i) => (
            <div key={i} className={classes.card}>
              <span className={classes.number}>{(i + 1).toString().padStart(2, "0")}</span>
              <Typography variant="h5">{title}</Typography>
            </div>
          ))}
        </div>
        <Link href={t.href} className={classes.ctaLink}>
          <Button component="span" variant="outlined" className={classes.cta}>
            {t.cta}
          </Button>
        </Link>
      </Container>
    </section>
  );
}
