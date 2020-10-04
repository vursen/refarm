import * as path from 'path'

import { PageContext } from '../../../compiler/page-context'

describe('store', () => {
  const pageContext = new PageContext({
    tsConfigFilePath: path.join(__dirname, '../../../../project/tsconfig.json')
  })

  const component = pageContext.addComponentAtPath(
    path.join(__dirname, '../../../../project/pages/ProductPage.ts')
  )

  const {
    propertyDefinitions,
    importedComponents,
    injectedStores
  } = component

  describe('template', () => {
    it('should parse ast', () => {
      expect(component.template.dump()).toMatchSnapshot()
    })
  })

  describe('visitor', () => {
    // it('should collect imported components', () => {
    //   expect(importedComponents.size).toBe(2)
    //   expect(importedComponents.has('Photo')).toBeTruthy()
    //   expect(importedComponents.has('AddToCart')).toBeTruthy()
    // })

    // it('should collect property definitions', () => {
    //   // TODO: Implement
    //   console.log(propertyDefinitions)
    // })

    // it('should collect injected stores', () => {
    //   // TODO: Implement
    //   console.log(injectedStores)
    // })
  })
})
