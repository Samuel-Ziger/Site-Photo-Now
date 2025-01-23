import { z } from 'zod'

export const envSchema = z.object({
  MODE: z.enum(['production', 'development', 'test']),
  VITE_API_URL: z.string().url(),
  VITE_PHOT_NOW_MOBILE_APP_BASE_URL: z.string().url(),
  VITE_ORDER_RESET_TIME: z.string().transform((value) => {
    const number = Number(value)
    if (isNaN(number)) {
      throw new Error('VITE_ORDER_RESET_TIME deve ser um número')
    }
    return number
  }),
  VITE_ENABLE_API_DELAY: z.string().transform((value) => value === 'true'),
})

export const env = envSchema.parse(import.meta.env)
