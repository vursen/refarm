import * as tsMorph from 'ts-morph'

import { Component } from '.'

export class PropertyDefinition {
  name: string

  constructor (
    public node: tsMorph.PropertyDeclaration,
    public component: Component
  ) {
    this.name = node.getName()
  }

  visit () {
    // @TODO: Implement
  }
}
