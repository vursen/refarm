import { Property, Inject } from '@runtime/core'

import { UserStore } from '@project/stores/user'

export class ProductPage {
  @Inject userStore: UserStore

  @Property productId: number
  @Property productTitle: string
}
