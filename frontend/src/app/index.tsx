import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

import "./main.css";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {WebAppProvider} from "@vkruglikov/react-telegram-web-app";

const queryClient = new QueryClient();
export const App: FC = () => {
  return (
    <WebAppProvider
      options={{
        smoothButtonsTransition: true,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </WebAppProvider>
  );
};
