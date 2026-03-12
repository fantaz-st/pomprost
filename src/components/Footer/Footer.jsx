import site from "@/settings/site";
import classes from "./Footer.module.css";
import Link from "next/link";
import { Container, Typography } from "@mui/material";
import Image from "next/image";

export default function Footer({ menuItems = [], locale }) {
  const topLevelLinks = menuItems || [];
  const externalLinks = site.footer?.links;

  return (
    <footer className={classes.wrap}>
      <Container className={classes.container}>
        <div className={classes.topGrid}>
          <div className={classes.brand}>
            <Typography variant="h6" className={classes.brandTitle}>
              {site.name}
            </Typography>

            <Typography variant="body2" className={classes.brandText}>
              {site.footer?.summary?.text[locale]}
            </Typography>
            <div className={classes.euLogos}>
              <Image src="/images/funded-eu-hr.svg" alt="Financira Europska Unija" width={200} height={80} sizes="(max-width: 900px) 45vw, 200px" className={classes.euLogo} />
              <Image src="/images/funded-eu-en.svg" alt="Funded by the European Union" width={200} height={80} sizes="(max-width: 900px) 45vw, 200px" className={classes.euLogo} />
            </div>
          </div>

          <div className={classes.col}>
            <Typography variant="overline" className={classes.colTitle}>
              {locale === "hr" ? "Projekt" : "Project"}
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
              {locale === "hr" ? "Poveznice" : "Links"}
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
            © {new Date().getFullYear()} {locale === "hr" ? site.footer?.copyright?.owner?.hr : site.footer?.copyright?.owner?.en}.{" "}
            {locale === "hr" ? "Sva prava pridržana." : "All rights reserved."}
          </Typography>

          <div className={classes.bottomLinks}>
            <Link href={locale === "hr" ? "/hr/politika-privatnosti" : "/en/privacy-policy"} className={classes.bottomLink}>
              {locale === "hr" ? "Politika privatnosti" : "Privacy Policy"}
            </Link>
            <Link href={locale === "hr" ? "/hr/impressum" : "/en/imprint"} className={classes.bottomLink}>
              {locale === "hr" ? "Impressum" : "Imprint"}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
