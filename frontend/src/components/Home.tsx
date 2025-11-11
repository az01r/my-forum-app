import { Link, useLoaderData } from "react-router-dom";
import classes from "./Home.module.css";
import type { TopicType } from "../types/topic-types";
import { fetchTopics } from "../http";

export async function loader() {
  const topics = await fetchTopics();
  return topics; // The return value is accessible via useLoaderData
}

const Home: React.FC = () => {
  // Use the data loaded by the loader function
  const topics = useLoaderData() as TopicType[];
  console.log(topics)
  return (
    <ul className={classes.topicsList}>
      {topics.length === 0 && <p>No topics yet!</p>}
      {topics.length > 0 &&
        topics.map((topic) => (
          <li key={topic.id} className={classes.topicItem}>
            <Link to={`${topic.id}`} className={classes.topicLink}>
              {/* <img
                src={topic.img}
                alt={topic.title}
                className={classes.topicImage}
              /> */}
              {topic.title}
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default Home;
