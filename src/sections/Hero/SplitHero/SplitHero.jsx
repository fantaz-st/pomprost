import site from "@/settings/site";
import classes from "./SplitHero.module.css";
import Image from "next/image";
import { Container, Stack, Typography, Button } from "@mui/material";

export default function SplitHero({ locale, hero }) {
  if (!hero) return null;

  const media = hero.media || {};
  const content = hero.content?.[locale] || {};
  const cta = content.cta;

  const title = content.title || site.name;
  const subtitle = content.subtitle || site.description;
  const kicker = content.kicker;

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
                {/* {kicker ? (
                  <Typography className={classes.kicker} component="div" data-aos="fade-up">
                    {kicker}
                  </Typography>
                ) : null}
 */}
                <Typography variant="h1" component="h1" className={classes.title} data-aos="fade-up" data-aos-delay={kicker ? "100" : "0"}>
                  {title}
                </Typography>

                {subtitle ? (
                  <Typography variant="body1" component="p" className={classes.subtitle} data-aos="fade-up" data-aos-delay={kicker ? "200" : "100"}>
                    {subtitle}
                  </Typography>
                ) : null}

                {cta?.href && cta?.label ? (
                  <div className={classes.actions} data-aos="fade-up" data-aos-delay={kicker ? "300" : "200"}>
                    <Button variant="outlined" href={cta.href}>
                      {cta.label}
                    </Button>
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
