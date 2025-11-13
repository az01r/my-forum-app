import { Form, useNavigate } from "react-router-dom";
import type { NewTopicProps } from "../types/topic-types";

export default function NewTopicForm(props: NewTopicProps) {
  const navigate = useNavigate();
  function cancelHandler() {
    navigate("..");
  }
  return (
    <>
      <h2>Create a new discussion!</h2>
      <p>
        Remember to maintain respectful behavior towards others. <br />
        The topic may be closed at any time if the terms and conditions are
        violated.
      </p>

      <Form method="post">
        <div className="control">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            defaultValue={props.event? props.event.title  : ""}
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
          <button type="button" onClick={cancelHandler}>
            Cancel
          </button>
          <button>Create</button>
        </p>
      </Form>
    </>
  );
}