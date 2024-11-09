import { Configuration, AuthApi, GroupsApi, UtilsApi } from "./generated";

export const c = new Configuration({
  basePath: import.meta.env.VITE_API_URL,
});

export const authApi = new AuthApi(c)
export const groupsApi = new GroupsApi(c)
export const utilsApi = new UtilsApi(c)