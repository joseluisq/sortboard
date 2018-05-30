export function child (element: HTMLElement | null, selector: string): HTMLElement | null {
  if (!element || !selector) return null

  return element.querySelector(selector) as HTMLElement
}

export function children (selector: string, parent?: HTMLElement | null): HTMLElement[] {
  if (!parent) {
    parent = document.body
  }

  return Array.prototype.slice.call(parent.querySelectorAll(selector))
}

export function onResize (el: Window | Document | HTMLElement, fn: EventListener): void {
  el.addEventListener('resize', fn, false)
}
