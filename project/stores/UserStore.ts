import { Inject } from '@refarm/runtime/core'

import { CartStore } from './CartStore'

export class UserStore {
  @Inject cartStore: CartStore

  get cartItemsCount () {
    return Object.keys(this.cartStore.items).length
  }
}
