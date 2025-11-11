import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./components/Home";
import { loader as topicsLoader } from "./components/Home";
import NewTopic, { createTopicAction } from "./components/NewTopic";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: topicsLoader,
      },
      {
        path: "/new-topic",
        element: <NewTopic />,
        action: createTopicAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
