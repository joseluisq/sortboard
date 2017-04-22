# Sortboard

[![Build Status](https://travis-ci.org/joseluisq/sortboard.svg?branch=master)](https://travis-ci.org/joseluisq/sortboard) [![Coverage Status](https://coveralls.io/repos/github/joseluisq/sortboard/badge.svg?branch=master)](https://coveralls.io/github/joseluisq/sortboard?branch=master) [![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![Greenkeeper badge](https://badges.greenkeeper.io/joseluisq/sortboard.svg)](https://greenkeeper.io/)

> An ES6 small library for easy sorting and filtering of elements.

Sortboard is small library for sorting and filtering HTML elements which uses CSS3 [`matrix()` and `scale()`](http://www.w3.org/TR/2011/WD-css3-2d-transforms-20111215/) transform functions. It supports [RegEx](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions) string filters and it's responsive by default.

:tada: View demo on [Codepen](http://codepen.io/joseluisq/full/IlHzo/)

## Install

[Yarn](https://github.com/yarnpkg/)

```sh
yarn add sortboard --dev
```

[NPM](https://www.npmjs.com/)

```sh
npm install sortboard --save-dev
```

The [UMD](https://github.com/umdjs/umd) build is also available on [unpkg](https://unpkg.com).

```html
<script src="https://unpkg.com/sortboard/dist/sortboard.min.js"></script>
```

You can use the library via `window.sortboard`

## Usage

Define some list. For example an `ul` with `li` child elements, then set your filters in each `li` element with the `data-filter` attribute. It can add several filters by element separated by whitespace.

__Js:__

```js
import sortboard from 'sortboard'

const sb = sortboard({
  container: '#mylist',
  selector: 'li'
})

sb.filter('programing front-end')

// Or filter using a RegEx string
sb.filter('(webdesign|illustration)')
```

__Markup:__

```html
<ul id="mylist">
  <li data-filter="programing"></li>
  <li data-filter="programing back-end"></li>
  <li data-filter="programing front-end UX"></li>
  <li data-filter="graphic-design illustration"></li>
  <li data-filter="webdesign front-end"></li>
  <li data-filter="graphic-design printing"></li>
</ul>
```

## API

### Options

- __container__ : The container of elements.
- __selector__ : The query selector for each element.
- __gutter__ : The margin for each element defined in pixels. Default is `10` pixels.
- __resetFilterValue__ : The reset filter value used by `reset()` method. Default is `all`.
- __hiddenClass__ : Class name for hidden elements. Default is `.sortboard-hidden` class name.
- __matchedClass__ : Class name for matched elements. Default is `.sortboard-matched` class name.

### Methods

- __filter( string )__ : `string` it's text to filter, it should match to `data-filter` attribute for each element to searching. It support also a `RegExp` string.
- __reset()__ : Reset the elements which uses `resetFilterValue` option for resetting.
- __sort()__ : Sort the element positions in the container. Sort method is called after the `filter()` method and in each trigger of `window.resize` event.
- __elements()__ : Return an array with all items.

### Events

#### filter
Trigger when filter is completed.

Passed params:
- __matchedElements:__ An `array` with all matched elements.
- __restElements:__ An `array` with the rest (not matched) elements.
- __filterValue:__ A `string` with the current filter value used.

```js
sortboard.on('filter', (matchedElements, restElements, filterValue) => {})
```

#### sort
Trigger when sort is completed.

```js
sortboard.on('sort', () => {})
```

## Development

```sh
yarn start
```

## Contributions

[Pull requests](https://github.com/joseluisq/sortboard/pulls) and [issues](https://github.com/joseluisq/sortboard/issues) are very appreciated.

## License
MIT license

© 2017 [José Luis Quintana](http://git.io/joseluisq)
