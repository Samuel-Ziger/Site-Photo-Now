import { http } from '@/lib/axios'
import { Order } from '@/types'

export async function useGetOrder(totemId: number, orderId: number) {
  const response = await http.get<Order>(`/totems/${totemId}/orders/${orderId}`)
  return response.data
}
