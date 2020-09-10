import * as tsMorph from 'ts-morph'

import { PageContext } from '../page-context'

import {
  isStoreClassDeclaration,
  isStoreStateDeclaration,
  isStoreInjectDeclaration
} from './utils'

import { StateDefinition } from './state-definition'
import { MethodDefinition } from './method-definition'

export class Store {
  injectedStores: Map<string, Store> = new Map()

  stateDefinitions: Map<string, StateDefinition> = new Map()

  methodDefinitions: Map<string, MethodDefinition> = new Map()

  constructor (
    public sourceFile: tsMorph.SourceFile,
    public pageContext: PageContext
  ) {}

  get name () {
    return this.sourceFile.getBaseNameWithoutExtension()
  }

  /**
   * The visitor
   */
  visit () {
    const classDeclaration = this.sourceFile.getClass(this.name)

    // 1. Visit state property declarations
    classDeclaration!.getInstanceMembers().forEach((member) => {
      if (isStoreStateDeclaration(member)) {
        this.visitStateDeclaration(member)
      }
    })

    // 2. Visit method declarations
    classDeclaration!.getInstanceMethods().forEach((member) => {
      this.visitMethodDeclaration(member)
    })

    // 3. Visit inject property declarations
    classDeclaration!.getInstanceMembers().forEach((member) => {
      if (isStoreInjectDeclaration(member)) {
        this.visitInjectDeclaration(member)
      }
    })

    // 4. Visit method definitions deeply
    ;[...this.methodDefinitions.values()].forEach((definition) => {
      definition.visit()
    })
  }

  /**
   * The visitor of inject property declarations
   *
   * ```
   * @Inject someDependency: someType
   * ```
   */
  visitInjectDeclaration (node: tsMorph.PropertyDeclaration) {
    const typeDeclaration = node.getType()?.getSymbol()?.getDeclarations()?.[0]

    if (typeDeclaration && isStoreClassDeclaration(typeDeclaration)) {
      const name = node.getName()
      const path = typeDeclaration.getSourceFile().getFilePath()

      this.injectedStores.set(
        name,
        this.pageContext.addStoreAtPath(path)
      )
    }
  }

  /**
   * The visitor of state property declarations
   *
   * ```
   * @State someProperty = []
   * ```
   */
  visitStateDeclaration (node: tsMorph.PropertyDeclaration) {
    const name = node.getName()

    this.stateDefinitions.set(
      name,
      new StateDefinition(node, this)
    )
  }

  /**
   * The visitor of method declarations
   *
   * ```
   * someMethod (...) { ... }
   * ```
   */
  visitMethodDeclaration (node: tsMorph.MethodDeclaration) {
    const name = node.getName()

    this.methodDefinitions.set(
      name,
      new MethodDefinition(node, this)
    )
  }
}
