import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError() as { message?: string };
    const message = error.message || 'Something went wrong!';
    return (<>
        <h1>An error occured!</h1>
        <p>{message}</p>
    </>);
}