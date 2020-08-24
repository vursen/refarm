import * as path from 'path'

import { Store } from './store'
import { PageContext } from './page-context'

describe('store', () => {
  const pageContext = new PageContext(
    path.join(__dirname, '../pages/ProductPage.ts')
  )

  const store = new Store(
    path.join(__dirname, '../stores/cart.ts'),
    pageContext
  )

  describe('visitor', () => {
    it('collects actions', () => {
      expect(store.actions.size).toBe(2)
      expect(store.actions.has('add')).toBe(true)
      expect(store.actions.has('remove')).toBe(true)
    })

    it('collects state', () => {
      expect(store.state.size).toBe(1)
      expect(store.state.has('productIds')).toBe(true)
    })
  })
})
