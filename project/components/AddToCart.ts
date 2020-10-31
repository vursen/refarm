import { Attribute, Tracked, onMount, onDestroy } from '@refarm/runtime/core'

import { CartStore } from '../stores/CartStore'

class VisibilityObserver {
  constructor () {
    onMount(() => {

    })

    onDestroy(() => {

    })
  }
}

export class AddToCart {
  @Attribute productId: number
  @Attribute productTitle: string

  @Tracked cartStore: CartStore
  @Tracked visibilityObserver: VisibilityObserver

  constructor () {
    this.visibilityObserver = new VisibilityObserver()

    onMount(() => {

    })

    onDestroy(() => {

    })
    // watch(this, 'productId', () => {
    //   this.items.setProductId(this.productId)
    // })

    // watch(this, 'productTitle', () => {
    //   this.state.setProductTitle(this.productTitle)
    // })
  }

  get hasCartItem () {
    return this.cartStore.hasItem(this.productId)
  }

  get cartItemCount () {
    return this.cartStore.getItemCount(this.productId)
  }

  onClick () {
    this.cartStore.addItem(this.productId)
  }
}
