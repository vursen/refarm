import * as tsMorph from 'ts-morph'

import { Klass } from '.'

export class TrackedProperty {
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

export function isTrackedPropertyDeclaration (node: tsMorph.Node): node is tsMorph.PropertyDeclaration {
  return Boolean(
    tsMorph.Node.isMethodDeclaration(node) && node.getDecorator('Tracked')
  )
}
