import { http } from '@/lib/axios'

export interface ProductSelectionOrderParams {
  orderId: number
}

export async function productSelectionOrder({
  orderId,
}: ProductSelectionOrderParams) {
  await http.patch(`/app/orders/${orderId}/product-selection`)
}
