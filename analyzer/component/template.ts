import * as svelte from 'svelte/compiler'
import * as tsMorph from 'ts-morph'
import { TemplateNode, Ast } from 'svelte/types/compiler/interfaces'

import { Component } from '.'

export class Template {
  html: TemplateNode

  constructor (
    public sourceFile: tsMorph.SourceFile,
    public component: Component
  ) {
    this.html = svelte.parse(this.sourceFile.getText()).html
  }

  visit () {
    this.html.children.forEach((node) => {
      if (this.isImportLink(node)) {
        this.visitImportLink(node)
      }

      // if (this.isStyleLink(node)) {
      //   this.visitStyleLink(node)
      // }
    })
  }

  visitImportLink (node: TemplateNode) {
    const href = node.attributes.find(({ name }) => name === 'href').value[0].data

    this.component.addImportedComponent(href)
  }

  private isImportLink (node: TemplateNode) {
    return (
      node.name === 'link' &&
      node.attributes.some(({ name, value }) => name === 'rel' && value[0].data === 'import')
    )
  }
}
