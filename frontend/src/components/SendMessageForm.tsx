import { useEffect, useRef } from "react";
import { Form, useActionData, useNavigation, type ActionFunctionArgs } from "react-router-dom";
import { sendTopicMessage } from "../http";
import { validateSendMessageAction } from "../util/validators";
import { checkAuthLoader } from "../util/auth";

export async function action({ request, params }: ActionFunctionArgs) {
  //   const searchParams = new URL(request.url).searchParams;
  //   const topicId = searchParams.get("topicId");
  const checkAuthResponse = checkAuthLoader();
  if (checkAuthResponse) return checkAuthResponse;

  const topicId = params.topicId;
  const data = await request.formData();
  const text = data.get("message")?.toString();
  
  const errors = validateSendMessageAction({ topicId, text });
  
  if (errors.length > 0) {
    return { message: [...errors] }; // return value is automatically wrapped in a Response by react-router-dom
  }

  const response = await sendTopicMessage(topicId!, text!);
  
  if (response.status === 422) {
    // When backend validation fails, it returns a response with an error message
    // This message is managed in the same way of a frontend validation exception
    return response;
  }

  if (!response.ok) {
    throw response;
  }

}

export default function SendMessageForm() {
  
  const navigation = useNavigation();
  const actionData = useActionData();
  const formRef = useRef<HTMLFormElement>(null);

  // re-execute the component when navigation.state or actionData changes
  useEffect(() => {
    // if submission finished && no errors occurred
    if (navigation.state === "idle" && !actionData) {
      formRef.current?.reset();
    }
  }, [navigation.state, actionData]);


  return (
    <Form method="post" ref={formRef}>
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
