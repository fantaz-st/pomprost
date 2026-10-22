"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@mui/material";
import StatusMessage from "@/components/StatusMessage/StatusMessage";
import NextButtonLink from "@/components/NextButtonLink/NextButtonLink";
import { getDictionary, localeFromPathname } from "@/i18n";

export default function Error({ error, reset }) {
  const locale = localeFromPathname(usePathname());
  const t = getDictionary(locale).error;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusMessage title={t.title} text={t.text}>
      <Button variant="contained" onClick={reset}>
        {t.retry}
      </Button>
      <NextButtonLink href={`/${locale}`} variant="outlined">
        {t.home}
      </NextButtonLink>
    </StatusMessage>
  );
}
