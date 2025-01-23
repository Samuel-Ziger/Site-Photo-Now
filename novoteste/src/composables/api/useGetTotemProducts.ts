import { http } from '@/lib/axios'
import { Pagination, TotemProduct } from '@/types'
import { useQuery } from '@tanstack/vue-query'

export interface GetTotemProductsParams {
  totemId: number
}

export function useGetTotemProducts({ totemId }: GetTotemProductsParams) {
  return useQuery({
    queryKey: ['FETCH_TOTEM_PRODUCTS', totemId],
    queryFn: async () => {
      const response = await http.get<Pagination<TotemProduct>>(
        `/app/totems/${totemId}/products`
      )
      return response.data
    },
  })
}
