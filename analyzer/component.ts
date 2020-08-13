import * as fs from 'fs'
import * as path from 'path'
import * as ts from 'typescript'
import * as svelte from 'svelte/compiler'

export class Component {
  host: ts.CompilerHost
  program: ts.Program
  script: ts.SourceFile
  template: ReturnType<typeof svelte.parse>

  constructor ({
    host,
    program,
    componentPath,
  }) {
    this.host = host
    this.program = program

    this.script = this.program.getSourceFile(componentPath)

    // const templatePath = `${path.dirname(componentPath)}/${path.basename(componentPath, '.ts')}.html`
    // const templateSource = ts.sys.readFile(templatePath)

    // this.template = svelte.parse(templateSource)
  }

  getComponentClass () {
    return getComponentClass(this.script)
  }

  getReferencedComponents () {
    return this.script.getChildren()
      .map((node) => {
        if (
          ts.isExportDeclaration(node) &&
          ts.isStringLiteral(node.moduleSpecifier)
        ) {
          return node.moduleSpecifier.text
        }
      })
      .filter(Boolean)
      .map((moduleName) => {
        return ts.resolveModuleName(moduleName, this.script.fileName, {}, this.host)
      })
      .map(({ resolvedModule }) => {
        return this.program.getSourceFile(resolvedModule.resolvedFileName)
      })
      .filter((sourceFile) => {
        return getComponentClass(sourceFile)
      })
  }
}

function getComponentClass(sourceFile: ts.SourceFile) {
  return sourceFile.statements.find((node) => {
    if (!ts.isClassDeclaration(node)) {
      return false
    }

    if (node.name.text !== path.basename(sourceFile.fileName, '.ts')) {
      return false
    }

    return node.decorators.some(({ expression }) => {
      return ts.isIdentifier(expression) && expression.text === 'Component'
    })
  })
}
