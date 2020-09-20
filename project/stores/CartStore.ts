import { State } from '@refarm/runtime/core'

interface IItem {
  count: number
  productId: number
}

export class CartStore {
  @State items: Record<number, IItem> = {}

  constructor ({ items }) {
    this.items = items
  }

  hasItem (productId: number) {
    return Boolean(this.items[productId])
  }

  getItem (productId: number) {
    return this.items[productId]
  }

  getItemCount (productId: number) {
    return this.getItem(productId)?.count
  }

  addItem (productId: number) {
    if (this.hasItem(productId)) {
      this.items[productId].count += 1
      return
    }

    this.items[productId] = { productId, count: 1 }
  }

  removeItem (productId: number) {
    if (this.getItemCount(productId) > 1) {
      this.items[productId].count -= 1
      return
    }

    this.items[productId] = undefined
  }
}
