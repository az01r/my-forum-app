import type { AuthType } from "./types/auth-types";
import type { TopicType } from "./types/topic-types";
import { getAuthToken } from "./util/auth";

const BASE_URL = import.meta.env.VITE_URL || "http://localhost:3000";

export async function fetchTopics() {
  const response = await fetch(`${BASE_URL}/topics`);
  return response;
}

export async function createTopic(topic: TopicType) {
  const response = await fetch(`${BASE_URL}/new-topic`, {
    method: "PUT",
    body: JSON.stringify(topic),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

export async function authFunction(authData: AuthType, mode: string) {
  const response = await fetch(`${BASE_URL}/auth/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  return response;
}

export async function fetchMessagesByTopicId(topicId: string) {
  const response = await fetch(`${BASE_URL}/topics/${topicId}`, {
    method: "GET",
  });
  return response;
}

export async function sendTopicMessage(topicId: string, text: string) {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}/topics/${topicId}/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ text }),
  });
  return response;
}
