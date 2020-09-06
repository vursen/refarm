import * as tsMorph from 'ts-morph'

import { Component } from '.'

export class ScriptVisitor {
  static visit (...args: ConstructorParameters<typeof ScriptVisitor>) {
    return new this(...args).visit()
  }

  constructor (
    public sourceFile: tsMorph.SourceFile,
    public component: Component
  ) {}

  private visit () {
    // TODO: Implement
  }
}
