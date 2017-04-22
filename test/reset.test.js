import test from 'tape'
import dom from './dom'
import sortboard from '../src'

dom.init()

test('Reset elements test', t => {
  t.plan(3)

  const filterValue = 'royalty'

  const sb = sortboard({
    container: '#sortlist',
    selector: 'li',
    gutter: 10
  })

  sb.filter(filterValue)

  sb.on('filter', (matched, notMatched, value) => {
    t.equal(matched.length, 40)
    t.equal(notMatched.length, 0)
    t.equal(value, 'all')
  })

  sb.reset()
})
