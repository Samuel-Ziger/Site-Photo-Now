export interface Totem {
  id: number
  createdAt: string
  updatedAt: string
  deletedAt?: string
  identifier: string
  name: string
  description: string
  anyDeskId?: string
  anyDeskPassword?: string
  postalCode: string
  street: string
  complement: string
  neighborhood: string
  city: string
  state: string
  number: string
  isPaymentEnabled: boolean
}

export interface TotemProduct {
  id: number
  price: number
  enabled: boolean
  product: Product
  createdAt: number
  updatedAt: number
}

export interface Product {
  id: number
  name: string
  picture: string
  description: string
  price: number
  taxon: Taxon
  createdAt: number
  updatedAt: number
}

export interface Taxon {
  id: number
  name: string
  code: string
  description: string
  createdAt: number
  updatedAt: number
}

export interface Pagination<T> {
  content: T[]
  pageable: Pageable
  totalElements: number
  totalPages: number
  last: boolean
  first: boolean
  size: number
  number: number
  sort: Sort
  numberOfElements: number
  empty: boolean
}

export interface Pageable {
  pageNumber: number
  pageSize: number
  sort: Sort
  offset: number
  paged: boolean
  unpaged: boolean
}

export interface Sort {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}

export interface Order {
  id: number
  total: string
  status: string
  finishedAt?: string
  totem: Totem
  paymentMethod?: PaymentMethod
  orderItems: OrderItem[]
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: number
  createdAt: string
  updatedAt: string
  deletedAt?: string
  price: number
  product: Product
  originalPictureUrl?: string
  editedPictureUrl?: string
  source: string
}

export interface PaymentMethod {
  id: number
  createdAt: string
  updatedAt: string
  deletedAt: string
  name: string
  code: string
  enabled: boolean
}

export enum PhotoType {
  POLAROID = 'POLAROID',
}

export interface HttpResponse<T> {
  data: T
}
