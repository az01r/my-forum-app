import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/RootLayout";
import HomePage from "./pages/HomePage";
import { loader as topicsLoader } from "./pages/HomePage";
import NewTopicPage, { createTopicAction } from "./pages/NewTopicPage";
import AuthPage, { action as authAction } from "./pages/AuthPage";
import ErrorPage from "./pages/ErrorPage";
import { action as logoutAction } from "./pages/LogoutPage";
import { tokenLoader, checkAuthLoader } from "./util/auth";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    children: [
      {
        index: true,
        loader: () => redirect("/topics"),
      },
      {
        path: "topics",
        element: <HomePage />,
        loader: topicsLoader,
      },
      {
        path: "new-topic",
        element: <NewTopicPage />,
        action: createTopicAction,
        loader: checkAuthLoader,
      },
      {
        path: "auth",
        element: <AuthPage />,
        action: authAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
