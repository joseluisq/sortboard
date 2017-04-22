import test from 'tape'
import dom from './dom'
import sortboard from '../src'

dom.init()

test('Not matched elements test', t => {
  t.plan(3)

  const filterValue = 'unknown filter'

  const sb = sortboard({
    container: '#sortlist',
    selector: 'li',
    gutter: 10
  })

  sb.on('filter', (matched, notMatched, value) => {
    t.equal(matched.length, 0)
    t.equal(notMatched.length, 40)
    t.equal(value, filterValue)
  })

  sb.filter(filterValue)
})
