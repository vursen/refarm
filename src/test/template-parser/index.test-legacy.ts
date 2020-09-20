import * as tsMorph from 'ts-morph'
import { TemplateParser, isEachCallExpression, isIfCallExpression } from '../../template-parser'

function parseTemplate (
  sourceFileName: string,
  sourceText: string,
  project: tsMorph.Project
) {
  return new TemplateParser(sourceFileName, sourceText, project).parse()
}

describe('template parser', () => {
  const project = new tsMorph.Project({
    compilerOptions: {
      baseUrl: '.',
      jsx: tsMorph.ts.JsxEmit.Preserve,
      target: tsMorph.ScriptTarget.ESNext,
      module: tsMorph.ModuleKind.ESNext,
      moduleResolution: tsMorph.ModuleResolutionKind.NodeJs,
    },
    addFilesFromTsConfig: false
  })

  it('should parse tag', () => {
    const sourceFile = parseTemplate('Tag.html', `
      <div>
        {variable}
      </div>
    `, project)

    expect(sourceFile.compilerNode.statements).toMatchSnapshot()
  })

  it('should parse <re:each>', () => {
    const sourceFile = parseTemplate('ReEach.html', `
      <div>
        <re:each of={expression} as={variable}>
          <div>{variable}</div>
        </re:each>
      </div>
    `, project)

    expect(sourceFile.compilerNode.statements).toMatchSnapshot()
  })

  it('should parse <re:if>', () => {
    const sourceFile = parseTemplate('ReIf.html', `
      <div>
        <re:if test={expression}>
          <div>{variable}</div>
        </re:each>
      </div>
    `, project)

    expect(sourceFile.compilerNode.statements).toMatchSnapshot()
  })

  it('should parse <>', () => {
    const sourceFile = parseTemplate('ReIf.html', `
      <div>
        <re:if test={expression}>
          <div>{variable}</div>
        </re:each>
      </div>
    `, project)

    expect(sourceFile.compilerNode.statements).toMatchSnapshot()
  })
})
