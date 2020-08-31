import * as ts from 'ts-morph'

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
  affectedStateDefinitions: Set<StateDefinition> = new Set()

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
    this.name = node.getName()
  }

  visit () {

  }

  // TODO: Refactor
  // visitAssignmentExpression (node: ts.BinaryExpression) {
  //   const target = this.getTargetOfAssignmentExpression(node)

  //   if (this.isStatePropertyAccessExpression(target)) {
  //     const stateDefinition = this.store.stateDefinitions.get(target.name.text)

  //     this.affectedStateDefinitions.add(stateDefinition)
  //   }
  // }

  // private isAssignmentExpression (node: ts.Expression): node is ts.BinaryExpression {
  //   return (
  //     ts.isBinaryExpression(node) &&
  //     this.isAssignmentOperator(node.operatorToken.kind)
  //   )
  // }

  // private isAssignmentOperator (token: ts.SyntaxKind) {
  //   return (
  //     token >= ts.SyntaxKind.FirstAssignment &&
  //     token <= ts.SyntaxKind.LastAssignment
  //   )
  // }

  // // TODO: Refactor
  // private getTargetOfAssignmentExpression (node: ts.BinaryExpression) {
  //   let target = node.left

  //   while (
  //     // @ts-ignore
  //     target.expression &&
  //     // @ts-ignore
  //     target.expression.kind !== ts.SyntaxKind.ThisKeyword
  //   ) {
  //     // @ts-ignore
  //     target = node.expression
  //   }

  //   return target
  // }

  // // TODO: Refactor
  // private isStatePropertyAccessExpression (node: ts.Node): node is ts.PropertyAccessExpression {
  //   return (
  //     ts.isPropertyAccessExpression(node) &&
  //     ts.isIdentifier(node.name) &&
  //     this.store.stateDefinitions.has(node.name.text)
  //   )
  // }
}
