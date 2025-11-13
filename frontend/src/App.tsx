import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./components/Home";
import { loader as topicsLoader } from "./components/Home";
import NewTopic, { createTopicAction } from "./components/NewTopic";
import Auth, { action as authAction } from "./components/Auth";
import ErrorPage from "./pages/ErrorPage";
import { action as logoutAction } from "./pages/Logout";
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
        element: <Home />,
        loader: topicsLoader,
      },
      {
        path: "new-topic",
        element: <NewTopic />,
        action: createTopicAction,
        loader: checkAuthLoader,
      },
      {
        path: "auth",
        element: <Auth />,
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
