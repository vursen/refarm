import { Component } from './component'

import * as ts from 'typescript'

export class Page {
  host: ts.CompilerHost
  program: ts.Program
  component: Component

  constructor ({
    pagePath
  }) {
    this.host = ts.createCompilerHost({})

    this.program = ts.createProgram([pagePath], {})

    this.component = new Component({
      host: this.host,
      program: this.program,
      componentPath: pagePath
    })
  }

  analyze () {
    console.log(this.component.getComponentClass())
  }
}
