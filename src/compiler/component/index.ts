import * as tsMorph from 'ts-morph'

import { Store } from '../store'
import { PageContext } from '../page-context'

import { Template } from './template'
import { ScriptVisitor } from './script-visitor'
import { TemplateVisitor } from './template-visitor'
import { PropertyDefinition } from './property-definition'

export class Component {
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
   * Imported components
   *
   * ```
   * <link rel="import" href="../SomeComponent" />
   * ```
   */
  importedComponents: Map<string, Component> = new Map()

  /**
   * Property definitions
   *
   * ```
   * @Property someProperty
   * ```
   */
  propertyDefinitions: Map<string, PropertyDefinition> = new Map()

  /**
   * Method definitions
   *
   * ```
   * someMethod () {
   *
   * }
   * ```
   */
  // methodDefinitions: Map<string, MethodDefinition> = new Map()

  constructor (
    public scriptSourceFile: tsMorph.SourceFile,
    public templateSourceFile: tsMorph.SourceFile,
    public pageContext: PageContext
  ) {
    this.template = new Template(
      this.templateSourceFile,
      this
    )
  }

  visit () {
    // ScriptVisitor.visit(
    //   this.scriptSourceFile,
    //   this
    // )

    // TemplateVisitor.visit(
    //   this.templateSourceFile,
    //   this.templateHtml,
    //   this
    // )
  }

  addImportedComponent (path: string) {
    const resolvedFilePath = this.pageContext.resolveModuleName(
      path,
      this.templateSourceFile.getFilePath()
    )

    if (!resolvedFilePath) {
      return
    }

    const component = this.pageContext.addComponentAtPath(resolvedFilePath)

    this.importedComponents.set(
      component.name,
      component
    )
  }

  addInjectedStore (path: string) {
    const store = this.pageContext.addStoreAtPath(path)

    this.injectedStores.set(
      store.name,
      store
    )
  }

  addPropertyDefinition () {

  }

  get name () {
    return this.scriptSourceFile.getBaseNameWithoutExtension()
  }
}
