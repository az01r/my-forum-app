import { Link, useLoaderData } from "react-router-dom";
import type { TopicType } from "../types/topic-types";
import classes from "./TopicsPage.module.css";
import { fetchTopics } from "../http";

export async function loader() {
  const response = await fetchTopics();
  if (!response.ok) {
    throw new Response(JSON.stringify({ errors: "Failed to fetch topics." }));
  }
  const resData = await response.json();
  
  return resData.topics as TopicType[]; // The return value is accessible via useLoaderData
}

export default function TopicsPage() {
  // Use the data loaded by the loader function
  const topics = useLoaderData() as TopicType[];
  return (
    <ul className={classes.list}>
      {topics.length === 0 && <p>No topics yet!</p>}
      {topics.length > 0 &&
        topics.map((topic) => (
          <li key={topic._id} className={classes.card}>
            <Link to={`${topic._id}`}>
              {/* <img
                src={topic.img}
                alt={topic.title}
                className={classes.topicImage}
              /> */}
              <h2>{topic.title}</h2>
            </Link>
          </li>
        ))}
    </ul>
  );
}
