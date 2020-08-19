import * as path from 'path'
import * as ts from 'typescript'
import * as svelte from 'svelte/compiler'

import { PageContext } from './page-context'

export class Component {
  private _cachedScript: ts.SourceFile
  private _cachedTemplate: ReturnType<typeof svelte.parse>

  constructor (
    public templatePath: string,
    public pageContext: PageContext
  ) {}

  get template () {
    if (this._cachedTemplate) {
      return this._cachedTemplate
    }

    return this._cachedTemplate = svelte.parse(ts.sys.readFile(this.templatePath))
  }

  get script () {
    if (this._cachedScript) {
      return this._cachedScript
    }

    return this._cachedScript = this.template.html.children
      .filter((node) => {
        return (
          node.name === 'link' &&
          node.attributes.some(({ name, value }) => name === 'rel' && value[0].data === 'script')
        )
      })
      .map((node) => {
        const scriptHref = node.attributes.find(({ name }) => name === 'href').value[0].data
        const scriptPath = path.join(path.dirname(this.templatePath), scriptHref)

        return this.pageContext.getSourceFile(scriptPath)
      })
      [0]
  }

  getImportedComponents () {
    return this.template.html.children
      .filter((node) => {
        return (
          node.name === 'link' &&
          node.attributes.some(({ name, value }) => name === 'rel' && value[0].data === 'import')
        )
      })
      .map((node) => {
        const templateHref = node.attributes.find(({ name }) => name === 'href').value[0].data
        const templatePath = path.join(path.dirname(this.templatePath), templateHref)

        return new Component(templatePath, this.pageContext)
      })
  }

  getProperties () {
    const componentClass = this.getComponentClass()

    return getComponentProperties(componentClass).map(({ name }) => (name as ts.Identifier).text)
  }

  getComponentClass () {
    return getComponentClass(this.script)
  }
}

function getComponentClass(sourceFile: ts.SourceFile) {
  return sourceFile.statements
    .filter((node): node is ts.ClassDeclaration => {
      return ts.isClassDeclaration(node)
    })
    .find((node) => {
      return node.name.text === path.basename(sourceFile.fileName, '.ts')
    })
}

function getComponentProperties (componentClass: ts.ClassDeclaration) {
  return componentClass.members
    .filter((member) => {
      return member.decorators.some(({ expression }) => {
        return ts.isIdentifier(expression) && expression.text === 'Property'
      })
    })
}
