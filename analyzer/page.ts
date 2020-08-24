import { Component } from './component'

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
    console.log('Imported components', this.pageComponent.getImportedComponents())
    console.log('Component class', this.pageComponent.getComponentClass())
    console.log('Component properties', this.pageComponent.getProperties())
  }
}
