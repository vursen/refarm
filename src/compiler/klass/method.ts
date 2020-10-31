import * as tsMorph from 'ts-morph'

import { Klass } from '.'
import { TrackedProperty } from './tracked-property'

export class Method {
  /**
   * ```
   * method () {
   *   this.trackedProperty = 'new value'
   *   this.trackedProperty += 1
   *   this.trackedProperty.anotherTrackedProperty = 'new value'
   * }
   * ```
   */
  writedTrackedProperties: Set<TrackedProperty> = new Set()

  /**
   * ```
   * method () {
   *   const someVariable = this.trackedProperty
   * }
   * ```
   */
  readedTrackedProperties: Set<TrackedProperty> = new Set()

  /**
   * ```
   * method () {
   *   this.anotherMethod()
   *   this.trackedProperty.anotherMethod()
   * }
   * ```
   */
  calledMethods: Set<Method> = new Set()

  constructor (
    public node: tsMorph.MethodDeclaration,
    public klass: Klass
  ) {}

  get name () {
    return this.node.getName()
  }

  get body () {
    return this.node.getBody()
  }

  visit () {
    // TODO: Implement
    // this.body?.forEachDescendant((node) => {
    //   if (tsMorph.Node.isCallExpression(node)) {
    //     this.visitCallExpression(node)
    //   }

    //   if (this.isAssignmentExpression(node)) {
    //     this.visitAssignmentExpression(node)
    //   }
    // })
  }

  // visitCallExpression (node: tsMorph.CallExpression) {
  //   // this.someMethod( ... )
  //   if (this.isMethodCallExpression(node)) {
  //     this.visitMethodCallExpression(node)
  //   }

  //   // this.someKlass.someMethod( ... )
  //   if (this.isInjectedKlassMethodCallExpression(node)) {
  //     this.visitInjectedKlassMethodCallExpression(node)
  //   }
  // }

  // visitMethodCallExpression (node: tsMorph.CallExpression) {
  //   const callee = node.getExpression() as tsMorph.PropertyAccessExpression

  //   const methodDefinition = this.klass.methods.get(callee.getName())!

  //   this.calledMethods.add(methodDefinition)
  // }

  // visitInjectedKlassMethodCallExpression (node: tsMorph.CallExpression) {
  //   const callee = node.getExpression() as tsMorph.PropertyAccessExpression
  //   const object = callee.getExpression() as tsMorph.PropertyAccessExpression

  //   const injectedKlass = this.klass.trackedProperties.get(object.getName())!

  //   const methodDefinition = injectedKlass.methods.get(callee.getName())!

  //   this.calledMethods.add(methodDefinition)
  // }

  // visitAssignmentExpression (node: tsMorph.AssignmentExpression) {
  //   const target = this.getTargetOfAssignmentExpression(node)

  //   // this.someProperty
  //   if (this.isStateAccessExpression(target)) {
  //     const stateDefinition = this.klass.trackedProperties.get(target.getName())!

  //     this.writedTrackedProperties.add(stateDefinition)
  //   }
  // }

  // private getTargetOfAssignmentExpression (node: tsMorph.AssignmentExpression) {
  //   let target = node.getLeft()

  //   while (
  //     tsMorph.Node.isLeftHandSideExpressionedNode(target) &&
  //     tsMorph.Node.isThisExpression(target.getExpression()) === false
  //   ) {
  //     target = target.getExpression()
  //   }

  //   return target
  // }

  // private isAssignmentExpression (node: tsMorph.Node): node is tsMorph.AssignmentExpression {
  //   if (!tsMorph.Node.isBinaryExpression(node)) {
  //     return false
  //   }

  //   const operatorToken = node.getOperatorToken()

  //   return Boolean(
  //     operatorToken.getKind() >= tsMorph.SyntaxKind.FirstAssignment &&
  //     operatorToken.getKind() <= tsMorph.SyntaxKind.LastAssignment
  //   )
  // }

  // private isMethodCallExpression (node: tsMorph.Node): node is tsMorph.CallExpression {
  //   if (!tsMorph.Node.isCallExpression(node)) {
  //     return false
  //   }

  //   const callee = node.getExpression()

  //   return Boolean(
  //     tsMorph.Node.isPropertyAccessExpression(callee) &&
  //     tsMorph.Node.isThisExpression(callee.getExpression()) &&
  //     this.klass.methods.has(callee.getName())
  //   )
  // }

  // private isInjectedKlassMethodCallExpression (node: tsMorph.Node): node is tsMorph.CallExpression {
  //   if (!tsMorph.Node.isCallExpression(node)) {
  //     return false
  //   }

  //   const callee = node.getExpression()

  //   if (!tsMorph.Node.isPropertyAccessExpression(callee)) {
  //     return false
  //   }

  //   const expression = callee.getExpression()

  //   return Boolean(
  //     tsMorph.Node.isPropertyAccessExpression(expression) &&
  //     tsMorph.Node.isThisExpression(expression.getExpression()) &&
  //     this.klass.trackedProperties.get(expression.getName())?.methods?.has(callee.getName())
  //   )
  // }

  // private isStateAccessExpression (node: tsMorph.Node): node is tsMorph.PropertyAccessExpression {
  //   return Boolean(
  //     tsMorph.Node.isPropertyAccessExpression(node) &&
  //     tsMorph.Node.isThisExpression(node.getExpression()) &&
  //     this.klass.trackedProperties.has(node.getName())
  //   )
  // }
}

export function isMethodDeclaration (node: tsMorph.Node): node is tsMorph.MethodDeclaration {
  return Boolean(
    tsMorph.Node.isMethodDeclaration(node)
  )
}
