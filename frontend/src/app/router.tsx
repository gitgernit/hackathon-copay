import {createBrowserRouter} from "react-router-dom";
import {HomePage} from "../pages/HomePage";
import Layout from "../layouts/layout";
import EditGroupPage from "../pages/EditGroupPage";
import { GroupPage } from "../pages/GroupPage";
import React from "react";
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
    element: <EventPage />,
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
