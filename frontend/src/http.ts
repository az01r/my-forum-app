import type { AuthType } from "./types/auth-types";
import type { ParamActionNewTopic, TopicType } from "./types/topic-types";
import { getAuthToken } from "./util/auth";

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

export async function authFunction(authData: AuthType, mode: string) {
  const response = await fetch(`http://localhost:3000/auth/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  return response;
}

// export async function protectedFunc() {
//   const token = getAuthToken();
//   await fetch('http://localhost:3000/path', {
//     method: 'POST',
//     headers: {
//       'Authorization': 'Bearer ' + token,
//     }
//   });
// }