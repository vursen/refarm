import { Property, Inject } from '@refarm/runtime/core'

import { CartStore } from '../stores/CartStore'

export class AddToCart {
  @Inject cartStore: CartStore

  @Property productId: number
  @Property productTitle: string

  get hasCartItem () {
    return this.cartStore.hasItem(this.productId)
  }

  get cartItemCount () {
    return this.cartStore.getItemCount(this.productId)
  }

  onClick () {
    this.cartStore.addItem(this.productId)
  }
}
