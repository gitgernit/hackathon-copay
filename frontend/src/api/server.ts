import axios from "axios"

export const test_api = () => {
  return axios.get(process.env.VITE_API_URL!)
}