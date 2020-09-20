import * as tsMorph from 'ts-morph'

import { Component } from '.'

export class PropertyDefinition {
  constructor (
    public node: tsMorph.PropertyDeclaration,
    public component: Component
  ) {}

  get name () {
    return this.node.getName()
  }
}
