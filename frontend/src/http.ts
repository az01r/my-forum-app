import type { AuthType } from "./types/auth-types";
import type { TopicType } from "./types/topic-types";
import { getAuthToken } from "./util/auth";

export async function fetchTopics() {
  const response = await fetch("http://localhost:3000/topics");
  return response;
}

export async function createTopic(topic: TopicType) {
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

export async function fetchMessagesByTopicId(topicId: string) {
  const response = await fetch(`http://localhost:3000/topics/${topicId}`, {
    method: 'GET',
  });
  return response;
}

export async function sendTopicMessage(topicId: string, text: string) {
  const token = getAuthToken();
  const response = await fetch(`http://localhost:3000/topics/${topicId}/new`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify({ text }),
  });
  return response;
}