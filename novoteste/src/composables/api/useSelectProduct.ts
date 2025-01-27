import { http } from '@/lib/axios'

export interface SelectProductParams {
  orderId: number
  productId: number
  quantity: number
  totemId: number
}

export async function useSelectProduct({
  orderId,
  productId,
  quantity,
  totemId,
}: SelectProductParams) {
  await http.post(`/totems/${totemId}/orders/${orderId}/select-product`, {
    productId,
    quantity,
  })
}
