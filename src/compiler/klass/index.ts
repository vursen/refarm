import * as tsMorph from 'ts-morph'

import { Context } from '../context'

import { Method, isMethodDeclaration } from './method'
import { TrackedProperty, isTrackedPropertyDeclaration } from './tracked-property'

export class Klass {
  methods: Map<Method['name'], Method>

  trackedProperties: Map<TrackedProperty['name'], TrackedProperty>

  constructor (
    public node: tsMorph.ClassDeclaration,
    public context: Context
  ) {}

  get name () {
    return this.node.getName()
  }

  visit () {
    for (const member of this.node.getInstanceMembers()) {
      if (isTrackedPropertyDeclaration(member)) {
        this.visitTrackedPropertyDeclaration(member)
      }

      if (isMethodDeclaration(member)) {
        this.visitMethodDeclaration(member)
      }
    }
  }

  visitDeeply () {
    for (const trackedProperty of this.trackedProperties.values()) {
      trackedProperty.visit()
    }

    for (const method of this.methods.values()) {
      method.visit()
    }
  }

  visitMethodDeclaration (node: tsMorph.MethodDeclaration) {
    const method = new Method(
      node,
      this
    )

    this.methods.set(method.name, method)
  }

  visitTrackedPropertyDeclaration (node: tsMorph.PropertyDeclaration) {
    const trackedProperty = new TrackedProperty(
      node,
      this
    )

    this.trackedProperties.set(trackedProperty.name, trackedProperty)
  }

  // TODO: Remove
  // visitInjectDeclaration (node: tsMorph.PropertyDeclaration) {
  //   const typeDeclaration = node.getType()?.getSymbol()?.getDeclarations()?.[0]

  //   if (typeDeclaration && isStoreClassDeclaration(typeDeclaration)) {
  //     const name = node.getName()
  //     const path = typeDeclaration.getSourceFile().getFilePath()

  //     this.injectedStores.set(
  //       name,
  //       this.context.addStoreAtPath(path)
  //     )
  //   }
  // }
}
