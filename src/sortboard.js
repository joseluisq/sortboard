(() => {
  /**
   * Sortboard v1.0.5 | MIT
   * http://git.io/sortboard
   * (c) 2016 José Luis Quintana
   */
  const SortboardBase = {
    /**
    * Initialize
    *
    * @param {Element} element
    * @param {Object} options
    */
    init: function(el, opts) {
      this.currentFilter = 'all';
      this.elements = [];
      this.found = [];
      this.element = null;
      this.notfound = [];
      this.size = 0;
      this.defaults = {
        gutter: 0,
        hiddenClass: '.hidden',
        itemsMatchName: 'li',
        filterComplete: null,
        sortComplete: null
      };

      if (typeof el === 'object') {
        if (el.nodeName) {
          this.element = el;
          this.setOptions(opts);
          this.addEvents();
        } else {
          this.setOptions(opts);
        }
      } else {
        console.error('Sortboard requires an HTML element.');
      }
    },

    /**
     * Set options
     * @param  {Object} opts
     */
    setOptions: function(opts) {
      this.options = Object.assign(this.defaults, opts);
    },

    addEvents: function() {
      window.addEventListener('resize', () => this.sort(), false);
      this.sort();
    },

    /**
     * Sort elements
     */
    sort: function() {
      let n = 0;
      let x = 0;
      let y = 0;
      let totalW = 0;
      let totalH = 0;
      let breakW = 0;
      const parentWidth = this.element.parentElement.offsetWidth;
      const children = this.findElements(this.options.itemsMatchName);
      const size = children.length;
      const gutter = this.options.gutter;
      const str = `(${this.options.hiddenClass.replace('.', '')})+`;
      const regx = new RegExp(str, 'i');

      let child;
      for (let i = 0; i < size; ++i) {
        child = children[i];

        if (!child.className.match(regx)) {
          if (totalW >= (parentWidth - child.offsetHeight - gutter)) {
            totalW = 0;
            y += child.offsetHeight + gutter;

            if (!breakW) {
              breakW = n * child.offsetWidth + ((n * gutter) - gutter);
            }
          } else {
            totalW += n ? gutter : 0;
          }

          totalW += child.offsetWidth;
          x = totalW - child.offsetWidth;
          totalH = y + child.offsetHeight;
          n++;

          child.setAttribute('data-cords', `${x},${y}`);
          this.translate(child, `${x},${y}`, false);
        }
      }

      const pNWidth = (n * parentWidth) + ((n < 2 ? n : n - 1) * gutter);
      const pWidth = breakW || pNWidth;

      this.element.style.width = `${pWidth}px`;
      this.element.style.height = `${totalH}px`;
      this.size = size;

      if (this.options.sortComplete && typeof this.options.sortComplete === 'function') {
        this.options.sortComplete();
      }
    },

    /**
     * Filter by string
     * @param  {String} filter
     */
    filterBy: function(filter) {
      filter = filter.toString();

      if (filter && ((this.currentFilter !== filter) || filter === 'all')) {
        let i;
        let match;
        let cords;
        let regx;
        let attr;
        let item;
        const matches = [];
        let items = this.findElements(this.options.itemsMatchName);
        regx = new RegExp(filter, 'i');

        for (i = 0; i < this.size; ++i) {
          item = items[i];
          attr = item.getAttribute('data-filter');

          if (attr && attr.search(regx) !== -1) {
            matches.push(item);
          }
        }

        this.currentFilter = filter;
        this.found = [];
        this.notfound = [];

        for (i = 0; i < this.size; ++i) {
          item = items[i];
          cords = item.getAttribute('data-cords');

          if (filter.toLowerCase() === 'all') {
            this.found.push(item);
            this.translate(item, cords, false);
          } else {
            attr = item.getAttribute('data-filter');
            match = (attr && attr.search(regx) !== -1);

            if (match) {
              this.found.push(item);
            } else {
              this.notfound.push(item);
            }

            this.translate(item, cords, !match);
          }
        }
      }

      if (this.options.filterComplete && typeof this.options.filterComplete === 'function') {
        this.options.filterComplete(this.found || []);
      }

      if (this.found.length > 0) {
        this.sort();
      }
    },

    /**
     * Translate one element to specific cords.
     * @param  {HTMLElement} item
     * @param  {String} cords "x,y" cords
     * @param  {Boolean} hide True for show or False for hide
     */
    translate: function(item, cords, hide) {
      const hiddenClass = this.options.hiddenClass.replace('.', '');
      const matrix = `matrix(1,0,0,1,${cords}) scale(${hide ? '0.001' : '1'})`;

      item.className = item.className.replace(new RegExp(hiddenClass, 'g'), '');

      if (hide) {
        item.className = `${item.className} ${hiddenClass}`;
      }

      item.style.setProperty('opacity', hide ? '0' : '1');
      item.style.setProperty('-webkit-transform', matrix);
      item.style.setProperty('-moz-transform', matrix);
      item.style.setProperty('transform', matrix);
    },

    /**
     * Get children elements by children name
     * @param  {String} childrenName Children name
     * @return {Array}              An Array with HTMLElements
     */
    findElements: function(childrenName) {
      if (!this.elements.length) {
        this.elements = childrenName.match(/^\.(.+)$/) ? this.element.getElementsByClassName(childrenName.replace('.', '')) : this.element.getElementsByTagName(childrenName);
      }

      return this.elements;
    }
  };

  /**
   * Sortboard API function
   * @return {Object} Object API
   */
  const SortboardAPI = {
    /**
     * Factory function
     * @param {HTMLElement} element
     * @param {Object} options
     * @return {Object} Sortboard Object
     */
    create: function(element, options) {
      const sb = Object.create(SortboardBase);
      sb.init(element, options);

      return {
        filterBy: function(filter) {
          sb.filterBy(filter);
        },
        sort: function() {
          sb.sort();
        },
        getFilter: function() {
          return sb.currentFilter;
        },
        getItems: function() {
          return sb.elements;
        },
        getFoundItems: function() {
          return sb.found;
        },
        getNotFoundItems: function() {
          return sb.notfound;
        }
      };
    }
  };

  /* istanbul ignore else */
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = SortboardAPI;
  /* istanbul ignore else */
  } else if (typeof define === 'function' && define.amd) {
    define([], () => SortboardAPI);
  } else {
    window.Sortboard = SortboardAPI;

    // jQuery support
    if (window.jQuery) {
      let sb;
      let fn;

      window.jQuery.fn.sortboard = function(options) {
        if (typeof options === 'string') {
          sb = this.data('sortboard');
          fn = sb[options];

          if (sb && typeof options === 'string' && fn) {
            return fn.apply(this, Array.prototype.slice.call(arguments, 1));
          } else {
            window.jQuery.error(`Method ${options} is not supported on jQuery.sortboard.`);
          }
        } else {
          sb = SortboardAPI.create(this[0], options);
          this.data('sortboard', sb);
        }

        return this;
      };
    }
  }
})();
