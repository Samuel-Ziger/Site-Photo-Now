import { http } from '@/lib/axios'
import { Totem } from '@/types'

export interface useLoginParams {
  identifier: string
  password: string
}

export interface useLoginResponse {
  accessToken: string
  sessionId: number
  totem: Totem
}

export async function useLogin({ identifier, password }: useLoginParams) {
  const response = await http.post<useLoginResponse>('/auth/login/totem', {
    identifier,
    password,
  })
  return response.data
}
