import { http } from '@/lib/axios'
import { Order } from '@/types'

export interface CompleteOrderParams {
  orderId: number
  totemId: number
}

export async function useCompleteOrder({
  orderId,
  totemId,
}: CompleteOrderParams) {
  const response = await http.post<Order>(
    `/totems/${totemId}/orders/${orderId}/complete-order`,
    {
      orderId,
      totemId,
    }
  )
  return response.data
}
