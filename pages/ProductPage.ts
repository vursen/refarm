import { Property, Component } from 'ecohtml'

@Component
export class ProductPage {
  @Property productId: number
  @Property productTitle: string
}

export { AddToCart } from '../components/AddToCart'
