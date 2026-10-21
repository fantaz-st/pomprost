import site from "@/settings/site";
import { wpFetchAllMenuItems } from "@/lib/wpFetchAllMenuItems";
import { wpUriToHref } from "@/lib/urls";
import createDataTree from "@/functions/createDataTree";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import CookieNotice from "@/components/CookieNotice/CookieNotice";

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const menuName = site.menu?.[locale] || site.menu?.hr || site.menu;

  // A WP outage should cost us the menu, not every page on the site.
  const flat = await wpFetchAllMenuItems(menuName).catch((err) => {
    console.error("Failed to load menu", menuName, err);
    return [];
  });
  const menuItems = createDataTree(flat.map((item) => ({ ...item, uri: wpUriToHref(item.uri, locale) })));

  return (
    <div className="layout">
      <Header menuItems={menuItems} locale={locale} />

      <main className="content">{children}</main>
      <CookieNotice locale={locale} />
      <Footer menuItems={menuItems} locale={locale} />
    </div>
  );
}
