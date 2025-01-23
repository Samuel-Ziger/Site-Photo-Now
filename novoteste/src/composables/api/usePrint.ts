import { PhotoType } from '@/types'
import axios from 'axios'

export interface PrintParams {
  photos: string[]
  type: PhotoType
}

export async function usePrint({ photos, type }: PrintParams) {
  const response = await axios.post(`http://localhost:9000/v1/printer`, {
    fotosUrl: photos,
    tipo: type,
  })
  return response.data
}
