import NewTopicForm from "../components/NewTopicForm.tsx";
import { createTopic } from "../http.ts";
import { redirect, type ActionFunctionArgs } from "react-router-dom";
import { validateCreateTopicAction } from "../util/validators.ts";

export async function createTopicAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title")!.toString().trim();
  const terms = formData.get("terms") ? true : false;

  const errors = validateCreateTopicAction({ title, terms });

  if (errors.length > 0) {
    return { message: [...errors] }; // return value is automatically wrapped in a Response by react-router-dom
  }

  const response = await createTopic({ title });

  if (response.status === 422) {
    // When backend validation fails, it returns a response with an error message
    // This message is managed in the same way of a frontend validation exception
    return response;
  }

  if (!response.ok) {
    // For every other type of server side errors, I want to redirect to the ErrorPage
    throw response;
  }

  return redirect("/topics");
}

export default function NewTopicPage() {
  return <NewTopicForm />;
}
