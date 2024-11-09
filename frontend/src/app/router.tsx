import {createBrowserRouter} from "react-router-dom";
import {HomePage} from "../pages/HomePage";
import Layout from "../layouts/layout";
import EditGroupPage from "../pages/EditGroupPage";
import CreateGroupPage from "../pages/CreateGroupPage";
import {EventPage} from "../pages/EventPage";
import {Wrapper} from "../layouts/wrapper";

export const router = createBrowserRouter([
  {
    element: <Wrapper />,
    children: [
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
    ]
  }
])
