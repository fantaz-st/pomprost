import { Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import classes from "./HomeAbout.module.css";

const copy = {
  hr: {
    title: "O projektu",
    p1: "Trenutno stanje istraživanja (State of the Art) U pomorskom sektoru, digitalna navigacija za male brodove i rekreativna plovila još uvijek je nedovoljno razvijena u odnosu na komercijalne i profesionalne sustave. Globalno prisutne platforme poput Navionics, iSailor i Garmin Marine osiguravaju navigacijske informacije temeljem vektorskih karata, ali ne pružaju lokalizirane, vizualne i lako razumljive prikaze stvarnog stanja na terenu. To se osobito odnosi na korisnike bez formalne pomorske edukacije – vlasnike manjih plovila, turiste i rekreativne nautičare.",
    p2: "Postojeće tekstualne publikacije poput &apos;Peljar&apos; i obalnih vodiča ne zadovoljavaju potrebe digitalno orijentiranih korisnika koji preferiraju interaktivne i multimedijalne alate (npr. Google Earth, Street View). Iako tehnologije poput dronova, 360° kamera i naprednih geoprostornih sustava već postoje, njihova primjena u kontekstu lokalne sigurnosti plovidbe još nije sustavno istražena ni integrirana.",
    p3: "Cilj istraživanja jest razviti i validirati funkcionalni digitalni peljar koji omogućuje korisnicima pristup multimedijalnim navigacijskim informacijama temeljenim na stvarnim vizualnim podacima i geoprostornoj analitici, te istražiti njegovu učinkovitost u kontekstu sigurnosti plovidbe malih brodova.",
    cta: "Više o projektu",
    href: "/projekt/o-projektu",
  },
  en: {
    title: "About the Project",
    p1: "Current state of research (State of the Art) In the maritime sector, digital navigation for small vessels and recreational boats is still insufficiently developed compared to commercial and professional systems. Globally available platforms such as Navionics, iSailor and Garmin Marine provide navigation information based on vector charts, but they do not offer localized, visual and easily understandable representations of the real conditions at sea. This is particularly relevant for users without formal maritime education – owners of small vessels, tourists and recreational boaters.",
    p2: "Existing textual publications such as the 'Pilot Book' and coastal guides do not meet the needs of digitally oriented users who prefer interactive and multimedia tools (e.g. Google Earth, Street View). Although technologies such as drones, 360° cameras and advanced geospatial systems already exist, their application in the context of local navigation safety has not yet been systematically researched or integrated.",
    p3: "The aim of the research is to develop and validate a functional digital pilot guide that enables users to access multimedia navigation information based on real visual data and geospatial analytics, and to examine its effectiveness in the context of navigation safety for small vessels.",
    cta: "More about the project",
    href: "/projekt/o-projektu",
  },
};

export default function HomeAbout({ locale = "hr" }) {
  const t = copy[locale] || copy.hr;

  return (
    <section className={classes.wrap}>
      <Container className={classes.container}>
        <Typography variant="h2" className={classes.title}>
          {t.title}
        </Typography>

        <div className={classes.text}>
          <Typography variant="body1" color="text.secondary" mb={2}>
            {t.p1}
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={2}>
            {t.p2}
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={2}>
            {t.p3}
          </Typography>
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
