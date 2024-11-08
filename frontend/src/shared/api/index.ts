import { Configuration, DefaultApi } from "./generated";

export const c = new Configuration({
  basePath: import.meta.env.VITE_API_URL,
});

export const api = new DefaultApi(c);
