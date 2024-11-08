import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/layout";
import { HomePage } from "../pages/HomePage";
import { GroupPage } from "../pages/GroupPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/groups/:id",
    element: <GroupPage />,
  },
]);
