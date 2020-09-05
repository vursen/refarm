import * as tsMorph from 'ts-morph'

import { Component } from '.'

export class Script {
  constructor (
    public sourceFile: tsMorph.SourceFile,
    public component: Component
  ) {}

  visit () {
    // TODO: Implement
  }
}
