import fs from 'fs'
import path from 'path'

import { Page } from './page'

const pagePath = `${__dirname}/../pages/ProductPage.ts`
const pageName = path.basename(pagePath, '.ts')
const pageSource = fs.readFileSync(pagePath).toString()

const page = new Page({
  pagePath,
  pageName,
  pageSource
})

console.log(page.analyze())
