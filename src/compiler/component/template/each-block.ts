import { TemplateNode } from 'svelte/types/compiler/interfaces';

import { Node } from './node';

import { Component } from '..';
import { mapChildren } from '.';

export class EachBlock extends Node {
  type = 'EachBlock'

  constructor (
    public rawNode: TemplateNode,
    public parent: Node | null,
    public component: Component
  ) {
    super(rawNode, parent, component)

    this.children = mapChildren(component, this, rawNode.children ?? [])

    console.log(this.children)
  }
}
