import * as path from 'path'

import { PageContext } from '../page-context'

describe('store', () => {
  const pageContext = new PageContext(
    path.join(__dirname, '../../project/pages/ProductPage.ts')
  )

  const component = pageContext.addComponentAtPath(
    path.join(__dirname, '../../project/pages/ProductPage.html')
  )

  const {
    propertyDefinitions,
    importedComponents,
    injectedStores
  } = component

  describe('template', () => {
    it('should parse ast', () => {
      expect(component.template.html.children).toHaveLength(5)
    })
  })

  // describe('script', () => {
  //   it('parses ast', () => {
  //     expect(component.script.sourceFile.)
  //   })
  // })

  describe('visitor', () => {
    it('should collect property definitions', () => {
      // TODO: Implement
      console.log(propertyDefinitions)
    })

    it('should collect imported components', () => {
      // TODO: Implement
      console.log(importedComponents)
    })

    it('should collect injected stores', () => {
      // TODO: Implement
      console.log(injectedStores)
    })
  })
})
