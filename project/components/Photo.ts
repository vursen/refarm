import { Attribute, Tracked } from '@refarm/runtime/core'

export class Photo {
  @Attribute src: string
  @Attribute alt: string

  @Tracked isVisible = false

  onClick () {
    this.isVisible = true
  }
}
