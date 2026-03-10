import NewsPost from "../../(sections)/NewsPost/NewsPost";

export default async function NovostPage(props) {
  return <NewsPost params={props.params} backHref="../news" backLabel="News" />;
}
