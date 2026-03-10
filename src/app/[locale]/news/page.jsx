import NewsIndex from "../(sections)/NewsIndex";

export default async function NewsPage({ params }) {
  const { locale } = await params;
  return <NewsIndex title="News" locale={locale} />;
}
