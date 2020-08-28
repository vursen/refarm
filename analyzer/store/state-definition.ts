import * as ts from 'typescript'

import { Store } from '.'

export class StateDefinition {
  name: string

  constructor (
    public node: ts.PropertyDeclaration,
    public store: Store
  ) {
    this.name = (node.name as ts.StringLiteral).text
  }
}
