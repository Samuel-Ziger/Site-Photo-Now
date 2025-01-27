import { Order, OrderItem } from '@/types'
import { defineStore } from 'pinia'

interface State {
  order?: Order
  currentOrderItem: OrderItem
}

export const useEditorStore = defineStore('editor', {
  state: (): State => ({
    order: {} as Order,
    currentOrderItem: {} as OrderItem,
  }),
  actions: {
    setOrder(order: Order) {
      this.order = order
      this.currentOrderItem = order.orderItems[0]
    },
    setCurrentOrderItem(orderItem: OrderItem) {
      this.currentOrderItem = orderItem
    },
  },
})
