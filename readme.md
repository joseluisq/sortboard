# Sortboard
[![](https://img.shields.io/bower/v/sortboard.svg?style=flat-square)](https://github.com/quintana-dev/sortboard#install) [![](https://img.shields.io/npm/v/sortboard.svg?style=flat-square)](https://github.com/quintana-dev/sortboard) [![Build Status](http://img.shields.io/travis/quintana-dev/sortboard.svg?style=flat-square)](https://travis-ci.org/quintana-dev/sortboard)

> Easy sorting and filtering of elements.

**Note:** This code uses CSS3 [`matrix()` and `scale()`](http://www.w3.org/TR/2011/WD-css3-2d-transforms-20111215/) transform functions.

[View demo](http://goo.gl/RnaQWi)

## Install

**Npm**

```sh
$ npm install sortboard
```

**Bower**

```sh
$ bower install sortboard
```

**CDN** - Hosted by [jsDelivr](https://www.jsdelivr.com/)

```html
<!-- Latest compiled and minified sortboard.js -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/sortboard/latest/sortboard.min.js">
```

## Usage

Define a list, for example, using an `ul` and `li` tags, then sets your filters in each `li` tags with the `data-filter` attribute, it can add several filters for one item separated by whitespace.

**Javascript :**

```js
var sortlist = document.getElementById('sortlist');

var sb = Sortboard.create(sortlist, {
  gutter: 10,
  filterComplete: function(matches) {
    // `matches` always should an Array[] with `HTML Elements` matched.
    console.log(matches);
  },
  sortComplete: function() {
    console.log('Sorting is completed.');
  }
});

// Filter by tag
sb.filterBy('programing');

```

**jQuery support :**

```js
$('#sortlist').sortboard({
  gutter: 10,
  filterComplete: function(e) {
    console.log(e);
  },
  sortComplete: function() {
    console.log('Sort is completed.');
  }
});

// Filter by tag
$('#sortlist').sortboard('filterBy', 'programing');

```

**Markup :**

```html
<ul id="sortlist">
  <li data-filter="programing"></li>
  <li data-filter="programing back-end"></li>
  <li data-filter="programing front-end UX"></li>
  <li data-filter="graphic-design illustration"></li>
  <li data-filter="webdesign front-end"></li>
  <li data-filter="graphic-design printing"></li>
</ul>
```

## API
`Sortboard.create(element, options)`

**Options :**

  * `gutter` : The margin for items defined in pixels.
  * `hiddenClass` : Class name for hidden items. Default is `.hidden` class name.
  * `itemsMatchName` : Items match mame. It can be a class (e.g. `.items`) or tag name. Default is `li` tag name.
  * `filterComplete( matches )` : Callback function when filtering is completed. `matches` param always should an `Array` with `HTMLElements` matched or empty `Array` if otherwise.
  * `sortComplete` : Callback function when sorting is completed.

**Methods :**

  * `sort()` : Sort items.
  * `filterBy( string )` : `string` it's text to filter, it should match to `data-filter` attribute for items.
  * `getFilter()` : Gets the current filter string.
  * `getItems()` : Gets all items.
  * `getFoundItems()` : Gets items matched by filter.
  * `getNotFoundItems()` : Gets items non-matched by filter.

## Contributions
[Pull requests](https://github.com/quintana-dev/sortboard/pulls) and [issues](https://github.com/quintana-dev/sortboard/issues) are welcome. Please before sending some feature or bug request make sure provide as much detail and context as possible.

## License
MIT license

© 2016 [José Luis Quintana](http://git.io/joseluisq)
