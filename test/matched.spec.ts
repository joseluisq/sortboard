import markup from './markup'
import { sortboard, Sortboard, Listener } from '../src'

markup.init()

describe('Sortboard', () => {
  let sb: Sortboard
  const filterValue = 'black first-line'

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

  sb.filter(filterValue)
})
