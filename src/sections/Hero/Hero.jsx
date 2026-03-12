import site from "@/settings/site";
import BackgroundHero from "./BackgroundHero/BackgroundHero";
import SplitHero from "./SplitHero/SplitHero";
import TextHero from "./TextHero/TextHero";

export default function Hero({ locale }) {
  const hero = site.hero;

  if (!hero?.variant) return null;

  switch (hero.variant) {
    case "background":
      return <BackgroundHero locale={locale} hero={hero} />;
    case "split":
      return <SplitHero locale={locale} hero={hero} />;
    case "text":
      return <TextHero locale={locale} hero={hero} />;

    default:
      return null;
  }
}
