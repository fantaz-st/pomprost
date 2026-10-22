import site from "@/settings/site";
import classes from "./Footer.module.css";
import Link from "next/link";
import { Container, Typography } from "@mui/material";
import Image from "next/image";
import { getDictionary } from "@/i18n";

export default function Footer({ menuItems = [], locale }) {
  const t = getDictionary(locale).footer;
  const topLevelLinks = menuItems || [];
  const externalLinks = site.footer?.links || [];

  return (
    <footer className={classes.wrap}>
      <Container className={classes.container}>
        <div className={classes.topGrid}>
          <div className={classes.brand}>
            <Typography variant="h6" className={classes.brandTitle}>
              {site.name}
            </Typography>

            <Typography variant="body2" className={classes.brandText}>
              {t.summary}
            </Typography>
            <div className={classes.euLogos}>
              <Image src="/images/funded-eu-hr.svg" alt="Financira Europska Unija" width={200} height={80} sizes="(max-width: 900px) 45vw, 200px" className={classes.euLogo} />
              <Image src="/images/funded-eu-en.svg" alt="Funded by the European Union" width={200} height={80} sizes="(max-width: 900px) 45vw, 200px" className={classes.euLogo} />
            </div>
          </div>

          <div className={classes.col}>
            <Typography variant="overline" className={classes.colTitle}>
              {t.project}
            </Typography>

            <div className={classes.colLinks}>
              {topLevelLinks.map((item) => (
                <Link key={item.databaseId} href={item.uri} className={classes.link}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className={classes.col}>
            <Typography variant="overline" className={classes.colTitle}>
              {t.links}
            </Typography>

            <div className={classes.colLinks}>
              {externalLinks.map((l, i) => (
                <a key={i} href={l.href} className={classes.link} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={classes.bottom}>
          <Typography variant="body2" className={classes.copy}>
            © {new Date().getFullYear()} {t.owner}.{" "}
            {t.rights}
          </Typography>

          <div className={classes.bottomLinks}>
            <Link href={t.privacy.href} className={classes.bottomLink}>
              {t.privacy.label}
            </Link>
            <Link href={t.imprint.href} className={classes.bottomLink}>
              {t.imprint.label}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
