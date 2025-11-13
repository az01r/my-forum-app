import NewTopicForm from "../components/NewTopicForm.tsx";
import { createTopic } from "../http.ts";
import { hasMaxLength, hasMinLength, isEmpty } from "../util/validation.ts";
import { redirect, type ActionFunctionArgs } from "react-router-dom";

const TITLE_MIN_LENGTH = 1;
const TITLE_MAX_LENGTH = 50;

export async function createTopicAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const terms = formData.get("terms") ? true : false;

  const errors = [];

  if (
    isEmpty(title) ||
    !hasMinLength(title!, TITLE_MIN_LENGTH) ||
    !hasMaxLength(title!, TITLE_MAX_LENGTH)
  ) {
    errors.push(
      `Title length must be between ${TITLE_MIN_LENGTH} and ${TITLE_MAX_LENGTH} characters.`
    );
  }
  if (!terms) {
    errors.push("You must agree to the terms and conditions.");
  }

  if (errors.length > 0) {
    throw new Response(JSON.stringify({ errors }), {
      status: 403,
    });
  }

  await createTopic({ title });

  return redirect("/topics");
}

export default function NewTopicPage() {
  return <NewTopicForm />;
}
