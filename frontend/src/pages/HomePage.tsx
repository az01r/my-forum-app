import { fetchTopics } from "../http";
import TopicList from "../components/TopicsList";
import type { TopicType } from "../types/topic-types";

export async function loader() {
  const response = await fetchTopics();
  if (!response.ok) {
    throw new Response(JSON.stringify({ errors: "Failed to fetch topics." }));
  }
  
  const resData = await response.json();
  return resData.topics as TopicType[]; // The return value is accessible via useLoaderData
}

export default function HomePage() {
  return <TopicList />;
}
