import * as path from 'path'

import { Store } from '.'
import { PageContext } from '../page-context'

describe('store', () => {
  const pageContext = new PageContext(
    path.join(__dirname, '../../project/pages/ProductPage.ts')
  )

  const store = new Store(
    path.join(__dirname, '../../project/stores/cart.ts'),
    pageContext
  )

  describe('visitor', () => {
    it('collects action definitions', () => {
      expect(store.actionDefinitions.size).toBe(2)
      expect(store.actionDefinitions.has('add')).toBe(true)
      expect(store.actionDefinitions.has('remove')).toBe(true)
    })

    it('collects state definitions', () => {
      expect(store.stateDefinitions.size).toBe(1)
      expect(store.stateDefinitions.has('productIds')).toBe(true)
    })

    it('collects changed state definitions in the action method', () => {
      const { changedStateDefinitions } = store.actionDefinitions.get('add')

      expect(changedStateDefinitions).toContain(store.stateDefinitions.get('productIds'))
      expect(changedStateDefinitions.size).toBe(1)
    })

    it('collects called action definitions in the action method', () => {
      const { calledActionDefinitions } = store.actionDefinitions.get('add')

      expect(calledActionDefinitions.size).toBe(0)
    })
  })
})
