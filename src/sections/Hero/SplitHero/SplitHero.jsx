import { getDictionary } from "@/i18n";
import classes from "./SplitHero.module.css";
import Image from "next/image";
import { Container, Stack, Typography } from "@mui/material";
import NextButtonLink from "@/components/NextButtonLink/NextButtonLink";

export default function SplitHero({ locale, hero }) {
  if (!hero) return null;

  const { title, subtitle, cta } = getDictionary(locale).hero;
  const media = hero.media || {};

  const heightDesktop = hero.height?.desktop || "100vh";
  const heightMobile = hero.height?.mobile || "70vh";

  const reverse = hero.layout?.reverse;
  const textBg = hero.panel?.background || "#f5f7fa";
  const textColor = hero.panel?.color || "#0f1720";

  const style = {
    "--hero-h-desktop": heightDesktop,
    "--hero-h-mobile": heightMobile,
    "--split-panel-bg": textBg,
    "--split-panel-color": textColor,
  };

  return (
    <section className={classes.wrap} style={style}>
      <Container className={classes.container}>
        <div className={`${classes.grid} ${reverse ? classes.reverse : ""}`}>
          <div className={classes.textCol}>
            <div className={classes.panel}>
              <Stack spacing={2.5} className={classes.stack}>
                <Typography variant="h1" component="h1" className={classes.title}>
                  {title}
                </Typography>

                {subtitle ? (
                  <Typography variant="body1" component="p" className={classes.subtitle}>
                    {subtitle}
                  </Typography>
                ) : null}

                {cta?.href && cta?.label ? (
                  <div className={classes.actions}>
                    <NextButtonLink variant="outlined" href={cta.href}>
                      {cta.label}
                    </NextButtonLink>
                  </div>
                ) : null}
              </Stack>
            </div>
          </div>

          <div className={classes.mediaCol}>
            <div className={classes.media}>
              {media.type === "video" ? (
                <video className={classes.video} src={media.src} autoPlay muted loop playsInline />
              ) : (
                <Image
                  src={media.src}
                  alt={media.alt || ""}
                  fill
                  priority
                  className={classes.image}
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{
                    objectFit: media.size || "cover",
                    objectPosition: media.position || "center center",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
