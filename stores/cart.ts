import { State, Action } from '../core'

export class CartStore {
  @State productIds: number[] = []

  has (productId: number) {
    return this.productIds.find((id) => productId === id)
  }

  @Action add (productId: number) {
    this.productIds.push(productId)
  }

  @Action remove (productId: number) {
    this.productIds = this.productIds.filter((id) => productId !== id)
  }
}
