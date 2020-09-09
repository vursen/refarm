import * as tsMorph from 'ts-morph'

import { Store } from '.'
import { StateDefinition } from './state-definition'

export class MethodDefinition {
  /**
   * ```
   * someMethod () {
   *   this.someProperty = 'new value'
   *   this.someProperty += 1
   *   this.someProperty.anotherProperty = 'new value'
   * }
   * ```
   */
  writedStateDefinitions: Set<StateDefinition> = new Set()

  /**
   * ```
   * someMethod () {
   *   const someVariable = this.someProperty
   * }
   * ```
   */
  readedStateDefinitions: Set<StateDefinition> = new Set()

  /**
   * ```
   * someMethod () {
   *   this.anotherMethod()
   *   this.anotherStore.anotherMethod()
   * }
   * ```
   */
  calledMethodDefinitions: Set<MethodDefinition> = new Set()

  constructor (
    public node: tsMorph.MethodDeclaration,
    public store: Store
  ) {}

  get name () {
    return this.node.getName()
  }

  visit () {
    this.node.getBody().forEachDescendant((node) => {
      if (tsMorph.Node.isCallExpression(node)) {
        this.visitCallExpression(node)
      }

      if (this.isAssignmentExpression(node)) {
        this.visitAssignmentExpression(node)
      }
    })
  }

  visitCallExpression (node: tsMorph.CallExpression) {
    // this.someMethod( ... )
    if (this.isMethodCallExpression(node)) {
      this.visitMethodCallExpression(node)
    }

    // this.someStore.someMethod( ... )
    if (this.isInjectedStoreMethodCallExpression(node)) {
      this.visitInjectedStoreMethodCallExpression(node)
    }
  }

  visitMethodCallExpression (node: tsMorph.CallExpression) {
    const callee = node.getExpression() as tsMorph.PropertyAccessExpression

    const methodDefinition = this.store.methodDefinitions.get(callee.getName())

    this.calledMethodDefinitions.add(methodDefinition)
  }

  visitInjectedStoreMethodCallExpression (node: tsMorph.CallExpression) {
    const callee = node.getExpression() as tsMorph.PropertyAccessExpression
    const object = callee.getExpression() as tsMorph.PropertyAccessExpression

    const injectedStore = this.store.injectedStores.get(object.getName())

    const methodDefinition = injectedStore.methodDefinitions.get(callee.getName())

    this.calledMethodDefinitions.add(methodDefinition)
  }

  visitAssignmentExpression (node: tsMorph.AssignmentExpression) {
    const target = this.getTargetOfAssignmentExpression(node)

    // this.someProperty
    if (this.isStateAccessExpression(target)) {
      const stateDefinition = this.store.stateDefinitions.get(target.getName())

      this.writedStateDefinitions.add(stateDefinition)
    }
  }

  private isAssignmentExpression (node: tsMorph.Node): node is tsMorph.AssignmentExpression {
    if (!tsMorph.Node.isBinaryExpression(node)) {
      return false
    }

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

  private isMethodCallExpression (node: tsMorph.Node): node is tsMorph.CallExpression {
    if (!tsMorph.Node.isCallExpression(node)) {
      return false
    }

    const callee = node.getExpression()

    return (
      tsMorph.Node.isPropertyAccessExpression(callee) &&
      tsMorph.Node.isThisExpression(callee.getExpression()) &&
      this.store.methodDefinitions.has(callee.getName())
    )
  }

  private isInjectedStoreMethodCallExpression (node: tsMorph.Node): node is tsMorph.CallExpression {
    if (!tsMorph.Node.isCallExpression(node)) {
      return false
    }

    const callee = node.getExpression()

    if (!tsMorph.Node.isPropertyAccessExpression(callee)) {
      return false
    }

    const expression = callee.getExpression()

    return (
      tsMorph.Node.isPropertyAccessExpression(expression) &&
      tsMorph.Node.isThisExpression(expression.getExpression()) &&
      this.store.injectedStores.get(expression.getName())?.methodDefinitions?.has(callee.getName())
    )
  }

  private isStateAccessExpression (node: tsMorph.Node): node is tsMorph.PropertyAccessExpression {
    return (
      tsMorph.Node.isPropertyAccessExpression(node) &&
      tsMorph.Node.isThisExpression(node.getExpression()) &&
      this.store.stateDefinitions.has(node.getName())
    )
  }
}
