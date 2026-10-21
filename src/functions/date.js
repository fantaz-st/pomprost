// WP returns site-local wall-clock time without an offset ("2026-04-23T10:00:00").
// Treat it as UTC and format in UTC so the day never shifts with the server/browser timezone.
const toDate = (iso) => new Date(/(Z|[+-]\d\d:?\d\d)$/i.test(iso) ? iso : `${iso}Z`);

const intlLocale = (locale) => (locale === "hr" ? "hr-HR" : "en-GB");

const format = (iso, locale, options) => new Intl.DateTimeFormat(intlLocale(locale), { timeZone: "UTC", ...options }).format(toDate(iso));

// hr: "5. listopada 2026." / en: "5 October 2026"
export const fmtDate = (iso, locale = "hr") => format(iso, locale, { day: "numeric", month: "long", year: "numeric" });

// hr: "5. 10. 2026." (ICU zero-pads this one, so it's built by hand) / en: "5 Oct 2026"
export const fmtDateShort = (iso, locale = "hr") => {
  if (locale !== "hr") return format(iso, locale, { day: "numeric", month: "short", year: "numeric" });
  const d = toDate(iso);
  return `${d.getUTCDate()}. ${d.getUTCMonth() + 1}. ${d.getUTCFullYear()}.`;
};
