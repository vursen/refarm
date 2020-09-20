import * as tsMorph from 'ts-morph'

import { Store } from '.'

export class StateDefinition {
  constructor (
    public node: tsMorph.PropertyDeclaration,
    public store: Store
  ) {}

  get name () {
    return this.node.getName()
  }
}
