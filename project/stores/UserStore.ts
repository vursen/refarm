import { Tracked } from '@refarm/runtime/core'

import { CartStore } from './CartStore'

export class UserStore {
  @Tracked cartStore: CartStore

  get cartItemsCount () {
    return Object.keys(this.cartStore.items).length
  }
}
