import * as tsMorph from 'ts-morph'

import { PageContext } from '../page-context'

import {
  isStoreClassDeclaration,
  isStoreActionMethodDeclaration,
  isStoreStatePropertyDeclaration,
  isStoreInjectPropertyDeclaration
} from './utils'

import { StateDefinition } from './state-definition'
import { ActionDefinition } from './action-definition'

export class Store {
  injectedStores: Map<string, Store> = new Map()

  stateDefinitions: Map<string, StateDefinition> = new Map()

  actionDefinitions: Map<string, ActionDefinition> = new Map()

  constructor (
    public sourceFile: tsMorph.SourceFile,
    public pageContext: PageContext
  ) {}

  get name () {
    return this.sourceFile.getBaseNameWithoutExtension()
  }

  visit () {
    this.sourceFile.getClass(this.name).forEachChild((member) => {
      if (isStoreActionMethodDeclaration(member)) {
        this.visitActionMethodDeclaration(member)
      }

      if (isStoreStatePropertyDeclaration(member)) {
        this.visitStatePropertyDeclaration(member)
      }

      if (isStoreInjectPropertyDeclaration(member)) {
        this.visitInjectPropertyDeclaration(member)
      }
    })

    this.visitActionDefinitions()
  }

  /**
   * The visitor of state property declarations
   *
   * ```
   * @State someProperty = []
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
   * The visitor of action method declarations
   *
   * ```
   * @Action someAction (...) { ... }
   * ```
   */
  visitActionMethodDeclaration (node: tsMorph.MethodDeclaration) {
    const name = node.getName()

    this.actionDefinitions.set(
      name,
      new ActionDefinition(node, this)
    )
  }

  /**
   * The visitor of inject property declarations
   *
   * ```
   * @Inject someDependency: someType
   * ```
   */
  visitInjectPropertyDeclaration (node: tsMorph.PropertyDeclaration) {
    const name = node.getName()
    const typeDeclaration = node.getType()?.getSymbol()?.getDeclarations()?.[0]

    if (isStoreClassDeclaration(typeDeclaration)) {
      const storePath = typeDeclaration.getSourceFile().getFilePath()

      this.injectedStores.set(
        name,
        this.pageContext.addStoreAtPath(storePath)
      )
    }
  }

  visitActionDefinitions () {
    for (const [_name, definition] of this.actionDefinitions) {
      definition.visit()
    }
  }
}
