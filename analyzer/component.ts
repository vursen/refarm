import * as path from 'path'
import * as ts from 'typescript'
import * as svelte from 'svelte/compiler'

import { PageContext } from './page-context'

export class Component {
  private _cachedScriptAst: ts.SourceFile
  private _cachedTemplateAst: ReturnType<typeof svelte.parse>

  constructor (
    public templatePath: string,
    public pageContext: PageContext
  ) {}

  get template () {
    if (this._cachedTemplateAst) {
      return this._cachedTemplateAst
    }

    return this._cachedTemplateAst = svelte.parse(ts.sys.readFile(this.templatePath))
  }

  get script () {
    if (this._cachedScriptAst) {
      return this._cachedScriptAst
    }

    return this._cachedScriptAst = this.template.html.children
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

  getComponentClass () {
    return getComponentClass(this.script)
  }

  // getReferencedComponents () {
  //   return this.script.getChildren()
  //     .map((node) => {
  //       if (
  //         ts.isExportDeclaration(node) &&
  //         ts.isStringLiteral(node.moduleSpecifier)
  //       ) {
  //         return node.moduleSpecifier.text
  //       }
  //     })
  //     .filter(Boolean)
  //     .map((moduleName) => {
  //       return ts.resolveModuleName(moduleName, this.script.fileName, {}, this.host)
  //     })
  //     .map(({ resolvedModule }) => {
  //       return this.program.getSourceFile(resolvedModule.resolvedFileName)
  //     })
  //     .filter((sourceFile) => {
  //       return getComponentClass(sourceFile)
  //     })
  // }
}

function getComponentClass(sourceFile: ts.SourceFile) {
  return sourceFile.statements.find((node) => {
    if (!ts.isClassDeclaration(node)) {
      return false
    }

    if (node.name.text !== path.basename(sourceFile.fileName, '.ts')) {
      return false
    }

    return true

    // return node.decorators.some(({ expression }) => {
    //   return ts.isIdentifier(expression) && expression.text === 'Component'
    // })
  })
}
