import { Property, Inject } from '@retro/runtime/core'

import { UserStore } from '../stores/UserStore'

export class ProductPage {
  @Inject userStore: UserStore

  @Property productId
  @Property productTitle
  @Property productPhotos
}
