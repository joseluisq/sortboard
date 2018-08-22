import { sortboard } from '../src'

const sb = sortboard({
  container: '#sortlist',
  selector: 'li'
})

const anchors = children('#filters a')

anchors.forEach((el) => {
  el.addEventListener(
    'click',
    (event) => {
      const an = event.target

      if (!an.classList.contains('active')) {
        const data = an.getAttribute('data-filter')
        sb.filter(data)

        anchors.forEach((a) => {
          a.classList.remove('active')
        })
        an.classList.add('active')
      }
    },
    false
  )
})

function children (selector, parent = document) {
  return Array.prototype.slice
    .call(parent.querySelectorAll(selector))
}
