import { TemplateNode } from 'svelte/types/compiler/interfaces';

import { Node } from './node';
import { getNodeClass } from '.';

import { Component } from '..';

export class Attribute extends Node {
  type = 'Attribute'

  name: string

  value: Node

  constructor (
    public rawNode: TemplateNode,
    public parent: Node | null,
    public component: Component
  ) {
    super(rawNode, parent, component)

    const ValueNodeClass = getNodeClass(rawNode.value[0])

    if (ValueNodeClass) {
      this.value = new ValueNodeClass(rawNode.value[0], this, component)
    }

    this.name = this.rawNode.raw
  }

  dump () {
    return {
      ...super.dump(),
      name: this.name,
      value: this.value.dump()
    }
  }
}
