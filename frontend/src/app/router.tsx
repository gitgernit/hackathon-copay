import {createBrowserRouter} from "react-router-dom";
import {HomePage} from "../pages/HomePage";
import Layout from "../layouts/layout";
import EditGroupPage from "../pages/EditGroupPage";
import { GroupPage } from "../pages/GroupPage";
import React from "react";

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
    path: "/groups/:id",
    element: <GroupPage />,
  },
  {
    path: '/edit-group',
    element: <EditGroupPage />
  },
  // {
  //   path: '/create-group',
  //   element: <CreateGroupPage />
  // }
])
