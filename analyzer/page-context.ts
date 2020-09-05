import * as path from 'path'
import * as tsMorph from 'ts-morph'
import * as svelte from 'svelte/compiler'

import { Store } from './store'
import { Component } from './component'

export class PageContext {
  project: tsMorph.Project

  stores: Map<string, Store> = new Map()

  components: Map<string, Component> = new Map()

  constructor (_pagePath: string) {
    this.project = new tsMorph.Project({
      tsConfigFilePath: path.join(__dirname, '../tsconfig.json'),
      addFilesFromTsConfig: false
    })
  }

  resolveModuleName (moduleName: string, containingFile: string) {
    const { resolvedModule } = tsMorph.ts.resolveModuleName(
      moduleName.replace(/\.ts|\.html/, ''),
      containingFile,
      this.project.getCompilerOptions(),
      this.project.getModuleResolutionHost()
    )

    // console.log(moduleName, containingFile)

    return resolvedModule
  }

  addStoreAtPath (filePath: string) {
    if (this.stores.has(filePath)) {
      return this.stores.get(filePath)
    }

    const store = new Store(
      this.project.addSourceFileAtPath(filePath),
      this
    )

    this.stores.set(filePath, store)

    store.visit()

    return store
  }

  addComponentAtPath (filePath: string) {
    // TODO: Refactor
    const filePathWithoutExtension = filePath.replace(/(\.html|\.ts)$/, '')

    if (this.components.has(filePathWithoutExtension)) {
      return this.components.get(filePathWithoutExtension)
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
