import {c} from "@/shared/api"
import {TelegramInputData} from "@/shared/api/generated"

export const getToken = async (telegramData: TelegramInputData) => {
  if (telegramData === null || telegramData === undefined) return 'No data'

  let data: any = null

  try {
    
    const res = await fetch(c.basePath + '/api/auth/token', {
      body: JSON.stringify(telegramData),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await res.json()
  } catch (error) {
    return 'no data'
  }
  
  
  if (data === null) return 'No data'
  
  localStorage.setItem('token', data.access_token)
  return data.access_token
}