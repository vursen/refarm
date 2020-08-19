import * as ts from 'typescript'

export class PageContext {
  host: ts.CompilerHost
  program: ts.Program

  constructor (_pagePath: string) {
    this.host = ts.createCompilerHost({

    })
  }

  resolveModulePath (moduleName: string, basePath: string) {
    return ts.resolveModuleName(moduleName, basePath, {}, this.host)
  }

  getSourceFile (path: string) {
    return this.host.getSourceFile(path, ts.ScriptTarget.ESNext)
  }
}
