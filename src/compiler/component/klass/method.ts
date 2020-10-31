import * as tsMorph from 'ts-morph'

import { Method as BaseMethod } from '../../klass/method'
import { Attribute } from './attribute'

export class Method extends BaseMethod {
  readedAttributes: Set<Attribute> = new Set()

  visit () {
    super.visit()

    this.body?.forEachDescendant((node) => {
      // ...
    })
  }
}
