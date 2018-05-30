import { name } from "./package.json";
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: '.cache/src/index.js',
  output: {
    name,
    file: `./src/${name}.umd.js`,
    format: 'umd',
    sourcemap: true,
    exports: 'named'
  },
  plugins: [
    resolve(),
    commonjs({
      namedExports: {
        'node_modules/emitus/dist/emitus.umd.js': ['emitus']
      }
    })
  ],
  onwarn
}

function onwarn(message) {
  const suppressed = ['UNRESOLVED_IMPORT', 'THIS_IS_UNDEFINED']

  if (!suppressed.find((code) => message.code === code)) {
    return console.warn(message.message)
  }
}
