import * as tsMorph from 'ts-morph'

import { Store } from './store'
import { Component } from './component'

export class PageContext {
  project: tsMorph.Project

  stores: Map<string, Store> = new Map()

  components: Map<string, Component> = new Map()

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

  addStoreAtPath (filePath: string) {
    if (this.stores.has(filePath)) {
      return this.stores.get(filePath)!
    }

    const store = new Store(
      this.project.addSourceFileAtPath(filePath),
      this
    )

    this.stores.set(filePath, store)

    store.visit()

    return store
  }

  // addTemplateAtPath (filePath: string) {

  // }

  addComponentAtPath (filePath: string) {
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
