import { env } from '@/config/env-config'
import axios from 'axios'

export const http = axios.create({
  baseURL: env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

if (env.VITE_ENABLE_API_DELAY) {
  http.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 4000))
    )

    return config
  })
}
