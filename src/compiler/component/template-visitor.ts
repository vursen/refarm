import * as svelte from 'svelte/compiler'
import * as tsMorph from 'ts-morph'
import { TemplateNode } from 'svelte/types/compiler/interfaces'

import { Component } from '.'

export class TemplateVisitor {
  static visit (...args: ConstructorParameters<typeof TemplateVisitor>) {
    return new this(...args).visit()
  }

  constructor (
    public sourceFile: tsMorph.SourceFile,
    public html: TemplateNode,
    public component: Component
  ) {}

  private visit () {
    this.html.children!.forEach((node) => {
      if (this.isImportLinkTag(node)) {
        this.visitImportLinkTag(node)
      }

      // if (this.isStyleLink(node)) {
      //   this.visitStyleLink(node)
      // }
    })
  }

  private visitImportLinkTag (node: TemplateNode) {
    const path = node.attributes.find(({ name }) => name === 'href').value[0].data

    this.component.addImportedComponent(path)
  }

  /**
   * Is it an import link tag?
   *
   * ```
   * <link rel="import" href="../SomeComponent" />
   * ```
   */
  private isImportLinkTag (node: TemplateNode) {
    return (
      node.name === 'link' &&
      node.attributes.some(({ name, value }) => name === 'rel' && value[0].data === 'import')
    )
  }
}
