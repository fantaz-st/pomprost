"use client";

import { usePathname } from "next/navigation";
import StatusMessage from "@/components/StatusMessage/StatusMessage";
import NextButtonLink from "@/components/NextButtonLink/NextButtonLink";
import { getDictionary, localeFromPathname } from "@/i18n";

export default function NotFound() {
  const locale = localeFromPathname(usePathname());
  const t = getDictionary(locale).notFound;

  return (
    <StatusMessage code="404" title={t.title} text={t.text}>
      <NextButtonLink href={`/${locale}`} variant="contained">
        {t.home}
      </NextButtonLink>
    </StatusMessage>
  );
}
