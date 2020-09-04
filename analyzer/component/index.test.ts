import * as path from 'path'

import { PageContext } from '../page-context'

describe('store', () => {
  const pageContext = new PageContext(
    path.join(__dirname, '../../project/pages/ProductPage.ts')
  )

  const component = pageContext.addComponentAtPath(
    path.join(__dirname, '../../project/components/AddToCart.html')
  )

  const {
    propertyDefinitions,
    importedComponents,
    injectedStores
  } = component

  describe('visitor', () => {
    it('collects property definitions', () => {
      // TODO: Implement
      console.log(propertyDefinitions)
    })

    it('collects imported components', () => {
      // TODO: Implement
      console.log(importedComponents)
    })

    it('collects injected stores', () => {
      // TODO: Implement
      console.log(injectedStores)
    })
  })
})
