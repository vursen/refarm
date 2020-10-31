import { Tracked } from '@refarm/runtime/core'

interface IItem {
  count: number
  productId: number
}

export class CartStore {
  @Tracked items: Record<number, IItem> = {}

  // @Tracked items: Record<number, IItem> = {}

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
