import { Attribute } from '/../src/runtime/core'

export class ProductPage {
  @Attribute productId: number
  @Attribute productTitle: string
  @Attribute productPhotos: string[]
}
