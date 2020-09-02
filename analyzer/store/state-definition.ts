import * as tsMorph from 'ts-morph'

import { Store } from '.'

export class StateDefinition {
  name: string

  constructor (
    public node: tsMorph.PropertyDeclaration,
    public store: Store
  ) {
    this.name = node.getName()
  }
}
