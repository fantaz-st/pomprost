import NewsPost from "../../(sections)/NewsPost/NewsPost";

export default async function NewsArticlePage(props) {
  return <NewsPost params={props.params} backHref="../novosti" backLabel="Novosti" />;
}
