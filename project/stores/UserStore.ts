import { State, Inject, Getter } from '@refarm/runtime/core'

import { CartStore } from './CartStore'

export class UserStore {
  @Inject cartStore: CartStore

  @State email: string = null
  @State lastName: string = null
  @State firstName: string = null

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
