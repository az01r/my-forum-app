import type { ParamActionNewTopic, TopicType } from "./types/topic-types";

export async function fetchTopics() {
  const response = await fetch("http://localhost:3000/topics");

  if (!response.ok) {
    throw new Response(JSON.stringify({ errors: "Failed to fetch topics." }));
  }

  const resData = await response.json();
  return resData.topics as TopicType[];
}

export async function createTopic(topic: ParamActionNewTopic) {
  const response = await fetch("http://localhost:3000/new-topic", {
    method: "PUT",
    body: JSON.stringify(topic),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ errors: "Failed to save the topic." }));
  }
// not used right now
//   const resData = await response.json();
//   return resData.topic as TopicType;
}
