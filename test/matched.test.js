import test from 'tape'
import dom from './dom'
import sortboard from '../src'

dom.init()

test('Matched elements test', t => {
  t.plan(3)

  const filterValue = 'black first-line'

  const sb = sortboard({
    container: '#sortlist',
    selector: 'li',
    gutter: 10
  })

  sb.on('filter', (matched, notMatched, value) => {
    t.equal(matched.length, 8)
    t.equal(notMatched.length, 32)
    t.equal(value, filterValue)
  })

  sb.filter(filterValue)
})
