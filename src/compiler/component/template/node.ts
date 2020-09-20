import { TemplateNode } from 'svelte/types/compiler/interfaces'

import { Component } from '..';

export class Node {
  type: string

  children: Array<Node | undefined>

  constructor (
    public rawNode: TemplateNode,
    public parent: Node | null,
    public component: Component
  ) {

  }
}
