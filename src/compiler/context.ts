import * as tsMorph from 'ts-morph'

import { Klass } from './klass'
import { Component } from './component'

export class Context {
  project: tsMorph.Project

  klasses: Map<Klass['node'], Klass> = new Map()

  components: Map<string/* path */, Component> = new Map()

  constructor (options: { tsConfigFilePath: string }) {
    const { tsConfigFilePath } = options

    this.project = new tsMorph.Project({
      tsConfigFilePath,
      addFilesFromTsConfig: false
    })
  }

  resolveModuleName (moduleName: string, containingFile: string) {
    const { resolvedModule } = tsMorph.ts.resolveModuleName(
      moduleName,
      containingFile,
      this.project.getCompilerOptions(),
      this.project.getModuleResolutionHost()
    )

    return resolvedModule?.resolvedFileName
  }

  addKlass (node: Klass['node']) {
    if (this.klasses.has(node)) {
      return this.klasses.get(node)!
    }

    const klass = new Klass(
      node,
      this
    )

    this.klasses.set(node, klass)

    klass.visit()
    klass.visitDeeply()

    return klass
  }

  addComponent (filePath: string) {
    // TODO: Refactor
    const filePathWithoutExtension = filePath.replace(/(\.html|\.ts)$/, '')

    if (this.components.has(filePathWithoutExtension)) {
      return this.components.get(filePathWithoutExtension)!
    }

    const component = new Component(
      this.project.addSourceFileAtPath(`${filePathWithoutExtension}.ts`),
      this.project.addSourceFileAtPath(`${filePathWithoutExtension}.html`),
      this
    )

    this.components.set(filePathWithoutExtension, component)

    component.visit()

    return component
  }
}
