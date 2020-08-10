import fs from 'fs'
import path from 'path'
import ts from 'typescript'
import * as svelte from 'svelte/compiler'

export class Component {
  scriptAst: ReturnType<typeof ts.createSourceFile>
  templateAst: ReturnType<typeof svelte.parse>

  constructor ({
    componentPath,
    componentName,
    componentSource
  }) {
    this.scriptAst = ts.createSourceFile(
      `${componentName}.ts`,
      componentSource,
      ts.ScriptTarget.Latest
    )

    const templatePath = `${path.dirname(componentPath)}/${componentName}.html`
    const templateSource = fs.readFileSync(templatePath).toString()

    this.templateAst = svelte.parse(templateSource)
  }

  getComponentsReferences() {
    return this.scriptAst
  }
}
