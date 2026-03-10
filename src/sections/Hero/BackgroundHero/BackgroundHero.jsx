import site from "@/settings/site";
import classes from "./BackgroundHero.module.css";
import Image from "next/image";
import { Container, Stack, Typography, Button } from "@mui/material";

const getAlignClass = (align, classes) => {
  const v = align?.vertical || "center";
  const h = align?.horizontal || "left";
  return `${classes[`v_${v}`]} ${classes[`h_${h}`]}`;
};

export default function BackgroundHero({ locale, hero }) {
  if (!hero) return null;

  const content = hero.content?.[locale] || {};
  const media = hero.media || {};
  const cta = content.cta;

  const title = content.title || site.name;
  const subtitle = content.subtitle || site.description;
  const kicker = content.kicker;

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
            {/* {kicker ? (
              <Typography className={classes.kicker} component="div" data-aos="fade-up">
                {kicker}
              </Typography>
            ) : null} */}

            <Typography variant="h1" component="h1" className={classes.title} data-aos="fade-up" data-aos-delay={kicker ? "100" : "0"}>
              {title}
            </Typography>

            {subtitle ? (
              <Typography variant="body1" component="p" className={classes.subtitle} data-aos="fade-up" data-aos-delay={kicker ? "200" : "100"}>
                {subtitle}
              </Typography>
            ) : null}

            {/* {cta?.href && cta?.label ? (
              <div className={classes.actions}>
                <Button variant="outlined" href={cta.href}>
                  {cta.label}
                </Button>
              </div>
            ) : null} */}
          </Stack>
        </div>
      </Container>
    </section>
  );
}
