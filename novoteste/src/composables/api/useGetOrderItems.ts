import { http } from '@/lib/axios'
import { OrderItem } from '@/types'
import { useQuery } from '@tanstack/vue-query'

export function useGetOrderItems(orderId: number) {
  return useQuery({
    queryKey: ['FETCH_ORDER_ITEMS', orderId],
    queryFn: async () => {
      const response = await http.get<OrderItem[]>(
        `/app/orders/${orderId}/order-items`
      )
      return response.data
    },
    retry: 1,
  })
}
