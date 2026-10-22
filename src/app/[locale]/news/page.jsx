import NewsIndex, { generateNewsIndexMetadata } from "../(sections)/NewsIndex";

const SEGMENT = "news";

export const generateMetadata = ({ params, searchParams }) => generateNewsIndexMetadata(params, searchParams, SEGMENT);

export default function NewsIndexPage({ params, searchParams }) {
  return <NewsIndex params={params} searchParams={searchParams} segment={SEGMENT} />;
}
