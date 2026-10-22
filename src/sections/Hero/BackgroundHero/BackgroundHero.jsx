import { getDictionary } from "@/i18n";
import classes from "./BackgroundHero.module.css";
import Image from "next/image";
import { Container, Stack, Typography } from "@mui/material";

const getAlignClass = (align, classes) => {
  const v = align?.vertical || "center";
  const h = align?.horizontal || "left";
  return `${classes[`v_${v}`]} ${classes[`h_${h}`]}`;
};

export default function BackgroundHero({ locale, hero }) {
  if (!hero) return null;

  const { title, subtitle } = getDictionary(locale).hero;
  const media = hero.media || {};

  const heightDesktop = hero.height?.desktop || "100vh";
  const heightMobile = hero.height?.mobile || "70vh";

  const alignClass = getAlignClass(hero.align, classes);

  const overlay = hero.overlay?.enabled === false ? "none" : hero.overlay?.gradient || hero.overlay?.color || "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.5))";

  const style = {
    "--hero-h-desktop": heightDesktop,
    "--hero-h-mobile": heightMobile,
    "--hero-overlay": overlay,
    "--hero-page-bg": hero.pageBackground || "#ececef",
    "--hero-panel-bg": hero.panel?.background || "transparent",
    "--hero-panel-color": "#ffffff",
  };

  return (
    <section className={classes.wrap} style={style}>
      <div className={classes.bg}>
        {media.type === "video" ? (
          <video className={classes.video} src={media.src} autoPlay muted loop playsInline />
        ) : (
          <Image
            src={media.src}
            alt={media.alt || ""}
            fill
            priority
            className={classes.image}
            sizes="100vw"
            style={{
              objectFit: media.size || "cover",
              objectPosition: media.position || "center center",
            }}
          />
        )}
      </div>

      <div className={classes.overlay} />

      <Container className={classes.container}>
        <div className={`${classes.content} ${alignClass}`}>
          <Stack spacing={2} className={classes.stack}>
            <Typography variant="h1" component="h1" className={classes.title}>
              {title}
            </Typography>

            {subtitle ? (
              <Typography variant="body1" component="p" className={classes.subtitle}>
                {subtitle}
              </Typography>
            ) : null}
          </Stack>
        </div>
      </Container>
    </section>
  );
}
