import { State, Inject, Getter } from '@retro/runtime/core'

import { CartStore } from './cart'

export class UserStore {
  @Inject cartStore: CartStore

  @State email = null
  @State lastName = null
  @State firstName = null

  constructor ({ email, lastName, firstName }) {
    this.email = email
    this.lastName = lastName
    this.firstName = firstName
  }

  @Getter
  get fullName () {
    return `${this.firstName} ${this.lastName}`
  }

  @Getter
  get cartItems () {
    return this.cartStore.items
  }
}
