import { fetchTopics } from "../http";
import TopicList from "../components/TopicsList";

export async function loader() {
  const topics = await fetchTopics();
  return topics; // The return value is accessible via useLoaderData
}

export default function HomePage() {
  return <TopicList />;
}
