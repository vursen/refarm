import * as path from 'path'

import { Store } from '.'
import { PageContext } from '../page-context'

describe('store', () => {
  const pageContext = new PageContext(
    path.join(__dirname, '../../project/pages/ProductPage.ts')
  )

  const store = pageContext.addStoreAtPath(
    path.join(__dirname, '../../project/stores/cart.ts')
  )

  const {
    stateDefinitions,
    actionDefinitions
  } = store

  describe('visitor', () => {
    it('collects action definitions', () => {
      expect(actionDefinitions.size)
        .toBe(2)

      expect(actionDefinitions.has('addItem'))
        .toBe(true)

      expect(actionDefinitions.has('removeItem'))
        .toBe(true)
    })

    it('collects state definitions', () => {
      expect(stateDefinitions.size)
        .toBe(1)

      expect(stateDefinitions.has('items'))
        .toBe(true)
    })

    it('collects affected state definitions in action methods', () => {
      expect(actionDefinitions.get('addItem').affectedStateDefinitions)
        .toContain(stateDefinitions.get('items'))

      expect(actionDefinitions.get('removeItem').affectedStateDefinitions)
        .toContain(stateDefinitions.get('items'))
    })

    it('collects called action definitions in action methods', () => {
      expect(actionDefinitions.get('addItem').calledActionDefinitions.size)
        .toBe(0)
    })
  })
})
