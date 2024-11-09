import { authApi } from "@/shared/api"
import { TelegramInputData } from "@/shared/api/generated"

export const getToken = async (telegramData: TelegramInputData) => {
  if (telegramData === null || telegramData === undefined) return 'No data'

  const res = await authApi.authenticateApiAuthTokenPostRaw({
    telegramInputData: telegramData,
  })
  const data = await res.value()

  if (data === undefined) return 'No data'
  
  localStorage.setItem('token', data.accessToken)
  return data.accessToken
}