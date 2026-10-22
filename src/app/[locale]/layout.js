import "@/styles/reset.css";
import "@/styles/globals.css";
import { Manrope, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import Providers from "../providers";
import site from "@/settings/site";
import { i18n } from "@/settings/i18n";
import { getDictionary } from "@/i18n";
import { wpFetchAllMenuItems } from "@/lib/wpFetchAllMenuItems";
import { wpUriToHref } from "@/lib/urls";
import createDataTree from "@/functions/createDataTree";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import CookieNotice from "@/components/CookieNotice/CookieNotice";
import BackToTop from "@/components/BackToTop/BackToTop";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
  display: "swap",
});

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const description = getDictionary(locale).meta.description;

  return {
    metadataBase: new URL(site.url),
    title: { default: site.name, template: `%s | ${site.name}` },
    description,
    openGraph: { siteName: site.name, type: "website", locale: locale === "hr" ? "hr_HR" : "en_GB", description },
  };
}

// This is the root layout (there is no app/layout.js), so <html lang> can follow the URL.
export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!i18n.locales.includes(locale)) notFound();

  const menuName = site.menu?.[locale] || site.menu?.[i18n.defaultLocale];

  // A WP outage should cost us the menu, not every page on the site.
  const flat = await wpFetchAllMenuItems(menuName).catch((err) => {
    console.error("Failed to load menu", menuName, err);
    return [];
  });
  const menuItems = createDataTree(flat.map((item) => ({ ...item, uri: wpUriToHref(item.uri) })));

  return (
    <html lang={locale} className={`${manrope.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <div className="layout">
            <Header menuItems={menuItems} locale={locale} />

            <main className="content">{children}</main>
            <CookieNotice locale={locale} />
            <Footer menuItems={menuItems} locale={locale} />
          </div>
          <BackToTop locale={locale} />
        </Providers>
      </body>
    </html>
  );
}
