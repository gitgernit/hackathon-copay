import {c} from "@/shared/api"
import {TelegramInputData} from "@/shared/api/generated"

export const getToken = async (telegramData: TelegramInputData) => {
  if (telegramData === null || telegramData === undefined) return 'No data'

  const res = await fetch(c.basePath + '/api/auth/token', {
    body: JSON.stringify(telegramData),
    method: 'POST',
    
  })
  const data = await res.json()

  if (data === undefined) return 'No data'
  
  localStorage.setItem('token', data.access_token)
  return data.access_token
}