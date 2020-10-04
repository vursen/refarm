import { TemplateNode } from 'svelte/types/compiler/interfaces';

import { Node } from './node';
import { Attribute } from './attribute';

import { mapChildren } from '.';
import { Component } from '..';

export class Element extends Node {
  type = 'Element'

  attributes: Attribute[] = []

  constructor (
    public rawNode: TemplateNode,
    public parent: Node | null,
    public component: Component
  ) {
    super(rawNode, parent, component)

    rawNode.attributes.forEach((rawNode) => {
      switch (rawNode.type) {
        case 'Attribute':
          this.attributes.push(new Attribute(
            rawNode,
            this,
            this.component
          ))
          break
        default:
          throw new Error(`Not implemented ${rawNode.type}`)
      }
    })

    this.children = mapChildren(component, this, rawNode.children ?? [])
  }

  dump () {
    return {
      ...super.dump(),
      attributes: this.attributes.map((node) => node.dump())
    }
  }
}
