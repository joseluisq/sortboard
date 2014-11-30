# Sortboard

Easy sorting and filtering of elements.

[View demo](http://goo.gl/5cY8M1)

## Usage

Define a list, for example, using an `ul` and `li` tags, then sets your filters in each `li` tags with the `data-filter` attribute, it can add several filters for one item separated by whitespace.

Javascript :
```js
var sortlist = document.getElementById('sortlist');

var sb = new Sortboard(sortlist, {
  gutter: 10,
  filterComplete: function(data) {
    console.log(data);
  },
  sortComplete: function() {
    console.log('Sorting is completed.');
  }
});
```

Markup :
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

## Reference
**Options :**

  * `gutter` : The margin for items defined in pixels.
  * `hiddenClass` : Class name for hidden items. Default is `.hidden` class name.
  * `itemsMatchName` : Items match mame. It can be a class (e.g. `.items`) or tag name. Default is `li` tag name.
  * `filterComplete` : Callback function when filtering is completed.
  * `sortComplete` : Callback function when sorting is completed.

**Methods :**
    
  * `sort()` : Sort items.
  * `filterBy(string)` : String it's text to filter, it should match to `data-filter` attribute for items.
  * `getFilter()` : Gets the current filter string.
  * `getItems()` : Gets all items.
  * `getFoundItems()` : Gets items matched by filter.
  * `getNotFoundItems()` : Gets items non-matched by filter.

## License
MIT License
