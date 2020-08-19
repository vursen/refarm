import { Component } from './component'

import * as ts from 'typescript'

import { PageContext } from './page-context'

export class Page {
  pagePath: string
  pageContext: PageContext
  pageComponent: Component

  constructor (pagePath: string) {
    this.pagePath = pagePath
    this.pageContext = new PageContext(pagePath)
    this.pageComponent = new Component(pagePath, this.pageContext)
  }

  analyze () {
    console.log('imported components', this.pageComponent.getImportedComponents())
    console.log('component class', this.pageComponent.getComponentClass())
  }
}
