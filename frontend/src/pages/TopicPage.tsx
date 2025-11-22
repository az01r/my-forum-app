import { useLoaderData, type LoaderFunctionArgs, useRouteLoaderData } from "react-router-dom";
import { fetchMessagesByTopicId } from "../http";
import type { MessageType } from "../types/message-types";
import SendMessageForm from "../components/SendMessageForm";
import classes from "./TopicPage.module.css";

export async function loader({ params }: LoaderFunctionArgs) {
  const topicId = params.topicId!;
  const response = await fetchMessagesByTopicId(topicId);
  if (!response.ok) {
    // throw new Response(JSON.stringify({ errors: "Failed to fetch messages." }));
    throw response;
  }

  const resData = await response.json();
  return resData.messages as MessageType[]; // The return value is accessible via useLoaderData
}

function getUserIdFromToken(token: string | null) {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded?.userId as string | null;
  } catch (error) {
    return null;
  }
}

export default function TopicPage() {
  // Use the data loaded by the loader function
  const messages = useLoaderData() as MessageType[];
  const token = useRouteLoaderData("root") as string | null;
  const currentUserId = getUserIdFromToken(token);

  return (
    <div className={classes.container}>
      <ul className={classes.list}>
        {messages.map((m) => {
          const isOwnMessage = currentUserId && m.user._id === currentUserId;
          return (
            <li
              key={m._id}
              className={`${classes.messageCard} ${
                isOwnMessage ? classes.ownMessage : ""
              }`}
            >
              <p className={classes.messageContent}>{m.content}</p>
              <div className={classes.messageMeta}>
                <span className={classes.user}>{m.user.nickname}</span>
                <span className={classes.date}>
                  {new Date(m.createdAt).toLocaleString()}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      <SendMessageForm />
    </div>
  );
}
