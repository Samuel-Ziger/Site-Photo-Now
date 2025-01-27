import { http } from '@/lib/axios'

export interface RevokeOrderParams {
  orderId: number
}

export async function revokeOrder({ orderId }: RevokeOrderParams) {
  await http.patch(`/orders/${orderId}/revoke`)
}
