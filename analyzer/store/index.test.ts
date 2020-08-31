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

  const {
    stateDefinitions,
    actionDefinitions
  } = store

  describe('visitor', () => {
    it('collects action definitions', () => {
      expect(actionDefinitions.size)
        .toBe(2)

      expect(actionDefinitions.has('add'))
        .toBe(true)

      expect(actionDefinitions.has('remove'))
        .toBe(true)
    })

    it('collects state definitions', () => {
      expect(stateDefinitions.size)
        .toBe(1)

      expect(stateDefinitions.has('productIds'))
        .toBe(true)
    })

    it('collects affected state definitions in action methods', () => {
      expect(actionDefinitions.get('add').affectedStateDefinitions)
        .toContain(stateDefinitions.get('productIds'))

      expect(actionDefinitions.get('remove').affectedStateDefinitions)
        .toContain(stateDefinitions.get('productIds'))
    })

    it('collects called action definitions in action methods', () => {
      expect(actionDefinitions.get('add').calledActionDefinitions.size)
        .toBe(0)
    })
  })
})
