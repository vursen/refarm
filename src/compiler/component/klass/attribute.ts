import * as tsMorph from 'ts-morph'

import { Klass } from '.'

export class Attribute {
  constructor (
    public node: tsMorph.PropertyDeclaration,
    public klass: Klass
  ) {}

  get name () {
    return this.node.getName()
  }

  visit () {
    // TODO: Implement
  }
}

export function isAttributeDeclaration (node: tsMorph.Node): node is tsMorph.PropertyDeclaration {
  return Boolean(
    tsMorph.Node.isPropertyDeclaration(node) && node.getDecorator('Attribute')
  )
}
