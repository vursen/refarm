import * as svelte from 'svelte/compiler'
import * as tsMorph from 'ts-morph'

import { Store } from '../store'
import { PageContext } from '../page-context'

import { Script } from './script'
import { Template } from './template'
import { PropertyDefinition } from './property-definition'

export class Component {
  script: Script

  template: Template

  /**
   * Injected stores
   *
   * ```
   * @Inject someStore: SomeStore
   * ```
   */
  injectedStores: Map<string, Store> = new Map()

  /**
   * Property definitions
   *
   * ```
   * @Property someProperty
   * ```
   */
  propertyDefinitions: Map<string, PropertyDefinition> = new Map()

  /**
   * Imported components
   *
   * ```
   * <link rel="import" href="../SomeComponent.html" />
   * ```
   */
  importedComponents: Map<string, Component> = new Map()

  constructor (
    public scriptSourceFile: tsMorph.SourceFile,
    public templateSourceFile: tsMorph.SourceFile,
    public pageContext: PageContext
  ) {
    this.script = new Script(
      this.scriptSourceFile,
      this
    )

    this.template = new Template(
      this.templateSourceFile,
      this
    )
  }

  visit () {
    // TODO: Implement
    this.script.visit()

    this.template.visit()
  }

  addImportedComponent (componentPath: string) {
    const { resolvedFileName } = this.pageContext.resolveModuleName(
      componentPath,
      this.templateSourceFile.getFilePath()
    )

    this.importedComponents.set(
      resolvedFileName,
      this.pageContext.addComponentAtPath(resolvedFileName)
    )
  }

  addPropertyDefinition () {

  }
}
