import { http } from '@/lib/axios'
import { Totem } from '@/types'

export async function useGetTotem(totemId: number) {
  const response = await http.get<Totem>(`/totems/${totemId}`)
  return response.data
}
