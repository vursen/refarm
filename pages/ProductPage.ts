import { Property, Component } from '../core'

@Component
export class ProductPage {
  @Property productId: number
  @Property productTitle: string
}

export { AddToCart } from '../components/AddToCart'
