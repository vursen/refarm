import * as path from 'path'
import * as tsMorph from 'ts-morph'

export const IF_FUNCTION = '__refarm_if'
export const EACH_FUNCTION = '__refarm_each'

export function isEachCallExpression (node: tsMorph.CallExpression) {
  const expression = node.getExpressionIfKind(tsMorph.SyntaxKind.Identifier)

  return Boolean(
    expression &&
    expression.getText() === EACH_FUNCTION
  )
}

export function isIfCallExpression (node: tsMorph.CallExpression) {
  const expression = node.getExpressionIfKind(tsMorph.SyntaxKind.Identifier)

  return Boolean(
    expression &&
    expression.getText() === IF_FUNCTION
  )
}

// TODO: Refactor later
function transformTemplate2TSX (source: string) {
  // source = source.replace(/<re:import href="([^"]+)" \/>/g, 'import {  }')

  source = source.replace(/<re:each of=\{([^(\}>)]+)\} as=\{([^(\}>)]+)\}>/g, `{${EACH_FUNCTION}($1, ($2) => (`)
  source = source.replace(/<\/re:each>/g, `))}`)

  source = source.replace(/<re:if test=\{([^(\}>)]+)\}>/g, `{${IF_FUNCTION}($1, () => (`)
  source = source.replace(/<\/re:if>/g, `))}`)

  return source
}

export class TemplateParser {
  constructor (
    public sourceFileName: string,
    public sourceText: string,
    public project: tsMorph.Project
  ) {}

  parse () {
    return this.project.createSourceFile(
      this.transformedFileName,
      this.transformedSourceText,
      {
        scriptKind: tsMorph.ScriptKind.TSX
      }
    )
  }

  get transformedFileName () {
    return `${path.basename(this.sourceFileName, '.html')}.tsx`
  }

  get transformedSourceText () {
    return transformTemplate2TSX(this.sourceText)
  }
}
