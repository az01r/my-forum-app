import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
  useSearchParams,
  type ActionFunctionArgs,
} from "react-router-dom";
import classes from "./Auth.module.css";
import { authFunction } from "../http";
import type { AuthType } from "../types/auth-types";
import { setAuthToken } from "../util/auth";

export default function Auth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const data = useActionData(); // data retrieved from the response after form submit when status === 401 or 422
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => {
              const error = err as string;
              return <li key={error}>{error}</li>;
            })}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        {!isLogin && (
          <p>
            <label htmlFor="nickname">Nickname</label>
            <input id="nickname" type="text" name="nickname" required />
          </p>
        )}
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting" : isLogin ? "Login" : "Signup"}
          </button>
        </div>
      </Form>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw Response.json({ message: "Unsupported mode." }, { status: 422 });
  }

  const data = await request.formData();
  const authData: AuthType = {
    email: data.get("email") as string,
    password: data.get("password") as string,
    nickname: mode === "signup" ? (data.get("nickname") as string) : undefined,
  };

  const response = await authFunction(authData, mode);

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    // throw new Response(JSON.stringify({ errors: "Could not authenticate user." }));
    throw Response.json(
      { message: "Could not authenticate user." },
      { status: 500 }
    );
  }

  const resData = await response.json();
  const token = resData.token;
  setAuthToken(token);

  return redirect("/topics");
}
