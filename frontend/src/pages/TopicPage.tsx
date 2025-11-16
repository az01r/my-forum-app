import { useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import { fetchMessagesByTopicId } from "../http";
import type { MessageType } from "../types/message-types";
import SendMessageForm from "../components/SendMessageForm";

export async function loader({ params }: LoaderFunctionArgs) {
  const topicId = params.topicId!;
  const response = await fetchMessagesByTopicId(topicId);
  if (!response.ok) {
    throw new Response(JSON.stringify({ errors: "Failed to fetch messages." }));
  }

  const resData = await response.json();
  console.log(resData);
  return resData.messages as MessageType[]; // The return value is accessible via useLoaderData
}

export default function TopicPage() {
  // Use the data loaded by the loader function
  const messages = useLoaderData() as MessageType[];

  return (
    <>
      <ul>
        {messages.map((m) => (
          <li key={m._id}>
            <p>
              {m.createdAt} - {m.content}
            </p>
          </li>
        ))}
      </ul>
      <SendMessageForm />
    </>
  );
}
