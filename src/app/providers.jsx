"use client";

import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import AOS from "aos";
import { Fancybox } from "@fancyapps/ui";
import theme from "@/theme/theme";
import { AlternatesProvider } from "@/components/LanguageSwitch/Alternates";

const FANCYBOX_SELECTOR = "[data-fancybox]";

export default function Providers({ children }) {
  useEffect(() => {
    AOS.init({ once: true, duration: 700, easing: "ease-out-cubic" });
  }, []);

  useEffect(() => {
    // Delegated click handler, so it also covers content rendered after client-side navigation.
    Fancybox.bind(FANCYBOX_SELECTOR, {});
    return () => {
      Fancybox.unbind(FANCYBOX_SELECTOR);
      Fancybox.close();
    };
  }, []);

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AlternatesProvider>{children}</AlternatesProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
