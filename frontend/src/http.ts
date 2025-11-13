import type { AuthType } from "./types/auth-types";
import type { ParamActionNewTopic, TopicType } from "./types/topic-types";

export async function fetchTopics() {
  const response = await fetch("http://localhost:3000/topics");

  return response;
}

export async function createTopic(topic: ParamActionNewTopic) {
  const response = await fetch("http://localhost:3000/new-topic", {
    method: "PUT",
    body: JSON.stringify(topic),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
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