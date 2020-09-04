import * as tsMorph from 'ts-morph'

import { PageContext } from '../page-context'

import { StateDefinition } from './state-definition'
import { ActionDefinition } from './action-definition'

export class Store {
  stateDefinitions: Map<string, StateDefinition> = new Map()
  actionDefinitions: Map<string, ActionDefinition> = new Map()

  constructor (
    public ast: tsMorph.SourceFile,
    public pageContext: PageContext
  ) {}

  visit () {
    this.ast.forEachChild((node) => {
      // TODO: Check on it is a store class declaration
      if (tsMorph.Node.isClassDeclaration(node)) {
        this.visitClassDeclaration(node)
      }
    })

    this.visitActionDefinitions()
  }

  visitClassDeclaration (node: tsMorph.ClassDeclaration) {
    node.forEachChild((member) => {
      if (this.isActionMethodDeclaration(member)) {
        this.visitActionMethodDeclaration(member)
      }

      if (this.isStatePropertyDeclaration(member)) {
        this.visitStatePropertyDeclaration(member)
      }
    })
  }

  /**
   * Example:
   *
   * ```
   * @Property productIds = []
   * ```
   */
  visitStatePropertyDeclaration (node: tsMorph.PropertyDeclaration) {
    const name = node.getName()

    this.stateDefinitions.set(
      name,
      new StateDefinition(node, this)
    )
  }

  /**
   * Example:
   *
   * ```
   * @Action add (...) {
   *  ...
   * }
   * ```
   */
  visitActionMethodDeclaration (node: tsMorph.MethodDeclaration) {
    const name = node.getName()

    this.actionDefinitions.set(
      name,
      new ActionDefinition(node, this)
    )
  }

  visitActionDefinitions () {
    for (const [_name, definition] of this.actionDefinitions) {
      definition.visit()
    }
  }

  /**
   * Is the node a state property declaration?
   */
  private isStatePropertyDeclaration (node: tsMorph.Node): node is tsMorph.PropertyDeclaration {
    return (
      tsMorph.Node.isPropertyDeclaration(node) && node.getDecorator('State') !== undefined
    )
  }

  /**
   * Is the node an action method declaration?
   */
  private isActionMethodDeclaration (node: tsMorph.Node): node is tsMorph.MethodDeclaration {
    return (
      tsMorph.Node.isMethodDeclaration(node) && node.getDecorator('Action') !== undefined
    )
  }
}
