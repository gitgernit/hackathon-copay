import {createBrowserRouter} from "react-router-dom";
import {HomePage} from "../pages/HomePage";
import Layout from "../layouts/layout";
import CreateGroup from "../pages/CreateGroup";
import { GroupPage } from "../pages/GroupPage";

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
    path: '/create-group',
    children: [
      {
        index: true,
        element: <CreateGroup />
      }
    ],
  }
])
