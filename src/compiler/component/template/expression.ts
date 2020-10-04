import { Node as ESNode } from 'estree'

import { Component } from '..'
import { Node } from './node'

export class Expression extends Node {
  type = 'Expression'

  ast: ESNode

  constructor (
    public rawNode: ESNode,
    public parent: Node | null,
    public component: Component
  ) {
    super(rawNode, parent, component)

    this.ast = rawNode
  }

  dump () {
    return {
      ...super.dump(),
      ast: this.ast
    }
  }
}
