import * as path from 'path'

import { PageContext } from '../page-context'

describe('store', () => {
  const pageContext = new PageContext(
    path.join(__dirname, '../../project/pages/ProductPage.ts')
  )

  const store = pageContext.addStoreAtPath(
    path.join(__dirname, '../../project/stores/CartStore.ts')
  )

  const {
    injectedStores,
    stateDefinitions,
    actionDefinitions
  } = store

  describe('visitor', () => {
    it('should collect injected stores', () => {
      expect(injectedStores.size)
        .toBe(1)

      expect(injectedStores.has('userStore'))
        .toBeTruthy()
    })

    it('should collect action definitions', () => {
      expect(actionDefinitions.size)
        .toBe(2)

      expect(actionDefinitions.has('addItem'))
        .toBeTruthy()

      expect(actionDefinitions.has('removeItem'))
        .toBeTruthy()
    })

    it('should collect state definitions', () => {
      expect(stateDefinitions.size)
        .toBe(1)

      expect(stateDefinitions.has('items'))
        .toBeTruthy()
    })

    it('should collect affected state definitions in action methods', () => {
      expect(actionDefinitions.get('addItem').affectedStateDefinitions)
        .toContain(stateDefinitions.get('items'))

      expect(actionDefinitions.get('removeItem').affectedStateDefinitions)
        .toContain(stateDefinitions.get('items'))
    })

    it('should collect called action definitions in action methods', () => {
      expect(actionDefinitions.get('addItem').calledActionDefinitions.size)
        .toBe(0)
    })
  })
})
