import { redirect, type ActionFunctionArgs } from "react-router-dom";
import { authFunction } from "../http";
import type { AuthType } from "../types/auth-types";
import { setAuthToken } from "../util/auth";
import AuthForm from "../components/AuthForm";
import { validateAuthAction } from "../util/validators";

export async function action({ request }: ActionFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw Response.json({ message: "Unsupported mode." }, { status: 422 });
  }

  const formData = await request.formData();
  const email = formData.get("email")!.toString().trim();
  const password = formData.get("password")!.toString().trim();
  const nickname = formData.get("nickname")?.toString().trim();

  const errors = validateAuthAction({ email, password, nickname, mode });

  if (errors.length > 0) {
    return { message: [...errors] }; // return value is automatically wrapped in a Response by react-router-dom
  }

  const authData: AuthType = { email, password, nickname };
  const response = await authFunction(authData, mode);

  if (response.status === 422 || response.status === 401) {
    // When backend validation fails, it returns a response with an error message
    // This message is managed in the same way of a frontend validation exception
    return response;
  }

  if (!response.ok) {
    // throw new Response(JSON.stringify({ errors: "Could not authenticate user." }));
    // throw Response.json(
    //   { message: "Could not authenticate user." },
    //   { status: 500 }
    // );
    // For every other type of server side errors, I want to redirect to the ErrorPage
    throw response;
  }

  const resData = await response.json();
  const token = resData.jwt;
  setAuthToken(token);

  return redirect("/topics");
}

export default function AuthPage() {
  return <AuthForm />;
}
