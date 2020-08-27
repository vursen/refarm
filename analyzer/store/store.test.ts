import * as path from 'path'

import { Store } from './store'
import { PageContext } from '../page-context'

describe('store', () => {
  const pageContext = new PageContext(
    path.join(__dirname, '../../pages/ProductPage.ts')
  )

  const store = new Store(
    path.join(__dirname, '../../stores/cart.ts'),
    pageContext
  )

  describe('visitor', () => {
    it('collects actions', () => {
      expect(store.actionDefinitions.size).toBe(2)
      expect(store.actionDefinitions.has('add')).toBe(true)
      expect(store.actionDefinitions.has('remove')).toBe(true)
    })

    it('collects state', () => {
      expect(store.stateDefinitions.size).toBe(1)
      expect(store.stateDefinitions.has('productIds')).toBe(true)
    })

    it('collects state references in an action method', () => {
      expect(store.actionDefinitions.get('add').stateDefinitionReferences).toBe(store.stateDefinitions.get('productIds'))
    })
  })
})
