const typography = {
  fontFamily: "var(--font-body), system-ui, -apple-system, sans-serif",

  h1: {
    fontFamily: "var(--font-heading), var(--font-body), sans-serif",
    fontWeight: 700,
    fontSize: "clamp(2.7rem, 6vw, 5rem)",
    lineHeight: 1,
    letterSpacing: "-0.04em",
  },

  h2: {
    fontFamily: "var(--font-heading), var(--font-body), sans-serif",
    fontWeight: 700,
    fontSize: "clamp(2rem, 4vw, 3.2rem)",
    lineHeight: 1.05,
    letterSpacing: "-0.03em",
  },

  h3: {
    fontFamily: "var(--font-heading), var(--font-body), sans-serif",
    fontWeight: 600,
    fontSize: "clamp(1.35rem, 2vw, 1.8rem)",
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
  },

  h4: {
    fontFamily: "var(--font-body), sans-serif",
    fontWeight: 700,
    fontSize: "1.1rem",
    lineHeight: 1.3,
    letterSpacing: "-0.01em",
  },

  body1: {
    fontSize: "1rem",
    lineHeight: 1.75,
    letterSpacing: "-0.01em",
  },

  body2: {
    fontSize: "0.95rem",
    lineHeight: 1.65,
    letterSpacing: "-0.01em",
  },

  button: {
    fontWeight: 700,
    textTransform: "none",
    letterSpacing: "0.01em",
    fontSize: "0.95rem",
  },

  overline: {
    fontWeight: 700,
    fontSize: "0.78rem",
    lineHeight: 1.2,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
};

export default typography;
