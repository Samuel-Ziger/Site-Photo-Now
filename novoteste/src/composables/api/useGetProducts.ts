import { http } from '@/lib/axios'
import { Pagination, Product } from '@/types'

export async function useGetProducts(totemId: number) {
  const response = await http.get<Pagination<Product>>(
    `/totems/${totemId}/products`
  )
  return response.data
}
