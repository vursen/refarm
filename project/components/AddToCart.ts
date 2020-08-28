import { Property, Inject } from '@runtime/core'

import { CartStore } from '@project/stores/cart'

export class AddToCart {
  @Inject cartStore: CartStore

  @Property productId: number
  @Property productTitle: string

  get hasInCart () {
    return this.cartStore.has(this.productId)
  }

  onClick () {
    this.cartStore.add(this.productId)
  }
}
