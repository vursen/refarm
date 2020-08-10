import { Component } from './component'

export class Page {
  component: Component

  constructor ({
    pagePath,
    pageName,
    pageSource
  }) {
    this.component = new Component({
      componentName: pageName,
      componentPath: pagePath,
      componentSource: pageSource
    })
  }

  analyze () {
    console.log(this.component.scriptAst)
  }
}
