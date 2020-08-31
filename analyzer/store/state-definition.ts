import * as ts from 'ts-morph'

import { Store } from '.'

export class StateDefinition {
  name: string

  constructor (
    public node: ts.PropertyDeclaration,
    public store: Store
  ) {
    this.name = node.getName()
  }
}
