import { createTopic } from "../http.ts";
import type { NewTopicProps } from "../types/topic-types.ts";
import { hasMaxLength, hasMinLength, isEmpty } from "../util/validation.ts";
import {
  Form,
  redirect,
  useNavigate,
  type ActionFunctionArgs,
} from "react-router-dom";

const TITLE_MIN_LENGTH = 1;
const TITLE_MAX_LENGTH = 50;

export async function createTopicAction({
  request,
  params,
}: ActionFunctionArgs): Promise<Response> {
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

  return redirect("/");
}


const NewTopic: React.FC<NewTopicProps> = (props) => {
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

export default NewTopic;
