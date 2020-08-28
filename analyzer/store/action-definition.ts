import * as ts from 'typescript'

import { Store } from '.'
import { StateDefinition } from './state-definition'

export class ActionDefinition {
  name: string

  /**
   * ```
   * @Action someAction () {
   *   this.someProperty = 'new value'
   *   this.someProperty++
   *   this.someProperty.anotherProperty = 'new value'
   * }
   * ```
   */
  changedStateDefinitions: Set<StateDefinition> = new Set()

  /**
   * ```
   * @Action someAction () {
   *   this.anotherAction()
   *   this.anotherStore.anotherAction()
   * }
   * ```
   */
  calledActionDefinitions: Set<ActionDefinition> = new Set()

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
