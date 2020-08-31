import {
  SourceFile,
  Node,
  ClassDeclaration,
  PropertyDeclaration,
 } from 'ts-morph'

import * as ts from 'ts-morph'

import { PageContext } from '../page-context'

import { StateDefinition } from './state-definition'
import { ActionDefinition } from './action-definition'

export class Store {
  ast: ts.SourceFile

  stateDefinitions: Map<string, StateDefinition> = new Map()
  actionDefinitions: Map<string, ActionDefinition> = new Map()

  constructor (
    public storePath: string,
    public pageContext: PageContext
  ) {
    this.ast = this.pageContext.addSourceFile(this.storePath)

    this.visit()
  }

  visit () {
    this.ast.forEachChild((node) => {
      // TODO: Check on it is a store class declaration
      if (Node.isClassDeclaration(node)) {
        this.visitClassDeclaration(node)
      }
    })

    this.visitActionDefinitions()
  }

  visitClassDeclaration (node: ts.ClassDeclaration) {
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
  visitStatePropertyDeclaration (node: ts.PropertyDeclaration) {
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
  visitActionMethodDeclaration (node: ts.MethodDeclaration) {
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
  private isStatePropertyDeclaration (node: ts.Node): node is ts.PropertyDeclaration {
    return ts.Node.isPropertyDeclaration(node) && node.getDecorator('State') !== undefined
  }

  /**
   * Is the node an action method declaration?
   */
  private isActionMethodDeclaration (node: ts.Node): node is ts.MethodDeclaration {
    return ts.Node.isMethodDeclaration(node) && node.getDecorator('Action') !== undefined
  }

  /**
   * Does the node have the decorator?
   */
  // private hasDecorator (node: ts.Node, decoratorName: string) {
  //   return node.decorators?.some(({ expression }) => {
  //     return ts.isIdentifier(expression) && expression.text === decoratorName
  //   })
  // }
}
