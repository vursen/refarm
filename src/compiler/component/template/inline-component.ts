import { TemplateNode } from 'svelte/types/compiler/interfaces';
// import { mapChildren } from '.';

import { Component } from '..';
import { Node } from './node';

export class InlineComponent extends Node {
  type = 'InlineComponent'

  constructor (
    public rawNode: TemplateNode,
    public parent: Node | null,
    public component: Component
  ) {
    super(rawNode, parent, component)

    // this.children = mapChildren(component, this, rawNode.children ?? [])
  }
}
