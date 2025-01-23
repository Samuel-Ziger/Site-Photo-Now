import { http } from '@/lib/axios'
import { Order } from '@/types'

export interface EditorStatusOrderParams {
  orderId: number
}

export async function useEditorStatusOrder({
  orderId,
}: EditorStatusOrderParams) {
  const response = await http.patch<Order>(`/app/orders/${orderId}/editor`)

  return response.data
}
