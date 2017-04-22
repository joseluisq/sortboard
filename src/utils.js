export default {
  child (el, selector) {
    return el.querySelector(selector)
  },
  children (selector, parent = document) {
    return Array.prototype.slice.call(parent.querySelectorAll(selector))
  },
  onResize (el, fn) {
    el.addEventListener('resize', fn, false)
  }
}
