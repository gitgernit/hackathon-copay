import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import React, {FC} from "react";
import './index.css'

export const App: FC = () => {
  return <RouterProvider router={router} />;
};
