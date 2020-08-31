import * as path from 'path'
import { Project } from 'ts-morph';

export class PageContext {
  project: Project

  constructor (_pagePath: string) {
    this.project = new Project({
      tsConfigFilePath: path.join(__dirname, '../tsconfig.json'),
      addFilesFromTsConfig: false
    })
  }

  addSourceFile (filePath: string) {
    return this.project.addSourceFileAtPath(filePath)
  }
}
