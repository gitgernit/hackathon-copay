import { Configuration, AuthApi, EventsApi, UtilsApi, TagsApi, InvitesApi } from "./generated";

export const c = new Configuration({
  basePath: import.meta.env.VITE_API_URL,
});

export const authApi = new AuthApi(c)
export const eventsApi = new EventsApi(c)
export const utilsApi = new UtilsApi(c)
export const tagsApi = new TagsApi(c)
export const invitesApi = new InvitesApi(c)

export const defaultReq = {
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
  }
}