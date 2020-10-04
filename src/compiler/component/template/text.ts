import { TemplateNode } from 'svelte/types/compiler/interfaces';

import { Node } from './node';

import { Component } from '..'

export class Text extends Node {
  type = 'Text'

  value: string

  constructor (
    public rawNode: TemplateNode,
    public parent: Node | null,
    public component: Component
  ) {
    super(rawNode, parent, component)

    this.value = this.rawNode.raw
  }

  dump () {
    return {
      ...super.dump(),
      value: this.value
    }
  }
}
