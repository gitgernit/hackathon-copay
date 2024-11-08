import {createBrowserRouter} from "react-router-dom";
import {Wrapper} from "../widgets/Wrapper";
import {HomePage} from "../pages/HomePage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <HomePage />
      }
    ],
  }
])
