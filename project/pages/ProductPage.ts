import { Property, Inject } from '@retro/runtime/core'

import { UserStore } from '@retro/project/stores/user'

export class ProductPage {
  @Inject userStore: UserStore

  @Property productId: number
  @Property productTitle: string
}
