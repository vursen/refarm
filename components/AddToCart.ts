import { Property, Inject, Getter, Action, Component } from 'ecohtml'

import { CartStore } from '../stores/cart'

@Component
export class AddToCart {
  @Property productId: number
  @Property productTitle: string

  @Inject(CartStore) cartStore: CartStore

  @Getter hasInCart () {
    return this.cartStore.has(this.productId)
  }

  @Action onClick () {
    this.cartStore.add(this.productId)
  }
}
