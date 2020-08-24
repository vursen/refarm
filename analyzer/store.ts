// import * as path from 'path'
import * as ts from 'typescript'

import { PageContext } from './page-context'

export class Store {
  ast: ts.SourceFile = null

  state = new Map()

  actions = new Map()

  constructor (
    public storePath: string,
    public pageContext: PageContext
  ) {
    this.ast = this.pageContext.getSourceFile(this.storePath)

    this.visit()
  }

  visit () {
    this.ast.forEachChild((node) => {
      // TODO: Check on it is a store class declaration
      if (ts.isClassDeclaration(node)) {
        this.visitClassDeclaration(node)
      }
    })
  }

  visitClassDeclaration (node: ts.ClassDeclaration) {
    node.members.forEach((member) => {
      if (this.isActionMethodDeclaration(member)) {
        this.visitActionMethodDeclaration(member)
      }

      if (this.isStatePropertyDeclaration(member)) {
        this.visitStatePropertyDeclaration(member)
      }
    })
  }

  visitStatePropertyDeclaration (node: ts.PropertyDeclaration) {
    const name = node.name as ts.StringLiteral

    this.state.set(name.text, {
      node
    })
  }

  visitActionMethodDeclaration (node: ts.MethodDeclaration) {
    const name = node.name as ts.StringLiteral

    this.actions.set(name.text, {
      node
    })
  }

  /**
   * Is the node a state property declaration?
   */
  private isStatePropertyDeclaration (node: ts.Declaration): node is ts.PropertyDeclaration {
    return ts.isPropertyDeclaration(node) && this.hasDecorator(node, 'State')
  }

  /**
   * Is the node an action method declaration?
   */
  private isActionMethodDeclaration (node: ts.Declaration): node is ts.MethodDeclaration {
    return ts.isMethodDeclaration(node) && this.hasDecorator(node, 'Action')
  }

  /**
   * Does the node have the decorator?
   */
  private hasDecorator (node: ts.Node, decoratorName: string) {
    return node.decorators?.some(({ expression }) => {
      return ts.isIdentifier(expression) && expression.text === decoratorName
    })
  }
}

// function findStoreClassDeclaration(sourceFile: ts.SourceFile) {
//   return sourceFile.statements
//     .filter((node): node is ts.ClassDeclaration => {
//       return ts.isClassDeclaration(node)
//     })
//     .find((node) => {
//       return node.name.text === path.basename(sourceFile.fileName, '.ts')
//     })
// }
