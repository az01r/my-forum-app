import { redirect } from "react-router-dom";

const MY_FORUM_AUTH_TOKEN = "MY_FORUM_AUTH_TOKEN";
const MY_FORUM_AUTH_EXPIRATION = "MY_FORUM_AUTH_EXPIRATION";

export function setAuthToken(token: string) {
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem(MY_FORUM_AUTH_TOKEN, token);
  localStorage.setItem(MY_FORUM_AUTH_EXPIRATION, expiration.toISOString());
}

export function getTokenDuration() {
  const storedExp = localStorage.getItem(MY_FORUM_AUTH_EXPIRATION);
  if (!storedExp) {
    return -1;
  }
  const expirationDate = new Date(storedExp);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem(MY_FORUM_AUTH_TOKEN);
  if (!token) {
    return null;
  }
  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return "EXPIRED";
  }
  return token;
}

export function removeAuthToken() {
  localStorage.removeItem(MY_FORUM_AUTH_TOKEN);
  localStorage.removeItem(MY_FORUM_AUTH_EXPIRATION);
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth");
  }
  return null;
}
