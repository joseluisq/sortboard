import markup from './markup'
import { sortboard, Sortboard } from '../src'

markup()

describe('Sortboard', () => {
  let sb: Sortboard | null = null
  const filterValue: string = 'black first-line'

  beforeEach(() => {
    sb = sortboard({
      container: '#sortlist',
      selector: 'li',
      gutter: 10
    })
  })

  describe('api', () => {
    it('should be a function', () => {
      expect(typeof sortboard).toBe('function')
    })
  })

  if (sb) {
    sb!.filter(filterValue)
  }
})
