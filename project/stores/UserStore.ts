import { State, Inject } from '@refarm/runtime/core'

import { CartStore } from './CartStore'

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

  get fullName () {
    return `${this.firstName} ${this.lastName}`
  }

  get cartItems () {
    return this.cartStore.items
  }
}
