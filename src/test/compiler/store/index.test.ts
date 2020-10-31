import * as path from 'path'

import { PageContext } from '../../../compiler/context'

describe('store', () => {
  const pageContext = new PageContext({
    tsConfigFilePath: path.join(__dirname, '../../../../project/tsconfig.json')
  })

  const cartStore = pageContext.addStoreAtPath(
    path.join(__dirname, '../../../../project/stores/CartStore.ts')
  )

  const {
    injectedStores,
    stateDefinitions,
    methodDefinitions
  } = cartStore

  describe('store visitor', () => {
    it('should collect injected stores', () => {
      // expect(injectedStores.size)
      //   .toBe(0)

      // expect(injectedStores.has('userStore'))
      //   .toBeTruthy()
    })

    it('should collect method definitions', () => {
      expect(methodDefinitions.size)
        .toBe(5)

      expect(methodDefinitions.has('addItem'))
        .toBeTruthy()

      expect(methodDefinitions.has('removeItem'))
        .toBeTruthy()
    })

    it('should collect state definitions', () => {
      expect(stateDefinitions.size)
        .toBe(1)

      expect(stateDefinitions.has('items'))
        .toBeTruthy()
    })
  })

  describe('method definition visitor', () => {
    const {
      writedStateDefinitions,
      calledMethodDefinitions
    } = methodDefinitions.get('addItem')!

    it('should collect writed state definitions', () => {
      expect(writedStateDefinitions.size)
        .toBe(1)

      expect(writedStateDefinitions)
        .toContain(stateDefinitions.get('items'))
    })

    it('should collect called method definitions', () => {
      expect(calledMethodDefinitions.size)
        .toBe(1)

      expect(calledMethodDefinitions)
        .toContain(methodDefinitions.get('hasItem'))
    })
  })
})
