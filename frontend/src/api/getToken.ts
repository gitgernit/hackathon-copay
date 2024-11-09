import { authApi } from "@/shared/api"
import { TelegramInputData } from "@/shared/api/generated"

export const getToken = async (telegramData: TelegramInputData) => {
  if (telegramData === null || telegramData === undefined) return 'No data'

  const res = await authApi.authenticateApiAuthTokenPost({telegramInputData: telegramData})
  const data = res.accessToken

  if (data === undefined) return 'No data'
  
  localStorage.setItem('token', data)
  return data
}