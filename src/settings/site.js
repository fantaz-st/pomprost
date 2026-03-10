const site = {
  name: "PomProST",
  description: "Unaprjeđenje održivosti pomorskog prometa u Splitsko-dalmatinskoj županiji",
  locale: "en",

  menu: {
    hr: "main-menu-hr",
    en: "main-menu-en",
  },

  header: {
    sticky: true,
    transparent: true,
    textColorInvert: true,
    height: 72,
    solidOnScroll: true,
    solidOnScrollOffset: 12,
  },

  hero: {
    variant: "text",
    height: { desktop: "82vh", mobile: "auto" },
    pageBackground: "#F3F7F8",
    panel: {
      background: "#F8FBFB",
      color: "#0E3A5D",
    },
    media: {
      type: "image",
      src: "/images/pomprost-hero.jpg",
      alt: "PomProST project hero",
      size: "cover",
      position: "center center",
    },
    content: {
      en: {
        kicker: "institutional project",
        title: "PomProST",
        subtitle: "Improvement of Maritime Traffic Sustainability in Split-Dalmatia County",
        cta: {
          href: "/en/about-project",
          label: "Learn More",
        },
      },
      hr: {
        kicker: "institucionalni projekt",
        title: "PomProST",
        subtitle: "Unaprjeđenje održivosti pomorskog prometa u Splitsko-dalmatinskoj županiji",
        cta: {
          href: "/hr/o-projektu",
          label: "Saznaj više",
        },
      },
    },
  },

  footer: {
    variant: "simple",

    summary: {
      title: "PomProST",
      text: {
        en: "Improvement of Maritime Traffic Sustainability in Split-Dalmatia County",
        hr: "Unaprjeđenje održivosti pomorskog prometa u Splitsko-dalmatinskoj županiji",
      },
    },

    links: [
      { label: "PFST", href: "https://www.pfst.unist.hr" },
      { label: "University of Split", href: "https://www.unist.hr" },
    ],

    bottomLinks: [
      { label: "Privacy", href: "/privacy" },
      { label: "Impressum", href: "/impressum" },
    ],

    copyright: {
      owner: "Faculty of Maritime Studies, University of Split",
      vlasnik: "Sveučilište u Splitu, Pomorski fakultet",
      year: "auto",
    },
  },

  backToTop: {
    enabled: true,
    showAfter: 300,
    position: "right",
  },
};

export default site;
