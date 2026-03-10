import NewsIndex from "../(sections)/NewsIndex";

export default async function NovostiPage({ params }) {
  const { locale } = await params;
  return <NewsIndex title="Novosti" locale={locale} />;
}
