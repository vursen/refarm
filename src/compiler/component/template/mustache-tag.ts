import { TemplateNode } from 'svelte/types/compiler/interfaces';

import { Node } from './node';
import { Expression } from './expression'

import { Component } from '..'

export class MustacheTag extends Node {
  type = 'MustacheTag'

  expression: Expression

  constructor (
    public rawNode: TemplateNode,
    public parent: Node | null,
    public component: Component
  ) {
    super(rawNode, parent, component)

    this.expression = new Expression(rawNode.expression, this, component)
  }

  dump () {
    return {
      ...super.dump(),
      expression: this.expression.dump()
    }
  }
}
