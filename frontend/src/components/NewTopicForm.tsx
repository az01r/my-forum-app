import { Form, useActionData, useNavigate, useNavigation } from "react-router-dom";
import type { NewTopicProps } from "../types/topic-types";
import classes from "./NewTopicForm.module.css";

export default function NewTopicForm(props: NewTopicProps) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData: { message: string[] } | undefined = useActionData();

  function cancelHandler() {
    navigate("..");
  }

  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" className={classes.form}>
      <h2>Create a new discussion!</h2>
      <p>
        Remember to maintain respectful behavior towards others. <br />
        The topic may be closed at any time if the terms and conditions are
        violated.
      </p>

      {actionData && actionData.message && (
        <ul>
          {actionData.message.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <div className={classes.control}>
        <input
          type="text"
          name="title"
          placeholder="Insert the topic title"
          defaultValue={props.event ? props.event.title : ""}
          required
        />
      </div>

      <div className={classes.control}>
        <label htmlFor="terms" className={classes.checkboxWrapper}>
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

      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Create"}
        </button>
      </div>
    </Form>
  );
}
