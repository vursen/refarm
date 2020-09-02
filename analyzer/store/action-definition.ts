import * as tsMorph from 'ts-morph'

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
    public node: tsMorph.MethodDeclaration,
    public store: Store
  ) {
    this.name = node.getName()
  }

  visit () {
    this.node.getBody().getDescendantsOfKind(tsMorph.SyntaxKind.BinaryExpression).forEach((node) => {
      if (
        node.getParentIfKind(tsMorph.SyntaxKind.ExpressionStatement) &&
        this.isAssignmentExpression(node)
      ) {
        this.visitAssignmentExpression(node)
      }
    })
  }

  visitAssignmentExpression (node: tsMorph.AssignmentExpression) {
    const targetNode = this.getTargetOfAssignmentExpression(node)

    if (this.isStatePropertyAccessExpression(targetNode)) {
      const stateDefinition = this.store.stateDefinitions.get(targetNode.getName())

      this.affectedStateDefinitions.add(stateDefinition)
    }
  }

  private isAssignmentExpression (node: tsMorph.BinaryExpression): node is tsMorph.AssignmentExpression {
    const operatorToken = node.getOperatorToken()

    return (
      operatorToken.getKind() >= tsMorph.SyntaxKind.FirstAssignment &&
      operatorToken.getKind() <= tsMorph.SyntaxKind.LastAssignment
    )
  }

  private getTargetOfAssignmentExpression (node: tsMorph.AssignmentExpression) {
    let target = node.getLeft()

    while (
      tsMorph.Node.isLeftHandSideExpressionedNode(target) &&
      tsMorph.Node.isThisExpression(target.getExpression()) === false
    ) {
      target = target.getExpression()
    }

    return target
  }

  private isStatePropertyAccessExpression (node: tsMorph.Node): node is tsMorph.PropertyAccessExpression {
    return (
      tsMorph.Node.isPropertyAccessExpression(node) &&
      this.store.stateDefinitions.has(node.getName())
    )
  }
}
