import { http } from '@/lib/axios'
import { Order } from '@/types'

export interface RequestUploadOrderParams {
  orderId: number
}

export async function requestUploadOrder({
  orderId,
}: RequestUploadOrderParams) {
  const response = await http.patch<Order>(
    `/app/orders/${orderId}/request-upload`
  )

  return response.data
}
