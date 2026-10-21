import NewsIndex, { generateNewsIndexMetadata } from "../(sections)/NewsIndex";

const SEGMENT = "news";

export const generateMetadata = ({ params }) => generateNewsIndexMetadata(params, SEGMENT);

export default function NewsIndexPage({ params }) {
  return <NewsIndex params={params} segment={SEGMENT} />;
}
