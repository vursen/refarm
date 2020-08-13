import { Property, Inject, Component } from 'volga'

import { CartStore } from '../stores/cart'

@Component
export class AddToCart {
  @Property productId: number
  @Property productTitle: string

  @Inject(CartStore) cartStore: CartStore

  get hasInCart () {
    return this.cartStore.has(this.productId)
  }

  onClick () {
    this.cartStore.add(this.productId)
  }
}
