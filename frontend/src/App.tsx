import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import HomePage from "./pages/HomePage";
import NewTopicPage, { createTopicAction } from "./pages/NewTopicPage";
import AuthPage, { action as authAction } from "./pages/AuthPage";
import ErrorPage from "./pages/ErrorPage";
import { action as logoutAction } from "./pages/LogoutPage";
import { tokenLoader, checkAuthLoader } from "./util/auth";
import TopicPage, { loader as topicLoader } from "./pages/TopicPage";
import TopicsPage, { loader as topicsLoader } from "./pages/TopicsPage";
import { action as sendMessageAction } from "./components/SendMessageForm";

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
        element: <HomePage />,
      },
      {
        path: "topics",
        children: [
          {
            index: true,
            element: <TopicsPage />,
            loader: topicsLoader,
          },
          {
            path: ":topicId",
            element: <TopicPage />,
            loader: topicLoader,
            action: sendMessageAction,
          },
          {
            path: "new",
            element: <NewTopicPage />,
            action: createTopicAction,
            loader: checkAuthLoader,
          },
        ],
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
