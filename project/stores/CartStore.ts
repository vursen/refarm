import { State, Action, Getter, Inject } from '@retro/runtime/core'

import { UserStore } from './UserStore'

export class CartStore {
  @Inject userStore: UserStore

  @State items = {}

  constructor ({ items }) {
    this.items = items
  }

  @Getter
  hasItem (productId: number) {
    return Boolean(this.items[productId])
  }

  @Getter
  getItem (productId: number) {
    return this.items[productId]
  }

  @Getter
  getItemCount (productId: number) {
    return this.getItem(productId)?.count
  }

  @Action
  addItem (productId: number) {
    if (this.hasItem(productId)) {
      this.items[productId].count += 1
      return
    }

    this.items[productId] = { productId, count: 1 }
  }

  @Action
  removeItem (productId: number) {
    if (this.getItemCount(productId) > 1) {
      this.items[productId].count -= 1
      return
    }

    this.items[productId] = undefined
  }
}
