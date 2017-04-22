import sortboard from '../src'
import utils from '../src/utils'

const sb = sortboard({
  container: '#sortlist',
  selector: 'li'
})

sb.on('filter', (matched, notMatched, value) => {
  console.log(matched, notMatched, value)
})

const anchors = utils.children('#filters a')

anchors.forEach(el => {
  el.addEventListener(
    'click',
    event => {
      const an = event.target

      if (!an.classList.contains('active')) {
        const data = an.getAttribute('data-filter')
        sb.filter(data)

        anchors.forEach(a => {
          a.classList.remove('active')
        })
        an.classList.add('active')
      }
    },
    false
  )
})

window.sb = sb
