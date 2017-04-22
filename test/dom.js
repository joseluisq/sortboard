import fs from 'fs'
import {jsdom} from 'jsdom'

module.exports.init = () => {
  global.document = jsdom('<!doctype html><html><body></body></html>')
  global.window = document.defaultView

  const tmpl = fs.readFileSync(`${__dirname}/markup.html`)

  document.body.innerHTML = tmpl.toString()
}
