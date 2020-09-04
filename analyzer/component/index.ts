import * as svelte from 'svelte/compiler'
import * as tsMorph from 'ts-morph'

import { Store } from '../store'
import { PageContext } from '../page-context'

import { PropertyDefinition } from './property-definition'

export class Component {
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
    public scriptAst: tsMorph.SourceFile,
    public templateAst: ReturnType<typeof svelte.parse>,
    public pageContext: PageContext
  ) {}

  visit () {
    // TODO: Implement
  }

  // get script () {
  //   if (this._cachedScript) {
  //     return this._cachedScript
  //   }

  //   return this._cachedScript = this.template.html.children
  //     .filter((node) => {
  //       return (
  //         node.name === 'link' &&
  //         node.attributes.some(({ name, value }) => name === 'rel' && value[0].data === 'script')
  //       )
  //     })
  //     .map((node) => {
  //       const scriptHref = node.attributes.find(({ name }) => name === 'href').value[0].data
  //       const scriptPath = path.join(path.dirname(this.templatePath), scriptHref)

  //       return this.pageContext.getSourceFile(scriptPath)
  //     })
  //     [0]
  // }

  // getImportedComponents () {
  //   return this.template.html.children
  //     .filter((node) => {
  //       return (
  //         node.name === 'link' &&
  //         node.attributes.some(({ name, value }) => name === 'rel' && value[0].data === 'import')
  //       )
  //     })
  //     .map((node) => {
  //       const templateHref = node.attributes.find(({ name }) => name === 'href').value[0].data
  //       const templatePath = path.join(path.dirname(this.templatePath), templateHref)

  //       return new Component(templatePath, this.pageContext)
  //     })
  // }
}
