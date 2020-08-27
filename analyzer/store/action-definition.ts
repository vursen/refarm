import * as ts from 'typescript'

import { Store } from './store'
import { StateDefinition } from './state-definition'

export class ActionDefinition {
  name: string

  stateDefinitionReferences: StateDefinition[] = []

  constructor (
    public node: ts.MethodDeclaration,
    public store: Store
  ) {
    this.name = (node.name as ts.StringLiteral).text
  }

  visit () {
    console.log(this.node.body)
  }
}
