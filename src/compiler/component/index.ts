import * as tsMorph from 'ts-morph'

import { Context } from '../context'

import { Klass } from './klass'
import { Template } from './template'

export class Component {
  klass = new Klass(
    this.scriptSourceFile.getClass(this.name)!,
    this.context
  )

  template = new Template(
    this.templateSourceFile,
    this.context,
    this
  )

  constructor (
    public scriptSourceFile: tsMorph.SourceFile,
    public templateSourceFile: tsMorph.SourceFile,
    public context: Context
  ) {}

  get name () {
    return this.scriptSourceFile.getBaseNameWithoutExtension()
  }

  visit () {
    this.klass.visit()
    this.klass.visitDeeply()

    // this.template.visit()
  }

  // addImportedComponent (path: string) {
  //   const resolvedFilePath = this.context.resolveModuleName(
  //     path,
  //     this.templateSourceFile.getFilePath()
  //   )

  //   if (!resolvedFilePath) {
  //     return
  //   }

  //   const component = this.context.addComponentAtPath(resolvedFilePath)

  //   this.importedComponents.set(
  //     component.name,
  //     component
  //   )
  // }
}
