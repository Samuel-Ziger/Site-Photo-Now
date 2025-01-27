import { http } from '@/lib/axios'
import { Order } from '@/types'

export interface useStartOrderParams {
  totemId: number
}

export async function useStartOrder({ totemId }: useStartOrderParams) {
  const response = await http.post<Order>(`/totems/${totemId}/orders`)
  return response.data
}
