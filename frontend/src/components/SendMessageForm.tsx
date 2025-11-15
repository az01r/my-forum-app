import { Form, type ActionFunctionArgs } from "react-router-dom";
import { sendTopicMessage } from "../http";

export async function action({ request, params }: ActionFunctionArgs) {
  //   const searchParams = new URL(request.url).searchParams;
  //   const topicId = searchParams.get("topicId");
  const topicId = params.topicId;
  const data = await request.formData();
  const text = data.get("message") as string | null;
  if (!topicId) {
    return new Response("Invalid topic.", { status: 422 });
  }
  if (!text) {
    return new Response("Message is empty.", { status: 422 });
  }
  await sendTopicMessage(topicId, text);
}

export default function SendMessageForm() {
  return (
    <Form method="post">
        <div className="control">
          <input
            id="message"
            type="text"
            name="message"
            placeholder="Send a message..."
            required
          />
          <button>Send</button>
        </div>
    </Form>
  );
}
