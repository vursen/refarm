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

    const scriptAst = this.project.addSourceFileAtPath(`${filePathWithoutExtension}.ts`)

    const templateAst = svelte.parse(
      this.project.getFileSystem().readFileSync(`${filePathWithoutExtension}.html`)
    )

    const component = new Component(
      scriptAst,
      templateAst,
      this
    )

    component.visit()

    return component
  }
}
