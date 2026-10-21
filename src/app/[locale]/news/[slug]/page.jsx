import NewsPost, { generateNewsPostMetadata } from "../../(sections)/NewsPost/NewsPost";

const SEGMENT = "news";

export const generateMetadata = ({ params }) => generateNewsPostMetadata(params, SEGMENT);

export default function NewsPostPage({ params }) {
  return <NewsPost params={params} segment={SEGMENT} />;
}
