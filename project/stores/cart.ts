import { State, Action, Getter } from '@runtime/core'

export class CartStore {
  @State productIds: number[] = []

  constructor ({ productIds }) {
    this.productIds = productIds
  }

  @Getter
  has (productId: number) {
    return this.productIds.find((id) => productId === id)
  }

  @Action
  add (productId: number) {
    this.productIds = [...this.productIds, productId]
  }

  @Action
  remove (productId: number) {
    this.productIds = this.productIds.filter((id) => productId !== id)
  }
}
