import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import {FC} from "react";

import './main.css'

export const App: FC = () => {
  return <RouterProvider router={router} />;
};
