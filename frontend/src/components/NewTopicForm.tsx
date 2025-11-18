import { Form, useActionData, useNavigate, useNavigation } from "react-router-dom";
import type { NewTopicProps } from "../types/topic-types";

export default function NewTopicForm(props: NewTopicProps) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData: { message: string[] } | undefined = useActionData();

  function cancelHandler() {
    navigate("..");
  }

  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <h2>Create a new discussion!</h2>
      <p>
        Remember to maintain respectful behavior towards others. <br />
        The topic may be closed at any time if the terms and conditions are
        violated.
      </p>

      <Form method="post">
        {actionData && actionData.message && (
          <ul>
            {actionData.message.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        <div className="control">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            defaultValue={props.event ? props.event.title : ""}
            required
          />
        </div>

        {/* <div className="control">
          <label htmlFor="img">Image URL</label>
          <input
            id="img"
            type="text"
            name="img"
            defaultValue={(formState as TopicFormState).enteredValues?.enteredImg || ''}
            required
          />
        </div> */}

        <div className="control">
          <label htmlFor="terms">
            <input
              id="terms"
              type="checkbox"
              name="terms"
              defaultChecked={props.event ? props.event.terms : false}
              required
            />
            I agree to the terms and conditions.
          </label>
        </div>

        <p>
          <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
            Cancel
          </button>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Create"}
          </button>
        </p>
      </Form>
    </>
  );
}
