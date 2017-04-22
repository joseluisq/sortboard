/* @flow */

import emitus from 'emitus'
import defaults from './options'
import utils from './utils'
import type {Options} from './types'

export default function sortboard (options: Options) {
  options = Object.assign(defaults, options || {})

  const container: Object = typeof options.container === 'string'
    ? utils.child(document, options.container)
    : options.container

  if (!container) return

  const elements: Array<mixed> = utils.children(options.selector, container)

  if (!elements) return

  options.hiddenClass = options.hiddenClass.replace(/^\./g, '')
  options.matchedClass = options.matchedClass.replace(/^\./g, '')

  const api: Object = emitus({filter, sort, reset, elements: () => elements})
  let currentFilter: string = ''

  init()

  return api

  function init () {
    events()
    sort()
  }

  function filter (value: string = '') {
    if (!value || value === currentFilter) return

    const regx = new RegExp(value, 'i')
    const notMatchedElements = []

    currentFilter = value

    const matchedElements = elements.filter((item: any) => {
      const cords = item.getAttribute('data-cords')

      if (value === options.resetFilterValue) {
        translate(item, cords, false)
        return true
      }

      const data = item.getAttribute('data-filter')
      const ok = data && data.match(regx)

      if (!ok) notMatchedElements.push(item)

      translate(item, cords, !ok)

      return ok
    })

    api.emit('filter', [matchedElements, notMatchedElements, currentFilter])

    if (matchedElements.length > 0) sort()
  }

  function reset () {
    filter(options.resetFilterValue)
  }

  function sort () {
    let n = 0
    let x = 0
    let y = 0
    let totalW = 0
    let totalH = 0
    let breakW = 0

    const gutter = options.gutter
    const parentWidth = container.parentElement.offsetWidth

    elements.forEach((child: any) => {
      if (child.classList.contains(options.hiddenClass)) return

      if (totalW >= parentWidth - child.offsetHeight - gutter) {
        totalW = 0
        y += child.offsetHeight + gutter

        if (!breakW) {
          breakW = n * child.offsetWidth + (n * gutter - gutter)
        }
      } else totalW += n ? gutter : 0

      n++
      totalW += child.offsetWidth
      x = totalW - child.offsetWidth
      totalH = y + child.offsetHeight

      translate(child, `${x},${y}`, false)
    })

    const pNWidth = n * parentWidth + (n < 2 ? n : n - 1) * gutter
    const pWidth = breakW || pNWidth

    container.style.width = `${pWidth}px`
    container.style.height = `${totalH}px`

    api.emit('sort')
  }

  function events () {
    utils.onResize(window, sort)
  }

  function translate (item, cords, hide) {
    const matrix: string = `matrix(1,0,0,1,${cords}) scale(${hide ? '0.001' : '1'})`

    if (hide) {
      item.classList.add(options.hiddenClass)
      item.classList.remove(options.matchedClass)
    } else {
      item.classList.add(options.matchedClass)
      item.classList.remove(options.hiddenClass)
    }

    item.setAttribute('data-cords', cords)
    item.style.setProperty('opacity', hide ? '0' : '1')
    item.style.setProperty('-webkit-transform', matrix)
    item.style.setProperty('-moz-transform', matrix)
    item.style.setProperty('transform', matrix)
  }
}
