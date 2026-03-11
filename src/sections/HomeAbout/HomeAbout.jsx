import { Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import classes from "./HomeAbout.module.css";

const copy = {
  hr: {
    title: "Opis projekta",
    p1: "Projekt PomProST razvijen je kao odgovor na uočene nedostatke u sigurnosti, zaštiti i učinkovitosti pomorskog prometa u Splitsko-dalmatinskoj županiji. Istraživanje provodi Pomorski fakultet u Splitu u suradnji s institucijama koje upravljaju lučkim područjima, s ciljem jačanja održivosti pomorskog sustava u skladu sa zahtjevima zelene i digitalne tranzicije.",
    p2: "Projekt analizira promet brodova, kvalitetu zraka i razinu buke te razvija prijedloge rješenja za povećanje sigurnosti, operativne učinkovitosti i digitalizacije pomorskog prometa. Predložena rješenja testirat će se u praksi kroz razvoj operativnih koncepata upravljanja lukama i sustava za praćenje okolišnih pokazatelja u stvarnom vremenu.",
    p3: "Rezultati projekta doprinijet će razvoju strateških dokumenata i politika održivog razvoja pomorskog sektora u Splitsko-dalmatinskoj županiji te jačanju znanstvene izvrsnosti i institucionalnog kapaciteta Pomorskog fakulteta u Splitu.",
    cta: "Više o projektu",
    href: "/projekt/o-projektu",
  },

  en: {
    title: "About the Project",
    p1: "The PomProST project was initiated to address identified shortcomings in the safety, security and efficiency of maritime traffic in the Split-Dalmatia County. The research is conducted by the Faculty of Maritime Studies in Split in cooperation with institutions managing port areas, aiming to improve the sustainability of the maritime system in line with the green and digital transition.",
    p2: "The project analyses vessel traffic, air quality and noise levels while developing proposals to improve safety, operational efficiency and the level of digitalisation of maritime transport. Proposed solutions will be tested in practice through operational port management concepts and real-time environmental monitoring systems.",
    p3: "The results of the project will support the development of strategic documents and policies for the sustainable development of the maritime sector in Split-Dalmatia County and strengthen the scientific excellence and institutional capacity of the Faculty of Maritime Studies in Split.",
    cta: "More about the project",
    href: "/project/about",
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
