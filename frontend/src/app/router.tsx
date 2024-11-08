import {createBrowserRouter} from "react-router-dom";
import {HomePage} from "../pages/HomePage";
import React from "react";
import Layout from "../layouts/layout";

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
  }
])
