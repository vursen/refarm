import { TemplateNode } from 'svelte/types/compiler/interfaces'
import { Node as ESNode } from 'estree'

import { Component } from '..';

export class Node {
  type: string

  children: Array<Node | undefined> = []

  constructor (
    public rawNode: TemplateNode | ESNode,
    public parent: Node | null,
    public component: Component
  ) {

  }

  dump () {
    return {
      type: this.type,
      children: this.children.map((node) => node?.dump())
    }
  }
}
