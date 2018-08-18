import { child, children } from './utils'
import { Elements, Event, Options, Sortboard } from './types'
import { emitus, Emitus, EmitusListener as Listener } from 'emitus'

export const defaults: Options = {
  container: '.sortboard',
  selector: '.sortboard-block',
  gutter: 0,
  resetFilterValue: 'all',
  hiddenClass: '.sortboard-hidden',
  matchedClass: '.sortboard-matched'
}

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

  let api: Sortboard | null = null

  const blocks: HTMLElement[] = children(opts.selector, container)

  if (!blocks.length) {
    return null
  }

  const els: Elements = { container, blocks }

  api = createSortboard(els, opts)

  return api
}

export { sortboard, Sortboard, Elements, Options, Listener, Event, Emitus }

function createSortboard ({ container, blocks }: Elements, opts: Options): Sortboard {
  let currentFilter: string | RegExp = ''

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

  function filter (pattern: string | RegExp = ''): void {
    if (!pattern || pattern === currentFilter) return

    currentFilter = pattern

    const notMatchedElements: HTMLElement[] = []
    const matchedElements: HTMLElement[] = blocks.filter((item: any) => {
      const cords: string = item.getAttribute('data-cords').trim()

      if (pattern === opts.resetFilterValue) {
        translate(item, cords, false)
        return true
      }

      const data: string = item.getAttribute('data-filter').trim()
      const regx: RegExp = pattern instanceof RegExp ? pattern : RegExp(pattern)
      const matchPattern: boolean = !!data && regx.test(data)

      if (!matchPattern) {
        notMatchedElements.push(item)
      }

      translate(item, cords, !matchPattern)

      return matchPattern
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
    let n = 0
    let x = 0
    let y = 0
    let totalW = 0
    let totalH = 0
    let breakW = 0

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
    window.addEventListener('resize', sort, false)
  }

  function translate (item: HTMLElement, cords: string, hide: boolean): void {
    const matrix = `matrix(1,0,0,1,${cords}) scale(${hide ? '0.001' : '1'})`

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
