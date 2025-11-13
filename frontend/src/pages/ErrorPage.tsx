import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as { data?: {message: string}, status: number };
  console.log("error: ", error);
  const message = error.data?.message || "Something went wrong!";
  const statusCode = error.status;
  return (
    <>
      <h1>Error {statusCode}:</h1>
      <p>{message}</p>
    </>
  );
}
