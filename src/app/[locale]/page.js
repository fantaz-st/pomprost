import Hero from "@/sections/Hero/Hero";
import Spacer from "@/components/Spacer/Spacer";
import HomeAbout from "@/sections/HomeAbout/HomeAbout";
import HomeNews from "@/sections/HomeNews/HomeNews";
import { ALL_NEWS } from "@/lib/queries";
import { wpFetch } from "@/lib/wpFetch";
import { wpLangFromLocale } from "@/lib/lang";
import HomeWorkPackages from "@/sections/HomeWorkPackages/HomeWorkPackages";
import { i18n } from "@/settings/i18n";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(i18n.locales.map((l) => [l, `/${l}`])),
    },
  };
}

export default async function Page({ params }) {
  const { locale } = await params;

  const data = await wpFetch(ALL_NEWS, {
    lang: wpLangFromLocale(locale),
    first: 4,
    order: "DESC",
  });

  return (
    <>
      <Hero locale={locale} />
      <Spacer size={{ mobile: "md", desktop: "xl" }} />
      <HomeAbout locale={locale} />
      <Spacer size={{ mobile: "md", desktop: "xl" }} />
      {data?.posts?.nodes?.length ? <HomeNews data={data} locale={locale} /> : null}
      <Spacer size={{ mobile: "md", desktop: "xl" }} />
      <HomeWorkPackages locale={locale} />
    </>
  );
}
