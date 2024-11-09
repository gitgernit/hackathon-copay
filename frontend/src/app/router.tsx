import {createBrowserRouter} from "react-router-dom";
import {HomePage} from "../pages/HomePage";
import Layout from "../layouts/layout";
import EditGroupPage from "../pages/EditGroupPage";
import { GroupPage } from "../pages/GroupPage";
import CreateGroupPage from "../pages/CreateGroupPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      }
    ],
  },
  {
    path: "/events/:id",
    element: <GroupPage />,
  },
  {
    path: '/edit-group',
    element: <EditGroupPage />
  },
  {
    path: '/create-group',
    element: <CreateGroupPage />
  }
])
