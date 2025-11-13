import { Form, Link, useActionData, useNavigation, useSearchParams } from "react-router-dom";
import classes from "./AuthForm.module.css";

export default function AuthForm() {
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