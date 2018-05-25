import { child, children, onResize } from './utils'
import { Options, Sortboard, Event, Elements } from './types'
import { defaults } from './defaults'
import { emitus, Emitus, EmitusListener as Listener } from 'emitus'

const emitter: Emitus = emitus()

export default function sortboard (options?: Options): Sortboard | null {
  const opts: Options = { ...defaults, ...options } as Options

  if (!opts.container) {
    return null
  }

  let container: HTMLElement

  if (typeof opts.container === 'string') {
    const childContainer: HTMLElement | null = child(document.body, opts.container)

    if (!childContainer) {
      return null
    }

    container = childContainer
  } else {
    container = opts.container
  }

  const selectorContainer: string = opts.selector.substr(0, opts.selector.search(' '))
  const blocksContainer: HTMLElement | null = child(container, selectorContainer)

  let api: Sortboard | null = null

  if (blocksContainer) {
    const blocks: HTMLElement[] = children(opts.selector, blocksContainer)

    if (!blocks.length) {
      return null
    }

    const els: Elements = { container, blocks }

    api = createSortboard(els, opts)
  }

  return api
}

export { sortboard, Sortboard, Elements, Options, Listener, Event, Emitus }

function createSortboard ({ container, blocks }: Elements, opts: Options): Sortboard {
  let currentFilter: string = ''

  const api: Sortboard = {
    // Methods
    sort,
    reset,
    filter,

    // Events
    on: emitter.on,
    off: emitter.off
  }

  init()

  return api

  function init (): void {
    events()
    sort()
  }

  function filter (pattern: string = ''): void {
    if (!pattern || pattern === currentFilter) return

    currentFilter = pattern

    const regPattern = new RegExp(pattern, 'i')
    const notMatchedElements: HTMLElement[] = []
    const matchedElements: HTMLElement[] = blocks.filter((item: any) => {
      const cords: string = item.getAttribute('data-cords').trim()

      if (pattern === opts.resetFilterValue) {
        translate(item, cords, false)
        return true
      }

      const data: string = item.getAttribute('data-filter').trim()
      const ok: boolean = !!data && regPattern.test(data)

      if (!ok) {
        notMatchedElements.push(item)
      }

      translate(item, cords, !ok)

      return ok
    })

    emitter.emit('filter', [ matchedElements, notMatchedElements, currentFilter ])

    if (matchedElements.length) {
      sort()
    }
  }

  function reset (): void {
    filter(opts.resetFilterValue)
  }

  function sort (): void {
    let n: number = 0
    let x: number = 0
    let y: number = 0
    let totalW: number = 0
    let totalH: number = 0
    let breakW: number = 0

    const gutter: number = opts.gutter!
    const parentWidth: number = container.parentElement!.offsetWidth

    blocks.forEach((child: HTMLElement) => {
      if (child.classList.contains(opts.hiddenClass!)) return

      if (totalW >= parentWidth - child.offsetHeight - gutter) {
        totalW = 0
        y += child.offsetHeight + gutter

        if (!breakW) {
          breakW = n * child.offsetWidth + (n * gutter - gutter)
        }
      } else {
        totalW += n ? gutter : 0
      }

      n++
      totalW += child.offsetWidth
      x = totalW - child.offsetWidth
      totalH = y + child.offsetHeight

      translate(child, `${x},${y}`, false)
    })

    const pNWidth: number = n * parentWidth + (n < 2 ? n : n - 1) * gutter
    const pWidth: number = breakW || pNWidth

    container.style.width = `${pWidth}px`
    container.style.height = `${totalH}px`

    emitter.emit('sort')
  }

  function events (): void {
    onResize(window, sort)
  }

  function translate (item: HTMLElement, cords: string, hide: boolean): void {
    const matrix: string = `matrix(1,0,0,1,${cords}) scale(${hide ? '0.001' : '1'})`

    if (hide) {
      item.classList.add(opts.hiddenClass!)
      item.classList.remove(opts.matchedClass!)
    } else {
      item.classList.add(opts.matchedClass!)
      item.classList.remove(opts.hiddenClass!)
    }

    item.setAttribute('data-cords', cords)
    item.style.setProperty('opacity', hide ? '0' : '1')
    item.style.setProperty('-webkit-transform', matrix)
    item.style.setProperty('-moz-transform', matrix)
    item.style.setProperty('transform', matrix)
  }
}
