import * as fs from 'fs'
import * as path from 'path'

import { Page } from './page'

const pagePath = `${__dirname}/../pages/ProductPage.html`

const page = new Page(pagePath)

page.analyze()
