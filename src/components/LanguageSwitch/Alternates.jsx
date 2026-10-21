"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

// Pages know their translations (WP returns them with the content), the header does not.
// Pages render <SetAlternates> and LanguageSwitch reads them from here.
const AlternatesContext = createContext({ alternates: null, setAlternates: () => {} });

export function AlternatesProvider({ children }) {
  const [alternates, setAlternates] = useState(null);
  const value = useMemo(() => ({ alternates, setAlternates }), [alternates]);
  return <AlternatesContext.Provider value={value}>{children}</AlternatesContext.Provider>;
}

export function SetAlternates({ alternates }) {
  const { setAlternates } = useContext(AlternatesContext);

  useEffect(() => {
    setAlternates(alternates);
    return () => setAlternates(null);
  }, [alternates, setAlternates]);

  return null;
}

export const useAlternates = () => useContext(AlternatesContext).alternates;
