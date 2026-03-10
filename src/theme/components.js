const components = {
  MuiContainer: {
    defaultProps: {
      maxWidth: "lg",
    },
  },

  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: 999,
        paddingInline: "1.35rem",
        paddingBlock: "0.8rem",
        fontWeight: 700,
      },
      containedPrimary: {
        boxShadow: "0 10px 30px rgba(14, 58, 93, 0.16)",
      },
      outlinedPrimary: {
        borderColor: "rgba(14, 58, 93, 0.18)",
      },
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 24,
        backgroundImage: "none",
        boxShadow: "0 10px 30px rgba(16, 42, 67, 0.06)",
      },
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 24,
        boxShadow: "0 10px 30px rgba(16, 42, 67, 0.06)",
        border: "1px solid rgba(16, 42, 67, 0.06)",
      },
    },
  },

  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: "rgba(255,255,255,0.82)",
        color: "#102A43",
        boxShadow: "0 1px 0 rgba(16, 42, 67, 0.08)",
        backdropFilter: "blur(14px)",
      },
    },
  },

  MuiLink: {
    styleOverrides: {
      root: {
        textDecoration: "none",
        textUnderlineOffset: "0.18em",
        "&:hover": {
          textDecoration: "underline",
        },
      },
    },
  },

  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 999,
        fontWeight: 600,
      },
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: "rgba(16, 42, 67, 0.1)",
      },
    },
  },
};

export default components;
