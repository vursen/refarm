import { Method } from '@refarm/compiler/klass/method'
import * as tsMorph from 'ts-morph'

import { Klass as BaseKlass } from '../../klass'

import { Attribute, isAttributeDeclaration } from './attribute'

export class Klass extends BaseKlass {
  attributes: Map<Attribute['name'], Attribute> = new Map()

  visit () {
    super.visit()

    for (const member of this.node.getInstanceMembers()) {
      if (isAttributeDeclaration(member)) {
        this.visitAttributeDeclaration(member)
      }
    }
  }

  visitDeeply () {
    super.visitDeeply()

    for (const attribute of this.attributes.values()) {
      attribute.visit()
    }
  }

  visitMethodDeclaration (node: tsMorph.MethodDeclaration) {
    const method = new Method(
      node,
      this
    )

    this.methods.set(method.name, method)
  }

  visitAttributeDeclaration (node: tsMorph.PropertyDeclaration) {
    const attribute = new Attribute(
      node,
      this
    )

    this.attributes.set(attribute.name, attribute)
  }
}
