import { Configuration, AuthApi, EventsApi, UtilsApi, ItemsApi, TransactionsApi, CalculateDebitsApi } from "./generated";

export const c = new Configuration({
  basePath: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
  }
});

export const authApi = new AuthApi(c)
export const eventsApi = new EventsApi(c)
export const utilsApi = new UtilsApi(c)
export const calculateDebitsApi = new CalculateDebitsApi(c)
export const transactionsApi = new TransactionsApi(c)
export const itemsApi = new ItemsApi(c)

export const defaultReq = {
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
  }
}
