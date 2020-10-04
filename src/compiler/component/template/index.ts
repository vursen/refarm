import * as tsMorph from 'ts-morph'
import * as svelte from 'svelte/compiler'
import { TemplateNode } from 'svelte/types/compiler/interfaces'

import { Component } from '..'

import { Node } from './node'
// import { Text } from './text'
import { Text } from './text'
import { Element } from './element'
import { IfBlock } from './if-block'
import { EachBlock } from './each-block'
import { MustacheTag } from './mustache-tag'
import { InlineComponent } from './inline-component'

export class Template {
  ast: Array<Node | undefined>

  constructor (
    public sourceFile: tsMorph.SourceFile,
    public component: Component
  ) {
    const { html } = svelte.parse(this.sourceFile.getText())

    this.ast = mapChildren(this.component, null, html.children ?? [])
  }

  dump () {
    return this.ast.map((node) => node?.dump())
  }
}

export function getNodeClass (rawNode: TemplateNode): typeof Node | null {
  switch (rawNode.type) {
    case 'EachBlock':
      return EachBlock
    case 'Element':
      return Element
    case 'IfBlock':
      return IfBlock
    case 'InlineComponent':
      return InlineComponent
    case 'MustacheTag':
      return MustacheTag
    case 'Text':
      return Text
    default:
      return null
  }
}

export function mapChildren (component: Component, parent: Node | null, children: TemplateNode[]) {
  return children.map((rawNode) => {
    const NodeClass = getNodeClass(rawNode)

    if (NodeClass) {
      return new NodeClass(
        rawNode,
        parent,
        component
      )
    }
  })
}
