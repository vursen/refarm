import { Property, Computed, Inject } from '../core'

import { CartStore } from '../stores/cart'

export class AddToCart {
  @Inject cartStore: CartStore

  @Property productId: number
  @Property productTitle: string

  @Computed
  get hasInCart () {
    return this.cartStore.has(this.productId)
  }

  onClick () {
    this.cartStore.add(this.productId)
  }
}
