import { redirect, type ActionFunctionArgs } from "react-router-dom";
import { authFunction } from "../http";
import type { AuthType } from "../types/auth-types";
import { setAuthToken } from "../util/auth";
import AuthForm from "../components/AuthForm";

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

export default function AuthPage() {
  return <AuthForm />;
}
