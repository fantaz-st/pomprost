// Structural config only; all user-facing copy lives in src/i18n.
const site = {
  name: "PomProST",
  // Absolute origin for canonical/hreflang URLs, Open Graph and the sitemap.
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  // WordPress hosts; links to them in content are rewritten to front-end paths (uploads stay absolute).
  cmsHosts: ["pomprost-be.pfst.hr", "cms.pfst.hr"],

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
    // Used by the "background" and "split" variants.
    media: {
      type: "image",
      src: "/images/hero.png",
      alt: "",
      size: "cover",
      position: "center center",
    },
  },

  footer: {
    links: [
      { label: "PFST", href: "https://www.pfst.unist.hr" },
      { label: "University of Split", href: "https://www.unist.hr" },
    ],
  },

  backToTop: {
    enabled: true,
    showAfter: 300,
    position: "right",
  },
};

export default site;
