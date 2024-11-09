import axios from "axios"

export const test_api = () => {
  return axios.get(import.meta.env.VITE_API_URL!)
}