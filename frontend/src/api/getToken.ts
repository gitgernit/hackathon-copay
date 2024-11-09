import { authApi } from "@/shared/api"
import { TelegramInputData } from "@/shared/api/generated"

export const getToken = async (telegramData: TelegramInputData) => {
  if (telegramData === null || telegramData === undefined) return 'No data'

  const res = await authApi.authenticateApiAuthTokenPost(telegramData)
  const data = res.data?.access_token

  if (data === undefined) return 'No data'
  
  localStorage.setItem('token', data)
  return data
}